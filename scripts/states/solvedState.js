define(["require", "exports", "../hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SolvedState = /** @class */ (function () {
        function SolvedState(context, hotkeys) {
            this.context = context;
            this.hotkeys = hotkeys;
        }
        SolvedState.prototype.enter = function () {
            var _this = this;
            this.hotkeys.showMenu("Solved!", [
                new hotkeys_1.MenuOption("f", "Scramble", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Replay", function () {
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