# denopilot
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fakoua_denopilot&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fakoua_denopilot)
## Description
DenoPilot is a Windows Desktop automation module for Deno, written in TypeScript. It empowers users to automate various tasks on their Windows systems, enhancing productivity and enabling software testing scenarios.

## Table of contents
* [Key Features](#key-features)
* [Getting Started](#getting-started)
    * [Window Actions](#window-actions)
    * [Keyboard Actions](#keyboard-actions)
    * [Mouse Actions](#mouse-actions)
    * [Clipboard Actions](#clipboard-actions)
* [License](#license)

## Key Features:

### Window Control:

Minimize, maximize, flash, close, move, resize, and restore windows.

### Keyboard Simulation:

Simulate keyboard strokes, enabling automated data input or interaction with applications.

### Mouse Control:

Control the mouse, including movement, left and right clicks, and scrolling.

### Clipboard Management:

Manipulate the clipboard content, facilitating seamless data transfer between applications.

### Use Cases:

1- Automation: DenoPilot allows users to script and automate repetitive tasks, saving time and reducing manual effort.

2- Testing: Ideal for testing software applications by simulating user interactions and validating expected behaviors.

## Getting Started:

```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
import * as mouse from "https://deno.land/x/denopilot/mod_mouse.ts";
```

## Window Actions

### Overview

The Window Actions Library provides a set of utilities for managing windows on a desktop environment. It includes functions for finding windows based on various criteria and performing actions such as activation, minimization, maximization, and more.

### Usage

#### byTitleExact: Finds a window with an exact title to execute actions.
#### Signature:
```ts
byTitleExact(title: string): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Find the window with exact title then minimize it.
await win.byTitleExact("myfile.txt").min();
```

-------------

#### byTitleContains: Finds a window with an exact title to execute actions.
#### Signature:
```ts
byTitleContains(title: string): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Find the window with title contains then flash it.
await win.byTitleContains("myfile.txt").flash();
```

-------------

#### byTitleStartsWith: Finds a window with a title starting with specified text to execute actions.
#### Signature:
```ts
byTitleStartsWith(title: string): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Find the window which the title starts with, then close it.
await win.byTitleStartsWith("myfile.txt").close();
```

-------------

#### byTitleEndsWith: Finds a window with a title ending with specified text to execute actions.
#### Signature:
```ts
byTitleEndsWith(title: string): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Find the window which the title ends with, then maximize it.
await win.byTitleEndsWith("myfile.txt").max();
```

-------------

#### byProcessName: Finds a window associated with a specified process name to execute actions.
#### Signature:
```ts
byProcessName(processName: string): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Find the window of the process name 'notepad.exe', then maximize it.
await win.byProcessName("notepad.exe").max();
```

-------------

#### byProcessId: Finds a window associated with a specified process ID to execute actions.
#### Signature:
```ts
byProcessId(processId: number): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Find the window of the process ID 1234, then maximize it.
await win.byProcessId(1234).max();
```

-------------

#### activeWindow: Finds the active window to execute an action.
#### Signature:
```ts
activeWindow(): WindowFinder
```
#### Examples:
```ts
import * as win from "https://deno.land/x/denopilot/mod_window.ts";
// Maximize the active window
await win.activeWindow().max();
```

## Keyboard Actions

### Overview

This `mod` provides utility functions for sending keyboard input.

### Usage

#### typing: Types an input string using `sendKeys`.
#### Signature:
```ts
typing(text: string): Promise<void>
```
#### Examples:
```ts
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
// Type the string "Hello"
await keyboard.typing("Hello");
```

-------------

#### sendKey: Sends keyboard input using `nirCmd`.
#### Signature:
```ts
sendKey({ key, action }: { key: Key; action: "press" | "down" | "up" }): Promise<number>
```
#### Examples:
```ts
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
// Press the 'A' key
await keyboard.sendKey({ key: keyboard.Key.A, action: "press" });
```

-------------

#### copy: Simulate Ctrl + C to copy the selected content.
#### Signature:
```ts
copy(): Promise<void>
```
#### Examples:
```ts
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
await keyboard.copy()
```

-------------

#### paste: Simulate Ctrl + V to paste the clipboard content.
#### Signature:
```ts
paste(): Promise<void>
```
#### Examples:
```ts
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
await keyboard.paste()
```

-------------

#### cut: Simulate Ctrl + X to cut the selected content.
#### Signature:
```ts
cut(): Promise<void>
```
#### Examples:
```ts
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
await keyboard.cut()
```

-------------

#### selectAll: Simulate Ctrl + A to select all.
#### Signature:
```ts
selectAll(): Promise<void>
```
#### Examples:
```ts
import * as keyboard from "https://deno.land/x/denopilot/mod_keyboard.ts";
await keyboard.selectAll()
```

## Mouse Actions

### Overview

This `mod` provides TypeScript functions for interacting with the mouse and cursor position. Leveraging the nirCmd tool, these utilities empower users to manipulate the cursor and simulate mouse button actions programmatically.

### Usage

#### setCursor: Sets the mouse cursor position.
#### Signature:
```ts
setCursor(x: number, y: number): Promise<number>
```
#### Examples:
```ts
import * as mouse from "https://deno.land/x/denopilot/mod_mouse.ts";
await mouse.setCursor(0, 0)
```
-------------

#### left: Returns the left mouse button to perform actions.
#### Signature:
```ts
left(): MouseButton
```
#### Examples:
```ts
import * as mouse from "https://deno.land/x/denopilot/mod_mouse.ts";
await await mouse.left().click()
//Also you can use left, right and middle buttons
```
`MouseButton` class contains the following actions:
* **click**: mouse click
* **down**: mouse button down
* **up**: mouse button up (release the button)
* **doubleClick**: mouse button double click

-------------

## Clipboard Actions

### Overview

This `mod` Allows you to set a value into the clipboard and clear the clipboard.

## License:
This project is licensed under the MIT License

