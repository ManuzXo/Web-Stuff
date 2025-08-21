
class Scene {
    renderEntity;
    gameObjects;
    constructor() {
        this.renderEntity = new Render();
        this.setupGameObjects();
    }
    Init() {
        this.renderEntity.Render();
    }
    setupGameObjects() {
        const gl = this.renderEntity.gl;
        const firstSquare = new GameObject(new SquareMesh3D(gl));
        firstSquare.setPosition(-2, 0, 0);
        
        const firstTriangle = new GameObject(new PyramidMesh3D(gl));
        firstTriangle.setPosition(0, 0, 0);

        const secondSquare = new GameObject(new SquareMesh3D(gl));
        secondSquare.setPosition(2, 0, 0);
        this.gameObjects = [
            firstSquare,
            firstTriangle,
            secondSquare,
        ];
        this.renderEntity.SetGameObjects(this.gameObjects);
    }
}