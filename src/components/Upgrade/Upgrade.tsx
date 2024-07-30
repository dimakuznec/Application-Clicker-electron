import React from 'react'
import './Upgrade.css'

interface UpgradeProps {
	currency: number
	upgradeLevel: number
	autoFarmLevel: number
	onUpgrade: (cost: number, increment: number) => void
	onAutoFarmUpgrade: (cost: number, increment: number) => void
}

const Upgrade: React.FC<UpgradeProps> = ({
	currency,
	upgradeLevel,
	autoFarmLevel,
	onUpgrade,
	onAutoFarmUpgrade,
}) => {
	const handleUpgrade = () => {
		const cost = upgradeLevel * 10
		const increment = 1
		onUpgrade(cost, increment)
	}

	const handleAutoFarmUpgrade = () => {
		const cost = autoFarmLevel * 20
		const increment = 1
		onAutoFarmUpgrade(cost, increment)
	}

	return (
		<div className='upgrade-container'>
			<div className='upgrade-section'>
				<p className='text'>Уровень прокачки: {upgradeLevel}</p>
				<button onClick={handleUpgrade} disabled={currency < upgradeLevel * 10}>
					Прокачать за {upgradeLevel * 10} монет
				</button>
			</div>
			<div className='auto-farm-section'>
				<p className='text'>Уровень автофарминга: {autoFarmLevel}</p>
				<button
					onClick={handleAutoFarmUpgrade}
					disabled={currency < autoFarmLevel * 20}
				>
					Прокачать автофарм за {autoFarmLevel * 20} монет
				</button>
			</div>
		</div>
	)
}

export default Upgrade
