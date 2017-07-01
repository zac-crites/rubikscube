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

    this.Reset = () => _faces = [new Face(0), new Face(1), new Face(2), new Face(3), new Face(4), new Face(5)];

    this.IsSolved = () => !_faces.some((face) => !face.IsSolved());

    this.GetFacelet = (label, i) => (i === undefined) ? _faces[_faceLabels.indexOf(label)].GetColor() : _faces[_faceLabels.indexOf(label)].Get(i);

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
        return this;
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
        return this;
    }

    this.Y = () => {
        _faces[0].Rotate(3);
        _faces[5].Rotate(1);

        var tmp = _faces[1];
        _faces[1] = _faces[2];
        _faces[2] = _faces[3];
        _faces[3] = _faces[4];
        _faces[4] = tmp;
        return this;
    }

    this.X2 = () => this.X().X();

    this.Z2 = () => this.Z().Z();

    this.Y2 = () => this.Y().Y();

    this.Xi = () => this.X2().X();

    this.Zi = () => this.Z2().Z();

    this.Yi = () => this.Y2().Y();

    //Moves - Single face rotations
    var shift = (i, f) => {
        f[1].Replace(i, f[2].Replace(i, f[3].Replace(i, f[4].Replace(i, f[1].Get(i)))));
    }

    this.U = () => {
        _faces[0].Rotate(3);
        shift(0, _faces);
        shift(1, _faces);
        shift(2, _faces);
        return this;
    }

    this.F = () => this.X().U().Xi();

    this.L = () => this.Z().U().Zi();

    this.R = () => this.Zi().U().Z();

    this.B = () => this.Xi().U().X();

    this.D = () => this.X().F().Xi();

    this.U2 = () => this.U().U();

    this.F2 = () => this.F().F();

    this.L2 = () => this.L().L();

    this.R2 = () => this.R().R();

    this.B2 = () => this.B().B();

    this.D2 = () => this.D().D();

    this.Ui = () => this.U2().U();

    this.Fi = () => this.F2().F();

    this.Li = () => this.L2().L();

    this.Ri = () => this.R2().R();

    this.Bi = () => this.B2().B();

    this.Di = () => this.D2().D();
}