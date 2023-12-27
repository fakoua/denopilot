import { join } from "https://deno.land/std@0.210.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.210.0/fs/ensure_dir.ts";
import { exists } from "https://deno.land/std@0.210.0/fs/exists.ts";
import * as create from "./tsToCmd.ts";
import { OS } from "./models/OSModel.ts";

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

export function validateNotBlank(value: string, errorMessage: string): void {
  if (isBlank(value)) {
    throw new Error(errorMessage);
  }
}

export function getOS(): OS {
  return OS[Deno.build.os];
}

export async function getNir(): Promise<string> {
  const swissKnifeFolder = join(getDenoDir(), "bin/swissknife/");
  const nirPath = join(swissKnifeFolder, "nircmd.exe");
  const ex = await exists(nirPath);
  if (!ex) {
    // Ensure directory
  await ensureDir(swissKnifeFolder);
  await create.createNirBin(nirPath);
  }
  return nirPath;
}

export function getDenoDir(): string {
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

export function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}
