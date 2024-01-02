import { ButtonActions, MouseButtons } from "./models/mouse.ts";
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
export function setCursor(x: number, y: number): Promise<number> {
  const args = ["setcursor", x.toString(), y.toString()];
  return nirCmd.runNirCmd(args);
}


/**
 * Mouse buttons class
 * @date 12/29/2023 - 10:42:12 AM
 *
 * @export
 * @class MouseButton
 * @typedef {MouseButton}
 */
export class MouseButton {
  constructor(private readonly button: MouseButtons) {}

  private async doAction(action: ButtonActions) {
    await button({ button: this.button, action });
  }

  async click() {
    await this.doAction("click");
  }

  async down() {
    await this.doAction("down");
  }

  async up() {
    await this.doAction("up");
  }

  async doubleClick() {
    await this.doAction("dblclick");
  }
}

/**
 * Returns the left mouse button to perform actions (click, down, up, double click)
 * @date 12/26/2023 - 5:49:04 PM
 *
 * @export
 * @returns {MouseButton}
 * @example
 * ```ts
 * import * as mouse from "https://deno.land/x/denopilot/mod_mouse.ts";
 * mouse.left().click()
 * ```
 */
export function left(): MouseButton {
  const rtnVal = new MouseButton("left")
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
 * import * as mouse from "https://deno.land/x/denopilot/mod_mouse.ts";
 * mouse.right().click()
 * ```
 */
export function right(): MouseButton {
  const rtnVal = new MouseButton("right")
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
 * import * as mouse from "https://deno.land/x/denopilot/mod_mouse.ts";
 * mouse.middle().click()
 * ```
 */
export function middle(): MouseButton {
  const rtnVal = new MouseButton("middle")
  return rtnVal
}

/**
 * Access to mouse buttons
 * @date 12/26/2023 - 4:51:37 PM
 *
 * @export
 * @async
 * @param {({ button: MouseButtons; action: ButtonActions; })} param0
 * @param {(MouseButtons)} param0.button
 * @param {(ButtonActions)} param0.action
 * @returns {Promise<number>}
 */
function button({ button, action }: { button: MouseButtons; action: ButtonActions }): Promise<number> {
  const args = ["sendmouse", button, action];
  return nirCmd.runNirCmd(args);
}
  