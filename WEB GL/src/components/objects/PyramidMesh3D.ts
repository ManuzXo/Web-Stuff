import Color from "../../utils/Color";
import Mesh from "./Mesh";

export default class PyramidMesh3D extends Mesh {
  constructor() {
    super(
      PyramidMesh3D.GetVertex(),
      PyramidMesh3D.GetIndices(),
      PyramidMesh3D.GetColors()
    );
  }

  static GetVertex(): Float32Array {
    return new Float32Array([
      -0.5, 0.0, -0.5,
       0.5, 0.0, -0.5,
       0.5, 0.0,  0.5,
      -0.5, 0.0,  0.5,
       0.0, 1.0,  0.0
    ]);
  }

  static GetColors(): Color[] {
    return [
      new Color(1, 0, 0, 1),
      new Color(0, 1, 0, 1),
      new Color(0, 0, 1, 1),
      new Color(1, 1, 0, 1),
      new Color(1, 0, 1, 1)
    ];
  }

  static GetIndices(): Uint16Array {
    return new Uint16Array([
      0, 1, 2, 2, 3, 0,
      0, 1, 4,
      1, 2, 4,
      2, 3, 4,
      3, 0, 4
    ]);
  }
}
