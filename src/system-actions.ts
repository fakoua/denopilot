import { IScreenRegion, ScreenshotMode } from "./models/system.ts";
import * as nirCmd from "./nirCmd.ts";

export async function screenshot(
    mode: ScreenshotMode | IScreenRegion,
    imagePath: string,
  ): Promise<number> {
    const args: string[] = [];
  
    if (typeof mode === "string") {
      const modeMap: Record<string, string> = {
        ActiveWindow: "savescreenshotwin",
        AllMonitors: "savescreenshotfull",
        PrimaryMonitor: "savescreenshot",
      };
      args.push(modeMap[mode], imagePath);
    } else {
      args.push("savescreenshot", imagePath, ...Object.values(mode).map(String));
    }
  
    return await nirCmd.runNirCmd(args);
  }
