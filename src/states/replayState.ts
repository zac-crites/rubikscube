import { Timer } from "../timer";
import { ITurnable, Turn } from "../turnable";
import { CurrentReplayProvider } from "../turnRecorder";
import { IState, StateContext } from "./state";

export class ReplayState implements IState {
    private context: StateContext;
    private target: ITurnable;
    private replay: CurrentReplayProvider;
    private displayTimer: Timer;

    public constructor(context: StateContext, target: ITurnable, replay: CurrentReplayProvider, timer: Timer) {
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
        return;
    }

    public start(): void {
        if (this.replay.currentReplay === null) {
            this.context.setState(this.context.idleState);
            return;
        }

        const replay = this.replay.currentReplay;
        const replayTimer = new Timer();
        let started = false;

        let i = 0;
        let update: () => void;

        while (i < replay.moves.length && replay.moves[i].timestamp === 0) {
            this.target.apply(replay.moves[i].turn);
            i++;
        }

        update = () => {
            while (i < replay.moves.length && replay.moves[i].timestamp < replayTimer.getTime()) {
                const move = replay.moves[i];
                if (move.turn > Turn.Z2 && !started) {
                    started = true;
                    this.displayTimer.reset();
                    this.displayTimer.start();
                }
                this.target.apply(move.turn);
                i++;
            }
            if (i >= replay.moves.length) {
                this.target.waitForMoves().then(() => {
                    this.displayTimer.stop();
                    this.context.setState(this.context.solvedState);
                });
            } else {
                setTimeout(update, 100);
            }
        };

        this.target.waitForMoves().then(() => {
            this.displayTimer.countdown(15000);
            replayTimer.start();
            update();
        });
    }
}
