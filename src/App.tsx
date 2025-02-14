import React, { useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify' // Импорт toast из react-toastify
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import M from './assets/m2.png'
import CoinFlipModal from './components/CoinFlipModal/CoinFlipModal'
import Home from './components/Home/Home'
import ImageShop from './components/ImageShop/ImageShop' // Импортируем компонент ImageShop
import Shop from './components/Shop/Shop'
import Upgrade from './components/Upgrade/Upgrade'

const App: React.FC = () => {
	const [currency, setCurrency] = useState<number>(() => {
		const savedCurrency = localStorage.getItem('currency')
		return savedCurrency ? JSON.parse(savedCurrency) : 0
	})
	const [currentSkin, setCurrentSkin] = useState<string>(() => {
		const savedSkin = localStorage.getItem('currentSkin')
		return savedSkin
			? savedSkin
			: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
	})
	const [ownedSkins, setOwnedSkins] = useState<string[]>(() => {
		const savedSkins = localStorage.getItem('ownedSkins')
		return savedSkins
			? JSON.parse(savedSkins)
			: ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)']
	})
	const [upgradeLevel, setUpgradeLevel] = useState<number>(() => {
		const savedUpgradeLevel = localStorage.getItem('upgradeLevel')
		return savedUpgradeLevel ? JSON.parse(savedUpgradeLevel) : 1
	})
	const [autoFarmLevel, setAutoFarmLevel] = useState<number>(() => {
		const savedAutoFarmLevel = localStorage.getItem('autoFarmLevel')
		return savedAutoFarmLevel ? JSON.parse(savedAutoFarmLevel) : 1
	})
	const [clickIncrement, setClickIncrement] = useState<number>(() => {
		const savedClickIncrement = localStorage.getItem('clickIncrement')
		return savedClickIncrement ? JSON.parse(savedClickIncrement) : 1
	})
	const [showCoinFlipModal, setShowCoinFlipModal] = useState<boolean>(false)
	const [hasPlayedCoinFlip, setHasPlayedCoinFlip] = useState<boolean>(() => {
		const savedHasPlayedCoinFlip = localStorage.getItem('hasPlayedCoinFlip')
		return savedHasPlayedCoinFlip ? JSON.parse(savedHasPlayedCoinFlip) : false
	})
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

	useEffect(() => {
		localStorage.setItem('currency', JSON.stringify(currency))
	}, [currency])

	useEffect(() => {
		localStorage.setItem('currentSkin', currentSkin)
	}, [currentSkin])

	useEffect(() => {
		localStorage.setItem('ownedSkins', JSON.stringify(ownedSkins))
	}, [ownedSkins])

	useEffect(() => {
		localStorage.setItem('upgradeLevel', JSON.stringify(upgradeLevel))
	}, [upgradeLevel])

	useEffect(() => {
		localStorage.setItem('autoFarmLevel', JSON.stringify(autoFarmLevel))
	}, [autoFarmLevel])

	useEffect(() => {
		localStorage.setItem('clickIncrement', JSON.stringify(clickIncrement))
	}, [clickIncrement])

	useEffect(() => {
		localStorage.setItem('hasPlayedCoinFlip', JSON.stringify(hasPlayedCoinFlip))
	}, [hasPlayedCoinFlip])

	useEffect(() => {
		const autoFarmInterval = setInterval(() => {
			if (autoFarmLevel > 1) {
				setCurrency(prevCurrency => prevCurrency + autoFarmLevel)
			}
		}, 1000)

		return () => clearInterval(autoFarmInterval)
	}, [autoFarmLevel])

	const handleUpgrade = (cost: number, increment: number) => {
		if (currency >= cost) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setUpgradeLevel(prevLevel => prevLevel + increment)
			setClickIncrement(prevIncrement => prevIncrement + increment)
		}
	}

	const handleAutoFarmUpgrade = (cost: number, increment: number) => {
		if (currency >= cost) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setAutoFarmLevel(prevLevel => prevLevel + increment)
		}
	}

	const handleOpenCoinFlipModal = () => {
		setShowCoinFlipModal(true)
	}

	const handleCloseCoinFlipModal = () => {
		setShowCoinFlipModal(false)
	}

	const handlePlayCoinFlip = (
		choice: string
	): { isWin: boolean; randomCoins: number; gameResult: string } => {
		const gameResult = Math.random() < 0.5 ? 'Орёл' : 'Решка'
		const isWin = choice === gameResult
		const randomCoins = isWin ? Math.floor(Math.random() * 100000) + 1 : 0

		setCurrency(prevCurrency => prevCurrency + randomCoins)

		if (isWin) {
			setUpgradeLevel(prevLevel => prevLevel + 1)
			const randomAutoFarmIncrease = Math.floor(Math.random() * 3) + 1
			setAutoFarmLevel(prevLevel => prevLevel + randomAutoFarmIncrease)
			toast.success(
				`Вы выиграли! Уровень повышен и вы получили ${randomCoins} монет.`
			)
		} else {
			const newLevel = Math.max(
				1,
				Math.floor(Math.random() * (upgradeLevel - 1)) + 1
			)
			setUpgradeLevel(newLevel)
			const randomAutoFarmDecrease =
				Math.floor(Math.random() * autoFarmLevel) + 1
			setAutoFarmLevel(prevLevel =>
				Math.max(1, prevLevel - randomAutoFarmDecrease)
			)
			toast.error(`Вы проиграли! Уровень понижен до ${newLevel}.`)
		}

		return { isWin, randomCoins, gameResult }
	}

	const handleResetAll = () => {
		localStorage.removeItem('currency')
		localStorage.removeItem('currentSkin')
		localStorage.removeItem('ownedSkins')
		localStorage.removeItem('upgradeLevel')
		localStorage.removeItem('autoFarmLevel')
		localStorage.removeItem('clickIncrement')
		localStorage.removeItem('hasPlayedCoinFlip')
		localStorage.removeItem('energy') // Добавлено для очистки энергии
		setCurrency(0)
		setCurrentSkin('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
		setOwnedSkins(['linear-gradient(135deg, #667eea 0%, #764ba2 100%)'])
		setUpgradeLevel(1)
		setAutoFarmLevel(1)
		setClickIncrement(1)
		setShowCoinFlipModal(false)
		setHasPlayedCoinFlip(false)

		setCurrentImage(M) // Устанавливаем изображение с буквой "M" после сброса
		localStorage.setItem('currentImage', M) // Сохраняем изображение с буквой "M" в localStorage после сброса

		setOwnedImages([M]) // Сбрасываем список купленных изображений до начального состояния
		localStorage.setItem('ownedImages', JSON.stringify([M])) // Сохраняем начальное состояние в localStorage
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleBuyImage = (image: string, cost: number) => {
		if (currency >= cost && !ownedImages.includes(image)) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setOwnedImages(prevImages => [...prevImages, image])
		}
	}

	const [currentImage, setCurrentImage] = useState<string>(() => {
		const savedImage = localStorage.getItem('currentImage')
		return savedImage ? savedImage : M // Используем изображение с буквой "M" как значение по умолчанию
	})

	const [ownedImages, setOwnedImages] = useState<string[]>(() => {
		const savedImages = localStorage.getItem('ownedImages')
		return savedImages ? JSON.parse(savedImages) : [M] // Используем изображение с буквой "M" как начальное значение
	})

	useEffect(() => {
		localStorage.setItem('currentImage', currentImage) // Сохраняем текущее изображение в localStorage
	}, [currentImage])

	useEffect(() => {
		localStorage.setItem('ownedImages', JSON.stringify(ownedImages)) // Сохраняем список купленных изображений в localStorage
	}, [ownedImages])

	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<div
						className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
						onClick={toggleMenu}
					>
						<div className='menu-toggle-bar'></div>
						<div className='menu-toggle-bar'></div>
						<div className='menu-toggle-bar'></div>
					</div>
					<nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
						<Link className='link' to='/' onClick={toggleMenu}>
							Главная
						</Link>
						<Link className='link' to='/shop' onClick={toggleMenu}>
							Магазин
						</Link>
						<Link className='link' to='/ImageShop' onClick={toggleMenu}>
							магазин героев
						</Link>
						<Link className='link' to='/upgrade' onClick={toggleMenu}>
							Прокачка
						</Link>
					</nav>
					{upgradeLevel >= 10 && (
						<button className='reset-button' onClick={handleResetAll}>
							Сбросить всё
						</button>
					)}
				</header>
				<main>
					<Routes>
						<Route
							path='/'
							element={
								<Home
									currency={currency}
									currentSkin={currentSkin}
									handleClick={() =>
										setCurrency(prevCurrency => prevCurrency + clickIncrement)
									}
									upgradeLevel={upgradeLevel}
									autoFarmLevel={autoFarmLevel}
									onOpenCoinFlipModal={handleOpenCoinFlipModal}
									hasPlayedCoinFlip={hasPlayedCoinFlip}
									onNotification={toast.info}
									currentImage={currentImage}
								/>
							}
						/>
						<Route
							path='/shop'
							element={
								<Shop
									currency={currency}
									onBuySkin={(skin, cost) => {
										setCurrency(prevCurrency => prevCurrency - cost)
										setOwnedSkins(prevSkins => [...prevSkins, skin])
									}}
									ownedSkins={ownedSkins}
									currentSkin={currentSkin}
									setCurrentSkin={setCurrentSkin}
								/>
							}
						/>
						<Route
							path='/upgrade'
							element={
								<Upgrade
									currency={currency}
									upgradeLevel={upgradeLevel}
									autoFarmLevel={autoFarmLevel}
									onUpgrade={handleUpgrade}
									onAutoFarmUpgrade={handleAutoFarmUpgrade}
								/>
							}
						/>
						<Route
							path='/imageshop'
							element={
								<ImageShop
									currency={currency}
									onBuyImage={handleBuyImage}
									ownedImages={ownedImages}
									currentImage={currentImage}
									setCurrentImage={setCurrentImage}
								/>
							}
						/>
					</Routes>
					<CoinFlipModal
						show={showCoinFlipModal}
						onClose={handleCloseCoinFlipModal}
						onPlay={handlePlayCoinFlip}
					/>
					<ToastContainer position='bottom-center' />
				</main>
			</div>
		</Router>
	)
}

export default App
