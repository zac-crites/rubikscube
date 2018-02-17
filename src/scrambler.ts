import { Turnable } from "./turnable";

export class Scrambler {
    public scramble(cube: Turnable) {
        let faceMoves: [() => void, () => void, () => void][] = [
            [cube.U, cube.Ui, cube.U2],
            [cube.D, cube.Di, cube.D2],
            [cube.L, cube.Li, cube.L2],
            [cube.R, cube.Ri, cube.R2],
            [cube.F, cube.Fi, cube.F2],
            [cube.B, cube.Bi, cube.B2],
        ];

        for (var i = 0; i < 30; i++) {
            var idx = Math.floor(Math.random() * (faceMoves.length - 1));
            var face = faceMoves[idx];
            faceMoves.splice(idx, 1);
            face[Math.floor(Math.random() * face.length)].bind(cube)();
            faceMoves.push(face);
        }
    }
}