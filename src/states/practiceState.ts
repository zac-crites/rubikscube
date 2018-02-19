import { State, StateContext } from "./state";
import { Turnable } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { CameraControls } from "../cameraControls";
import { StandardControlScheme } from "../standardControlScheme";
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
        new StandardControlScheme().register(this.hotkeys, this.cube, this.camera);
        this.hotkeys.setupButton("/", "🎲", () => {
            this.hotkeys.reset();
            new Scrambler().scramble(this.cube, 30);
            this.cube.waitForMoves().then(() => this.enter());
        });
    }

    public exit(): void {
    }
}