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
        const s = 133;
        const lastMoveFinishTime = this.moves.reduce((acc, m) => Math.max(acc + s, m.timestamp + s), 0);
        const startMove = this.moves.find( (move) => move.timestamp > 0 && move.turn > Turn.Z2 );
        const startMoveTime =  startMove ? startMove.timestamp : 0;
        return lastMoveFinishTime - startMoveTime;
    }
}
