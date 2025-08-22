import Mesh from "./Mesh";
import Transform from "./Transform";

export default class GameObject {
    mesh: Mesh;
    transform;
    constructor(mesh: Mesh) {
        this.mesh = mesh;
        this.transform = new Transform();
        console.log("GameObject Class", this);
    }

    Draw(attribs: any, uniforms: any) {
        const gl = this.mesh.gl;
        if (!gl) return;

        this.mesh.BindVertexBuffer(attribs.aPosition);
        this.mesh.BindColorBuffer(attribs.aColor);
        this.mesh.BindIndicesBuffer();

        gl.uniformMatrix4fv(uniforms.uModelMatrix, false, this.transform.modelMatrix);
        gl.drawElements(gl.TRIANGLES, this.mesh.indicesData.length, gl.UNSIGNED_SHORT, 0);
    }
}