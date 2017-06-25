function Cube() {

    //State
    function Face(n) {
        this.Center = n;
        this.Rotation = 0;
        this.Cubelets = [n, n, n, n, n, n, n, n];

        this.Get = function (i) {
            return this.Cubelets[(i + (this.Rotation * 2)) % 8];
        }

        this.Rotate = function (i) {
            this.Rotation = this.Rotation + i % 4;
        }

        this.Replace = function (i, value) {
            var tmp = this.Get(i);
            this.Cubelets[(i + (this.Rotation * 2)) % 8] = value;
            return tmp;
        }
    }

    this.Faces = [new Face(0), new Face(1), new Face(2), new Face(3), new Face(4), new Face(5)];

    //Utils
    function shift(i, f) {
        f[1].Replace(i, f[2].Replace(i, f[3].Replace(i, f[4].Replace(i, f[1].Get(i)))));
    }

    function triple(fn) {
        for ( var i = 0; i < 3; i++)
            fn();
    }

    //Moves
    this.U = function () {
        this.Faces[0].Rotate(3);
        shift(0, this.Faces);
        shift(1, this.Faces);
        shift(2, this.Faces);
    }

    this.Ui = function () {
        triple(() => this.U());
    }

    this.X = function () {
        this.Faces[1].Rotate(1);
        this.Faces[3].Rotate(3);

        var tmp = this.Faces[0];
        this.Faces[0] = this.Faces[2];
        this.Faces[2] = this.Faces[5];
        this.Faces[5] = this.Faces[4];
        this.Faces[5].Rotate(2);
        this.Faces[4] = tmp;
        this.Faces[4].Rotate(2);
    }

    this.Xi = function () {
        triple(() => this.X());
    }

    this.Z = function () {
        this.Faces[2].Rotate(3);
        this.Faces[4].Rotate(1);

        var tmp = this.Faces[0];
        this.Faces[0] = this.Faces[1];
        this.Faces[0].Rotate(3);
        this.Faces[1] = this.Faces[5];
        this.Faces[1].Rotate(3);
        this.Faces[5] = this.Faces[3];
        this.Faces[5].Rotate(3);
        this.Faces[3] = tmp;
        this.Faces[3].Rotate(3);
    }

    this.Zi = function () {
        triple(() => this.Z());
    }

    this.F = function () {
        this.X();
        this.U();
        this.Xi();
    }

    this.Fi = function () {
        triple(() => this.F());
    }
}