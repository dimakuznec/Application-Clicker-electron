import React, { useEffect, useRef, useState } from 'react'
import { BsLightningChargeFill } from 'react-icons/bs'
import {
	FaPause,
	FaPlay,
	FaStepBackward,
	FaStepForward,
	FaVolumeUp,
} from 'react-icons/fa'
import ClickAnimation from '../ClickAnimation/ClickAnimation'
import Music1 from './../../Music/battlefield-elegy-201530.mp3'
import Music2 from './../../Music/danny-evo-dark-skies.mp3'
import Music3 from './../../Music/flow.mp3'
import Coin from './../../assets/free-icon-ruble.png'
import './Home.css'

interface HomeProps {
	currency: number
	currentSkin: string
	handleClick: () => void
	upgradeLevel: number
	autoFarmLevel: number
	onOpenCoinFlipModal: () => void
	hasPlayedCoinFlip: boolean
	onNotification: (message: string) => void
	currentImage: string
}

const Home: React.FC<HomeProps> = ({
	currency,
	currentSkin,
	handleClick,
	upgradeLevel,
	autoFarmLevel,
	onOpenCoinFlipModal,
	hasPlayedCoinFlip,
	onNotification,
	currentImage,
}) => {
	const [energy, setEnergy] = useState<number>(() => {
		const savedEnergy = localStorage.getItem('energy')
		return savedEnergy ? JSON.parse(savedEnergy) : 100
	})
	const [clickAnimations, setClickAnimations] = useState<
		{ id: number; clicks: number; position: { x: number; y: number } }[]
	>([])
	const [isPlaying, setIsPlaying] = useState<boolean>(true) // Музыка играет по умолчанию
	const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)
	const [volume, setVolume] = useState<number>(0.5) // Начальная громкость 50%
	const audioRef = useRef<HTMLAudioElement>(null)

	const tracks = [
		{ src: Music1, title: 'Battlefield Elegy' },
		{ src: Music2, title: 'Relaxing Music' },
		{ src: Music3, title: 'flow' },
	] // Добавьте сюда другие треки

	const maxEnergy = 100
	const energyRegenRate = 3 // Energy regen per second
	const clickEnergyCost = 10
	const baseClickValue = 1

	useEffect(() => {
		const regenInterval = setInterval(() => {
			setEnergy(prevEnergy => {
				const newEnergy = Math.min(maxEnergy, prevEnergy + energyRegenRate)
				localStorage.setItem('energy', JSON.stringify(newEnergy))
				return newEnergy
			})
		}, 1000)

		return () => clearInterval(regenInterval)
	}, [])

	useEffect(() => {
		localStorage.setItem('energy', JSON.stringify(energy))
	}, [energy])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = tracks[currentTrackIndex].src
			audioRef.current.play()
		}
	}, [currentTrackIndex])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume
			if (isPlaying) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}
	}, [isPlaying, volume])

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				if (isPlaying) {
					audioRef.current?.play()
				}
			} else {
				if (isPlaying) {
					audioRef.current?.pause()
				}
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
		}
	}, [isPlaying])

	const handleButtonClick = (e: React.MouseEvent) => {
		if (energy >= clickEnergyCost) {
			const clickIncrement =
				upgradeLevel === 1
					? baseClickValue
					: baseClickValue * (upgradeLevel * 1.5) // Увеличение кликов пропорционально уровню прокачки
			handleClick()
			setEnergy(prevEnergy => {
				const newEnergy = prevEnergy - clickEnergyCost
				localStorage.setItem('energy', JSON.stringify(newEnergy))
				return newEnergy
			})

			const newClickAnimation = {
				id: Date.now(),
				clicks: clickIncrement,
				position: { x: e.clientX, y: e.clientY },
			}
			setClickAnimations(prevAnimations => [
				...prevAnimations,
				newClickAnimation,
			])
			setTimeout(() => {
				setClickAnimations(prevAnimations =>
					prevAnimations.filter(
						animation => animation.id !== newClickAnimation.id
					)
				)
			}, 1000)
		} else {
			onNotification('Недостаточно энергии для клика!')
		}
	}

	const handleOpenModal = () => {
		if (!hasPlayedCoinFlip) {
			onOpenCoinFlipModal()
		} else {
			onNotification('Вы уже сыграли в "Орёл и Решка".')
		}
	}

	const toggleMusic = () => {
		setIsPlaying(!isPlaying)
	}

	const nextTrack = () => {
		setCurrentTrackIndex(prevIndex => (prevIndex + 1) % tracks.length)
	}

	const prevTrack = () => {
		setCurrentTrackIndex(
			prevIndex => (prevIndex - 1 + tracks.length) % tracks.length
		)
	}

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value)
		setVolume(newVolume)
	}

	const handleTrackEnd = () => {
		nextTrack()
	}

	return (
		<div className='home-container'>
			<div className='counter'>
				<div>
					<img className='imgCoins' src={Coin} alt='' />
				</div>
				<p className='coin-rub'>{currency}</p>
			</div>
			<button
				className='ButtonClick'
				onClick={handleButtonClick}
				disabled={energy < clickEnergyCost}
				style={{ background: currentSkin }}
			>
				<div>
					<img className='Mimg' src={currentImage} alt='' />
				</div>
			</button>
			<div className='Energy'>
				<BsLightningChargeFill className='EnergyImg' /> {energy}%
			</div>
			<button className='Coin-Flip-Button' onClick={handleOpenModal}>
				Играть в "Орёл и Решка"
			</button>
			<p className='text'>Уровень прокачки: {upgradeLevel}</p>
			<p className='text'>Уровень автофарминга: {autoFarmLevel}</p>

			{/* Музыкальный плеер */}
			<div className='music-player'>
				<div className='track-info'>
					<div className='track-title'>{tracks[currentTrackIndex].title}</div>
				</div>
				<button onClick={prevTrack}>
					<FaStepBackward />
				</button>
				<button onClick={toggleMusic}>
					{isPlaying ? <FaPause /> : <FaPlay />}
				</button>
				<button onClick={nextTrack}>
					<FaStepForward />
				</button>
				<div className='volume-control'>
					<FaVolumeUp />
					<input
						type='range'
						min='0'
						max='1'
						step='0.01'
						value={volume}
						onChange={handleVolumeChange}
					/>
				</div>
			</div>

			<audio ref={audioRef} onEnded={handleTrackEnd} loop={false} autoPlay>
				<source src={tracks[currentTrackIndex].src} type='audio/mpeg' />
				Your browser does not support the audio element.
			</audio>

			{clickAnimations.map(animation => (
				<ClickAnimation
					key={animation.id}
					clicks={animation.clicks}
					position={animation.position}
				/>
			))}
		</div>
	)
}

export default Home
