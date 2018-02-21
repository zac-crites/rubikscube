define(["require", "exports", "../hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdleState = /** @class */ (function () {
        function IdleState(context, keys) {
            this.context = context;
            this.hotkeys = keys;
        }
        IdleState.prototype.enter = function () {
            var _this = this;
            this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
                new hotkeys_1.MenuOption("f", "Timed solve", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Practice", function () { return _this.context.setState(_this.context.practiceState); }),
            ]);
        };
        IdleState.prototype.exit = function () {
            return;
        };
        return IdleState;
    }());
    exports.IdleState = IdleState;
});
//# sourceMappingURL=idlestate.js.map