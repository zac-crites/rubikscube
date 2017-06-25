window.onload = function()
{
    var renderer = new CubeRenderer2d();
    var cube = new Cube();

    renderer.Initialize(cube);

    var buttons = document.getElementById("buttons");

    function addButton ( text, cubecommand )
    {
        var button = document.createElement("button");
        button.innerHTML = text;
        button.onclick = function()
        {
            cubecommand();
            renderer.UpdateCubelets();
        }
        buttons.appendChild( button );
    }

    addButton("X", () => cube.X() );
    addButton("X'", () => cube.Xi() );
    addButton("U", () => cube.U() );
    addButton("U'", () => cube.Ui() ); 
    addButton("Z", () => cube.Z() ); 
    addButton("Z'", () => cube.Zi() ); 
    addButton("F", () => cube.F() ); 
    addButton("F'", () => cube.Fi() ); 
};