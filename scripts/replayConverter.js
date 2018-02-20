define(["require", "exports", "./turnable"], function (require, exports, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReplayConverter = /** @class */ (function () {
        function ReplayConverter() {
            this.timeResolution = 150;
        }
        ReplayConverter.prototype.replayToString = function (replay) {
            var bytes = [];
            var lastTimestamp = 0;
            for (var i_1 = 0; i_1 < replay.moves.length; i_1++) {
                var move = replay.moves[i_1];
                var id = replay.moves[i_1].turn << 3;
                if (move.timestamp > lastTimestamp) {
                    var offset = move.timestamp - lastTimestamp;
                    var ticks = Math.floor(offset / this.timeResolution);
                    lastTimestamp += ticks * this.timeResolution;
                    while (ticks >= 8) {
                        bytes.push((turnable_1.Turn.ri + 1) << 3);
                        ticks -= 8;
                    }
                    id += ticks;
                }
                bytes.push(id);
            }
            var i = 0;
            var arr = new Uint8Array(bytes.length);
            bytes.forEach(function (byte) { return arr[i++] = byte; });
            return btoa(String.fromCharCode.apply(null, arr));
        };
        ReplayConverter.prototype.stringToReplay = function (replayString) {
            var newMoveList = [];
            var decodedMovesAsStr = atob(replayString);
            var currentTimestamp = 0;
            var timeRes = this.timeResolution;
            Array.prototype.forEach.call(decodedMovesAsStr, function (char) {
                var i = char.charCodeAt(0) >> 3;
                var t = char.charCodeAt(0) % 8;
                currentTimestamp += timeRes * t;
                if (i > turnable_1.Turn.ri) {
                    currentTimestamp += timeRes * 8;
                }
                else {
                    newMoveList.push({
                        timestamp: currentTimestamp,
                        turn: i
                    });
                }
            });
            return {
                moves: newMoveList
            };
        };
        return ReplayConverter;
    }());
    exports.ReplayConverter = ReplayConverter;
});
//# sourceMappingURL=replayConverter.js.map