import { getNirArgs } from "./src/utils.ts";

const res = getNirArgs({ title: { value: "a", match: "contains" } }, {
  action: "setsize",
  size: { x: 1, y: 2, width: 3, height: 4 },
});
console.log(res);
