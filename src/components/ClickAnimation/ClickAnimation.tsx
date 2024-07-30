import React from 'react'
import './ClickAnimation.css'

interface ClickAnimationProps {
	clicks: number
	position: { x: number; y: number }
}

const ClickAnimation: React.FC<ClickAnimationProps> = ({
	clicks,
	position,
}) => {
	return (
		<div
			className='click-animation'
			style={{ top: position.y, left: position.x }}
		>
			+{clicks.toFixed(0)}
		</div>
	)
}

export default ClickAnimation
