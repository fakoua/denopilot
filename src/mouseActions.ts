import * as nirCmd from "./nirCmd.ts";

export async function setCursor({ x, y }: { x: number; y: number; }): Promise<number> {
  const args: Array<string> = ["setcursor"];
  args.push(x.toString());
  args.push(y.toString());
  const res = await nirCmd.runNirCmd(args);
  return res;
}

export async function button(
{ button, action }: { button: "right" | "left" | "middle"; action: "down" | "up" | "click" | "dblclick"; },
): Promise<number> {
  const args: Array<string> = ["sendmouse"];
  args.push(button);
  args.push(action);
  const res = await nirCmd.runNirCmd(args);
  return res;
}
