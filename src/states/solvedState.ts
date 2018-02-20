import { State, StateContext } from "./state";
import { Recorder } from "../turnRecorder";
import { Hotkeys, MenuOption } from "../hotkeys";

export class SolvedState implements State {
    private context: StateContext;
    private hotkeys: Hotkeys;
    private recorder: Recorder;

    public constructor(context: StateContext, hotkeys: Hotkeys, recorder: Recorder) {
        this.context = context;
        this.hotkeys = hotkeys;
        this.recorder = recorder;
    }

    public enter(): void {
        this.recorder.stop();

        let replay = this.recorder.getReplay();

        this.hotkeys.showMenu("Solved in " + (replay.time / 1000),[
            new MenuOption("f","Reset", () => this.context.setState( this.context.scramblerState ) ),
            new MenuOption("j","Show replay", () =>{
                console.log( replay );
                this.context.setState( this.context.idleState );
            }  )
        ]);
    }

    public exit(): void {
        this.hotkeys.reset();
    }
}