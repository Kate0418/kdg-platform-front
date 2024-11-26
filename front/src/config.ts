export interface SelectItem {
  value: number | null;
  label: string | null;
}

export const daysOfWeek = [
  "日曜日",
  "月曜日",
  "火曜日",
  "水曜日",
  "木曜日",
  "金曜日",
  "土曜日",
];

export type WithZoom<T> = T & { zoom: boolean };

export const userTypes = ["develop", "admin", "teacher", "student"];
