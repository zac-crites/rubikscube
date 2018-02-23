define(["require", "exports", "./replay", "./turnable"], function (require, exports, replay_1, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // tslint:disable:no-bitwise
    var ReplayConverter = /** @class */ (function () {
        function ReplayConverter() {
            this.timeResolution = 150;
        }
        ReplayConverter.prototype.replayToString = function (replay) {
            var bytes = [];
            var lastTimestamp = 0;
            for (var _i = 0, _a = replay.moves; _i < _a.length; _i++) {
                var move = _a[_i];
                var id = move.turn << 3;
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
            var timeRes = this.timeResolution;
            var currentTimestamp = 0;
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
                        turn: i,
                    });
                }
            });
            return new replay_1.Replay(newMoveList);
        };
        return ReplayConverter;
    }());
    exports.ReplayConverter = ReplayConverter;
});
//# sourceMappingURL=replayConverter.js.map