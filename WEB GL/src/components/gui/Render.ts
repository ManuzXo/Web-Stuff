import { mat4 } from "gl-matrix";
import Camera from "../objects/Camera";
import GameObject from "../objects/GameObject";
import ShaderManager from "../objects/ShaderManager";

export default class Render {
    shaderManager: ShaderManager;
    cameraEntity: Camera;
    shaderProgram: WebGLProgram;

    constructor() {
        Entitys.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        Entitys.gl = Entitys.canvas.getContext("webgl", { antialias: false, depth: true }) as WebGLRenderingContext;
        this.shaderManager = new ShaderManager(Entitys.gl);
        this.shaderProgram = this.shaderManager.buildShaderProgram("vertex-shader", "fragment-shader");

        Entitys.uModelMatrix = Entitys.gl.getUniformLocation(this.shaderProgram, "uModelMatrix") as WebGLUniformLocation;
        Entitys.aPosition = Entitys.gl.getAttribLocation(this.shaderProgram, "aPosition");
        Entitys.aColor = Entitys.gl.getAttribLocation(this.shaderProgram, "aColor");

        // this.gl.enableVertexAttribArray(this.aPosition);
        // this.gl.vertexAttribPointer(this.aPosition, 2, this.gl.FLOAT, false, 0, 0);

        Entitys.uGlobalColor = Entitys.gl.getUniformLocation(this.shaderProgram, "uGlobalColor") as WebGLUniformLocation;

        Entitys.uProjectionMatrix = Entitys.gl.getUniformLocation(this.shaderProgram, "uProjectionMatrix") as WebGLUniformLocation;
        Entitys.uViewMatrix = Entitys.gl.getUniformLocation(this.shaderProgram, "uViewMatrix") as WebGLUniformLocation;

        this.cameraEntity = new Camera();
        this.AdjustResolution();
        console.log("Render Class", this);
    }
    Render() {
        Entitys.gl.viewport(0, 0, Entitys.canvas.width, Entitys.canvas.height);
        Entitys.gl.clearColor(0.5, 0.5, 0.5, .5);
        Entitys.gl.clear(Entitys.gl.COLOR_BUFFER_BIT | Entitys.gl.DEPTH_BUFFER_BIT);

        Entitys.gl.enable(Entitys.gl.DEPTH_TEST);
        Entitys.gl.depthFunc(Entitys.gl.LEQUAL);
        Entitys.gl.useProgram(this.shaderProgram);

        // passa matrici globali
        Entitys.gl.uniformMatrix4fv(Entitys.uProjectionMatrix, false, this.cameraEntity.projectionMatrix);
        Entitys.gl.uniformMatrix4fv(Entitys.uViewMatrix, false, this.cameraEntity.viewMatrix);

        const aPosition = Entitys.aPosition;
        const aColor = Entitys.aColor;
        const uGlobalColor = Entitys.uGlobalColor;
        const uModelMatrix = Entitys.uModelMatrix;
        if (Entitys.GameObjects) {
            for (let obj of Entitys.GameObjects) {
                if (obj == undefined) continue;
                obj.Draw();
            }
        }
        requestAnimationFrame(this.Render.bind(this));
    }
    AdjustResolution() {
        const dpr = window.devicePixelRatio || 1;
        Entitys.canvas.width = Entitys.canvas.clientWidth * dpr;
        Entitys.canvas.height = Entitys.canvas.clientHeight * dpr;
        Entitys.gl.viewport(0, 0, Entitys.canvas.width, Entitys.canvas.height);

        mat4.perspective(
            this.cameraEntity.projectionMatrix,
            Math.PI / 4,
            Entitys.canvas.width / Entitys.canvas.height,
            0.1,
            100.0
        );

    }
}