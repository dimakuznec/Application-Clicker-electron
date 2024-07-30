import React from 'react'
import Cet from './../../assets/cet.png'
import './Shop.css'

interface ShopProps {
	currency: number
	onBuySkin: (skin: string, cost: number) => void
	ownedSkins: string[]
	currentSkin: string
	setCurrentSkin: (skin: string) => void
}

const Shop: React.FC<ShopProps> = ({
	currency,
	onBuySkin,
	ownedSkins,
	currentSkin,
	setCurrentSkin,
}) => {
	const skins = [
		{ name: 'Red', cost: 10, color: '#f44336' },
		{ name: 'Green', cost: 20, color: '#4caf50' },
		{ name: 'Blue', cost: 30, color: '#2196f3' },
		{
			name: 'Gradient 1',
			cost: 7000,
			color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		},
		{
			name: 'Gradient 2',
			cost: 6000,
			color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
		},
		{
			name: 'Gradient 3',
			cost: 7000,
			color: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
		},
		{
			name: 'Gradient 4',
			cost: 60000,
			color: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
		},
		{
			name: 'Gradient 5',
			cost: 70000,
			color: 'linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)',
		},
		{
			name: 'Gradient 6',
			cost: 75000,
			color: 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)',
		},
		{
			name: 'Gradient 7',
			cost: 80000,
			color: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)',
		},
	]

	const handleBuySkin = (skin: string, cost: number) => {
		if (!ownedSkins.includes(skin) && currency >= cost) {
			onBuySkin(skin, cost)
		}
	}

	const handleSelectSkin = (skin: string) => {
		if (ownedSkins.includes(skin)) {
			setCurrentSkin(skin)
		}
	}

	return (
		<div className='shop-container'>
			<h2 className='shop-heading'>Магазин</h2>
			<ul className='skin-list'>
				{skins.map(skin => (
					<li key={skin.name} className='skin-item'>
						<div
							className='skin-preview'
							style={{ background: skin.color }}
						></div>
						<div className='skin-name'>{skin.name}</div>
						<div className='skin-cost'>Стоимость: {skin.cost} монет</div>
						{ownedSkins.includes(skin.color) ? (
							<button
								className={`skin-button ${
									currentSkin === skin.color ? 'selected' : ''
								}`}
								disabled={currentSkin === skin.color}
								onClick={() => handleSelectSkin(skin.color)}
							>
								{currentSkin === skin.color ? 'Выбрано' : 'Выбрать'}
							</button>
						) : (
							<button
								className='skin-button'
								onClick={() => handleBuySkin(skin.color, skin.cost)}
								disabled={currency < skin.cost}
							>
								Купить
							</button>
						)}
					</li>
				))}
			</ul>
			<img src={Cet} alt='' />
			<div className='currency-display'>Ваш баланс: {currency} монет</div>
		</div>
	)
}

export default Shop
