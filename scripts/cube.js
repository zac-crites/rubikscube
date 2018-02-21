define(["require", "exports", "./turnable"], function (require, exports, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Face;
    (function (Face) {
        Face[Face["U"] = 0] = "U";
        Face[Face["L"] = 1] = "L";
        Face[Face["F"] = 2] = "F";
        Face[Face["R"] = 3] = "R";
        Face[Face["B"] = 4] = "B";
        Face[Face["D"] = 5] = "D";
    })(Face = exports.Face || (exports.Face = {}));
    var Cube = /** @class */ (function () {
        function Cube() {
            this.faces = [];
            this.reset();
        }
        Cube.prototype.reset = function () {
            this.faces = [];
            for (var i = 0; i < 6; i++) {
                this.faces.push(this.faceData(i));
            }
        };
        Cube.prototype.isSolved = function () {
            return this.faces.every(function (face) { return face.facelets.every(function (facelet) { return facelet === face.center; }); });
        };
        Cube.prototype.getFacelet = function (face, i) {
            if (i === undefined) {
                return this.faces[face].center;
            }
            return this.faces[face].facelets[i];
        };
        Cube.prototype.waitForMoves = function () {
            return new Promise(function (resolve) { return resolve(); });
        };
        Cube.prototype.apply = function (turn) {
            var turnList = turn;
            if (typeof turn !== "number") {
                for (var _i = 0, turnList_1 = turnList; _i < turnList_1.length; _i++) {
                    var t = turnList_1[_i];
                    this.apply(t);
                }
                return this;
            }
            switch (turn) {
                case turnable_1.Turn.X:
                    return this.X();
                case turnable_1.Turn.Y:
                    return this.Y();
                case turnable_1.Turn.Z:
                    return this.Z();
                case turnable_1.Turn.U:
                    return this.U();
                case turnable_1.Turn.Xi:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.X, turnable_1.Turn.X]);
                case turnable_1.Turn.Yi:
                    return this.apply([turnable_1.Turn.Y, turnable_1.Turn.Y, turnable_1.Turn.Y]);
                case turnable_1.Turn.Zi:
                    return this.apply([turnable_1.Turn.Z, turnable_1.Turn.Z, turnable_1.Turn.Z]);
                case turnable_1.Turn.X2:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.X]);
                case turnable_1.Turn.Y2:
                    return this.apply([turnable_1.Turn.Y, turnable_1.Turn.Y]);
                case turnable_1.Turn.Z2:
                    return this.apply([turnable_1.Turn.Z, turnable_1.Turn.Z]);
                case turnable_1.Turn.D:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.F, turnable_1.Turn.Xi]);
                case turnable_1.Turn.L:
                    return this.apply([turnable_1.Turn.Z, turnable_1.Turn.U, turnable_1.Turn.Zi]);
                case turnable_1.Turn.R:
                    return this.apply([turnable_1.Turn.Zi, turnable_1.Turn.U, turnable_1.Turn.Z]);
                case turnable_1.Turn.F:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.U, turnable_1.Turn.Xi]);
                case turnable_1.Turn.B:
                    return this.apply([turnable_1.Turn.Xi, turnable_1.Turn.U, turnable_1.Turn.X]);
                case turnable_1.Turn.Ui:
                    return this.apply([turnable_1.Turn.U, turnable_1.Turn.U, turnable_1.Turn.U]);
                case turnable_1.Turn.Di:
                    return this.apply([turnable_1.Turn.D2, turnable_1.Turn.D]);
                case turnable_1.Turn.Li:
                    return this.apply([turnable_1.Turn.L2, turnable_1.Turn.L]);
                case turnable_1.Turn.Ri:
                    return this.apply([turnable_1.Turn.R2, turnable_1.Turn.R]);
                case turnable_1.Turn.Fi:
                    return this.apply([turnable_1.Turn.F2, turnable_1.Turn.F]);
                case turnable_1.Turn.Bi:
                    return this.apply([turnable_1.Turn.B2, turnable_1.Turn.B]);
                case turnable_1.Turn.U2:
                    return this.apply([turnable_1.Turn.U, turnable_1.Turn.U]);
                case turnable_1.Turn.D2:
                    return this.apply([turnable_1.Turn.D, turnable_1.Turn.D]);
                case turnable_1.Turn.L2:
                    return this.apply([turnable_1.Turn.L, turnable_1.Turn.L]);
                case turnable_1.Turn.R2:
                    return this.apply([turnable_1.Turn.R, turnable_1.Turn.R]);
                case turnable_1.Turn.F2:
                    return this.apply([turnable_1.Turn.F, turnable_1.Turn.F]);
                case turnable_1.Turn.B2:
                    return this.apply([turnable_1.Turn.B, turnable_1.Turn.B]);
                case turnable_1.Turn.I:
                    return this.apply([turnable_1.Turn.R, turnable_1.Turn.X]);
                case turnable_1.Turn.Ii:
                    return this.apply([turnable_1.Turn.Ri, turnable_1.Turn.Xi]);
                case turnable_1.Turn.r:
                    return this.apply([turnable_1.Turn.Li, turnable_1.Turn.Xi]);
                case turnable_1.Turn.ri:
                    return this.apply([turnable_1.Turn.Li, turnable_1.Turn.Xi]);
            }
            return this;
        };
        Cube.prototype.X = function () {
            this.rotateFace(this.faces[1], 1);
            this.rotateFace(this.faces[3], 3);
            var tmp = this.faces[0];
            this.faces[0] = this.faces[2];
            this.faces[2] = this.faces[5];
            this.faces[5] = this.faces[4];
            this.rotateFace(this.faces[5], 2);
            this.faces[4] = tmp;
            this.rotateFace(this.faces[4], 2);
            return this;
        };
        Cube.prototype.Y = function () {
            this.rotateFace(this.faces[0], 3);
            this.rotateFace(this.faces[5], 1);
            var tmp = this.faces[1];
            this.faces[1] = this.faces[2];
            this.faces[2] = this.faces[3];
            this.faces[3] = this.faces[4];
            this.faces[4] = tmp;
            return this;
        };
        Cube.prototype.Z = function () {
            this.rotateFace(this.faces[2], 3);
            this.rotateFace(this.faces[4], 1);
            var tmp = this.faces[0];
            this.faces[0] = this.faces[1];
            this.rotateFace(this.faces[0], 3);
            this.faces[1] = this.faces[5];
            this.rotateFace(this.faces[1], 3);
            this.faces[5] = this.faces[3];
            this.rotateFace(this.faces[5], 3);
            this.faces[3] = tmp;
            this.rotateFace(this.faces[3], 3);
            return this;
        };
        Cube.prototype.U = function () {
            this.rotateFace(this.faces[0], 3);
            this.shift(0);
            this.shift(1);
            this.shift(2);
            return this;
        };
        Cube.prototype.faceData = function (face) {
            var facelets = [];
            for (var i = 0; i < 8; i++) {
                facelets.push(face);
            }
            return {
                get center() { return face; },
                get facelets() { return facelets; },
            };
        };
        Cube.prototype.replace = function (f, i, value) {
            var tmp = f.facelets[i];
            f.facelets[i] = value;
            return tmp;
        };
        Cube.prototype.shift = function (i) {
            var f = this.faces;
            this.replace(f[1], i, this.replace(f[2], i, this.replace(f[3], i, this.replace(f[4], i, f[1].facelets[i]))));
        };
        Cube.prototype.rotateFace = function (face, times) {
            for (var i = 0; i < times * 2; i++) {
                face.facelets.push(face.facelets.splice(0, 1)[0]);
            }
        };
        return Cube;
    }());
    exports.Cube = Cube;
});
//# sourceMappingURL=cube.js.map