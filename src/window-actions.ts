import { IWindowAction, WindowFind } from "./models/window.ts";
import { runNirCmd, validateNotBlank } from "./nirCmd.ts";
import { WindowActions } from "./models/window.ts";

/**
 * Find window by exact title to execute an action
 * @date 12/25/2023 - 8:55:13 PM
 *
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Find the window with exact title then minimize it.
 * await win.byTitleExact("myfile.txt").min();
 * ```
 * @export
 * @param {string} title
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function byTitleExact(title: string): WindowFinder {
  const wf: WindowFind = {
    title: {
      value: title,
      match: "exact"
    }
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

/**
 * Find window by title-contains to execute an action
 * @date 12/25/2023 - 8:55:13 PM
 *
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Find the window with title contains then flash it.
 * await win.byTitleContains("myfile.txt").flash();
 * ```
 * @export
 * @param {string} title
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function byTitleContains(title: string): WindowFinder {
  const wf: WindowFind = {
    title: {
      value: title,
      match: "contains"
    }
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

/**
 * Find window by title-starts-with to execute an action
 * @date 12/25/2023 - 8:55:13 PM
 *
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Find the window which the title starts with, then close it.
 * await win.byTitleStartsWith("myfile.txt").close();
 * ```
 * @export
 * @param {string} title
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function byTitleStartsWith(title: string): WindowFinder {
  const wf: WindowFind = {
    title: {
      value: title,
      match: "startsWith"
    }
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

/**
 * Find window by title-ends-with to execute an action
 * @date 12/25/2023 - 8:55:13 PM
 *
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Find the window which the title ends with, then maximize it.
 * await win.byTitleEndsWith("myfile.txt").max();
 * ```
 * @export
 * @param {string} title
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function byTitleEndsWith(title: string): WindowFinder {
  const wf: WindowFind = {
    title: {
      value: title,
      match: "endsWith"
    }
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

/**
 * Find window by process name to execute an action
 * @date 12/25/2023 - 8:55:13 PM
 *
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Find the window of the process name 'notepad.exe', then maximize it.
 * await win.byProcessName("notepad.exe").max();
 * ```
 * @export
 * @param {string} processName
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function byProcessName(processName: string): WindowFinder {
  const wf: WindowFind = {
    process: processName
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

/**
 * Find window by process id to execute an action
 * @date 12/25/2023 - 8:55:13 PM
 *
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Find the window of the process name 'notepad.exe', then maximize it.
 * await win.byProcessName("notepad.exe").max();
 * ```
 * @export
 * @param {string} processId
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function byProcessId(processId: number): WindowFinder {
  const wf: WindowFind = {
    process: processId
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

/**
 * Finds the active window to execute an action.
 * @date 12/26/2023 - 4:23:33 PM
 *
 * @export
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function activeWindow(): WindowFinder {
  const wf: WindowFind = {
    active: true
  }
  const rtnVal: WindowFinder = new WindowFinder(wf)
  return rtnVal
}

export class WindowFinder {
  private wf: WindowFind;

  public constructor(wf: WindowFind) {
    this.wf = wf;
  }

  private async doAction(
    action:
      | IWindowAction
      | WindowActions,
  ): Promise<number> {
    return await windowActions({ window: this.wf, action: action });
  }

  async flash(): Promise<number> {
    return await this.doAction("flash");
  }

  async min(): Promise<number> {
    return await this.doAction("min");
  }

  async max(): Promise<number> {
    return await this.doAction("max");
  }

  async activate(): Promise<number> {
    return await this.doAction("activate");
  }

  async center(): Promise<number> {
    return await this.doAction("center");
  }

  async close(): Promise<number> {
    return await this.doAction("close");
  }

  async focus(): Promise<number> {
    return await this.doAction("focus");
  }

  async normal(): Promise<number> {
    return await this.doAction("normal");
  }

  async toggleMax(): Promise<number> {
    return await this.doAction("togglemax");
  }

  async toggleMin(): Promise<number> {
    return await this.doAction("togglemin");
  }

  async setSize(
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<number> {
    const action: IWindowAction = {
      action: "setsize",
      size: {
        x: x,
        y: y,
        width: width,
        height: height,
      },
    };
    return await this.doAction(action);
  }

  async moveBy(
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<number> {
    const action: IWindowAction = {
      action: "move",
      size: {
        x: x,
        y: y,
        width: width,
        height: height,
      },
    };
    return await this.doAction(action);
  }
}

/**
 * Window Actions
 * @date 12/25/2023 - 6:57:44 PM
 *
 * @export
 * @async
 * 
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Activate the window with exact title "myfile.txt - Notepad"
 * win.windowActions({ window: "myfile.txt - Notepad", action: "activate" });
 * ```
 * 
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Maximize all windows with title contains "myfile"
 * win.windowActions({ window: {title: {value: "myfile", match:"contains"}}, action: "max" });
 * ```
 * 
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Minimize all windows with process name notepad.exe (notepad)
 * win.windowActions({ window: {process: "notepad.exe"}, action: "min" });
 * ```
 * 
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Close the window by process id
 * win.windowActions({ window: {process: 1234}, action: "close" });
 * ```
 * 
 * @example
 * ```ts
 * import * as win from "./src/windowActions.ts";
 * //Move the window to 1, 1 and set the size to 100, 100
 * win.windowActions({
 *    window: "myfile.txt - Notepad",
 *    action: { action: "setsize", size: { x: 1, y: 1, width: 100, height: 100 } },
 * });
 * ```
 * 
 * @param {{
*   window:
*      WindowFind | string;
*      action: IWindowAction |
*     "close" |
*     "activate" |
*     "flash" |
*     "max" |
*     "min" |
*     "normal" |
*     "togglemin" |
*     "togglemax" |
*     "center" |
*     "focus";
* }} param0
* @param {*} param0.window
* @param {*} param0.action
* @returns {Promise<number>} process exit code.
*/
async function windowActions(
 { window, action }: {
   window: WindowFind | string;
   action:
     | IWindowAction
     | WindowActions;
 },
): Promise<number> {
 const args = getNirArgs(window, action);
 args.unshift("win");
 const res = await runNirCmd(args);
 return res;
}

/**
 * Generate NirCmd arguments
 * @date 12/23/2023 - 10:37:21 PM
 *
 * @export
 * @param {(WindowFind | string)} window
 * @param {(IWindowAction | string)} action
 */
function getNirArgs(
  window: WindowFind | string,
  action:
    | IWindowAction
    | WindowActions,
): Array<string> {

  const act = typeof action === "string" ? action : action.action;


  //Assert that at least one window find option is passed
  if (
    typeof window !== "string" && window.active === undefined &&
    window.className === undefined && window.process === undefined &&
    window.title === undefined
  ) {
    throw new Error(
      "Parameter window should be valid: title, active, class or process",
    );
  }

  const args: Array<string> = [];
  args.push(act);

  const winArgs = getWindowArgs(window);
  args.push(...winArgs);

  if (typeof action !== "string") {
      args.push(action.size.x.toString());
      args.push(action.size.y.toString());
      args.push(action.size.width.toString());
      args.push(action.size.height.toString());
  }

  return args;
}

function getWindowArgs(window: WindowFind | string): Array<string> {
  const args: Array<string> = [];

  if (typeof window === "string") {
    validateNotBlank(window, "Parameter window should be valid: window");
    args.push("title", `${window}`);
    return args;
  }

  if (window.active !== undefined) {
    args.push("active");
    return args;
  }

  if (window.className !== undefined) {
    validateNotBlank(
      window.className,
      "Parameter window should be valid: className",
    );
    args.push("class", `${window.className}`);
    return args;
  }

  if (window.title !== undefined) {
    validateNotBlank(
      window.title.value,
      "Parameter window should be valid: value",
    );
    const match = matchConvert(window.title.match);
    args.push(`${match}`, `${window.title.value}`);
    return args;
  }

  if (window.process === undefined) {
    throw new Error("Parameter window should be valid: process");
  }

  if (typeof window.process === "number") {
    args.push("process", `/${window.process}`);
    return args;
  }

  validateNotBlank(window.process, "Parameter window should be valid: process");
  args.push("process", `${window.process}`);
  return args;
}

function matchConvert(match: "exact" | "startsWith" | "endsWith" | "contains") {
  switch (match) {
    case "exact":
      return "title";
    case "contains":
      return "ititle";
    case "endsWith":
      return "etitle";
    case "startsWith":
      return "stitle";
  }
}
