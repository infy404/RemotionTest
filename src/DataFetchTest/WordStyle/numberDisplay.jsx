import {interpolateColors} from 'remotion';
import {useVideoConfig} from 'remotion';
import {spring} from 'remotion';
import {interpolate} from 'remotion';
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {FONT_FAMILY} from '../constants';

export const NumberDisplay = ({perChange, styleProp = {}}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const colorInterpolate = interpolateColors(
		frame,
		[0, 30],
		['yellow', styleProp.color]
	);

	const title = {
		fontFamily: FONT_FAMILY,
		fontWeight: 'bold',
		fontSize: 80,
		width: '100%',
		color: colorInterpolate,
	};

	const scale = spring({
		fps,
		frame,
	});
	const calculateValue = (number) => {
		const numberAnimate = interpolate(
			frame,
			[0, 45],
			[0, number === null ? 0 : number],
			{
				extrapolateRight: 'clamp',
			}
		);
		return numberAnimate;
	};

	return (
		<h1 style={{...title, transform: `scale(${scale})`}}>
			{console.log(styleProp.decimalPoints)}
			{calculateValue(perChange).toFixed(styleProp.decimalPoints || 5)}
		</h1>
	);
};
