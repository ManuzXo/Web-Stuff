class Mesh {
    gl;

    vertexData;
    indecesData;
    colorData;

    indexBuffer;
    vertexBuffer;
    colorBuffer;

    constructor(_gl, vtxData, indData, clrData) {
        this.gl = _gl;
        this.vertexData = vtxData;
        this.indecesData = indData;
        this.colorData = clrData;
        this.SetupVertexBuffer();
        this.SetupIndicesBuffer();
        this.SetupColorBuffer();
        console.log("Mesh Class", this);
    }
    SetupVertexBuffer() {
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertexData, this.gl.STATIC_DRAW);
    }
    SetupIndicesBuffer() {
        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indecesData, this.gl.STATIC_DRAW);
    }
    SetupColorBuffer() {
        if (this.colorData) {
            this.colorBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colorData, this.gl.STATIC_DRAW);
        }
    }
    BindVertexBuffer(aPosition) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(aPosition, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(aPosition);
    }
    BindColorBuffer(aColor) {
        if (this.colorBuffer) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
            this.gl.vertexAttribPointer(aColor, 4, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(aColor);
        }
    }
    BindIndicesBuffer() {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    }
}
class SquareMesh3D extends Mesh {
    constructor(_gl) {
        super(_gl, SquareMesh3D.GetVertex(), SquareMesh3D.GetIndices(), SquareMesh3D.GetColors());
    }
    static GetVertex() {
        return new Float32Array([
            // Triangolo 0 (Front face)
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,

            // Triangolo 1 (Front face)
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,

            // Triangolo 2 (Right face)
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,

            // Triangolo 3 (Right face)
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,

            // Triangolo 4 (Back face)
            0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,

            // Triangolo 5 (Back face)
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,

            // Triangolo 6 (Left face)
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,

            // Triangolo 7 (Left face)
            -0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,

            // Triangolo 8 (Top face)
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,

            // Triangolo 9 (Top face)
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,

            // Triangolo 10 (Bottom face)
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,

            // Triangolo 11 (Bottom face)
            0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5
        ]);
    }

    static GetColors() {
        return new Float32Array([
            // 12 triangoli × 3 vertici × 4 componenti (RGBA)
            // Triangolo 0: rosso
            1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
            // Triangolo 1: verde
            0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
            // Triangolo 2: blu
            0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,
            // Triangolo 3: giallo
            1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1,
            // Triangolo 4: cyan
            0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
            // Triangolo 5: magenta
            1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1,
            // Triangolo 6: arancione
            1, 0.5, 0, 1, 1, 0.5, 0, 1, 1, 0.5, 0, 1,
            // Triangolo 7: rosa
            1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1,
            // Triangolo 8: viola
            0.5, 0, 0.5, 1, 0.5, 0, 0.5, 1, 0.5, 0, 0.5, 1,
            // Triangolo 9: grigio
            0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 0.5, 1,
            // Triangolo 10: marrone
            0.5, 0.25, 0, 1, 0.5, 0.25, 0, 1, 0.5, 0.25, 0, 1,
            // Triangolo 11: bianco
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ]);
    }

    static GetIndices() {
        // Ogni triangolo ha i propri vertici, quindi gli indici sono semplici sequenze
        return new Uint16Array([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
        ]);
    }
}

class PyramidMesh3D extends Mesh {
    constructor(_gl) {
        super(_gl, PyramidMesh3D.GetVertex(), PyramidMesh3D.GetIndices(), PyramidMesh3D.GetColors());
    }

    static GetVertex() {
        return new Float32Array([
            -0.5, 0.0, -0.5,
            0.5, 0.0, -0.5,
            0.5, 0.0, 0.5,
            -0.5, 0.0, 0.5,
            0.0, 1.0, 0.0
        ]);
    }

    static GetColors() {
        return new Float32Array([
            1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1
        ]);
    }

    static GetIndices() {
        return new Uint16Array([
            0, 1, 2, 2, 3, 0,
            0, 1, 4,
            1, 2, 4,
            2, 3, 4,
            3, 0, 4
        ]);
    }
}


