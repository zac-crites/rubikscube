define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var state = {
        enter: function () { return; },
        exit: function () { return; },
    };
    var StateContext = /** @class */ (function () {
        function StateContext(startState) {
            this.idleState = state;
            this.scramblerState = state;
            this.solveState = state;
            this.countdownState = state;
            this.practiceState = state;
            this.solvedState = state;
            this.replayState = state;
            this.currentState = startState || state;
            this.currentState.enter();
        }
        StateContext.prototype.setState = function (newState) {
            this.currentState.exit();
            this.currentState = newState;
            this.currentState.enter();
        };
        return StateContext;
    }());
    exports.StateContext = StateContext;
});
//# sourceMappingURL=state.js.map