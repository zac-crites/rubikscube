function Cube() {

    //State
    var _faceLabels = ['U', 'L', 'F', 'R', 'B', 'D'];
    var _faces = [new Face(0), new Face(1), new Face(2), new Face(3), new Face(4), new Face(5)];

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

        this.IsSolved = () => !_cubelets.some((n) => n != _color);
    }

    this.IsSolved = () => !_faces.some((f) => !f.IsSolved());

    this.GetFacelet = (face, i) => {
        if (i === undefined)
            return _faces[_faceLabels.indexOf(face)].GetColor();
        return _faces[_faceLabels.indexOf(face)].Get(i);
    };

    //Utils
    function shift(i, f) {
        f[1].Replace(i, f[2].Replace(i, f[3].Replace(i, f[4].Replace(i, f[1].Get(i)))));
    }

    function triple(fn) {
        for (var i = 0; i < 3; i++)
            fn();
    }

    //Moves - Full cube rotations
    this.X = () => {
        _faces[1].Rotate(1);
        _faces[3].Rotate(3);

        var tmp = _faces[0];
        _faces[0] = _faces[2];
        _faces[2] = _faces[5];
        _faces[5] = _faces[4];
        _faces[5].Rotate(2);
        _faces[4] = tmp;
        _faces[4].Rotate(2);
    }

    this.Z = () => {
        _faces[2].Rotate(3);
        _faces[4].Rotate(1);

        var tmp = _faces[0];
        _faces[0] = _faces[1];
        _faces[0].Rotate(3);
        _faces[1] = _faces[5];
        _faces[1].Rotate(3);
        _faces[5] = _faces[3];
        _faces[5].Rotate(3);
        _faces[3] = tmp;
        _faces[3].Rotate(3);
    }

    this.Y = () => {
        _faces[0].Rotate(3);
        _faces[5].Rotate(1);

        var tmp = _faces[1];
        _faces[1] = _faces[2];
        _faces[2] = _faces[3];
        _faces[3] = _faces[4];
        _faces[4] = tmp;
    }

    this.Xi = () => triple(() => this.X());

    this.Zi = () => triple(() => this.Z());

    this.Yi = () => triple(() => this.Y());

    //Moves - Single face rotations
    this.U = () => {
        _faces[0].Rotate(3);
        shift(0, _faces);
        shift(1, _faces);
        shift(2, _faces);
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