import { mat4, vec3 } from "gl-matrix";

export default class Camera {
  projectionMatrix: mat4;
  viewMatrix: mat4;

  cameraPos: vec3;
  cameraFront: vec3;
  cameraUp: vec3;

  yaw: number;
  pitch: number;
  speed: number;
  sensitivity: number;

  private refCanvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.refCanvas = canvas;
    this.cameraPos = vec3.fromValues(0, 0, 5);
    this.cameraFront = vec3.fromValues(0, 0, -1); // direzione iniziale
    this.cameraUp = vec3.fromValues(0, 1, 0);

    this.yaw = -90.0; // gradi, inizia guardando verso -Z
    this.pitch = 0.0;
    this.speed = 0.1;
    this.sensitivity = 0.1;

    this.projectionMatrix = mat4.create();
    this.viewMatrix = mat4.create();

    mat4.perspective(
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

  private addKeyboardListener() {
    const keys: Record<string, boolean> = {};
    document.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
    document.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

    const move = () => {
      const front = vec3.normalize(vec3.create(), this.cameraFront);

      const right = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), front, this.cameraUp));

      if (keys["w"]) vec3.scaleAndAdd(this.cameraPos, this.cameraPos, front, this.speed);
      if (keys["s"]) vec3.scaleAndAdd(this.cameraPos, this.cameraPos, front, -this.speed);
      if (keys["a"]) vec3.scaleAndAdd(this.cameraPos, this.cameraPos, right, -this.speed);
      if (keys["d"]) vec3.scaleAndAdd(this.cameraPos, this.cameraPos, right, this.speed);

      this.updateCamera();
      requestAnimationFrame(move);
    };
    move();
  }

  private addMouseListener() {
    const requestPointerLock =
      this.refCanvas.requestPointerLock ||
      (this.refCanvas as any).mozRequestPointerLock;

    this.refCanvas.onclick = () => {
      requestPointerLock.call(this.refCanvas);
    };

    document.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === this.refCanvas) {
        this.yaw += e.movementX * this.sensitivity;
        this.pitch -= e.movementY * this.sensitivity;

        // direzione
        const fx =
          Math.cos(this.radians(this.yaw)) * Math.cos(this.radians(this.pitch));
        const fy = Math.sin(this.radians(this.pitch));
        const fz =
          Math.sin(this.radians(this.yaw)) * Math.cos(this.radians(this.pitch));

        this.cameraFront = vec3.normalize(vec3.create(), vec3.fromValues(fx, fy, fz));

        this.updateCamera();
      }
    });
  }

  private updateCamera() {
    const target = vec3.add(vec3.create(), this.cameraPos, this.cameraFront);
    mat4.lookAt(this.viewMatrix, this.cameraPos, target, this.cameraUp);
  }

  private radians(deg: number) {
    return (deg * Math.PI) / 180.0;
  }
}
