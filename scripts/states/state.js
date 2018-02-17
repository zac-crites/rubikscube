define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateContext = /** @class */ (function () {
        function StateContext(state) {
            this.currentState = state;
            this.currentState.enter();
        }
        StateContext.prototype.setState = function (state) {
            this.currentState.exit();
            this.currentState = state;
            this.currentState.enter();
        };
        return StateContext;
    }());
    exports.StateContext = StateContext;
});
//# sourceMappingURL=state.js.map