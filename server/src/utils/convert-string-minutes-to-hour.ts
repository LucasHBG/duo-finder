// 18:25 -> [18, 25] -> (18 * 60) + 25 = 1105
export function convertStringMinutesToHour(minutesString: number) {
    const hours = Math.floor(minutesString / 60);

    const minutes = minutesString % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
