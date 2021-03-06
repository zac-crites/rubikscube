import { IReplayLog } from "../currentReplayProvider";
import { Hotkeys, MenuOption } from "../hotkeys";
import { IState, StateContext } from "./state";

export class SolvedState implements IState {
    private context: StateContext;
    private hotkeys: Hotkeys;
    private replay: IReplayLog;

    public constructor(context: StateContext, hotkeys: Hotkeys, replay: IReplayLog) {
        this.context = context;
        this.hotkeys = hotkeys;
        this.replay = replay;
    }

    public enter(): void {

        const options = [
            new MenuOption("f", "Scramble", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Replay", () => {
                this.context.setState(this.context.replayState);
            }),
        ];

        if (this.replay.getLog().length > 1) {
            options.push(new MenuOption("k", "Log", () => this.context.setState(this.context.logBrowserState)));
        }

        this.hotkeys.showMenu("Solved!", options);
    }

    public exit(): void {
        this.hotkeys.reset();
    }
}
