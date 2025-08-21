class Camera {
    projectionMatrix;
    viewMatrix;

    cameraPos;
    cameraFront;
    cameraUp;

    yaw;
    pitch;
    speed;
    sensitivity;

    refCanvas;
    constructor(canvas) {
        this.refCanvas = canvas;
        this.cameraPos = [0, 0, 5];
        this.cameraFront = [0, 0, -1]; // direzione iniziale
        this.cameraUp = [0, 1, 0];

        this.yaw = -90.0;   // gradi, inizia guardando verso -Z
        this.pitch = 0.0;
        this.speed = 0.1;
        this.sensitivity = 0.10;

        this.projectionMatrix = mat4_.create();
        this.viewMatrix = mat4_.create();
        mat4_.perspective(
            this.projectionMatrix,
            Math.PI / 4,
            this.refCanvas.width / this.refCanvas.height,
            0.1,
            100.0
        );

        this.updateCamera();
        this.addKeyboardListener();
        this.addMouseListener();
    }

    addKeyboardListener() {
        const keys = {};
        document.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
        document.addEventListener("keyup",   (e) => keys[e.key.toLowerCase()] = false);

        const move = () => {
            let front = vec3_.fromValues(...this.cameraFront);
            vec3_.normalize(front, front);

            let right = vec3_.create();
            vec3_.cross(right, front, this.cameraUp);
            vec3_.normalize(right, right);

            if (keys["w"]) vec3_.scaleAndAdd(this.cameraPos, this.cameraPos, front, this.speed);
            if (keys["s"]) vec3_.scaleAndAdd(this.cameraPos, this.cameraPos, front, -this.speed);
            if (keys["a"]) vec3_.scaleAndAdd(this.cameraPos, this.cameraPos, right, -this.speed);
            if (keys["d"]) vec3_.scaleAndAdd(this.cameraPos, this.cameraPos, right, this.speed);

            this.updateCamera();
            requestAnimationFrame(move);
        };
        move();
    }

    addMouseListener() {
        this.refCanvas.requestPointerLock = this.refCanvas.requestPointerLock || this.refCanvas.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

        this.refCanvas.onclick = () => {
            this.refCanvas.requestPointerLock();
        };

        document.addEventListener("mousemove", (e) => {
            if (document.pointerLockElement === this.refCanvas) {
                this.yaw   += e.movementX * this.sensitivity;
                this.pitch -= e.movementY * this.sensitivity;

                // 👉 niente più clamp, UFO può guardare ovunque
                // calcolo della direzione
                let fx = Math.cos(this.radians(this.yaw)) * Math.cos(this.radians(this.pitch));
                let fy = Math.sin(this.radians(this.pitch));
                let fz = Math.sin(this.radians(this.yaw)) * Math.cos(this.radians(this.pitch));

                this.cameraFront = [fx, fy, fz];
                vec3_.normalize(this.cameraFront, this.cameraFront);

                this.updateCamera();
            }
        });
    }

    updateCamera() {
        let target = vec3_.create();
        vec3_.add(target, this.cameraPos, this.cameraFront);
        mat4_.lookAt(this.viewMatrix, this.cameraPos, target, this.cameraUp);
    }

    radians(deg) {
        return deg * Math.PI / 180.0;
    }
}
