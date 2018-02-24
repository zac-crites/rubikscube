define(["require", "exports", "./turnable"], function (require, exports, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Replay = /** @class */ (function () {
        function Replay(moves) {
            this.moves = moves || [];
        }
        Object.defineProperty(Replay.prototype, "duration", {
            get: function () {
                var s = 133;
                var lastMoveFinishTime = this.moves.reduce(function (acc, m) { return Math.max(acc + s, m.timestamp + s); }, 0);
                var startMove = this.moves.find(function (move) { return move.timestamp > 0 && move.turn > turnable_1.Turn.Z2; });
                var startMoveTime = startMove ? startMove.timestamp : 0;
                return lastMoveFinishTime - startMoveTime;
            },
            enumerable: true,
            configurable: true
        });
        return Replay;
    }());
    exports.Replay = Replay;
});
//# sourceMappingURL=replay.js.map