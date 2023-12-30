export type ScreenshotMode = "PrimaryMonitor" | "AllMonitors" | "ActiveWindow";
export interface IScreenRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Speech = {
  text: string;
  rate?: number;
  volume?: number;
};

export type Balloon = {
  title: string;
  text: string;
  icon: number;
  timeout: number;
}
