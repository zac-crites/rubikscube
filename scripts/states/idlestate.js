define(["require", "exports", "../hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdleState = /** @class */ (function () {
        function IdleState(context, keys, nextState) {
            this.context = context;
            this.hotkeys = keys;
            this.listener = function () { return context.setState(nextState || context.scramblerState); };
        }
        IdleState.prototype.enter = function () {
            var _this = this;
            var context = this.context;
            this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
                new hotkeys_1.MenuOption("f", "Timed solve", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Practice", function () { return _this.context.setState(_this.context.solveState); }),
            ]);
        };
        IdleState.prototype.exit = function () {
            window.removeEventListener("keypress", this.listener);
        };
        return IdleState;
    }());
    exports.IdleState = IdleState;
});
//# sourceMappingURL=idlestate.js.map