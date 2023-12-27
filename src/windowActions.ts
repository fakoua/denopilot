import { WindowFind } from "./models/WindowFindModel.ts";
import { WindowAction } from "./models/WindowActionModel.ts";
import { getNirArgs } from "./utils.ts";
import { runNirCmd } from "./nirCmd.ts";
import { WindowFinder } from "./models/WindowFinder.ts";


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
 *      action: WindowAction |
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
export async function windowActions(
  { window, action }: {
    window: WindowFind | string;
    action:
      | WindowAction
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
  },
): Promise<number> {
  const args = getNirArgs(window, action);
  args.unshift("win");
  const res = await runNirCmd(args);
  return res;
}


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

