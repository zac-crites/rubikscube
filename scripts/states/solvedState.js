define(["require", "exports", "../hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SolvedState = /** @class */ (function () {
        function SolvedState(context, hotkeys, replay) {
            this.context = context;
            this.hotkeys = hotkeys;
            this.replay = replay;
        }
        SolvedState.prototype.enter = function () {
            var _this = this;
            var options = [
                new hotkeys_1.MenuOption("f", "Scramble", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Replay", function () {
                    _this.context.setState(_this.context.replayState);
                }),
            ];
            if (this.replay.replayLog.length > 1) {
                options.push(new hotkeys_1.MenuOption("k", "Log", function () { return _this.context.setState(_this.context.logBrowserState); }));
            }
            this.hotkeys.showMenu("Solved!", options);
        };
        SolvedState.prototype.exit = function () {
            this.hotkeys.reset();
        };
        return SolvedState;
    }());
    exports.SolvedState = SolvedState;
});
//# sourceMappingURL=solvedState.js.map