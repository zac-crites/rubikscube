function CubeRenderer2d() {
    var initialized = false;
    var size = 10;
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

        createFace(size*3 + margin *4, margin, 0);
        createFace(margin, size*3 + margin *4, 1);
        createFace(size*3 + margin *4, size*3 + margin *4, 2);
        createFace(size*6 + margin *7, size*3 + margin *4, 3);
        createFace(size*9 + margin *10, size*3 + margin *4, 4);
        createFace(size*3 + margin *4, size*6 + margin *7, 5);

        //Solved indicator
        cubelets.push( new Cubelet( margin, margin, () => cube.IsSolved() ? "#00FF00" : "#FF0000" ))

        initialized = true;
    }

    this.Reset = function ()
    {
        cubelets = [];
        while( renderDiv.firstChild )
            renderDiv.removeChild( renderDiv.firstChild );

        initialized = false;
    }

    this.UpdateCubelets = function () {
        cubelets.forEach(function (c) { c.UpdateColor(); });
    }

    this.IsInitialized = function () { return initialized; }
}
