window.onload = function()
{
    var renderer = new CubeRenderer2d();
    var cube = new Cube();
    renderer.Initialize(cube);

    var xButton = document.getElementById("button-x");
    xButton.onclick = function () {
        cube.X();
        renderer.UpdateCubelets();
    };

    var uButton = document.getElementById("button-u");
    uButton.onclick = function () {
        cube.U();
        renderer.UpdateCubelets();
    };
};