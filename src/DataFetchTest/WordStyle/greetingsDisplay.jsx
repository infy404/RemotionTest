import {interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import {useVideoConfig} from 'remotion';
import {spring} from 'remotion';
import NepaliDate from 'nepali-date-converter';
import {FONT_FAMILY} from '../constants';

export const GreetingsDisplay = () => {
	const style = {
		fontFamily: FONT_FAMILY,
		fontWeight: 'bold',
		fontSize: 50,
		width: '100%',
	};

	const wordStyle = {
		marginLeft: 10,
		marginRight: 10,
		display: 'inline-block',
		color: 'black',
	};

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const opacityFadeIn = interpolate(frame, [0, 50], [0, 1]);
	const date = new NepaliDate().toString().split(' ');

	// Checking Date
	const today = new Date();
	today.setDate(today.getDate() + 1);
	const checkDate = new NepaliDate(today).getDate();
	checkDate === 1
		? console.log('Last Day of the Month')
		: console.log('Not the Last day');

	const text = 'Market Summary for';

	return (
		<div style={{...style, alignContent: 'center', justifyContent: 'center'}}>
			<h1 style={{marginLeft: '30rem'}}>{text}</h1>
			<h1 style={{marginLeft: '20rem'}}>
				{date.map((elem, index) => {
					const delay = index * 5;

					const springAnimation = spring({
						fps: videoConfig.fps,
						frame: frame - delay,
						config: {
							damping: 200,
						},
					});
					return (
						<span
							key={elem}
							style={{
								...wordStyle,
								transform: `scale(${springAnimation})`,
								opacity: opacityFadeIn,
							}}
						>
							{elem}
						</span>
					);
				})}
			</h1>
		</div>
	);
};
