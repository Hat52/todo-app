import { CircularProgressbar } from 'react-circular-progressbar';

type tProgressbar = {
	percentage: number;
};

export default function Progressbar({ percentage }: tProgressbar) {
	return (
		<div className="w-[10%] absolute left-40 top-40">
			<CircularProgressbar value={percentage} maxValue={100} text={`${percentage}%`} />
		</div>
	);
}
