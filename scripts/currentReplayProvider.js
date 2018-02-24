define(["require", "exports", "./replay", "./replayConverter"], function (require, exports, replay_1, replayConverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CurrentReplayProvider = /** @class */ (function () {
        function CurrentReplayProvider() {
            this.replayLog = [];
            this.replayConverter = new replayConverter_1.ReplayConverter();
            this.replay = null;
            if (localStorage.replayLog !== null) {
                var moveData = JSON.parse(localStorage.replayLog || "[]");
                this.replayLog = moveData.map(function (moves) { return new replay_1.Replay(moves); });
            }
            var parseIndex = window.location.href.indexOf("?");
            this.replay = parseIndex > 0
                ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
                : this.replayLog.length > 0 ? this.replayLog[this.replayLog.length - 1] : null;
        }
        Object.defineProperty(CurrentReplayProvider.prototype, "currentReplay", {
            get: function () {
                return this.replay;
            },
            set: function (v) {
                this.replay = v;
                window.history.replaceState("", "", (v != null) ? "?" + new replayConverter_1.ReplayConverter().replayToString(v) : "");
                if (v && this.replayLog.indexOf(v) < 0) {
                    this.replayLog.push(v);
                    localStorage.replayLog = JSON.stringify(this.replayLog.map(function (log) { return log.moves; }));
                }
            },
            enumerable: true,
            configurable: true
        });
        CurrentReplayProvider.prototype.getLog = function () {
            return this.replayLog;
        };
        return CurrentReplayProvider;
    }());
    exports.CurrentReplayProvider = CurrentReplayProvider;
});
//# sourceMappingURL=currentReplayProvider.js.map