import {interpolate} from 'remotion';
import {Img} from 'remotion';
import {useCurrentFrame} from 'remotion';

export const ImageDisplay = ({styleProp = {}}) => {
	const frame = useCurrentFrame();

	const loadImageOpacity = () => {
		interpolate(frame, [0, 30], [0, 1]);
	};

	const imageStyle = {
		width: '100%',
		height: '100%',
	};

	return (
		<div
			style={{
				height: '5rem',
				width: '5rem',
				margin: '0 1rem',
				opacity: loadImageOpacity,
			}}
		>
			<Img
				src="https://sarallagani.xyz/company_logo/NICA.webp"
				style={{
					...imageStyle,
					opacity: loadImageOpacity,
					position: 'unset',
					objectFit: 'cover',
				}}
			/>
		</div>
	);
};
