import * as THREE from "three";
import { ICameraControls } from "./cameraControls";
import { Face, ICubeState } from "./cube";

const Vector3 = THREE.Vector3;

export class CubeMesh {
    public readonly meshes: THREE.Mesh[] = [];
    public readonly topLayer: THREE.Mesh[] = [];
    public readonly notTopLayer: THREE.Mesh[] = [];

    private cube: ICubeState;
    private materials: THREE.MeshBasicMaterial[] = [];
    private geometryFaces = [new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3)];
    private outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    private materialUpdaterList: Array<() => THREE.MeshBasicMaterial> = [];

    constructor(cube: ICubeState) {
        this.cube = cube;
        this.BuildMesh();
    }

    public CreateScene(element: HTMLDivElement): ICameraControls {
        const rendererWidth = 400;
        const rendererHeight = 400;
        const renderer = new THREE.WebGLRenderer();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, rendererWidth / rendererHeight, 0.1, 1000);

        renderer.setSize(rendererWidth, rendererHeight);
        camera.position.y = 7.5;
        camera.position.z = 8;

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.minDistance = controls.maxDistance = 7;
        controls.enablePan = false;
        controls.reset();

        element.appendChild(renderer.domElement);

        this.AddToScene(scene);

        (function Animate(): void {
            requestAnimationFrame(Animate);
            renderer.render(scene, camera);
        })();

        return {
            resetCamera: () => controls.reset(),
        };
    }

    public AddToScene(scene: THREE.Scene): void {
        this.meshes.forEach((mesh) => scene.add(mesh));
    }

    public Update() {
        this.materialUpdaterList.forEach((update) => update());
    }

    private BuildMesh(): void {
        const margin = .08;
        const outline = .02;

        [0xff0000, 0xffffff, 0x00ff00, 0xffff00, 0x0000ff, 0xffaa00]
            .forEach((c) => this.materials.push(new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })));

        [ // For each face: [[Top Left], [Right], [Down]]
            [[-1.5, 1.5, -1.5], [3, 0, 0], [0, 0, 3]],
            [[-1.5, 1.5, -1.5], [0, 0, 3], [0, -3, 0]],
            [[-1.5, 1.5, 1.5], [3, 0, 0], [0, -3, 0]],
            [[1.5, 1.5, 1.5], [0, 0, -3], [0, -3, 0]],
            [[1.5, 1.5, -1.5], [-3, 0, 0], [0, -3, 0]],
            [[-1.5, -1.5, 1.5], [3, 0, 0], [0, 0, -3]],
        ].forEach((v, index) => {
            const face = index as Face;
            const faceTopLeft = new Vector3(...v[0]);
            const right = new Vector3(...v[1]).divideScalar(3);
            const down = new Vector3(...v[2]).divideScalar(3);
            const back = right.clone().cross(down).normalize().multiplyScalar(.001);
            const marginRight = right.clone().normalize().multiplyScalar(margin);
            const marginDown = down.clone().normalize().multiplyScalar(margin);
            const outlineRight = marginRight.clone().normalize().multiplyScalar(outline);
            const outlineDown = marginDown.clone().normalize().multiplyScalar(outline);
            const width = right.clone().sub(marginRight).sub(marginRight);
            const height = down.clone().sub(marginDown).sub(marginDown);

            [ // For each facelet [X position, Y position, Face getter]
                [0, 0, () => this.cube.getFacelet(face, 0)],
                [1, 0, () => this.cube.getFacelet(face, 1)],
                [2, 0, () => this.cube.getFacelet(face, 2)],
                [0, 1, () => this.cube.getFacelet(face, 7)],
                [1, 1, () => this.cube.getFacelet(face)],
                [2, 1, () => this.cube.getFacelet(face, 3)],
                [0, 2, () => this.cube.getFacelet(face, 6)],
                [1, 2, () => this.cube.getFacelet(face, 5)],
                [2, 2, () => this.cube.getFacelet(face, 4)],
            ].forEach((d) => {
                const x = d[0] as number;
                const y = d[1] as number;
                const getMaterial = () => this.materials[(d[2] as () => number)()];
                const topleft = faceTopLeft.clone()
                    .add(right.clone().multiplyScalar(x))
                    .add(down.clone().multiplyScalar(y))
                    .add(marginRight).add(marginDown);
                const topright = topleft.clone().add(width);
                const bottomleft = topleft.clone().add(height);
                const bottomright = topleft.clone().add(width).add(height);

                const stickerGeometry = new THREE.Geometry();
                stickerGeometry.vertices.push(topleft);
                stickerGeometry.vertices.push(topright);
                stickerGeometry.vertices.push(bottomright);
                stickerGeometry.vertices.push(bottomleft);
                stickerGeometry.faces = this.geometryFaces;

                const outlineGeometry = new THREE.Geometry();
                outlineGeometry.vertices.push(topleft.clone().sub(outlineDown).sub(outlineRight).add(back));
                outlineGeometry.vertices.push(topright.clone().sub(outlineDown).add(outlineRight).add(back));
                outlineGeometry.vertices.push(bottomright.clone().add(outlineDown).add(outlineRight).add(back));
                outlineGeometry.vertices.push(bottomleft.clone().add(outlineDown).sub(outlineRight).add(back));
                outlineGeometry.faces = this.geometryFaces;

                const stickerMesh = new THREE.Mesh(stickerGeometry, getMaterial());
                const outlineMesh = new THREE.Mesh(outlineGeometry, this.outlineMaterial);

                this.meshes.push(stickerMesh);
                this.meshes.push(outlineMesh);

                const group = (face === 0 || (face !== 5 && y === 0)) ? this.topLayer : this.notTopLayer;
                group.push(stickerMesh);
                group.push(outlineMesh);

                this.materialUpdaterList.push(() => stickerMesh.material = getMaterial());
            });
        });
    }
}
