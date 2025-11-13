import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export function withinOperationHours(startA : string , endA : string , open : string ,close : string) {
  const startTime = dayjs(`2001-01-01T${startA}`)
  const endTime = dayjs(`2001-01-01T${endA}`)
  const opStart = dayjs(`2001-01-01T${open}`)
  const opEnd = dayjs(`2001-01-01T${close}`)


}


export function getHoursDiff(startTime: string, endTime: string): number {
  const startDate = dayjs(`2000-01-01T${startTime}`);
  const endDate = dayjs(`2000-01-01T${endTime}`);
  return endDate.diff(startDate, 'hour', true); // true = decimal hours
}