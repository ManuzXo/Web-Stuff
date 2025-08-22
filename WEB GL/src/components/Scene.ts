import Render from "./gui/Render";
import GameObject from "./objects/GameObject";
import PyramidMesh3D from "./objects/PyramidMesh3D";
import SquareMesh3D from "./objects/SquareMesh3D";

export default class Scene{
    renderEntity: Render;
    constructor() {
        this.renderEntity = new Render();
    }
    Init() {
        this.setupGameObjects();
        this.renderEntity.Render();
    }
    setupGameObjects() {
        const firstSquare = new GameObject(new SquareMesh3D());
        firstSquare.transform.setPosition(-2, 0, 0);
        
        const firstTriangle = new GameObject(new PyramidMesh3D());
        firstTriangle.transform.setPosition(0, 0, 0);

        const secondSquare = new GameObject(new SquareMesh3D());
        secondSquare.transform.setPosition(2, 0, 0);
        Entitys.GameObjects = [
            firstSquare,
            firstTriangle,
            secondSquare,
        ];
    }
    AddGameObject(obj: GameObject){
        Entitys.GameObjects.push(obj);
    }
}