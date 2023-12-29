import { ASCII_VCODE, Key } from "./models/keyboard.ts";
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

/**
 * Simulate Ctrl + X: Cut
 * @date 12/27/2023 - 9:38:36 PM
 *
 * @export
 * @async
 * @example
 * ```ts
 * await keyboard.cut()
 * ```
 * @returns {Promise<void>}
 */
export async function cut(): Promise<void> {
  await sendKey({key: Key.Ctrl, action: "down"})
  await sendKey({key: Key.X, action: "press"})
  await sendKey({key: Key.Ctrl, action: "up"})
}

/**
 * Simulate Ctrl + C: Copy
 * @date 12/27/2023 - 9:38:36 PM
 *
 * @export
 * @async
 * @example
 * ```ts
 * await keyboard.copy()
 * ```
 * @returns {Promise<void>}
 */
export async function copy(): Promise<void> {
  await sendKey({key: Key.Ctrl, action: "down"})
  await sendKey({key: Key.C, action: "press"})
  await sendKey({key: Key.Ctrl, action: "up"})
}

/**
 * Simulate Ctrl + V: Paste
 * @date 12/27/2023 - 9:38:36 PM
 *
 * @export
 * @async
 * @example
 * ```ts
 * await keyboard.paste()
 * ```
 * @returns {Promise<void>}
 */
export async function paste(): Promise<void> {
  await sendKey({key: Key.Ctrl, action: "down"})
  await sendKey({key: Key.V, action: "press"})
  await sendKey({key: Key.Ctrl, action: "up"})
}

/**
 * Simulate Ctrl + A: Select All
 * @date 12/27/2023 - 9:38:36 PM
 *
 * @export
 * @async
 * @example
 * ```ts
 * await keyboard.selectAll()
 * ```
 * @returns {Promise<void>}
 */
export async function selectAll(): Promise<void> {
  await sendKey({key: Key.Ctrl, action: "down"})
  await sendKey({key: Key.A, action: "press"})
  await sendKey({key: Key.Ctrl, action: "up"})
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
