import { ITurnable, Turn } from "./turnable";

export class Scrambler {
    public scramble(cube: ITurnable, turns: number) {
        const faceMoves: Array<[Turn, Turn, Turn]> = [
            [Turn.U, Turn.Ui, Turn.U2],
            [Turn.D, Turn.Di, Turn.D2],
            [Turn.L, Turn.Li, Turn.L2],
            [Turn.R, Turn.Ri, Turn.R2],
            [Turn.F, Turn.Fi, Turn.F2],
            [Turn.B, Turn.Bi, Turn.B2],
        ];

        for (let i = 0; i < turns; i++) {
            const idx = Math.floor(Math.random() * (faceMoves.length - 1));
            const face = faceMoves[idx];
            faceMoves.splice(idx, 1);
            cube.apply(face[Math.floor(Math.random() * face.length)]);
            faceMoves.push(face);
        }
    }
}
