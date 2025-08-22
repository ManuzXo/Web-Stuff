import Render from "./gui/Render";
import GameObject from "./objects/GameObject";
import PyramidMesh3D from "./objects/PyramidMesh3D";
import SquareMesh3D from "./objects/SquareMesh3D";

export default class Scene{
    renderEntity: Render;
    gameObjects: Array<GameObject>;
    constructor() {
        this.renderEntity = new Render();
        this.gameObjects = [];
    }
    Init() {
        this.setupGameObjects();
        this.renderEntity.Render();
    }
    setupGameObjects() {
        const gl = this.renderEntity.gl;
        const firstSquare = new GameObject(new SquareMesh3D(gl));
        firstSquare.transform.setPosition(-2, 0, 0);
        
        const firstTriangle = new GameObject(new PyramidMesh3D(gl));
        firstTriangle.transform.setPosition(0, 0, 0);

        const secondSquare = new GameObject(new SquareMesh3D(gl));
        secondSquare.transform.setPosition(2, 0, 0);
        this.gameObjects = [
            firstSquare,
            firstTriangle,
            secondSquare,
        ];
        this.renderEntity.SetGameObjects(this.gameObjects);
    }
    AddGameObject(obj: GameObject){
        this.gameObjects.push(obj);
        obj.mesh.gl = this.renderEntity.gl;
        this.renderEntity.SetGameObjects(this.gameObjects);
    }
}