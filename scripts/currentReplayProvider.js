define(["require", "exports", "./replayConverter"], function (require, exports, replayConverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CurrentReplayProvider = /** @class */ (function () {
        function CurrentReplayProvider() {
            this.replayLog = [];
            this.replayConverter = new replayConverter_1.ReplayConverter();
            this.replay = null;
            var parseIndex = window.location.href.indexOf("?");
            this.currentReplay = parseIndex > 0
                ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
                : null;
        }
        Object.defineProperty(CurrentReplayProvider.prototype, "currentReplay", {
            get: function () {
                return this.replay;
            },
            set: function (v) {
                this.replay = v;
                window.history.replaceState("", "", (v != null) ? "?" + new replayConverter_1.ReplayConverter().replayToString(v) : "");
                if (v) {
                    this.replayLog.push(v);
                }
            },
            enumerable: true,
            configurable: true
        });
        return CurrentReplayProvider;
    }());
    exports.CurrentReplayProvider = CurrentReplayProvider;
});
//# sourceMappingURL=currentReplayProvider.js.map