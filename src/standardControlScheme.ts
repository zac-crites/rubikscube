import { Hotkeys } from "./hotkeys";
import { Turnable, Turn } from "./turnable";
import { CameraControls } from "./CameraControls";

export class StandardControlScheme {
    public register(hotkeys: Hotkeys, target: Turnable, camera?: CameraControls) {
        let targetBindings: [string, string, Turn][] = [
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

        targetBindings.forEach(binding => {
            hotkeys.setupButton(binding[0], binding[1], () => target.apply(binding[2]));
        });
    }
}