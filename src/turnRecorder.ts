import { IMoveData, IReplay, Replay } from "./replay";
import { Timer } from "./timer";
import { ITurnable, Turn, TurnableWrapper } from "./turnable";

export interface IRecorder {
    reset(): void;
    start(): void;
    stop(): void;
    getReplay(): IReplay;
}

export class TurnRecorder extends TurnableWrapper implements IRecorder {
    private timer: Timer;
    private stopTime: number | null;
    private moves: IMoveData[];

    public constructor(target: ITurnable, moveData?: IMoveData[]) {
        super(target);
        this.timer = new Timer();
        this.stopTime = null;
        this.moves = moveData || [];
    }

    public apply(t: Turn): ITurnable {
        this.moves.push({
            timestamp: this.timer.getTime(),
            turn: t,
        });
        super.apply(t);
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

    public getReplay(): IReplay {
        return new Replay( this.moves );
    }
}
