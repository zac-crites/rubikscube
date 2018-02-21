define(["require", "exports", "../scrambler", "../standardControlScheme"], function (require, exports, scrambler_1, standardControlScheme_1) {
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
            new standardControlScheme_1.StandardControlScheme().register(this.hotkeys, this.cube, this.camera);
            this.hotkeys.setupButton("/", "🎲", function () {
                _this.hotkeys.reset();
                new scrambler_1.Scrambler().scramble(_this.cube, 30);
                _this.cube.waitForMoves().then(function () { return _this.enter(); });
            });
        };
        PracticeState.prototype.exit = function () {
            return;
        };
        return PracticeState;
    }());
    exports.PracticeState = PracticeState;
});
//# sourceMappingURL=practiceState.js.map