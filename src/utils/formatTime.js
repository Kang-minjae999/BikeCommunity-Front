import { format, getTime, formatDistanceToNow } from 'date-fns';
import {ko} from 'date-fns/esm/locale'

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}
export function fTime(date) {
  return format(new Date(date), 'MM/dd HH:mm');
}

export function fyeardateTime(date) {
  return format(new Date(date), 'yyyy/MM/dd HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ko
  });
}
