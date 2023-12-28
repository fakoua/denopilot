export interface IWindowAction {
  action: "setsize" | "move"
  size: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
