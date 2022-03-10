export function addSplitsInDay(day) {
	return day.reduce((acc, split) => acc + split.time, 0);
}