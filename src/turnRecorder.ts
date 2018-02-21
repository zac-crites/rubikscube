import { ReplayConverter } from "./replayConverter";
import { Timer } from "./timer";
import { ITurnable, Turn, TurnableWrapper } from "./turnable";

export class MoveData {
    public timestamp: number = 0;
    public turn: Turn = Turn.X;
}

export class Replay {
    public moves: MoveData[] = [];
}

export interface IRecorder {
    reset(): void;
    start(): void;
    stop(): void;
    getReplay(): Replay;
}

export class CurrentReplayProvider {
    private replayConverter = new ReplayConverter();
    public get currentReplay(): Replay | null {
        const parseIndex = window.location.href.indexOf("?");
        return parseIndex > 0
            ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
            : null;
    }
    public set currentReplay(v: Replay | null) {
        window.history.replaceState("", "", (v != null) ? "?" + new ReplayConverter().replayToString(v) : "");
    }
}

export class TurnRecorder extends TurnableWrapper implements IRecorder {
    private timer: Timer;
    private stopTime: number | null;
    private moves: MoveData[];

    public constructor(target: ITurnable, moveData?: MoveData[]) {
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

    public getReplay(): Replay {
        return {
            moves: this.moves,
        };
    }
}
