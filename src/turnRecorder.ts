import { Turnable, Turn, TurnableWrapper } from "./turnable";
import { Timer } from "./timer";

export interface MoveData {
    timestamp: number;
    move: Turn;
}

export interface Replay {
    time: number;
    moves: MoveData[];
}

export interface Recorder {
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
            move: turn,
            timestamp: this.timer.getTime()
        });
        super.apply(turn);
        return this;
    }

    public start(): void {
        this.moves = [];
        this.timer.start();
    }

    public stop(): void {
        this.stopTime = this.timer.getTime();
    }

    public getReplay(): Replay {
        return {
            time: this.stopTime || 0,
            moves: this.moves
        };
    }
}