import { mat4, vec3, quat, ReadonlyVec3 } from "gl-matrix";

export default class Transform {
  position: vec3;
  rotation: quat;
  scale: vec3;
  modelMatrix: mat4;

  constructor() {
    this.position = vec3.create();
    this.rotation = quat.create(); // [0,0,0,1]
    this.scale = vec3.fromValues(1, 1, 1); // scala iniziale 1
    this.modelMatrix = mat4.create();
    this.updateModelMatrix();
  }

  // ---- SETTERS ----
  setPosition(x: number, y: number, z: number) {
    vec3.set(this.position, x, y, z);
    this.updateModelMatrix();
  }

  setRotation(angleRad: number, axis: ReadonlyVec3) {
    quat.setAxisAngle(this.rotation, axis, angleRad);
    this.updateModelMatrix();
  }

  setScale(sx: number, sy: number, sz: number) {
    vec3.set(this.scale, sx, sy, sz);
    this.updateModelMatrix();
  }

  // ---- GETTERS ----
  getPosition(): vec3 {
    return vec3.clone(this.position);
  }

  getRotation(): quat {
    return quat.clone(this.rotation);
  }

  getScale(): vec3 {
    return vec3.clone(this.scale);
  }

  // ---- UPDATE MODEL MATRIX ----
  updateModelMatrix() {
    mat4.fromRotationTranslationScale(
      this.modelMatrix,
      this.rotation,
      this.position,
      this.scale
    );
  }
}
