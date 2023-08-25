import {useEffect, useState} from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {GreetingsDisplay} from './WordStyle/greetingsDisplay';
import {TransitionScreen} from './WordStyle/transitionScreen';
import {TopLoserSequence} from './Sequences/topLoserSequence';
import {TopGainerSequence} from './Sequences/topGainerSequence';
import {TopTradedSequence} from './Sequences/topTradedSequence';
import {TopTurnoverSequence} from './Sequences/topTurnoverSequence';

export const calcMyCompMetadata = async ({props}) => {
	const perms = {
		Permission: '2021D@T@f@RSt6&%2-D@T@',
	};
	const losersData = await fetch(`http://localhost:3000/api/loser/live`, {
		headers: perms,
	});

	const gainersData = await fetch(`http://localhost:3000/api/gainer/live`, {
		headers: perms,
	});

	const topTradedQuantity = await fetch(
		`http://localhost:3000/api/volume/live`,
		{
			headers: perms,
		}
	);

	const topTurnover = await fetch(`http://localhost:3000/api/turnover/today`, {
		headers: perms,
	});

	const loserJson = await losersData.json();
	const gainerJson = await gainersData.json();
	const topTradeJson = await topTradedQuantity.json();
	const topTurnoverJson = await topTurnover.json();

	return {
		props: {
			...props,
			losersData: loserJson.data.slice(0, 5),
			gainersData: gainerJson.data.slice(0, 5),
			tradeData: topTradeJson.data.slice(0, 5),
			turnoverData: topTurnoverJson.data.slice(0, 5),
		},
	};
};

export const MyComponent = ({
	losersData,
	gainersData,
	tradeData,
	turnoverData,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [loser, setLoser] = useState('');
	const [gainer, setGainer] = useState('');
	const [topTrade, setTopTrade] = useState('');
	const [topTurnover, setTopTurnover] = useState('');

	useEffect(() => {
		if (losersData === null) {
			setError('Data was not fetched');
			setIsLoading(false);
		} else {
			setLoser(losersData);
			setGainer(gainersData);
			setTopTrade(tradeData);
			setTopTurnover(turnoverData);
			setIsLoading(false);
		}
	}, [losersData, gainersData, tradeData, turnoverData]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<Sequence durationInFrames={60}>
				<GreetingsDisplay />
			</Sequence>
			<Sequence durationInFrames={60} from={70}>
				<TransitionScreen transitionTitle="Top 5 Loosers" />
			</Sequence>
			<TopLoserSequence data={loser} />
			<Sequence durationInFrames={60} from={500}>
				<TransitionScreen transitionTitle="Top Gainers" />
			</Sequence>
			<TopGainerSequence data={gainer} />
			<Sequence durationInFrames={60} from={930}>
				<TransitionScreen transitionTitle="Top Traded Quantity" />
			</Sequence>
			<TopTradedSequence data={topTrade} />
			<Sequence durationInFrames={60} from={1460}>
				<TransitionScreen transitionTitle="Top Turnover" />
			</Sequence>
			<TopTurnoverSequence data={topTurnover} />
		</AbsoluteFill>
	);
};
