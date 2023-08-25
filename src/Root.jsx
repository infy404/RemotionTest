import {Composition} from 'remotion';
import {MyComponent, calcMyCompMetadata} from './DataFetchTest/MyComponent';

export const RemotionRoot = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComponent}
				durationInFrames={2000}
				fps={30}
				width={1920}
				height={1080}
				calculateMetadata={calcMyCompMetadata}
			/>
		</>
	);
};
