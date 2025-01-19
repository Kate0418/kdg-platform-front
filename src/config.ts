export interface SelectItem {
  value: number;
  label: string;
}

export type DayOfWeekKey =
  | "Sun"
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat";

export const daysOfWeeks = {
  Sun: "日曜日",
  Mon: "月曜日",
  Tue: "火曜日",
  Wed: "水曜日",
  Thu: "木曜日",
  Fri: "金曜日",
  Sat: "土曜日",
};

export type WithZoom<T> = T & { zoom: boolean };
