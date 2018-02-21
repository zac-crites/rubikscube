
import { Turn } from "./turnable";
import { MoveData, Replay } from "./turnRecorder";

// tslint:disable:no-bitwise

export class ReplayConverter {
    private timeResolution: number = 150;

    public replayToString(replay: Replay): string {
        const bytes: number[] = [];
        let lastTimestamp = 0;

        for (const move of replay.moves) {
            let id = move.turn << 3;

            if (move.timestamp > lastTimestamp) {
                const offset = move.timestamp - lastTimestamp;
                let ticks = Math.floor(offset / this.timeResolution);
                lastTimestamp += ticks * this.timeResolution;
                while (ticks >= 8) {
                    bytes.push((Turn.ri + 1) << 3);
                    ticks -= 8;
                }
                id += ticks;
            }

            bytes.push(id);
        }

        let i = 0;
        const arr = new Uint8Array(bytes.length);
        bytes.forEach((byte) => arr[i++] = byte);
        return btoa(String.fromCharCode.apply(null, arr));
    }

    public stringToReplay(replayString: string): Replay {
        const newMoveList: MoveData[] = [];
        const decodedMovesAsStr = atob(replayString);
        const timeRes = this.timeResolution;
        let currentTimestamp = 0;

        Array.prototype.forEach.call(decodedMovesAsStr, (char: any) => {
            const i = char.charCodeAt(0) >> 3;
            const t = char.charCodeAt(0) % 8;

            currentTimestamp += timeRes * t;

            if (i > Turn.ri) {
                currentTimestamp += timeRes * 8;
            } else {
                newMoveList.push({
                    timestamp: currentTimestamp,
                    turn: i,
                });
            }
        });

        return {
            moves: newMoveList,
        };
    }
}
