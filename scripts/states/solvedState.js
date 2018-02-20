define(["require", "exports", "../hotkeys", "../replayConverter"], function (require, exports, hotkeys_1, replayConverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SolvedState = /** @class */ (function () {
        function SolvedState(context, hotkeys, recorder) {
            this.context = context;
            this.hotkeys = hotkeys;
            this.recorder = recorder;
        }
        SolvedState.prototype.enter = function () {
            var _this = this;
            this.recorder.stop();
            var replay = this.recorder.getReplay();
            window.history.replaceState("", "", "?" + new replayConverter_1.ReplayConverter().replayToString(replay));
            this.hotkeys.showMenu("Solved in " + (replay.moves[replay.moves.length - 1].timestamp / 1000), [
                new hotkeys_1.MenuOption("f", "Reset", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Show replay", function () {
                    console.log(replay);
                    _this.context.setState(_this.context.replayState);
                })
            ]);
        };
        SolvedState.prototype.exit = function () {
            this.hotkeys.reset();
        };
        return SolvedState;
    }());
    exports.SolvedState = SolvedState;
});
//# sourceMappingURL=solvedState.js.map