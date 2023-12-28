import { windowActions } from "../windowActions.ts";
import { WindowActions } from "./Types.ts";
import { IWindowAction } from "./WindowActionModel.ts";
import { WindowFind } from "./WindowFindModel.ts";

export class WindowFinder {
  private wf: WindowFind;

  public constructor(wf: WindowFind) {
    this.wf = wf;
  }

  private async doAction(
    action:
      | IWindowAction
      | WindowActions,
  ): Promise<number> {
    return await windowActions({ window: this.wf, action: action });
  }

  async flash(): Promise<number> {
    return await this.doAction("flash");
  }

  async min(): Promise<number> {
    return await this.doAction("min");
  }

  async max(): Promise<number> {
    return await this.doAction("max");
  }

  async activate(): Promise<number> {
    return await this.doAction("activate");
  }

  async center(): Promise<number> {
    return await this.doAction("center");
  }

  async close(): Promise<number> {
    return await this.doAction("close");
  }

  async focus(): Promise<number> {
    return await this.doAction("focus");
  }

  async normal(): Promise<number> {
    return await this.doAction("normal");
  }

  async toggleMax(): Promise<number> {
    return await this.doAction("togglemax");
  }

  async toggleMin(): Promise<number> {
    return await this.doAction("togglemin");
  }

  async setSize(
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<number> {
    const action: IWindowAction = {
      action: "setsize",
      size: {
        x: x,
        y: y,
        width: width,
        height: height,
      },
    };
    return await this.doAction(action);
  }

  async moveBy(
    x: number,
    y: number,
    width: number,
    height: number,
  ): Promise<number> {
    const action: IWindowAction = {
      action: "move",
      size: {
        x: x,
        y: y,
        width: width,
        height: height,
      },
    };
    return await this.doAction(action);
  }
}
