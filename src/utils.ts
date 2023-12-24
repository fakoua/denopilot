import { join } from "https://deno.land/std@0.210.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.210.0/fs/ensure_dir.ts";
import { exists } from "https://deno.land/std@0.210.0/fs/exists.ts";
import * as create from "./tsToCmd.ts";
import { OS } from "./models/OSModel.ts";
import { WindowFind } from "./models/WindowFindModel.ts";
import { WindowAction } from "./models/WindowActionModel.ts";

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
): Array<string | number> {
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

  const args: Array<string | number> = [];
  args.push(act);

  const winArgs = getWindowArgs(window);
  args.push(...winArgs)

  if (typeof action !== "string" && action.size) {
    args.push(action.size.x);
    args.push(action.size.y);
    args.push(action.size.width);
    args.push(action.size.height);
  }

  return args;
}
/**
 * Run nircmd
 * @date 12/23/2023 - 7:44:53 PM
 *
 * @export
 * @async
 * @param {Array<string>} args array of arguments ['win', 'flash']
 * @returns {Promise<number>} process exit code
 */
export async function runNirCmd(args: Array<string>): Promise<number> {
  const currentOs = getOS();

  if (currentOs !== OS.windows) {
    console.error(
      "\r\n  --> Sorry, Currently SwissKnife supports Windows OS Only :(\r\n",
    );
    return -1;
  }
  const nirCmd = await getNir();
  const p = new Deno.Command(nirCmd, {
    args: args,
    stderr: "piped",
    stdout: "piped",
  });
  const child = p.spawn();
  const { code } = await child.status;
  return code;
}

function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
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

function getWindowArgs(window: WindowFind | string): Array<string> {
  const args: Array<string> = [];

  if (typeof window === "string") {
    validateNotBlank(window, "Parameter window should be valid: window");
    args.push("title", `"${window}"`);
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
    args.push("class", `"${window.className}"`);
    return args;
  }

  if (window.title !== undefined) {
    validateNotBlank(
      window.title.value,
      "Parameter window should be valid: value",
    );
    const match = matchConvert(window.title.match);
    args.push(`${match}`, `"${window.title.value}"`);
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

function validateNotBlank(value: string, errorMessage: string): void {
  if (isBlank(value)) {
    throw new Error(errorMessage);
  }
}

function getOS(): OS {
  return OS[Deno.build.os];
}

async function getNir(): Promise<string> {
  const swissKnifeFolder = join(getDenoDir(), "bin/swissknife/");
  const nirPath = join(swissKnifeFolder, "nircmd.exe");
  const ex = await exists(nirPath);
  if (ex) {
    return nirPath;
  }
  // Ensure directory
  await ensureDir(swissKnifeFolder);
  await create.createNirBin(nirPath);
  return nirPath;
}

function getDenoDir(): string {
  const os = getOS();
  const homeKey: string = os === OS.windows ? "USERPROFILE" : "HOME";
  const homeDir = Deno.env.get(homeKey);
  let relativeDir = "";

  switch (os) {
    case OS.windows:
      relativeDir = "AppData/Local/deno";
      break;
    case OS.linux:
      relativeDir = ".cache/deno";
      break;
    case OS.darwin:
      relativeDir = "Library/Caches/deno";
      break;
  }

  if (homeDir === undefined) {
    return "";
  } else {
    return join(homeDir, relativeDir);
  }
}
