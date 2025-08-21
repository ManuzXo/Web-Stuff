
class Render {
    canvas;
    gl;
    shaderManager;
    shaderProgram;
    cameraEntity;
    // -- VERTEX SHADER --
    uModelMatrix;
    uProjectionMatrix;
    uViewMatrix;
    aPosition;
    aColor;
    // -- FRAG SHADER --
    uGlobalColor;

    refGameObjects;
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.gl = this.canvas.getContext("webgl", { antialias: false, depth: true });
        this.shaderManager = new Shader(this.gl);
        this.shaderProgram = this.shaderManager.buildShaderProgram("vertex-shader", "fragment-shader");

        this.uModelMatrix = this.gl.getUniformLocation(this.shaderProgram, "uModelMatrix");
        this.aPosition = this.gl.getAttribLocation(this.shaderProgram, "aPosition");
        this.aColor = this.gl.getAttribLocation(this.shaderProgram, "aColor");

        // this.gl.enableVertexAttribArray(this.aPosition);
        // this.gl.vertexAttribPointer(this.aPosition, 2, this.gl.FLOAT, false, 0, 0);

        this.uGlobalColor = this.gl.getUniformLocation(this.shaderProgram, "uGlobalColor");

        this.uProjectionMatrix = this.gl.getUniformLocation(this.shaderProgram, "uProjectionMatrix");
        this.uViewMatrix = this.gl.getUniformLocation(this.shaderProgram, "uViewMatrix");

        this.cameraEntity = new Camera(this.canvas);
        console.log("Render Class", this);
    }
    SetGameObjects(objs) {
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
        for (let obj of this.refGameObjects) {
            obj.Draw(this.gl, { aPosition, aColor }, { uGlobalColor, uModelMatrix });
        }
        requestAnimationFrame(this.Render.bind(this));
    }
}