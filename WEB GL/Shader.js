class Shader {
    gl;
    constructor(_gl) {
        this.gl = _gl;
    }
    buildShaderProgram(vertexDomId, fragmentDomId) {
        const program = this.gl.createProgram();

        const vertexShader = this.compileShader(vertexDomId, this.gl.VERTEX_SHADER);
        if(vertexShader){
            this.gl.attachShader(program, vertexShader);
        }

        const fragmentShader = this.compileShader(fragmentDomId, this.gl.FRAGMENT_SHADER);
        if (fragmentShader) {
            this.gl.attachShader(program, fragmentShader);
        }

        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.log("Error linking shader program:");
            console.log(this.gl.getProgramInfoLog(program));
        }
        return program;
    }
    compileShader(id, type) {
        const code = document.getElementById(id).firstChild.nodeValue;
        const shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, code);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.log(
                `Error compiling ${type === this.gl.VERTEX_SHADER ? "vertex" : "fragment"
                } shader:`,
            );
            console.log(this.gl.getShaderInfoLog(shader));
        }
        return shader;
    }
}