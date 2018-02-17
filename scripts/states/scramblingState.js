define(["require", "exports", "../scrambler"], function (require, exports, scrambler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScramblingState = /** @class */ (function () {
        function ScramblingState(context, cube) {
            this.context = context;
            this.cube = cube;
            this.scrambler = new scrambler_1.Scrambler();
        }
        ScramblingState.prototype.enter = function () {
            console.log("ScramblingState.enter()");
            this.scrambler.scramble(this.cube);
            this.context.setState(this.nextState);
        };
        ScramblingState.prototype.exit = function () {
            console.log("ScramblingState.exit()");
        };
        ScramblingState.prototype.setNextState = function (next) {
            this.nextState = next;
        };
        return ScramblingState;
    }());
    exports.ScramblingState = ScramblingState;
});
//# sourceMappingURL=scramblingState.js.map