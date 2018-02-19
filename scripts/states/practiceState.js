define(["require", "exports", "../standardControls", "../scrambler"], function (require, exports, standardControls_1, scrambler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PracticeState = /** @class */ (function () {
        function PracticeState(cube, hotkeys, camera) {
            this.cube = cube;
            this.hotkeys = hotkeys;
            this.camera = camera;
        }
        PracticeState.prototype.enter = function () {
            var _this = this;
            var controls = new standardControls_1.StandardControls(this.hotkeys);
            controls.register(this.cube, this.camera);
            this.hotkeys.setupButton("/", "🎲", function () { return new scrambler_1.Scrambler().scramble(_this.cube, 30); });
        };
        PracticeState.prototype.exit = function () {
        };
        return PracticeState;
    }());
    exports.PracticeState = PracticeState;
});
//# sourceMappingURL=practiceState.js.map