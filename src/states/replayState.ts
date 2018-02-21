import { State, StateContext } from "./state";
import { Turnable, Turn } from "../turnable";
import { Replay, Recorder, CurrentReplayProvider } from "../turnRecorder";
import { Timer } from "../timer";

export class ReplayState implements State {
    private context: StateContext;
    private target: Turnable;
    private replay: CurrentReplayProvider;
    private displayTimer: Timer;

    public constructor(context: StateContext, target: Turnable, replay: CurrentReplayProvider, timer: Timer) {
        this.context = context;
        this.target = target;
        this.replay = replay;
        this.displayTimer = timer;
    }

    public enter(): void {
        this.displayTimer.reset();
        this.start();
    }

    public exit(): void {
    }

    public start(): void {
        if (this.replay.currentReplay === null) {
            console.error("Cannot replay null");
            this.context.setState(this.context.idleState);
            return;
        }

        let replay = this.replay.currentReplay;
        let replayTimer = new Timer();
        let started = false;

        let i = 0;
        let update: () => void;

        while (i < replay.moves.length && replay.moves[i].timestamp === 0) {
            this.target.apply(replay.moves[i].turn);
            i++;
        }

        update = () => {
            while (i < replay.moves.length && replay.moves[i].timestamp < replayTimer.getTime()) {
                let move = replay.moves[i];
                if (move.turn > Turn.Z2 && !started) {
                    started = true;
                    this.displayTimer.reset();
                    this.displayTimer.start();
                }
                this.target.apply(move.turn);
                i++;
            }
            if (i >= replay.moves.length) {
                this.displayTimer.stop();
                this.context.setState(this.context.solvedState);
            }
            else {
                setTimeout(update, 100);
            }
        }

        this.target.waitForMoves().then(() => {
            this.displayTimer.countdown(15000);
            replayTimer.start();
            update();
        });
    }
}