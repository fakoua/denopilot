export type WindowActions =
  | "close"
  | "activate"
  | "flash"
  | "max"
  | "min"
  | "normal"
  | "togglemin"
  | "togglemax"
  | "center"
  | "focus";

export type MatchType = "exact" | "startsWith" | "endsWith" | "contains";

export interface IWindowAction {
  action: "setsize" | "move";
  size: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface WindowFind {
  active?: boolean;
  className?: string;
  title?: {
    value: string;
    match: MatchType;
  };
  process?: number | string;
}
