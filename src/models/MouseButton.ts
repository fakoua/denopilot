import * as mouse from "../mouseActions.ts"

export * as mouse from "../mouseActions.ts"
export class MouseButton {
    private button: "right" | "left" | "middle"

    constructor(button: "right" | "left" | "middle") {
        this.button = button;
    }

    private async doAction(action: "down" | "up" | "click" | "dblclick") {
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