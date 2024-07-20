export const convertTo24HourFormat = (hour, period) => {
    hour = parseInt(hour, 10);
    if (period.toLowerCase() === 'pm' && hour !== 12) {
      return hour + 12;
    } else if (period.toLowerCase() === 'am' && hour === 12) {
      return 0;
    }
    return hour;
  };