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


  constructor() {
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
      Entitys.canvas.width / Entitys.canvas.height,
      0.1,
      100.0
    );

    this.updateCamera();
    this.addKeyboardListener();
    this.addMouseListener();
    this.addTouchControls();
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
      Entitys.canvas.requestPointerLock ||
      (Entitys.canvas as any).mozRequestPointerLock;

    Entitys.canvas.onclick = () => {
      requestPointerLock.call(Entitys.canvas);
    };

    document.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === Entitys.canvas) {
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
  private addTouchControls() {
    let lastX = 0;
    let lastY = 0;
    let touching = false;

    // Rotazione swipe
    Entitys.canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touching = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      }
    });

    Entitys.canvas.addEventListener("touchmove", (e) => {
      if (!touching || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastX;
      const deltaY = touch.clientY - lastY;
      lastX = touch.clientX;
      lastY = touch.clientY;

      this.yaw += deltaX * this.sensitivity;
      this.pitch -= deltaY * this.sensitivity;
      this.pitch = Math.max(-89, Math.min(89, this.pitch));

      const fx = Math.cos(this.radians(this.yaw)) * Math.cos(this.radians(this.pitch));
      const fy = Math.sin(this.radians(this.pitch));
      const fz = Math.sin(this.radians(this.yaw)) * Math.cos(this.radians(this.pitch));
      this.cameraFront = vec3.normalize(vec3.create(), vec3.fromValues(fx, fy, fz));

      this.updateCamera();
    });

    Entitys.canvas.addEventListener("touchend", () => { touching = false; });
    Entitys.canvas.addEventListener("touchcancel", () => { touching = false; });

    // Movimento avanti/indietro con area touch a sinistra/destra
    Entitys.canvas.addEventListener("touchmove", (e) => {
      if (e.touches.length !== 2) return; // usa due dita per movimento
      const front = vec3.normalize(vec3.create(), this.cameraFront);
      const right = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), front, this.cameraUp));

      const deltaY = e.touches[0].clientY - e.touches[1].clientY;
      vec3.scaleAndAdd(this.cameraPos, this.cameraPos, front, deltaY * 0.01); // avanti/indietro
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
