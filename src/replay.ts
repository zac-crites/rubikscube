import { Turn } from "./turnable";

export interface IMoveData {
    timestamp: number;
    turn: Turn;
}

export interface IReplay {
    moves: IMoveData[];
    readonly duration: number;
}

export class Replay implements IReplay {
    public moves: IMoveData[];

    public constructor(moves?: IMoveData[]) {
        this.moves = moves || [];
    }

    public get duration() {
        const s = 15;
        return this.moves.reduce((acc, m) => Math.max(acc + s, m.timestamp + s), 0);
    }
}
