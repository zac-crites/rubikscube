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
