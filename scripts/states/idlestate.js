define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdleState = /** @class */ (function () {
        function IdleState(context, nextState) {
            this.listener = function () { return context.setState(nextState || context.scramblerState); };
        }
        IdleState.prototype.enter = function () {
            window.addEventListener("keypress", this.listener);
        };
        IdleState.prototype.exit = function () {
            window.removeEventListener("keypress", this.listener);
        };
        return IdleState;
    }());
    exports.IdleState = IdleState;
});
//# sourceMappingURL=idlestate.js.map