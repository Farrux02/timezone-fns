import { DateTime } from "luxon";

export const toUtc = (dateTime: Date | string): string => {
  // return DateTime.fromJSDate(new Date(datetime)).toUTC().toFormat('yyyy-MM-dd, hh:mm')
  return DateTime.fromJSDate(new Date(dateTime)).toUTC().toISO();
};

export const utcToZone = (utcDate: string, zone: string) => {
  return DateTime.fromISO(utcDate, { zone: "utc" }).setZone(zone).toISO();
};

export const dstOffset = (
  dateTime: string,
  zone: string = "America/New_York"
) => {
  // const start = DateTime.fromObject({year: 2024, month:11, day: 3}, {zone})
    const start = DateTime.fromISO(dateTime, { zone });
    const end = start.plus({ days: 1 });
    const diff = end.diff(start, 'hours');
    return diff.as('hours');
};
