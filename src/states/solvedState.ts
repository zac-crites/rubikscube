import { State, StateContext } from "./state";
import { Recorder, CurrentReplayProvider } from "../turnRecorder";
import { Hotkeys, MenuOption } from "../hotkeys";
import { ReplayConverter } from "../replayConverter";

export class SolvedState implements State {
    private context: StateContext;
    private hotkeys: Hotkeys;

    public constructor(context: StateContext, hotkeys: Hotkeys) {
        this.context = context;
        this.hotkeys = hotkeys;
    }

    public enter(): void {
        this.hotkeys.showMenu("Solved!", [
            new MenuOption("f", "Scramble", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Replay", () => {
                this.context.setState(this.context.replayState);
            })
        ]);
    }

    public exit(): void {
        this.hotkeys.reset();
    }
}