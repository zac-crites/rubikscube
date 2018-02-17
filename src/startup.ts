import { Turnable } from "./turnable";
import { Cube } from "./cube";

declare var CubeRenderer;
declare var KeyboardControls;

export class Startup {
    public run(): number {

        let cube = new Cube();
        let renderer3d = new CubeRenderer(cube);
        let buttons = new KeyboardControls();

        buttons.AddButton("Z'", () => renderer3d.Zi(), 81, "Q");
        buttons.AddButton("B", () => renderer3d.B(), 87, "W");
        buttons.AddButton("L'", () => renderer3d.Li(), 69, "E");
        buttons.AddButton("I'", () => renderer3d.Ii(), 82, "R");
        buttons.AddButton("", () => { }, 84, "T");
        buttons.AddButton("X", () => renderer3d.X(), 89, "Y");
        buttons.AddButton("r", () => renderer3d.r(), 85, "U");
        buttons.AddButton("R", () => renderer3d.R(), 73, "I");
        buttons.AddButton("B'", () => renderer3d.Bi(), 79, "O");
        buttons.AddButton("Z", () => renderer3d.Z(), 80, "P");
        buttons.AddButton("Y'", () => renderer3d.Yi(), 65, "A");
        buttons.AddButton("D", () => renderer3d.D(), 83, "S");
        buttons.AddButton("L", () => renderer3d.L(), 68, "D");
        buttons.AddButton("U'", () => renderer3d.Ui(), 70, "F");
        buttons.AddButton("F'", () => renderer3d.Fi(), 71, "G");
        buttons.AddButton("F", () => renderer3d.F(), 72, "H");
        buttons.AddButton("U", () => renderer3d.U(), 74, "J");
        buttons.AddButton("R'", () => renderer3d.Ri(), 75, "K");
        buttons.AddButton("D'", () => renderer3d.Di(), 76, "L");
        buttons.AddButton("Y", () => renderer3d.Y(), 186, ";");
        buttons.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
        buttons.AddButton("", () => { /*replay.EncodeMoveList()*/ }, 88, "X");
        buttons.AddButton("", () => { }, -1, "C");
        buttons.AddButton("I", () => renderer3d.I(), 86, "V");
        buttons.AddButton("", () => { }, -1, "B");
        buttons.AddButton("X'", () => renderer3d.Xi(), 78, "N");
        buttons.AddButton("r'", () => renderer3d.ri(), 77, "M");
        buttons.AddButton("", () => { }, -1, ",");
        buttons.AddButton("", () => { }, 190, ".");
        buttons.AddButton("", () => { /* Scramble(renderer3d)*/ }, 191, "/");

        return 0;
    }
}