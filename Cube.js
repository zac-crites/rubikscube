function Cube() {

    //State
    function Face(n) {
        var _color = n;
        var _rotation = 0;
        var _cubelets = [n, n, n, n, n, n, n, n];

        this.GetColor = () => _color;

        this.Get = (i) => _cubelets[(i + (_rotation * 2)) % 8];

        this.Rotate = (i) => _rotation = (_rotation + i) % 4;

        this.Replace = (i, value) => {
            var tmp = this.Get(i);
            _cubelets[(i + (_rotation * 2)) % 8] = value;
            return tmp;
        }

        this.IsSolved = () => !_cubelets.some((n) => n != this.Center);
    }

    this.Faces = [new Face(0), new Face(1), new Face(2), new Face(3), new Face(4), new Face(5)];

    //Utils
    function shift(i, f) {
        f[1].Replace(i, f[2].Replace(i, f[3].Replace(i, f[4].Replace(i, f[1].Get(i)))));
    }

    function triple(fn) {
        for (var i = 0; i < 3; i++)
            fn();
    }

    this.IsSolved = () => !this.Faces.some((f) => !f.IsSolved());

    //Moves - Full cube rotations
    this.X = () => {
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

    this.Z = () => {
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

    this.Y = () => {
        this.Faces[0].Rotate(3);
        this.Faces[5].Rotate(1);

        var tmp = this.Faces[1];
        this.Faces[1] = this.Faces[2];
        this.Faces[2] = this.Faces[3];
        this.Faces[3] = this.Faces[4];
        this.Faces[4] = tmp;
    }

    this.Xi = () => triple(() => this.X());

    this.Zi = () => triple(() => this.Z());

    this.Yi = () => triple(() => this.Y());    

    //Moves - Single face rotations
    this.U = () => {
        this.Faces[0].Rotate(3);
        shift(0, this.Faces);
        shift(1, this.Faces);
        shift(2, this.Faces);
    }

    this.F = () => {
        this.X();
        this.U();
        this.Xi();
    }

    this.L = function () {
        this.Z();
        this.U();
        this.Zi();
    }
    
    this.R = function () {
        this.Zi();
        this.U();
        this.Z();
    }
    
    this.B = function () {
        this.Xi();
        this.U();
        this.X();
    }

    this.D = function () {
        this.X();
        this.F();
        this.Xi();
    }

    this.Ui = () => triple(() => this.U());

    this.Fi = () => triple(() => this.F());

    this.Li = () => triple(() => this.L());

    this.Ri = () => triple(() => this.R());

    this.Bi = () => triple(() => this.B());

    this.Di = () => triple(() => this.D());
}