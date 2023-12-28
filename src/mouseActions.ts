import { MouseButton } from "./models/MouseButton.ts";
import { ButtonActions, MouseButtons } from "./models/Types.ts";
import * as nirCmd from "./nirCmd.ts";


/**
 * Set cursor position
 * @date 12/26/2023 - 4:51:31 PM
 *
 * @export
 * @async
 * @param {number} x
 * @param {number} y
 * @returns {Promise<number>}
 */
export async function setCursor(x: number, y: number): Promise<number> {
  const args: Array<string> = ["setcursor"];
  args.push(x.toString());
  args.push(y.toString());
  const res = await nirCmd.runNirCmd(args);
  return res;
}

/**
 * Description placeholder
 * @date 12/26/2023 - 4:51:37 PM
 *
 * @export
 * @async
 * @param {({ button: MouseButtons; action: ButtonActions; })} param0
 * @param {(MouseButtons)} param0.button
 * @param {(ButtonActions)} param0.action
 * @returns {Promise<number>}
 */
export async function button(
{ button, action }: { button: MouseButtons; action: ButtonActions; },
): Promise<number> {
  const args: Array<string> = ["sendmouse"];
  args.push(button);
  args.push(action);
  const res = await nirCmd.runNirCmd(args);
  return res;
}


/**
 * Returns the left mouse button to perform actions (click, down, up, double click)
 * @date 12/26/2023 - 5:49:04 PM
 *
 * @export
 * @returns {MouseButton}
 * @example
 * ```ts
 * import * as mouse from "./mod_mouse.ts"
 * mouse.left().click()
 * ```
 */
export function left(): MouseButton {
  const rtnVal: MouseButton = new MouseButton("left")
  return rtnVal
}

/**
 * Returns the right mouse button to perform actions (click, down, up, double click)
 * @date 12/26/2023 - 5:49:04 PM
 *
 * @export
 * @returns {MouseButton}
 * @example
 * ```ts
 * import * as mouse from "./mod_mouse.ts"
 * mouse.right().click()
 * ```
 */
export function right(): MouseButton {
  const rtnVal: MouseButton = new MouseButton("right")
  return rtnVal
}

/**
 * Returns the middle mouse button to perform actions (click, down, up, double click)
 * @date 12/26/2023 - 5:49:04 PM
 *
 * @export
 * @returns {MouseButton}
 * @example
 * ```ts
 * import * as mouse from "./mod_mouse.ts"
 * mouse.middle().click()
 * ```
 */
export function middle(): MouseButton {
  const rtnVal: MouseButton = new MouseButton("middle")
  return rtnVal
}

