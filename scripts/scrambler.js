define(["require", "exports", "./turnable"], function (require, exports, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scrambler = /** @class */ (function () {
        function Scrambler() {
        }
        Scrambler.prototype.scramble = function (cube, turns) {
            var faceMoves = [
                [turnable_1.Turn.U, turnable_1.Turn.Ui, turnable_1.Turn.U2],
                [turnable_1.Turn.D, turnable_1.Turn.Di, turnable_1.Turn.D2],
                [turnable_1.Turn.L, turnable_1.Turn.Li, turnable_1.Turn.L2],
                [turnable_1.Turn.R, turnable_1.Turn.Ri, turnable_1.Turn.R2],
                [turnable_1.Turn.F, turnable_1.Turn.Fi, turnable_1.Turn.F2],
                [turnable_1.Turn.B, turnable_1.Turn.Bi, turnable_1.Turn.B2],
            ];
            for (var i = 0; i < turns; i++) {
                var idx = Math.floor(Math.random() * (faceMoves.length - 1));
                var face = faceMoves[idx];
                faceMoves.splice(idx, 1);
                cube.apply(face[Math.floor(Math.random() * face.length)]);
                faceMoves.push(face);
            }
        };
        return Scrambler;
    }());
    exports.Scrambler = Scrambler;
});
//# sourceMappingURL=scrambler.js.map