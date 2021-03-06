import { IReplayLog } from "../currentReplayProvider";
import { Hotkeys, MenuOption } from "../hotkeys";
import { IState, StateContext } from "./state";

export class LogBrowserState implements IState {
    private context: StateContext;
    private replay: IReplayLog;
    private hotkeys: Hotkeys;
    private lastMenu: number;

    public constructor(context: StateContext, keys: Hotkeys, replay: IReplayLog) {
        this.context = context;
        this.replay = replay;
        this.hotkeys = keys;
        this.lastMenu = 0;
    }

    public enter(): void {

        if (this.replay.getLog().length === 0) {
            this.context.setState(this.context.idleState);
            return;
        }
        this.showMenu(Math.min(this.lastMenu, this.replay.getLog().length - 1));
        return;
    }

    public exit(): void {
        this.hotkeys.reset();
    }

    private showMenu(i: number) {
        this.lastMenu = i;
        const solves = this.replay.getLog();
        const duration = solves[i].duration;

        this.hotkeys.showMenu("" + (i + 1) + "/" + solves.length + " - Solve ( " + (duration / 1000) + " )", [
            new MenuOption("d", "Back", () => this.showMenu((i - 1 + solves.length) % solves.length)),
            new MenuOption("f", "Next", () => this.showMenu((i + 1) % solves.length)),
            new MenuOption("j", "Replay", () => this.startReplay(i)),
            new MenuOption("k", "Cancel", () => this.context.setState(this.context.solvedState)),
        ]);
    }

    private startReplay(i: number) {
        this.replay.currentReplay = this.replay.getLog()[i];
        this.context.setState(this.context.replayState);
    }
}
