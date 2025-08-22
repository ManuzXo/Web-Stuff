import Mesh from "./Mesh";
import Color from "../../utils/Color";

export default class SquareMesh3D extends Mesh {
  constructor() {
    super(
      SquareMesh3D.GetVertex(),
      SquareMesh3D.GetIndices(),
      SquareMesh3D.GetColors()
    );
  }

  static GetVertex(): Float32Array {
    return new Float32Array([
      // (stessi dati che hai scritto, li lascio invariati)
      -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
      0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
      0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
      0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5,
      0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
      -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5,
      -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5,
      -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5,
      -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5,
      0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
      -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5,
      0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5
    ]);
  }

  static GetColors(): Color[] {
    const baseColors = [
      [1, 0, 0, 1],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
      [1, 1, 0, 1],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
      [1, 0.5, 0, 1],
      [1, 0.5, 0.5, 1],
      [0.5, 0, 0.5, 1],
      [0.5, 0.5, 0.5, 1],
      [0.5, 0.25, 0, 1],
      [1, 1, 1, 1],
    ];

    const colors: Color[] = [];

    baseColors.forEach(c => {
      for (let i = 0; i < 3; i++) { // 3 vertici per triangolo
        colors.push(new Color(c[0], c[1], c[2], c[3]));
      }
    });

    return colors; // 12 colori × 3 vertici = 36
  }

  static GetIndices(): Uint16Array {
    return new Uint16Array([
      0, 1, 2, 3, 4, 5,
      6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17,
      18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35
    ]);
  }
}
