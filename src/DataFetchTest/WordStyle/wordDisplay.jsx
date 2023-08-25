import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT_FAMILY} from '../constants';

export const WordDisplay = ({titleText, styleProp = {}}) => {
	const title = {
		fontFamily: FONT_FAMILY,
		fontWeight: 'bold',
		fontSize: 50,
		width: '100%',
	};

	const word = {
		marginLeft: 5,
		marginRight: 5,
		display: 'inline-block',
		color: styleProp.color || 'black',
	};

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = titleText.toString().split(' ');

	return (
		<h1 style={title}>
			{words.map((t, i) => {
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
	);
};
