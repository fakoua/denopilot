/*
This file is used to fix the coverage path for github actions.
No need to call this file.
*/

let cov = await Deno.readTextFile("./lcov.info");
cov = cov.replaceAll("C:\\git\\deno\\denopilot\\src\\", "/github/workspace/src/")
cov = cov.replaceAll("\\", "/")
await Deno.writeTextFile("./lcov.info", cov)
console.info("Cov path fixed.")