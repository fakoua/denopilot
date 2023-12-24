export interface WindowAction {
  action:
    | "close"
    | "activate"
    | "flash"
    | "max"
    | "min"
    | "normal"
    | "togglemin"
    | "togglemax"
    | "setsize"
    | "move"
    | "center"
    | "focus";
  size?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
