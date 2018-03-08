import * as THREE from "three";
import { ICubeState } from "./cube";

const Vector3 = THREE.Vector3;

export class CubeMesh {
    private cube: ICubeState;
    private materials: THREE.MeshBasicMaterial[] = [];
    private geometryFaces = [new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3)];
    private outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    private meshes: THREE.Mesh[] = [];
    private topLayer: THREE.Mesh[] = [];
    private notTopLayer: THREE.Mesh[] = [];
    private materialUpdaterList: Array<() => THREE.MeshBasicMaterial> = [];

    constructor(cube: ICubeState) {
        this.cube = cube;
        this.BuildMesh();
    }

    public CreateScene(element: HTMLDivElement) {
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

        this.meshes.forEach((mesh) => scene.add(mesh));

        (function Animate(): void {
            requestAnimationFrame(Animate);
            renderer.render(scene, camera);
        })();
    }

    private BuildMesh(): void {
        const margin = .08;
        const outline = .02;

        [0xff0000, 0xffffff, 0x00ff00, 0xffff00, 0x0000ff, 0xffaa00]
            .forEach((c) => this.materials.push(new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide })));

        [
            // For each face: [[Top Left], [Right], [Down]]
            [[-1.5, 1.5, -1.5], [3, 0, 0], [0, 0, 3]],
            [[-1.5, 1.5, -1.5], [0, 0, 3], [0, -3, 0]],
            [[-1.5, 1.5, 1.5], [3, 0, 0], [0, -3, 0]],
            [[1.5, 1.5, 1.5], [0, 0, -3], [0, -3, 0]],
            [[1.5, 1.5, -1.5], [-3, 0, 0], [0, -3, 0]],
            [[-1.5, -1.5, 1.5], [3, 0, 0], [0, 0, -3]],
        ].forEach((v, index) => {
            this.CreateFace(index, new Vector3(...v[0]), new Vector3(...v[1]), new Vector3(...v[2]), margin, outline);
        });
    }

    private CreateFace(face: number, facetopleft: THREE.Vector3, right: THREE.Vector3,
                       down: THREE.Vector3, margin: number, outline: number): void {

        const self = this;
        right.divideScalar(3);
        down.divideScalar(3);

        const back = right.clone().cross(down).normalize().multiplyScalar(.001);
        const marginRight = right.clone().normalize().multiplyScalar(margin);
        const marginDown = down.clone().normalize().multiplyScalar(margin);
        const outlineRight = marginRight.clone().normalize().multiplyScalar(outline);
        const outlineDown = marginDown.clone().normalize().multiplyScalar(outline);
        const width = right.clone().sub(marginRight).sub(marginRight);
        const height = down.clone().sub(marginDown).sub(marginDown);

        CreateFacelet(facetopleft.clone(), 0, 0, () => this.materials[this.cube.getFacelet(face, 0)]);
        CreateFacelet(facetopleft.clone(), 1, 0, () => this.materials[this.cube.getFacelet(face, 1)]);
        CreateFacelet(facetopleft.clone(), 2, 0, () => this.materials[this.cube.getFacelet(face, 2)]);
        CreateFacelet(facetopleft.clone(), 0, 1, () => this.materials[this.cube.getFacelet(face, 7)]);
        CreateFacelet(facetopleft.clone(), 1, 1, () => this.materials[this.cube.getFacelet(face)]);
        CreateFacelet(facetopleft.clone(), 2, 1, () => this.materials[this.cube.getFacelet(face, 3)]);
        CreateFacelet(facetopleft.clone(), 0, 2, () => this.materials[this.cube.getFacelet(face, 6)]);
        CreateFacelet(facetopleft.clone(), 1, 2, () => this.materials[this.cube.getFacelet(face, 5)]);
        CreateFacelet(facetopleft.clone(), 2, 2, () => this.materials[this.cube.getFacelet(face, 4)]);

        function CreateFacelet(topleft: THREE.Vector3, x: number, y: number,
                               getMaterial: () => THREE.MeshBasicMaterial): void {

            topleft.add(right.clone().multiplyScalar(x))
                .add(down.clone().multiplyScalar(y)).add(marginRight).add(marginDown);
            const topright = topleft.clone().add(width);
            const bottomleft = topleft.clone().add(height);
            const bottomright = topleft.clone().add(width).add(height);

            const stickerGeometry = new THREE.Geometry();
            stickerGeometry.vertices.push(topleft);
            stickerGeometry.vertices.push(topright);
            stickerGeometry.vertices.push(bottomright);
            stickerGeometry.vertices.push(bottomleft);
            stickerGeometry.faces = self.geometryFaces;

            const outlineGeometry = new THREE.Geometry();
            outlineGeometry.vertices.push(topleft.clone().sub(outlineDown).sub(outlineRight).add(back));
            outlineGeometry.vertices.push(topright.clone().sub(outlineDown).add(outlineRight).add(back));
            outlineGeometry.vertices.push(bottomright.clone().add(outlineDown).add(outlineRight).add(back));
            outlineGeometry.vertices.push(bottomleft.clone().add(outlineDown).sub(outlineRight).add(back));
            outlineGeometry.faces = self.geometryFaces;

            const stickerMesh = new THREE.Mesh(stickerGeometry, getMaterial());
            const outlineMesh = new THREE.Mesh(outlineGeometry, self.outlineMaterial);

            self.meshes.push(stickerMesh);
            self.meshes.push(outlineMesh);

            const group = (face === 0 || (face !== 5 && y === 0)) ? self.topLayer : self.notTopLayer;
            group.push(stickerMesh);
            group.push(outlineMesh);

            self.materialUpdaterList.push(() => stickerMesh.material = getMaterial());
        }
    }
}
