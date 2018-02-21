import { Turnable, Turn, TurnableWrapper } from "./turnable";
import { Timer } from "./timer";
import { ReplayConverter } from "./replayConverter";

export interface MoveData {
    timestamp: number;
    turn: Turn;
}

export interface Replay {
    moves: MoveData[];
}

export interface Recorder {
    reset(): void;
    start(): void;
    stop(): void;
    getReplay(): Replay;
}

export class CurrentReplayProvider {
    private replayConverter = new ReplayConverter();
    public get currentReplay(): Replay | null {
        let parseIndex = window.location.href.indexOf('?');
        return parseIndex > 0 ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1)) : null;
    }
    public set currentReplay(v: Replay | null) {
        window.history.replaceState("", "", (v != null) ? "?" + new ReplayConverter().replayToString(v) : "");
    }
}

export class TurnRecorder extends TurnableWrapper implements Recorder {
    private timer: Timer;
    private stopTime: number | null;
    private moves: MoveData[];

    public constructor(target: Turnable, moveData?: MoveData[]) {
        super(target);
        this.timer = new Timer();
        this.moves = moveData || [];
    }

    public apply(turn: Turn): Turnable {
        this.moves.push({
            turn: turn,
            timestamp: this.timer.getTime()
        });
        super.apply(turn);
        return this;
    }

    public reset(): void {
        this.moves = [];
        this.timer.reset();
    }

    public start(): void {
        this.timer.start();
    }

    public stop(): void {
        this.stopTime = this.stopTime || this.timer.getTime();
    }

    public getReplay(): Replay {
        return {
            moves: this.moves
        };
    }
}