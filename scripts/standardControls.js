define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StandardControls = /** @class */ (function () {
        function StandardControls(hotkey) {
            this.hotkeys = hotkey;
        }
        StandardControls.prototype.register = function (target, camera) {
            var _this = this;
            var targetBindings = [
                ["q", "Z'", target.Zi],
                ["w", "B", target.B],
                ["e", "L'", target.Li],
                ["r", "I'", target.Ii],
                ["y", "X", target.X],
                ["u", "r", target.r],
                ["i", "R", target.R],
                ["o", "B'", target.Bi],
                ["p", "Z", target.Z],
                ["a", "Y'", target.Yi],
                ["s", "D", target.D],
                ["d", "L", target.L],
                ["f", "U'", target.Ui],
                ["g", "F'", target.Fi],
                ["h", "F", target.F],
                ["j", "U", target.U],
                ["k", "R'", target.Ri],
                ["l", "D'", target.Di],
                [";", "Y", target.Y],
                ["v", "I", target.I],
                ["n", "X'", target.Xi],
                ["m", "r'", target.ri],
                ["z", "📹", camera.resetCamera],
            ];
            targetBindings.forEach(function (binding) {
                _this.hotkeys.setupButton(binding[0], binding[1], binding[2]);
            });
        };
        StandardControls.prototype.reset = function () {
            this.hotkeys.reset();
        };
        return StandardControls;
    }());
    exports.StandardControls = StandardControls;
});
//# sourceMappingURL=standardControls.js.map