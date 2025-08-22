export default class Color {
  data: Float32Array;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    this.data = new Float32Array([r, g, b, a]);
  }

  set(r: number, g: number, b: number, a: number) {
    this.data[0] = r;
    this.data[1] = g;
    this.data[2] = b;
    this.data[3] = a;
  }

  get r() { return this.data[0]; }
  get g() { return this.data[1]; }
  get b() { return this.data[2]; }
  get a() { return this.data[3]; }

  public static ToArray(array: Array<Color>): Float32Array {
    const flat = new Float32Array(array.length * 4);
    array.forEach((c, i) => {
      flat.set(c.data, i * 4);
    });
    return flat;
  }
}
