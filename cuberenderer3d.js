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

    var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });

    var materials = []
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide }));

    var updateCubeletMats = [];

    function CreateFace(cube, i, facetopleft, right, down, margin, outline) {

        right.divideScalar(3);
        down.divideScalar(3);

        var back = right.clone();
        back.cross(down);
        back.normalize();
        back.multiplyScalar(.001);

        var marginRight = right.clone();
        marginRight.normalize();
        var outlineRight = marginRight.clone();
        marginRight.multiplyScalar(margin);
        outlineRight.multiplyScalar(outline);
        var marginDown = down.clone();
        marginDown.normalize();
        var outlineDown = marginDown.clone();
        marginDown.multiplyScalar(margin);
        outlineDown.multiplyScalar(outline);

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

            var topright = topleft.clone();
            topright.add(width);
            var bottomleft = topleft.clone();
            bottomleft.add(height);
            var bottomright = topleft.clone();
            bottomright.add(width);
            bottomright.add(height);

            var geometry = new THREE.Geometry();
            geometry.vertices.push(topleft);
            geometry.vertices.push(topright);
            geometry.vertices.push(bottomright);
            geometry.vertices.push(bottomleft);

            geometry.faces.push(new THREE.Face3(0, 1, 2));
            geometry.faces.push(new THREE.Face3(0, 2, 3));

            var mesh = new THREE.Mesh(geometry, getMaterial());
            scene.add(mesh);

            var outlinetopleft = topleft.clone();
            outlinetopleft.sub(outlineDown);
            outlinetopleft.sub(outlineRight);
            outlinetopleft.add(back);
            var outlinetopright = topright.clone();
            outlinetopright.sub(outlineDown);
            outlinetopright.add(outlineRight);
            outlinetopright.add(back);
            var outlinebottomright = bottomright.clone();
            outlinebottomright.add(outlineDown);
            outlinebottomright.add(outlineRight);
            outlinebottomright.add(back);
            var outlinebottomleft = bottomleft.clone();
            outlinebottomleft.add(outlineDown);
            outlinebottomleft.sub(outlineRight);
            outlinebottomleft.add(back);

            var outlineGeometry = new THREE.Geometry();
            outlineGeometry.vertices.push(outlinetopleft);
            outlineGeometry.vertices.push(outlinetopright);
            outlineGeometry.vertices.push(outlinebottomright);
            outlineGeometry.vertices.push(outlinebottomleft);

            outlineGeometry.faces.push(new THREE.Face3(0, 1, 2));
            outlineGeometry.faces.push(new THREE.Face3(0, 2, 3));

            var outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
            scene.add(outline);

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
        var margin = .08;
        var outline = .02;

        CreateFace(cube, 0, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 3), margin, outline);
        CreateFace(cube, 1, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 2, new THREE.Vector3(-1.5, 1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 3, new THREE.Vector3(1.5, 1.5, 1.5), new THREE.Vector3(0, 0, -3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 4, new THREE.Vector3(1.5, 1.5, -1.5), new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 5, new THREE.Vector3(-1.5, -1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, -3), margin, outline);

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