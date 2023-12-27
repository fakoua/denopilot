import { ASCII_VCODE, Key } from "./models/Keys.ts";
import * as nirCmd from "./nirCmd.ts";


/**
 * Sends keyboard input.
 * @date 12/26/2023 - 4:30:08 PM
 *
 * @export
 * @async
 * @param {({ key: Key; action: "press" | "down" | "up" })}
 * @returns {Promise<number>} A Promise that resolves to the exit code of the `nirCmd` process.
 * * @example
 * ```ts
 * // Press the 'A' key
 * await keyboard.sendKey({key: Key.A, action:"press"})
 * ```
 *
 * @example
 * ```ts
 * // Simulate key down for the 'B' key
 * await keyboard.sendKey({ key: Key.B, action: "down" });
 * ```
 *
 * @example
 * ```ts
 * // Release the 'C' key
 * await keyboard.sendKey({ key: Key.C, action: "up" });
 * ```
 */
export async function sendKey(
  { key, action }: { key: Key; action: "press" | "down" | "up" },
): Promise<number> {
  const args: Array<string> = ["sendkey"];
  let k = key;
  if (k > 1000) {
    k -= k > 2000 ? 2000 : 1000;
  }
  args.push(`0x${k.toString(16)}`);
  args.push(action);
  const res = await nirCmd.runNirCmd(args);
  return res;
}


/**
 * Type an input string using sendKeys
 * @date 12/26/2023 - 4:35:03 PM
 *
 * @export
 * @async
 * @param {string} text
 * @returns {Promise<void>}
 * @example
 * ```ts
 * // Type the string "Hello"
 * await keyboard.typing("Hello");
 * ```
 */
export async function typing(text: string): Promise<void> {
  if (nirCmd.isBlank(text)) {
    return;
  }
  const arText = [...text];
  for(const char of arText ) {
    const virtualKey = characterToVirtual(char);
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
