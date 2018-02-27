import { IReplayLog } from "../currentReplayProvider";
import { Hotkeys, MenuOption } from "../hotkeys";
import { IState, StateContext } from "./state";

export class ReplayStartState implements IState {

    private context: StateContext;
    private log: IReplayLog;
    private keys: Hotkeys;

    public constructor(context: StateContext, log: IReplayLog, keys: Hotkeys) {
        this.context = context;
        this.log = log;
        this.keys = keys;
    }

    public enter(): void {
        if ( this.log.currentReplay === null ) {
            this.context.setState( this.context.idleState );
            return;
        }

        const duration = this.log.currentReplay.duration;
        this.keys.showMenu("Solved in " + (duration / 1000) + " seconds.", [
            new MenuOption("f", "Replay", () => this.context.setState(this.context.replayState)),
            new MenuOption("j", "Cancel", () => this.context.setState(this.context.idleState)),
        ]);
    }
    public exit(): void {
        return;
    }
}
