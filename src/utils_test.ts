import {
  assertThrows,
  assertEquals,
} from "https://deno.land/std@0.182.0/testing/asserts.ts";
import * as utils from "./utils.ts";

Deno.test({
  name: "Test-getNirArgs-string",
  fn(): void {
    const res = utils.getNirArgs("notepad", "min");
    const expectedRes: Array<string | number> = ["min", "title", '"notepad"'];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-active",
  fn(): void {
    const res = utils.getNirArgs({ active: true }, "min");
    const expectedRes: Array<string | number> = ["min", "active"];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-className",
  fn(): void {
    const res = utils.getNirArgs({ className: "HD" }, "min");
    const expectedRes: Array<string | number> = ["min", "class", '"HD"'];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-process-number",
  fn(): void {
    const res = utils.getNirArgs({ process: 12 }, "min");
    const expectedRes: Array<string | number> = ["min", "process", "/12"];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-process-string",
  fn(): void {
    const res = utils.getNirArgs({ process: "p.exe" }, "min");
    const expectedRes: Array<string | number> = ["min", "process", "p.exe"];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-title-contains",
  fn(): void {
    const res = utils.getNirArgs({
      title: { value: "notepad", match: "contains" },
    }, "min");
    const expectedRes: Array<string | number> = ["min", "ititle", '"notepad"'];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-title-endswith",
  fn(): void {
    const res = utils.getNirArgs({
      title: { value: "notepad", match: "endsWith" },
    }, "min");
    const expectedRes: Array<string | number> = ["min", "etitle", '"notepad"'];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-title-startswith",
  fn(): void {
    const res = utils.getNirArgs({
      title: { value: "notepad", match: "startsWith" },
    }, "min");
    const expectedRes: Array<string | number> = ["min", "stitle", '"notepad"'];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
  name: "Test-getNirArgs-title-exact",
  fn(): void {
    const res = utils.getNirArgs({
      title: { value: "notepad", match: "exact" },
    }, "min");
    const expectedRes: Array<string | number> = ["min", "title", '"notepad"'];
    assertEquals(res, expectedRes);
  },
});
//
Deno.test({
  name: "Test-getNirArgs-setsize",
  fn(): void {
    const res = utils.getNirArgs("notepad", {
      action: "setsize",
      size: {
        x: 1,
        y: 2,
        width: 3,
        height: 4,
      },
    });
    const expectedRes: Array<string | number> = ["setsize", "title", '"notepad"', 1, 2, 3, 4];
    assertEquals(res, expectedRes);
  },
});

Deno.test({
    name: "Test-getNirArgs-all",
    fn(): void {
      const res = utils.getNirArgs({
        title: {
            match:"contains",
            value:"notepad"
        }
      }, {
        action: "setsize",
        size: {
          x: 1,
          y: 2,
          width: 3,
          height: 4,
        },
      });
      const expectedRes: Array<string | number> = ["setsize", "ititle", '"notepad"', 1, 2, 3, 4];
      assertEquals(res, expectedRes);
    },
  });

  Deno.test({
    name: "Test-getNirArgs-exception-action",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs({
                title: {
                    match:"contains",
                    value:"notepad"
                }
              }, {action:"setsize"});
        }, Error, "Parameter action.size should be valid when the action is setsize or move")
    },
  });

  Deno.test({
    name: "Test-getNirArgs-exception-window-1",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs({}, "min");
        }, Error, "Parameter window should be valid")
    },
  });
  Deno.test({
    name: "Test-getNirArgs-exception-window-2",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs("", "min");
        }, Error, "Parameter window should be valid: window")
    },
  });

  Deno.test({
    name: "Test-getNirArgs-exception-window-3",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs("  ", "min");
        }, Error, "Parameter window should be valid: window")
    },
  });

  Deno.test({
    name: "Test-getNirArgs-exception-window-3",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs({className:""}, "min");
        }, Error, "Parameter window should be valid: className")
    },
  });

  Deno.test({
    name: "Test-getNirArgs-exception-window-4",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs({process: ""}, "min");
        }, Error, "Parameter window should be valid: process")
    },
  });

  Deno.test({
    name: "Test-getNirArgs-exception-window-5",
    fn(): void {
        assertThrows(() => {
            utils.getNirArgs({title: {value:"  ", match:"contains"}}, "min");
        }, Error, "Parameter window should be valid: value")
    },
  });
