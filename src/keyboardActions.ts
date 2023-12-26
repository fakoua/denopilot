import { ASCII_VCODE, Key } from "./models/Keys.ts";
import * as nirCmd from "./nirCmd.ts";

export async function sendKey(
  { key, action }: { key: Key; action: "press" | "down" | "up" },
): Promise<number> {
  const args: Array<string> = ["sendkey"];
  args.push(`0x${key.toString(16)}`);
  args.push(action);
  const res = await nirCmd.runNirCmd(args);
  return res;
}

export async function type(text: string): Promise<void> {
  if (nirCmd.isBlank(text)) {
    return;
  }
  const arText = [...text];

  for (let index = 0; index < arText.length; index++) {
    const virtualKey = characterToVirtual(arText[index]);
    await typeChar(virtualKey);
  }
}

async function typeChar(chars: Array<number>): Promise<void> {
  if (chars.length !== 1 && chars.length !== 3) {
    //Char not supported
    return;
  }
  if (chars.length === 1) {
    //Not Caps
    await sendKey({ key: chars[0], action: "press" });
  } else {
    //Caps
    await sendKey({ key: chars[0], action: "down" });
    await sendKey({ key: chars[1], action: "press" });
    await sendKey({ key: chars[2], action: "up" });
  }
}

function characterToVirtual(char: string): Array<number> {
  const rtnVal: Array<number> = [];

  const ascii = char.charCodeAt(0);

  const vCode = ASCII_VCODE.find((v, _) => {
    return v.ascii === ascii;
  });

  if (vCode) {
    rtnVal.push(vCode.vCode);

    if (vCode.shift) {
      //Caps
      rtnVal.unshift(16);
      rtnVal.push(16);
    }
  } else {
    console.log(ascii);
  }

  return rtnVal;
}
