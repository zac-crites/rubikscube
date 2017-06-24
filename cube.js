
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

    this.FlipVertical = function(){
        this.Replace( 0, this.Replace(6, this.Get(0)));
        this.Replace( 1, this.Replace(5, this.Get(1)));
        this.Replace( 2, this.Replace(4, this.Get(2)));
    }

    this.Replace = function (i, value) {
        var tmp = this.Get(i);
        this.Cubelets[(i + (this.Rotation * 2)) % 8] = value;
        return tmp;
    }
}

function Cube() {
    this.Faces = [new Face(0), new Face(1), new Face(2), new Face(3), new Face(4), new Face(5)];

    function shift(i, f) {
        f[1].Replace(i, f[2].Replace(i, f[3].Replace(i, f[4].Replace(i, f[1].Get(i)))));
    }

    this.U = function () {
        this.Faces[0].Rotate(3);
        shift(0, this.Faces);
        shift(1, this.Faces);
        shift(2, this.Faces);
    }

    this.X = function() {
        this.Faces[1].Rotate(1);
        this.Faces[3].Rotate(3);

        var tmp = this.Faces[0];
        this.Faces[0] = this.Faces[2];
        this.Faces[2] = this.Faces[5];
        this.Faces[5] = this.Faces[4];
        this.Faces[5].FlipVertical();
        this.Faces[4] = tmp;
        tmp.FlipVertical();
    }

    this.Ui = function () {
        this.U();
        this.U();
        this.U();
    }
}

function CubeRenderer2d() {
    var size = 30;
    var margin = 5;
    var colors = ["#FF0000", "#FFFFFF", "#00FF00", "#FFFF00", "#0000FF", "#FFAA00"]
    var renderDiv = document.getElementById("cube2d");
    var cubelets = [];

    var Cubelet = function (x, y, getColor) {
        var newDiv = document.createElement("div");
        newDiv.style.position = 'absolute';
        newDiv.style.width = newDiv.style.height = size + "px";
        newDiv.style.border = "1px solid black";
        newDiv.style.top = y + "px";
        newDiv.style.left = x + "px";
        newDiv.style.backgroundColor = getColor();
        renderDiv.appendChild(newDiv);

        this.UpdateColor = function () { newDiv.style.backgroundColor = getColor(); };
    }


    this.Initialize = function (cube) {
        var createFace = function (x, y, i) {
            cubelets.push(new Cubelet(x, y, function () { return colors[cube.Faces[i].Get(0)] }));
            cubelets.push(new Cubelet(x + size + margin, y, function () { return colors[cube.Faces[i].Get(1)] }));
            cubelets.push(new Cubelet(x + (size + margin) * 2, y, function () { return colors[cube.Faces[i].Get(2)] }));
            cubelets.push(new Cubelet(x + (size + margin) * 2, y + (size + margin), function () { return colors[cube.Faces[i].Get(3)] }));
            cubelets.push(new Cubelet(x + (size + margin) * 2, y + (size + margin) * 2, function () { return colors[cube.Faces[i].Get(4)] }));
            cubelets.push(new Cubelet(x + size + margin, y + (size + margin) * 2, function () { return colors[cube.Faces[i].Get(5)] }));
            cubelets.push(new Cubelet(x, y + (size + margin) * 2, function () { return colors[cube.Faces[i].Get(6)] }));
            cubelets.push(new Cubelet(x, y + (size + margin), function () { return colors[cube.Faces[i].Get(7)] }));
            cubelets.push(new Cubelet(x + (size + margin), y + (size + margin), function () { return colors[cube.Faces[i].Center] }));
        }

        createFace(110, 5, 0);
        createFace(5, 110, 1);
        createFace(110, 110, 2);
        createFace(215, 110, 3);
        createFace(320, 110, 4);
        createFace(110, 215, 5);
    }

    this.UpdateCubelets = function () {
        cubelets.forEach(function (c) { c.UpdateColor(); });
    }
}

var renderer = new CubeRenderer2d();
var cube = new Cube();
console.log(cube);
renderer.Initialize(cube);

var xButton = document.getElementById("button-x");
xButton.onclick = function() 
{
     cube.X();
     renderer.UpdateCubelets();
};

var uButton = document.getElementById("button-u");
uButton.onclick = function() 
{
     cube.U();
     renderer.UpdateCubelets();
};
