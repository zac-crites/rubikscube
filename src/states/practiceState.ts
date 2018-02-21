import { ICameraControls } from "../cameraControls";
import { Hotkeys } from "../hotkeys";
import { Scrambler } from "../scrambler";
import { StandardControlScheme } from "../standardControlScheme";
import { ITurnable } from "../turnable";
import { IState } from "./state";

export class PracticeState implements IState {

    private cube: ITurnable;
    private hotkeys: Hotkeys;
    private camera: ICameraControls;

    public constructor(cube: ITurnable, hotkeys: Hotkeys, camera: ICameraControls) {
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
        return;
    }
}
