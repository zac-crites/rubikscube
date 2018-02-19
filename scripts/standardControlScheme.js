define(["require", "exports", "./turnable"], function (require, exports, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StandardControlScheme = /** @class */ (function () {
        function StandardControlScheme() {
        }
        StandardControlScheme.prototype.register = function (hotkeys, target, camera) {
            var targetBindings = [
                ["q", "Z'", turnable_1.Turn.Zi],
                ["w", "B", turnable_1.Turn.B],
                ["e", "L'", turnable_1.Turn.Li],
                ["r", "I'", turnable_1.Turn.Ii],
                ["y", "X", turnable_1.Turn.X],
                ["u", "r", turnable_1.Turn.r],
                ["i", "R", turnable_1.Turn.R],
                ["o", "B'", turnable_1.Turn.Bi],
                ["p", "Z", turnable_1.Turn.Z],
                ["a", "Y'", turnable_1.Turn.Yi],
                ["s", "D", turnable_1.Turn.D],
                ["d", "L", turnable_1.Turn.L],
                ["f", "U'", turnable_1.Turn.Ui],
                ["g", "F'", turnable_1.Turn.Fi],
                ["h", "F", turnable_1.Turn.F],
                ["j", "U", turnable_1.Turn.U],
                ["k", "R'", turnable_1.Turn.Ri],
                ["l", "D'", turnable_1.Turn.Di],
                [";", "Y", turnable_1.Turn.Y],
                ["v", "I", turnable_1.Turn.I],
                ["n", "X'", turnable_1.Turn.Xi],
                ["m", "r'", turnable_1.Turn.ri],
            ];
            if (camera) {
                hotkeys.setupButton("z", "📹", camera.resetCamera);
            }
            targetBindings.forEach(function (binding) {
                hotkeys.setupButton(binding[0], binding[1], function () { return target[turnable_1.Turn[binding[2]]](); });
            });
        };
        return StandardControlScheme;
    }());
    exports.StandardControlScheme = StandardControlScheme;
});
//# sourceMappingURL=standardControlScheme.js.map