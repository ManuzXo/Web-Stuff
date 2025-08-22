// globals.ts
import GameObject from "./components/objects/GameObject";

export {};

declare global {
  var Entitys: {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    // -- VERTEX SHADER --
    uModelMatrix: WebGLUniformLocation;
    uProjectionMatrix: WebGLUniformLocation;
    uViewMatrix: WebGLUniformLocation;
    aPosition: number;
    aColor: number;
    // -- FRAG SHADER --
    uGlobalColor: WebGLUniformLocation;

    GameObjects: GameObject[];
  };
}

// inizializzazione reale
if (!globalThis.Entitys) {
  globalThis.Entitys = {
    canvas: null as any,
    gl: null as any,
    uModelMatrix: null as any,
    uProjectionMatrix: null as any,
    uViewMatrix: null as any,
    aPosition: 0,
    aColor: 0,
    uGlobalColor: null as any,
    GameObjects: []
  };
}
