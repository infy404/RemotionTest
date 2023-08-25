import {Sequence} from 'remotion';
import {ImageDisplay} from '../WordStyle/imageDisplay';
import {WordDisplay} from '../WordStyle/wordDisplay';
import {NumberDisplay} from '../WordStyle/numberDisplay';

export const TopTurnoverSequence = (turnoverData) => {
	return turnoverData.data.map((elem, index) => {
		const styleProp = {top: 100 * index};
		return (
			<div key={index} style={{display: 'flex', flexDirection: 'column'}}>
				<Sequence
					durationInFrames={360 - index * 60}
					from={1550 + index * 60}
					style={{position: 'unset', alignItems: 'center'}}
				>
					<ImageDisplay styleProp={styleProp} />
					<WordDisplay
						titleText={elem.companyName}
						styleProp={{...styleProp}}
					/>
					<NumberDisplay
						perChange={elem.turnOver}
						styleProp={{...styleProp, color: 'green', decimalPoints: 1}}
					/>
				</Sequence>
			</div>
		);
	});
};
