import { IWindowAction, WindowFind, WindowActions } from "./models/window.ts";
import { runNirCmd, validateNotBlank } from "./nirCmd.ts";

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
  return new WindowFinder(wf)
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
  return new WindowFinder(wf)
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
  return new WindowFinder(wf)
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
  return new WindowFinder(wf)
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
  return new WindowFinder(wf)
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
  return new WindowFinder(wf)
}

/**
 * Finds the active window to execute an action.
 * @date 12/26/2023 - 4:23:33 PM
 *
 * @export
 * @returns {WindowFinder} WindowFinder which contains all the actions
 */
export function btActiveWindow(): WindowFinder {
  const wf: WindowFind = {
    active: true
  }
  return new WindowFinder(wf)
}


/**
 * Window Finder class
 * This class is the main window finder which contains all the actions.
 * @date 12/29/2023 - 10:42:52 AM
 *
 * @export
 * @class WindowFinder
 * @typedef {WindowFinder}
 */
export class WindowFinder {
  constructor(private readonly wf: WindowFind) {}

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
function getNirArgs(window: WindowFind | string, action: IWindowAction | WindowActions): string[] {
  const act = typeof action === "string" ? action : action.action;

  if (
    typeof window !== "string" &&
    ["active", "className", "process", "title"].every((prop) => window[prop as keyof WindowFind] === undefined)
  ) {
    throw new Error("Parameter window should be valid: title, active, class, or process");
  }

  const args: string[] = [act, ...getWindowArgs(window)];

  if (typeof action !== "string") {
    const { x, y, width, height } = action.size;
    args.push(x.toString(), y.toString(), width.toString(), height.toString());
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

function matchConvert(match: "exact" | "startsWith" | "endsWith" | "contains"): string {
  const matchMap: Record<string, string> = {
    exact: "title",
    contains: "ititle",
    endsWith: "etitle",
    startsWith: "stitle",
  };
  return matchMap[match];
}