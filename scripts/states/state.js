define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateContext = /** @class */ (function () {
        function StateContext(state) {
            this.setState(state);
        }
        StateContext.prototype.setState = function (state) {
            if (this.currentState) {
                this.currentState.exit();
            }
            this.currentState = state;
            if (this.currentState) {
                this.currentState.enter();
            }
        };
        return StateContext;
    }());
    exports.StateContext = StateContext;
});
//# sourceMappingURL=state.js.map