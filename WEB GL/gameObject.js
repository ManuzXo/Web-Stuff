class GameObject {
    constructor(mesh) {
        this.mesh = mesh;
        this.Color = [1.0, 1.0, 1.0, 1.0];
        this.modelMatrix = mat4_.create();  // identità
        console.log("GameObject Class", this);
    }

    setPosition(x, y, z) {
        mat4_.fromTranslation(this.modelMatrix, [x, y, z]);
    }

    setRotation(angleRad, axis) {
        mat4_.fromRotation(this.modelMatrix, angleRad, axis);
    }

    setScale(sx, sy, sz) {
        mat4_.fromScaling(this.modelMatrix, [sx, sy, sz]);
    }

    Draw(gl, attribs, uniforms) {
        // bind buffers della mesh
        this.mesh.BindVertexBuffer(attribs.aPosition);
        // bind colori
        this.mesh.BindColorBuffer(attribs.aColor);
        // bind indices
        this.mesh.BindIndicesBuffer();

        // imposta uniform
        // gl.uniform4fv(uniforms.uGlobalColor, this.Color);
        gl.uniformMatrix4fv(uniforms.uModelMatrix, false, this.modelMatrix);

        // draw
        gl.drawElements(gl.TRIANGLES, this.mesh.indecesData.length, gl.UNSIGNED_SHORT, 0);
    }
}
