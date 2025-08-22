import { mat4 } from "gl-matrix";
import Camera from "../objects/Camera";
import GameObject from "../objects/GameObject";
import ShaderManager from "../objects/ShaderManager";

export default class Render {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    shaderManager: ShaderManager;
    shaderProgram: WebGLProgram;
    cameraEntity: Camera;
    // -- VERTEX SHADER --
    uModelMatrix: WebGLUniformLocation;
    uProjectionMatrix: WebGLUniformLocation;
    uViewMatrix: WebGLUniformLocation;
    aPosition: number;
    aColor: number;
    // -- FRAG SHADER --
    uGlobalColor: WebGLUniformLocation;

    refGameObjects: Array<GameObject> = [];
    constructor() {
        this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.gl = this.canvas.getContext("webgl", { antialias: false, depth: true }) as WebGLRenderingContext;
        this.shaderManager = new ShaderManager(this.gl);
        this.shaderProgram = this.shaderManager.buildShaderProgram("vertex-shader", "fragment-shader");

        this.uModelMatrix = this.gl.getUniformLocation(this.shaderProgram, "uModelMatrix") as WebGLUniformLocation;
        this.aPosition = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
        this.aColor = this.gl.getAttribLocation(this.shaderProgram, "aColor");

        // this.gl.enableVertexAttribArray(this.aPosition);
        // this.gl.vertexAttribPointer(this.aPosition, 2, this.gl.FLOAT, false, 0, 0);

        this.uGlobalColor = this.gl.getUniformLocation(this.shaderProgram, "uGlobalColor") as WebGLUniformLocation;

        this.uProjectionMatrix = this.gl.getUniformLocation(this.shaderProgram, "uProjectionMatrix") as WebGLUniformLocation;
        this.uViewMatrix = this.gl.getUniformLocation(this.shaderProgram, "uViewMatrix") as WebGLUniformLocation;

        this.cameraEntity = new Camera(this.canvas);
        this.AdjustResolution();
        console.log("Render Class", this);
    }
    SetGameObjects(objs: Array<GameObject>) {
        this.refGameObjects = objs;
    }
    Render() {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.5, 0.5, 0.5, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.useProgram(this.shaderProgram);

        // passa matrici globali
        this.gl.uniformMatrix4fv(this.uProjectionMatrix, false, this.cameraEntity.projectionMatrix);
        this.gl.uniformMatrix4fv(this.uViewMatrix, false, this.cameraEntity.viewMatrix);

        const aPosition = this.aPosition;
        const aColor = this.aColor;
        const uGlobalColor = this.uGlobalColor;
        const uModelMatrix = this.uModelMatrix;
        if (this.refGameObjects) {
            for (let obj of this.refGameObjects) {
                if (!obj) continue;
                obj.Draw({ aPosition, aColor }, { uGlobalColor, uModelMatrix });
            }
        }
        requestAnimationFrame(this.Render.bind(this));
    }
    AdjustResolution() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * dpr;
        this.canvas.height = this.canvas.clientHeight * dpr;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        mat4.perspective(
            this.cameraEntity.projectionMatrix,
            Math.PI / 4,
            this.canvas.width / this.canvas.height,
            0.1,
            100.0
        );

    }
}