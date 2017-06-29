function Cube() {

    //State
    var _faceLabels = ['U', 'L', 'F', 'R', 'B', 'D'];
    var _faces = [new Face(0), new Face(1), new Face(2), new Face(3), new Face(4), new Face(5)];

    function Face(n) {
        var _color = n;
        var _rotation = 0;
        var _facelets = [n, n, n, n, n, n, n, n];

        this.GetColor = () => _color;

        this.Get = (i) => _facelets[(i + (_rotation * 2)) % 8];

        this.Rotate = (i) => _rotation = (_rotation + i) % 4;

        this.Replace = (i, value) => {
            var tmp = this.Get(i);
            _facelets[(i + (_rotation * 2)) % 8] = value;
            return tmp;
        }

        this.IsSolved = () => !_facelets.some((facelet) => facelet != _color);
    }

    this.IsSolved = () => !_faces.some((face) => !face.IsSolved());

    this.GetFacelet = (label, i) => (i === undefined) ? _faces[_faceLabels.indexOf(label)].GetColor() : _faces[_faceLabels.indexOf(label)].Get(i);

    //Utils
    function shift(i, f) {
        f[1].Replace(i, f[2].Replace(i, f[3].Replace(i, f[4].Replace(i, f[1].Get(i)))));
    }

    function repeat(fn, n) {
        for (var i = 0; i < n; i++)
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

    this.X2 = () => repeat(() => this.X(), 2);

    this.Z2 = () => repeat(() => this.Z(), 2);

    this.Y2 = () => repeat(() => this.Y(), 2);

    this.Xi = () => repeat(() => this.X(), 3);

    this.Zi = () => repeat(() => this.Z(), 3);

    this.Yi = () => repeat(() => this.Y(), 3);

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

    this.U2 = () => repeat(() => this.U(), 2);

    this.F2 = () => repeat(() => this.F(), 2);

    this.L2 = () => repeat(() => this.L(), 2);

    this.R2 = () => repeat(() => this.R(), 2);

    this.B2 = () => repeat(() => this.B(), 2);

    this.D2 = () => repeat(() => this.D(), 2);

    this.Ui = () => repeat(() => this.U(), 3);

    this.Fi = () => repeat(() => this.F(), 3);

    this.Li = () => repeat(() => this.L(), 3);

    this.Ri = () => repeat(() => this.R(), 3);

    this.Bi = () => repeat(() => this.B(), 3);

    this.Di = () => repeat(() => this.D(), 3);
}