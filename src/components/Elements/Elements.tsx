import { useAppSelector } from "../../hooks";

// @flow 
type Props = {
	
};
export const Elements = (props: Props) => {
	const counter = useAppSelector(store=> store?.value);
	return (
		<div>
			asdasdasd
		</div>
	);
};