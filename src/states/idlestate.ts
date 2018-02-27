import { IReplayLog } from "../currentReplayProvider";
import { Hotkeys, MenuOption } from "../hotkeys";
import { IState, StateContext } from "./state";

export class IdleState implements IState {
    private context: StateContext;
    private hotkeys: Hotkeys;
    private replays: IReplayLog;

    public constructor(context: StateContext, keys: Hotkeys, replays: IReplayLog) {
        this.context = context;
        this.hotkeys = keys;
        this.replays = replays;
    }

    public enter(): void {
        const menu = [
            new MenuOption("f", "Timed solve", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Practice", () => this.context.setState(this.context.practiceState)),
        ];

        if (this.replays.getLog().length > 0) {
            menu.push(new MenuOption("k", "Log", () => this.context.setState(this.context.logBrowserState)));
        }

        this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", menu);
    }

    public exit(): void {
        return;
    }
}
