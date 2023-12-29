import * as nirCmd from "./nirCmd.ts";

/**
 * Set the specified text into the clipboard.
 * @date 12/27/2023 - 9:40:51 PM
 *
 * @export
 * @async
 * @param {string} text cliboard text
 * @example
 * ```ts
 * await clipboard.setText("Hello Deno.")
 * ```
 * @returns {Promise<number>} process exit code.
 */
export async function setText(text: string): Promise<number> {
  return await nirCmd.runNirCmd(["clipboard", "set", text]);
}

/**
 * Clear the clipboard.
 * @date 12/27/2023 - 9:43:06 PM
 *
 * @export
 * @async
 * @example
 * ```ts
 * await clipboard.clear()
 * ```
 * @returns {Promise<number>}
 */
export async function clear(): Promise<number> {
  return await nirCmd.runNirCmd(["clipboard", "clear"]);
}
