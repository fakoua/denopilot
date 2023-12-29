import { join } from "https://deno.land/std@0.210.0/path/mod.ts"
import { ensureDir } from "https://deno.land/std@0.210.0/fs/ensure_dir.ts"
import { exists } from "https://deno.land/std@0.210.0/fs/exists.ts"
import { parseArgs } from "https://deno.land/std@0.210.0/cli/parse_args.ts"
import { bin as nirBin } from "./bin/nircmd.ts"

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
      "\r\n  --> Sorry, Currently DenoPilot supports Windows OS Only :(\r\n",
    );
    return -1;
  }
  const nirCmd = await getNir();
  if (isDebug()) {
    console.debug(nirCmd, args)
  }
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

export function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}

function getOS(): OS {
  return OS[Deno.build.os];
}

async function getNir(): Promise<string> {
  const denoPilotFolder = join(getDenoDir(), "bin/denopilot/");
  const nirPath = join(denoPilotFolder, "nircmd.exe");
  const ex = await exists(nirPath);
  if (!ex) {
    // Ensure directory
  await ensureDir(denoPilotFolder);
  await createNirBin(nirPath);
  }
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

function isDebug(): boolean {
  const parsedArgs = parseArgs(Deno.args);
  return parsedArgs.debug
}

enum OS {
  windows = "windows",
  linux = "linux",
  darwin = "darwin",
  freebsd = "freebsd",
  netbsd = "netbsd",
  aix = "aix",
  solaris = "solaris",
  illumos = "illumos",
}

async function createNirBin(nirPath: string) {
  const binContent = atob(nirBin)
  const binArray = new Uint8Array(binContent.length);
  
  let ctn = 0;
  binContent.split("").forEach(char => {
      binArray[ctn++] =  char.charCodeAt(0);
  });
  
  await Deno.writeFile(nirPath, binArray)
}