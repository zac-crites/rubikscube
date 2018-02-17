import { Turnable } from "./turnable";
import { Cube } from "./cube";
import { Hotkeys } from "./hotkeys";
import { Scrambler } from "./scrambler";

declare var CubeRenderer;

export class Startup {
    public run(): number {

        let cube = new Cube();
        let scrambler = new Scrambler();
        scrambler.scramble(cube);

        let renderer3d = new CubeRenderer(cube);
        let buttons = new Hotkeys(<HTMLDivElement>(document.getElementById("buttons")));

        let cubeBindings: [string, string, () => void][] = [
            ["q", "Z'", renderer3d.Zi],
            ["w", "B", renderer3d.B],
            ["e", "L'", renderer3d.Li],
            ["r", "I'", renderer3d.Ii],
            ["y", "X", renderer3d.X],
            ["u", "r", renderer3d.r],
            ["i", "R", renderer3d.R],
            ["o", "B'", renderer3d.Bi],
            ["p", "Z", renderer3d.Z],

            ["a", "Y'", renderer3d.Yi],
            ["s", "D", renderer3d.D],
            ["d", "L", renderer3d.L],
            ["f", "U'", renderer3d.Ui],
            ["g", "F'", renderer3d.Fi],
            ["h", "F", renderer3d.F],
            ["j", "U", renderer3d.U],
            ["k", "R'", renderer3d.Ri],
            ["l", "D'", renderer3d.Di],
            [";", "Y", renderer3d.Y],

            ["z", "📹", renderer3d.ResetCamera],
            ["v", "I", renderer3d.I],
            ["n", "X'", renderer3d.Xi],
            ["m", "r'", renderer3d.ri],
        ];

        cubeBindings.forEach(binding => {
            buttons.setupButton(binding[0], binding[1], binding[2]);
        });

        return 0;
    }
}