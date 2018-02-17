import { Hotkeys } from "./hotkeys";
import { Turnable } from "./turnable";
import { CameraControls } from "./CameraControls";

export class StandardControls {

    private hotkeys: Hotkeys;
    public constructor(hotkey: Hotkeys) {
        this.hotkeys = hotkey;
    }

    public register(target: Turnable, camera?: CameraControls) {
        let targetBindings: [string, string, () => void][] = [
            ["q", "Z'", target.Zi],
            ["w", "B", target.B],
            ["e", "L'", target.Li],
            ["r", "I'", target.Ii],
            ["y", "X", target.X],
            ["u", "r", target.r],
            ["i", "R", target.R],
            ["o", "B'", target.Bi],
            ["p", "Z", target.Z],
            ["a", "Y'", target.Yi],
            ["s", "D", target.D],
            ["d", "L", target.L],
            ["f", "U'", target.Ui],
            ["g", "F'", target.Fi],
            ["h", "F", target.F],
            ["j", "U", target.U],
            ["k", "R'", target.Ri],
            ["l", "D'", target.Di],
            [";", "Y", target.Y],
            ["v", "I", target.I],
            ["n", "X'", target.Xi],
            ["m", "r'", target.ri],
            // ["/", "🎲", () => this.context.setState(this.context.scramblerState)]
        ];

        if( camera ){
            targetBindings.push(["z", "📹", camera.resetCamera] );
        }

        targetBindings.forEach(binding => {
            this.hotkeys.setupButton(binding[0], binding[1], binding[2]);
        });
    }

    public reset() {
        this.hotkeys.reset();
    }
}