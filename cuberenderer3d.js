function CubeRenderer3d() {
    var sceneWidth = 800;
    var sceneHeight = 600;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(sceneWidth, sceneHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);
    camera.position.z = 5;

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });
    controls.minDistance = controls.maxDistance = 5;
    controls.enablePan = false;

    var container = document.getElementById("cube3d");
    container.appendChild(renderer.domElement);

    var materials = []
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide }));

    var updateMats = [];

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

        function Cuberino(topleft, x, y, getMaterial) {
            topleft.add(marginRight);
            topleft.add(marginDown);

            for (var i = 0; i < x; i++)
                topleft.add(right);
            for (var i = 0; i < y; i++)
                topleft.add(down);

            var geometry = new THREE.Geometry();
            geometry.vertices.push(topleft);
            var tr = topleft.clone();
            tr.add(width);
            geometry.vertices.push(tr);
            var bl = topleft.clone();
            bl.add(height);
            geometry.vertices.push(bl);
            var br = topleft.clone();
            br.add(width);
            br.add(height);
            geometry.vertices.push(br);

            console.log(geometry.vertices);

            geometry.faces.push(new THREE.Face3(0, 1, 2));
            geometry.faces.push(new THREE.Face3(1, 2, 3));

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            var m1 = new THREE.Mesh(geometry, getMaterial());
            scene.add(m1);
            updateMats.push(function () {
                m1.material = getMaterial();
                m1.geometry.uvsNeedUpdate = true;
                m1.neesUpdate = true;
            });

            console.log(m1);
        }

        Cuberino(facetopleft.clone(), 0, 0, () => materials[cube.Faces[i].Get(0)]);
        Cuberino(facetopleft.clone(), 1, 0, () => materials[cube.Faces[i].Get(1)]);
        Cuberino(facetopleft.clone(), 2, 0, () => materials[cube.Faces[i].Get(2)]);
        Cuberino(facetopleft.clone(), 0, 1, () => materials[cube.Faces[i].Get(7)]);
        Cuberino(facetopleft.clone(), 1, 1, () => materials[cube.Faces[i].Center]);
        Cuberino(facetopleft.clone(), 2, 1, () => materials[cube.Faces[i].Get(3)]);
        Cuberino(facetopleft.clone(), 0, 2, () => materials[cube.Faces[i].Get(6)]);
        Cuberino(facetopleft.clone(), 1, 2, () => materials[cube.Faces[i].Get(5)]);
        Cuberino(facetopleft.clone(), 2, 2, () => materials[cube.Faces[i].Get(4)]);
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
        updateMats.forEach(fn => fn());
        renderer.render(scene, camera);
    }
}