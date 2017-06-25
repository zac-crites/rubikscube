window.onload = function () {
    var renderer = new CubeRenderer2d();
    var cube = new Cube();

    renderer.Initialize(cube);

    var buttons = document.getElementById("buttons");

    function addButton(text, cubecommand) {
        var button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = function () {
            cubecommand();
            renderer.UpdateCubelets();
        }
        buttons.appendChild(button);
    }

    function addHeader( text ) {
        var e = document.createElement("div");
        e.style.cssFloat = "clear";
        var header = document.createElement("h3");
        header.innerHTML = text;
        buttons.appendChild(e);
        buttons.appendChild( header );
        buttons.appendChild(e);
    }

    addHeader("Single Edge Rotations");
    addButton("U", () => cube.U());
    addButton("U'", () => cube.Ui());
    addButton("L", () => cube.L());
    addButton("L'", () => cube.Li());
    addButton("F", () => cube.F());
    addButton("F'", () => cube.Fi());
    addButton("R", () => cube.R());
    addButton("R'", () => cube.Ri());
    addButton("B", () => cube.B());
    addButton("B'", () => cube.Bi());
    addButton("D", () => cube.D());
    addButton("D'", () => cube.Di());

    addHeader("Full Cube Rotations");
    addButton("X", () => cube.X());
    addButton("X'", () => cube.Xi());
    addButton("Y", () => cube.Y());
    addButton("Y'", () => cube.Yi());
    addButton("Z", () => cube.Z());
    addButton("Z'", () => cube.Zi());
};