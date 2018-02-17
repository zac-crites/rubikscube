import { State } from "./state";
import { Turnable } from "../turnable";
import { Hotkeys } from "../hotkeys";

export class SandboxState implements State {

    private cube:Turnable;
    private controls:Hotkeys;

    public constructor(cube: Turnable, controls: Hotkeys) {
        this.cube = cube;
        this.controls = controls;
    }

    public enter(): void {
        let cube = this.cube;
        let cubeBindings: [string, string, () => void][] = [
            ["q", "Z'", cube.Zi],
            ["w", "B", cube.B],
            ["e", "L'", cube.Li],
            ["r", "I'", cube.Ii],
            ["y", "X", cube.X],
            ["u", "r", cube.r],
            ["i", "R", cube.R],
            ["o", "B'", cube.Bi],
            ["p", "Z", cube.Z],
            ["a", "Y'", cube.Yi],
            ["s", "D", cube.D],
            ["d", "L", cube.L],
            ["f", "U'", cube.Ui],
            ["g", "F'", cube.Fi],
            ["h", "F", cube.F],
            ["j", "U", cube.U],
            ["k", "R'", cube.Ri],
            ["l", "D'", cube.Di],
            [";", "Y", cube.Y],
            ["v", "I", cube.I],
            ["n", "X'", cube.Xi],
            ["m", "r'", cube.ri],

           // ["z", "📹", renderer3d.ResetCamera],
        ];

        cubeBindings.forEach(binding => {
            this.controls.setupButton(binding[0], binding[1], binding[2]);
        });
    }

    public exit(): void {
        this.controls.reset();
    }
}