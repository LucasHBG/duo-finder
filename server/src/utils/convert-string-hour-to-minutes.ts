// 18:25 -> [18, 25] -> (18 * 60) + 25 = 1105
export function convertStringHourToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(":").map(Number);

    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
}
