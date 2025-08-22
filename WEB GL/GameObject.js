class GameObject {
    constructor(mesh) {
        this.mesh = mesh;
        this.Color = [1.0, 1.0, 1.0, 1.0];
        this.transform = new Transform();
        console.log("GameObject Class", this);
    }

    Draw(attribs, uniforms) {
        const gl = this.mesh.gl;
        if (!gl) return;

        this.mesh.BindVertexBuffer(attribs.aPosition);
        this.mesh.BindColorBuffer(attribs.aColor);
        this.mesh.BindIndicesBuffer();

        gl.uniformMatrix4fv(uniforms.uModelMatrix, false, this.transform.modelMatrix);
        gl.drawElements(gl.TRIANGLES, this.mesh.indecesData.length, gl.UNSIGNED_SHORT, 0);
    }
}