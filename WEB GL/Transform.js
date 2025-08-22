class Transform {
    constructor() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0, 1]; // quaternione [x, y, z, w]
        this.scale = [1, 1, 1];
        this.modelMatrix = mat4_.create();
        this.updateModelMatrix();
    }

    // ---- SETTERS ----
    setPosition(x, y, z) {
        this.position = [x, y, z];
        this.updateModelMatrix();
    }

    setRotation(angleRad, axis) {
        // converte angolo/asse in quaternione
        let q = [0, 0, 0, 1];
        mat4_.fromRotation(q, angleRad, axis); // oppure usa libreria quaternioni
        this.rotation = q;
        this.updateModelMatrix();
    }

    setScale(sx, sy, sz) {
        this.scale = [sx, sy, sz];
        this.updateModelMatrix();
    }

    // ---- GETTERS ----
    getPosition() {
        return this.position.slice();
    }

    getRotation() {
        return this.rotation.slice();
    }

    getScale() {
        return this.scale.slice();
    }

    // ---- UPDATE MODEL MATRIX ----
    updateModelMatrix() {
        // ricostruisce modelMatrix combinando posizione, rotazione e scala
        mat4_.fromRotationTranslationScale(
            this.modelMatrix,
            this.rotation,
            this.position,
            this.scale
        );
    }
}