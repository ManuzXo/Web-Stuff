class OBJLoader {
    constructor() {
        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const text = await file.text();
            const objData = this.parseOBJ(text);

            // Passa anche i colori al Mesh
            const mesh = new Mesh(undefined, objData.vertices, objData.indices, objData.colors);
            sceneEntity.AddGameObject(new GameObject(mesh));
            mesh.SetupAll();
            console.log('Vertices:', objData.vertices);
            console.log('Indices:', objData.indices);
            console.log('Colors:', objData.colors);
        });
    }
    
    parseOBJ(data) {
        const vertices = [];
        const indices = [];
        const colors = [];
        const tempVertices = [];
        const tempColors = [];

        const lines = data.split('\n');
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('v ')) {
                const parts = line.split(/\s+/);
                const x = parseFloat(parts[1]);
                const y = parseFloat(parts[2]);
                const z = parseFloat(parts[3]);
                tempVertices.push([x, y, z]);

                // Se ci sono anche colori r g b
                if (parts.length >= 7) {
                    const r = parseFloat(parts[4]);
                    const g = parseFloat(parts[5]);
                    const b = parseFloat(parts[6]);
                    tempColors.push([r, g, b, 1.0]); // A = 1
                } else {
                    // Genera colore casuale per vertice
                    tempColors.push([Math.random(), Math.random(), Math.random(), 1.0]);
                }
            } else if (line.startsWith('f ')) {
                const parts = line.split(/\s+/).slice(1);
                for (let p of parts) {
                    const idx = parseInt(p.split('/')[0], 10) - 1; // OBJ parte da 1
                    indices.push(idx);
                }
            }
        }

        for (let i = 0; i < tempVertices.length; i++) {
            vertices.push(...tempVertices[i]);
            colors.push(...tempColors[i]);
        }

        return {
            vertices: new Float32Array(vertices),
            indices: new Uint16Array(indices),
            colors: new Float32Array(colors)
        };
    }
}
