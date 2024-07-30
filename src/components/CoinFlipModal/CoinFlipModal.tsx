import React, { useEffect, useState } from 'react'
import './CoinFlipModal.css'

interface CoinFlipModalProps {
	show: boolean
	onClose: () => void
	onPlay: (choice: string) => {
		isWin: boolean
		randomCoins: number
		gameResult: string
	}
}

const CoinFlipModal: React.FC<CoinFlipModalProps> = ({
	show,
	onClose,
	onPlay,
}) => {
	const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
	const [result, setResult] = useState<string | null>(null)
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		if (!show) {
			setSelectedChoice(null)
			setResult(null)
			setMessage('')
		}
	}, [show])

	const handlePlay = (choice: string) => {
		const { isWin, gameResult } = onPlay(choice)
		setSelectedChoice(choice)
		setResult(gameResult)
		setMessage(
			isWin
				? `Вы выиграли! Уровень прокачки повышен и вы получили монеты.`
				: `Вы проиграли! Уровень прокачки понижен. Уровень автофарминга понижен.`
		)
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<div className={`coin-flip-modal-overlay ${show ? 'show' : ''}`}>
			<div className='coin-flip-modal'>
				<button className='close-button' onClick={handleClose}>
					×
				</button>
				<h2>Игра "Орёл и Решка"</h2>
				<div>
					<button
						onClick={() => handlePlay('Орёл')}
						disabled={!!selectedChoice}
					>
						Орёл
					</button>
					<button
						onClick={() => handlePlay('Решка')}
						disabled={!!selectedChoice}
					>
						Решка
					</button>
				</div>
				{selectedChoice && (
					<div className='result'>
						<p className={result === selectedChoice ? 'win' : 'lose'}>
							{message}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default CoinFlipModal
