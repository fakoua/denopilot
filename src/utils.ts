import { WindowAction } from "./models/WindowActionModel.ts";
import { WindowFind } from "./models/WindowFindModel.ts";
import { validateNotBlank } from "./nirCmd.ts";

/**
 * Generate NirCmd arguments
 * @date 12/23/2023 - 10:37:21 PM
 *
 * @export
 * @param {(WindowFind | string)} window
 * @param {(WindowAction | string)} action
 */
export function getNirArgs(
    window: WindowFind | string,
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
      | "focus",
  ): Array<string> {
    //check if the arguments are consistent
    //If setSize or move are passed the size should have value
    const act = typeof action === "string" ? action : action.action;
  
    if (act === "setsize" || act === "move") {
      if (typeof action === "string" || action.size === undefined) {
        throw new Error(
          "Parameter action.size should be valid when the action is setsize or move",
        );
      }
    }
  
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
  
    if (typeof action !== "string" && action.size) {
      args.push(action.size.x.toString());
      args.push(action.size.y.toString());
      args.push(action.size.width.toString());
      args.push(action.size.height.toString());
    }
  
    return args;
  }

  export function getWindowArgs(window: WindowFind | string): Array<string> {
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
  