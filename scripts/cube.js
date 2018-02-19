define(["require", "exports"], function (require, exports) {
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
    var FaceData = /** @class */ (function () {
        function FaceData(face) {
            this.facelets = [];
            this.center = face;
            while (this.facelets.length < 8) {
                this.facelets.push(face);
            }
        }
        FaceData.prototype.isSolved = function () {
            var _this = this;
            return this.facelets.every(function (f) { return f === _this.center; });
        };
        return FaceData;
    }());
    var Cube = /** @class */ (function () {
        function Cube() {
            this.reset();
        }
        Cube.prototype.reset = function () {
            this.faces = [];
            for (var i = 0; i < 6; i++) {
                this.faces.push(new FaceData(i));
            }
        };
        Cube.prototype.isSolved = function () {
            return this.faces.every(function (f) { return f.isSolved(); });
        };
        Cube.prototype.getFacelet = function (face, i) {
            if (i === undefined) {
                return this.faces[face].center;
            }
            return this.faces[face].facelets[i];
        };
        Cube.prototype.apply = function (turn) {
            this[turn]();
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
        Cube.prototype.Xi = function () {
            return this.X().X().X();
        };
        Cube.prototype.Yi = function () {
            return this.Y().Y().Y();
        };
        Cube.prototype.Zi = function () {
            return this.Z().Z().Z();
        };
        Cube.prototype.X2 = function () {
            return this.X().X();
        };
        Cube.prototype.Y2 = function () {
            return this.Y().Y();
        };
        Cube.prototype.Z2 = function () {
            return this.Z().Z();
        };
        Cube.prototype.D = function () {
            return this.X().F().Xi();
        };
        Cube.prototype.L = function () {
            return this.Z().U().Zi();
        };
        Cube.prototype.R = function () {
            return this.Zi().U().Z();
        };
        Cube.prototype.F = function () {
            return this.X().U().Xi();
        };
        Cube.prototype.B = function () {
            return this.Xi().U().X();
        };
        Cube.prototype.Ui = function () {
            return this.U().U().U();
        };
        Cube.prototype.Di = function () {
            return this.D2().D();
        };
        Cube.prototype.Li = function () {
            return this.L2().L();
        };
        Cube.prototype.Ri = function () {
            return this.R2().R();
        };
        Cube.prototype.Fi = function () {
            return this.F2().F();
        };
        Cube.prototype.Bi = function () {
            return this.B2().B();
        };
        Cube.prototype.U2 = function () {
            return this.U().U();
        };
        Cube.prototype.D2 = function () {
            return this.D().D();
        };
        Cube.prototype.L2 = function () {
            return this.L().L();
        };
        Cube.prototype.R2 = function () {
            return this.R().R();
        };
        Cube.prototype.F2 = function () {
            return this.F().F();
        };
        Cube.prototype.B2 = function () {
            return this.B().B();
        };
        Cube.prototype.I = function () {
            return this.R().X();
        };
        Cube.prototype.Ii = function () {
            return this.Ri().Xi();
        };
        Cube.prototype.r = function () {
            return this.Li().Xi();
        };
        Cube.prototype.ri = function () {
            return this.Li().Xi();
        };
        Cube.prototype.waitForMoves = function () {
            return new Promise(function (resolve) { return resolve(); });
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