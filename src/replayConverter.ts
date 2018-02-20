import { Replay, MoveData } from "./turnRecorder";
import { Turn } from "./turnable";

export class ReplayConverter {
    private timeResolution: number = 150;

    public replayToString(replay: Replay): string {
        let bytes: number[] = [];
        let lastTimestamp = 0;

        for (let i = 0; i < replay.moves.length; i++) {
            let move = replay.moves[i];
            let id = replay.moves[i].turn << 3;

            if (move.timestamp > lastTimestamp) {
                var offset = move.timestamp - lastTimestamp;
                var ticks = Math.floor(offset / this.timeResolution);
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
        let arr = new Uint8Array(bytes.length);
        bytes.forEach(byte => arr[i++] = byte);
        return btoa(String.fromCharCode.apply(null, arr));
    }

    public stringToReplay(replayString: string): Replay {
        var newMoveList: MoveData[] = [];
        var decodedMovesAsStr = atob(replayString);
        var currentTimestamp = 0;
        var timeRes = this.timeResolution;

        Array.prototype.forEach.call(decodedMovesAsStr, function (char) {
            var i = char.charCodeAt(0) >> 3;
            var t = char.charCodeAt(0) % 8;

            currentTimestamp += timeRes * t;

            if (i > Turn.ri) {
                currentTimestamp += timeRes * 8;
            } else {
                newMoveList.push({
                    timestamp: currentTimestamp,
                    turn: i
                });
            }
        });

        return {
            moves: newMoveList
        };
    }
}