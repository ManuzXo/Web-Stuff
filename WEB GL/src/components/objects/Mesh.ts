import Color from "../../utils/Color";

export default class Mesh {
  gl: WebGLRenderingContext;
  vertexData: Float32Array;
  indicesData: Uint16Array;
  colorData: Color[];

  vertexBuffer: WebGLBuffer | null = null;
  indexBuffer: WebGLBuffer | null = null;
  colorBuffer: WebGLBuffer | null = null;

  constructor(
    _gl: WebGLRenderingContext,
    vtxData: Float32Array,
    indData: Uint16Array,
    clrData: Color[]
  ) {
    this.gl = _gl;
    this.vertexData = vtxData;
    this.indicesData = indData;
    this.colorData = clrData;

    this.SetupAll();
    console.log("Mesh Class", this);
  }

  private SetupAll() {
    if (!this.gl) return;
    this.SetupVertexBuffer();
    this.SetupIndicesBuffer();
    this.SetupColorBuffer();
  }

  private SetupVertexBuffer() {
    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexData, this.gl.STATIC_DRAW);
  }

  private SetupIndicesBuffer() {
    this.indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indicesData, this.gl.STATIC_DRAW);
  }

  private SetupColorBuffer() {
    if (this.colorData) {
      this.colorBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        Color.ToArray(this.colorData),
        this.gl.STATIC_DRAW
      );
    }
  }

  public BindVertexBuffer(aPosition: number) {
    if (!this.vertexBuffer) return;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.vertexAttribPointer(aPosition, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(aPosition);
  }

  public BindColorBuffer(aColor: number) {
    if (!this.colorBuffer) return;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
    this.gl.vertexAttribPointer(aColor, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(aColor);
  }

  public BindIndicesBuffer() {
    if (!this.indexBuffer) return;
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  }
}
