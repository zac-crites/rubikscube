define(["require", "exports", "../hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdleState = /** @class */ (function () {
        function IdleState(context, keys, recorder) {
            this.context = context;
            this.hotkeys = keys;
            this.recorder = recorder;
        }
        IdleState.prototype.enter = function () {
            var _this = this;
            var context = this.context;
            this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
                new hotkeys_1.MenuOption("f", "Timed solve", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Practice", function () { return _this.context.setState(_this.context.practiceState); }),
            ]);
            this.recorder.stop();
            console.log(this.recorder.getReplay());
        };
        IdleState.prototype.exit = function () {
        };
        return IdleState;
    }());
    exports.IdleState = IdleState;
});
//# sourceMappingURL=idlestate.js.map