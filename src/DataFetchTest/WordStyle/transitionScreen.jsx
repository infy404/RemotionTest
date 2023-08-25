import {useCurrentFrame} from 'remotion';
import {useVideoConfig} from 'remotion';
import {spring} from 'remotion';
import {FONT_FAMILY} from '../constants';

export const TransitionScreen = ({transitionTitle, styleProp = {}}) => {
	const splitWords = transitionTitle.split(' ');

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const wordStyle = {
		fontFamily: FONT_FAMILY,
		fontWeight: 'bold',
		fontSize: 150,
		width: '100%',
	};

	const word = {
		marginLeft: 20,
		marginRight: 20,
		display: 'inline-block',
		color: styleProp.color || 'black',
	};

	return (
		<div style={{alignContent: 'center', justifyContent: 'center'}}>
			<h1 style={{...wordStyle}}>
				{splitWords.map((t, i) => {
					const delay = i * 5;

					const scale = spring({
						fps: videoConfig.fps,
						frame: frame - delay,
						config: {
							damping: 200,
						},
					});

					return (
						<span
							key={t}
							style={{
								...word,
								transform: `scale(${scale})`,
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>
		</div>
	);
};
