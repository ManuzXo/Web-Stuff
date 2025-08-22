import Color from "../../utils/Color";

export default class Mesh {
  vertexData: Float32Array;
  indicesData: Uint16Array;
  colorData: Color[];

  vertexBuffer: WebGLBuffer | null = null;
  indexBuffer: WebGLBuffer | null = null;
  colorBuffer: WebGLBuffer | null = null;

  constructor(
    vtxData: Float32Array,
    indData: Uint16Array,
    clrData: Color[]
  ) {
    this.vertexData = vtxData;
    this.indicesData = indData;
    this.colorData = clrData;

    this.SetupAll();
    console.log("Mesh Class", this);
  }

  private SetupAll() {
    if (!Entitys.gl) return;
    this.SetupVertexBuffer();
    this.SetupIndicesBuffer();
    this.SetupColorBuffer();
  }

  private SetupVertexBuffer() {
    this.vertexBuffer = Entitys.gl.createBuffer();
    Entitys.gl.bindBuffer(Entitys.gl.ARRAY_BUFFER, this.vertexBuffer);
    Entitys.gl.bufferData(Entitys.gl.ARRAY_BUFFER, this.vertexData, Entitys.gl.STATIC_DRAW);
  }

  private SetupIndicesBuffer() {
    this.indexBuffer = Entitys.gl.createBuffer();
    Entitys.gl.bindBuffer(Entitys.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    Entitys.gl.bufferData(Entitys.gl.ELEMENT_ARRAY_BUFFER, this.indicesData, Entitys.gl.STATIC_DRAW);
  }

  private SetupColorBuffer() {
    if (this.colorData) {
      this.colorBuffer = Entitys.gl.createBuffer();
      Entitys.gl.bindBuffer(Entitys.gl.ARRAY_BUFFER, this.colorBuffer);
      Entitys.gl.bufferData(
        Entitys.gl.ARRAY_BUFFER,
        Color.ToArray(this.colorData),
        Entitys.gl.STATIC_DRAW
      );
    }
  }

  public BindVertexBuffer(aPosition: number) {
    if (!this.vertexBuffer) return;
    Entitys.gl.bindBuffer(Entitys.gl.ARRAY_BUFFER, this.vertexBuffer);
    Entitys.gl.vertexAttribPointer(aPosition, 3, Entitys.gl.FLOAT, false, 0, 0);
    Entitys.gl.enableVertexAttribArray(aPosition);
  }

  public BindColorBuffer(aColor: number) {
    if (!this.colorBuffer) return;
    Entitys.gl.bindBuffer(Entitys.gl.ARRAY_BUFFER, this.colorBuffer);
    Entitys.gl.vertexAttribPointer(aColor, 4, Entitys.gl.FLOAT, false, 0, 0);
    Entitys.gl.enableVertexAttribArray(aColor);
  }

  public BindIndicesBuffer() {
    if (!this.indexBuffer) return;
    Entitys.gl.bindBuffer(Entitys.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  }
}
