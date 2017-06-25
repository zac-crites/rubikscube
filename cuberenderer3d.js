function CubeRenderer3d() {
    var rendererWidth = 800;
    var rendererHeight = 600;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(rendererWidth, rendererHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, rendererWidth / rendererHeight, 0.1, 1000);
    camera.position.y = 5;
    camera.position.z = 8;

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = controls.maxDistance = camera.position.z;
    controls.enablePan = false;
    controls.addEventListener('change', function () { renderer.render(scene, camera); });
    controls.reset();

    var container = document.getElementById("cube3d");
    container.appendChild(renderer.domElement);

    var materials = []
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide }));

    var updateCubeletMats = [];

    function CreateFace(cube, i, facetopleft, right, down, margin) {

        right.divideScalar(3);
        down.divideScalar(3);

        var marginRight = right.clone();
        marginRight.normalize();
        marginRight.multiplyScalar(margin);
        var marginDown = down.clone();
        marginDown.normalize();
        marginDown.multiplyScalar(margin);

        var width = right.clone();
        width.sub(marginRight);
        width.sub(marginRight);

        var height = down.clone();
        height.sub(marginDown);
        height.sub(marginDown);

        function CreateCubelet(topleft, x, y, getMaterial) {
            topleft.add(marginRight);
            topleft.add(marginDown);

            for (var i = 0; i < x; i++)
                topleft.add(right);
            for (var i = 0; i < y; i++)
                topleft.add(down);

            var geometry = new THREE.Geometry();
            geometry.vertices.push(topleft);
            var topright = topleft.clone();
            topright.add(width);
            geometry.vertices.push(topright);
            var bottomleft = topleft.clone();
            bottomleft.add(height);
            geometry.vertices.push(bottomleft);
            var bottomright = topleft.clone();
            bottomright.add(width);
            bottomright.add(height);
            geometry.vertices.push(bottomright);

            geometry.faces.push(new THREE.Face3(0, 1, 2));
            geometry.faces.push(new THREE.Face3(1, 2, 3));

            var mesh = new THREE.Mesh(geometry, getMaterial());
            scene.add(mesh);

            updateCubeletMats.push(function () {
                mesh.material = getMaterial();
                mesh.geometry.uvsNeedUpdate = true;
                mesh.neesUpdate = true;
            });
        }

        CreateCubelet(facetopleft.clone(), 0, 0, () => materials[cube.Faces[i].Get(0)]);
        CreateCubelet(facetopleft.clone(), 1, 0, () => materials[cube.Faces[i].Get(1)]);
        CreateCubelet(facetopleft.clone(), 2, 0, () => materials[cube.Faces[i].Get(2)]);
        CreateCubelet(facetopleft.clone(), 0, 1, () => materials[cube.Faces[i].Get(7)]);
        CreateCubelet(facetopleft.clone(), 1, 1, () => materials[cube.Faces[i].Center]);
        CreateCubelet(facetopleft.clone(), 2, 1, () => materials[cube.Faces[i].Get(3)]);
        CreateCubelet(facetopleft.clone(), 0, 2, () => materials[cube.Faces[i].Get(6)]);
        CreateCubelet(facetopleft.clone(), 1, 2, () => materials[cube.Faces[i].Get(5)]);
        CreateCubelet(facetopleft.clone(), 2, 2, () => materials[cube.Faces[i].Get(4)]);
    }

    this.Initialize = function (cube) {
        var margin = .05;

        CreateFace(cube, 0, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 3), margin);
        CreateFace(cube, 1, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, -3, 0), margin);
        CreateFace(cube, 2, new THREE.Vector3(-1.5, 1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, -3, 0), margin);
        CreateFace(cube, 3, new THREE.Vector3(1.5, 1.5, 1.5), new THREE.Vector3(0, 0, -3), new THREE.Vector3(0, -3, 0), margin);
        CreateFace(cube, 4, new THREE.Vector3(1.5, 1.5, -1.5), new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, -3, 0), margin);
        CreateFace(cube, 5, new THREE.Vector3(-1.5, -1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, -3), margin);

        renderer.render(scene, camera);
    }

    this.UpdateCubelets = function () {
        updateCubeletMats.forEach(fn => fn());
        renderer.render(scene, camera);
    }

    this.ResetCamera = function () {
        controls.reset();
    }
}