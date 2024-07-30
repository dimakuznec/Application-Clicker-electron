// Компонент ImageShop
import React from 'react'
import Cet from './../../assets/cet.png'
import Cet2 from './../../assets/cet2.jpg'
import './ImageShop.css'

interface ImageShopProps {
	currency: number
	onBuyImage: (image: string, cost: number) => void
	ownedImages: string[]
	currentImage: string
	setCurrentImage: (image: string) => void
}

const ImageShop: React.FC<ImageShopProps> = ({
	currency,
	onBuyImage,
	ownedImages,
	currentImage,
	setCurrentImage,
}) => {
	const images = [
		{ name: 'Image 1', cost: 10, src: Cet },
		{ name: 'Image 2', cost: 20, src: Cet2 },
		// добавьте здесь другие изображения
	]

	const handleBuyImage = (image: string, cost: number) => {
		if (!ownedImages.includes(image) && currency >= cost) {
			onBuyImage(image, cost)
		}
	}

	const handleSelectImage = (image: string) => {
		if (ownedImages.includes(image)) {
			setCurrentImage(image)
		}
	}

	return (
		<div className='image-shop-container'>
			<h2 className='shop-heading'>Магазин герои</h2>
			<ul className='image-list'>
				{images.map(image => (
					<li key={image.name} className='image-item'>
						<img src={image.src} alt={image.name} className='image-preview' />
						<div className='image-name'>{image.name}</div>
						<div className='image-cost'>Стоимость: {image.cost} монет</div>
						{ownedImages.includes(image.src) ? (
							<button
								className={`image-button ${
									currentImage === image.src ? 'selected' : ''
								}`}
								disabled={currentImage === image.src}
								onClick={() => handleSelectImage(image.src)}
							>
								{currentImage === image.src ? 'Выбрано' : 'Выбрать'}
							</button>
						) : (
							<button
								className='image-button'
								onClick={() => handleBuyImage(image.src, image.cost)}
								disabled={currency < image.cost}
							>
								Купить
							</button>
						)}
					</li>
				))}
			</ul>
			<div className='currency-display'>Ваш баланс: {currency} монет</div>
		</div>
	)
}

export default ImageShop
