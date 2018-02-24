import { ICameraControls } from "./CameraControls";
import { Hotkeys } from "./hotkeys";
import { ITurnable, Turn } from "./turnable";

export class StandardControlScheme {
    public register(hotkeys: Hotkeys, target: ITurnable, camera?: ICameraControls) {
        const targetBindings: Array<[string, string, Turn]> = [
            ["q", "Z'", Turn.Zi],
            ["w", "B", Turn.B],
            ["e", "L'", Turn.Li],
            ["r", "I'", Turn.Ii],
            ["y", "X", Turn.X],
            ["u", "r", Turn.r],
            ["i", "R", Turn.R],
            ["o", "B'", Turn.Bi],
            ["p", "Z", Turn.Z],
            ["a", "Y'", Turn.Yi],
            ["s", "D", Turn.D],
            ["d", "L", Turn.L],
            ["f", "U'", Turn.Ui],
            ["g", "F'", Turn.Fi],
            ["h", "F", Turn.F],
            ["j", "U", Turn.U],
            ["k", "R'", Turn.Ri],
            ["l", "D'", Turn.Di],
            [";", "Y", Turn.Y],
            ["v", "I", Turn.I],
            ["n", "X'", Turn.Xi],
            ["m", "r'", Turn.ri],
        ];

        if (camera) {
            hotkeys.setupButton("z", "📹", camera.resetCamera);
        }

        targetBindings.forEach((binding) => {
            hotkeys.setupButton(binding[0], binding[1], () => target.apply(binding[2]));
        });
    }

    public registerG1(hotkeys: Hotkeys, target: ITurnable, camera?: ICameraControls) {
        const targetBindings: Array<[string, string, Turn]> = [
            ["w", "B2", Turn.B2],
            ["e", "L2", Turn.L2],
            ["i", "R2", Turn.R2],
            ["o", "B2'", Turn.B2],
            ["a", "Y'", Turn.Yi],
            ["s", "D", Turn.D],
            ["d", "L2", Turn.L2],
            ["f", "U'", Turn.Ui],
            ["g", "F2", Turn.F2],
            ["h", "F2", Turn.F2],
            ["j", "U", Turn.U],
            ["l", "D'", Turn.Di],
            [";", "Y", Turn.Y],
            ["k", "R2", Turn.R2],
        ];

        if (camera) {
            hotkeys.setupButton("z", "📹", camera.resetCamera);
        }

        targetBindings.forEach((binding) => {
            hotkeys.setupButton(binding[0], binding[1], () => target.apply(binding[2]));
        });
    }
}
