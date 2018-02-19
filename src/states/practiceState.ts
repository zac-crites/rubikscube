import { State, StateContext } from "./state";
import { Turnable } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { CameraControls } from "../cameraControls";
import { StandardControls } from "../standardControls";
import { Scrambler } from "../scrambler";

export class PracticeState implements State {

    private cube: Turnable;
    private hotkeys: Hotkeys;
    private camera: CameraControls;

    public constructor(cube: Turnable, hotkeys: Hotkeys, camera: CameraControls) {
        this.cube = cube;
        this.hotkeys = hotkeys;
        this.camera = camera;
    }

    public enter(): void {
        var controls = new StandardControls(this.hotkeys);
        controls.register(this.cube, this.camera);
        this.hotkeys.setupButton("/", "🎲", () => new Scrambler().scramble(this.cube, 30));
    }

    public exit(): void {
    }
}