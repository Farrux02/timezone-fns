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
  const currentTime = DateTime.fromISO(dateTime, { zone });

  const isInDst = currentTime.isInDst;

  const currentMonth = currentTime.month

  if (isInDst && (currentMonth >= 3 || currentMonth <=5)) {
    return 23
  } else if (isInDst && (currentMonth >= 9 || currentMonth <=11)) {
    return 25
  } else {
    return 24
  }
};
