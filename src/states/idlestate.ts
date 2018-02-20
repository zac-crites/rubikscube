import { State, StateContext } from "./state";
import { Hotkeys, MenuOption } from "../hotkeys";
import { Recorder } from "../turnRecorder";

export class IdleState implements State {
    private context: StateContext;
    private hotkeys: Hotkeys;
    private recorder: Recorder;

    public constructor(context: StateContext, keys: Hotkeys, recorder: Recorder) {
        this.context = context;
        this.hotkeys = keys;
        this.recorder = recorder;
    }

    public enter(): void {
        let context = this.context;
        this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
            new MenuOption("f", "Timed solve", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Practice", () => this.context.setState(this.context.practiceState)),
        ]);
    }

    public exit(): void {
    }
}