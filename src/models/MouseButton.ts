import * as mouse from "../mouseActions.ts"
import { ButtonActions, MouseButtons } from "./Types.ts";

export * as mouse from "../mouseActions.ts"
export class MouseButton {
    private button: MouseButtons

    constructor(button: MouseButtons) {
        this.button = button;
    }

    private async doAction(action: ButtonActions) {
       await mouse.button({button: this.button, action: action})
    }

    public async click() {
        await this.doAction("click")
    }

    public async down() {
        await this.doAction("down")
    }

    public async up() {
        await this.doAction("up")
    }

    public async doubleClick() {
        await this.doAction("dblclick")
    }
}