import { Turnable, Turn, TurnableWrapper } from "./turnable";
import { Timer } from "./timer";

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

export class TurnRecorder extends TurnableWrapper implements Recorder {
    private timer: Timer;
    private stopTime: number | null;
    private moves: MoveData[] = [];

    public constructor(target: Turnable) {
        super(target);
        this.timer = new Timer();
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