define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Replay = /** @class */ (function () {
        function Replay(moves) {
            this.moves = moves || [];
        }
        Object.defineProperty(Replay.prototype, "duration", {
            get: function () {
                var s = 15;
                return this.moves.reduce(function (acc, m) { return Math.max(acc + s, m.timestamp + s); }, 0);
            },
            enumerable: true,
            configurable: true
        });
        return Replay;
    }());
    exports.Replay = Replay;
});
//# sourceMappingURL=replay.js.map