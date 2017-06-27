function CubeRenderer3d() {

    var animationSpeed = 11;
    var animationQueue = [];

    var cube;

    var _scene;

    var CreateScene = () => {
        var rendererWidth = 400;
        var rendererHeight = 400;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(rendererWidth, rendererHeight);

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, rendererWidth / rendererHeight, 0.1, 1000);
        camera.position.y = 7.5;
        camera.position.z = 8;

        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.minDistance = controls.maxDistance = 7;
        controls.enablePan = false;
        controls.reset();

        var container = document.getElementById("cube3d");
        container.appendChild(renderer.domElement);

        function DrawFrame() {
            requestAnimationFrame(DrawFrame);
            if (animationQueue.length > 0)
                animationQueue[0]();
            renderer.render(scene, camera);
        }
        DrawFrame();

        this.ResetCamera = () => controls.reset();

        return scene;
    }

    var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });

    var materials = []
    materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }));
    materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide }));

    var updateCubeletMats = [];

    var allMeshes = [];
    var topMeshes = [];

    function CreateFace(cube, faceIndex, facetopleft, right, down, margin, outline, addTop) {

        right.divideScalar(3);
        down.divideScalar(3);

        var back = right.clone().cross(down).normalize().multiplyScalar(.001);

        var marginRight = right.clone().normalize().multiplyScalar(margin);
        var marginDown = down.clone().normalize().multiplyScalar(margin);

        var outlineRight = marginRight.clone().normalize().multiplyScalar(outline);
        var outlineDown = marginDown.clone().normalize().multiplyScalar(outline);

        var width = right.clone().sub(marginRight).sub(marginRight);
        var height = down.clone().sub(marginDown).sub(marginDown);

        function CreateCubelet(topleft, x, y, getMaterial) {

            topleft.add(right.clone().multiplyScalar(x)).add(down.clone().multiplyScalar(y)).add(marginRight).add(marginDown);
            var topright = topleft.clone().add(width);
            var bottomleft = topleft.clone().add(height);
            var bottomright = topleft.clone().add(width).add(height);

            var stickerGeometry = new THREE.Geometry();
            stickerGeometry.vertices.push(topleft);
            stickerGeometry.vertices.push(topright);
            stickerGeometry.vertices.push(bottomright);
            stickerGeometry.vertices.push(bottomleft);
            stickerGeometry.faces.push(new THREE.Face3(0, 1, 2));
            stickerGeometry.faces.push(new THREE.Face3(0, 2, 3));

            var outlineGeometry = new THREE.Geometry();
            outlineGeometry.vertices.push(topleft.clone().sub(outlineDown).sub(outlineRight).add(back));
            outlineGeometry.vertices.push(topright.clone().sub(outlineDown).add(outlineRight).add(back));
            outlineGeometry.vertices.push(bottomright.clone().add(outlineDown).add(outlineRight).add(back));
            outlineGeometry.vertices.push(bottomleft.clone().add(outlineDown).sub(outlineRight).add(back));
            outlineGeometry.faces.push(new THREE.Face3(0, 1, 2));
            outlineGeometry.faces.push(new THREE.Face3(0, 2, 3));

            var stickerMesh = new THREE.Mesh(stickerGeometry, getMaterial());
            var outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
            _scene.add(stickerMesh);
            _scene.add(outlineMesh);

            allMeshes.push(stickerMesh);
            allMeshes.push(outlineMesh);
            if (faceIndex === 0 || (faceIndex < 5 && y === 0)) {
                topMeshes.push(stickerMesh);
                topMeshes.push(outlineMesh);
            }

            updateCubeletMats.push(() => stickerMesh.material = getMaterial());
        }

        CreateCubelet(facetopleft.clone(), 0, 0, () => materials[cube.Faces[faceIndex].Get(0)]);
        CreateCubelet(facetopleft.clone(), 1, 0, () => materials[cube.Faces[faceIndex].Get(1)]);
        CreateCubelet(facetopleft.clone(), 2, 0, () => materials[cube.Faces[faceIndex].Get(2)]);
        CreateCubelet(facetopleft.clone(), 0, 1, () => materials[cube.Faces[faceIndex].Get(7)]);
        CreateCubelet(facetopleft.clone(), 1, 1, () => materials[cube.Faces[faceIndex].Center]);
        CreateCubelet(facetopleft.clone(), 2, 1, () => materials[cube.Faces[faceIndex].Get(3)]);
        CreateCubelet(facetopleft.clone(), 0, 2, () => materials[cube.Faces[faceIndex].Get(6)]);
        CreateCubelet(facetopleft.clone(), 1, 2, () => materials[cube.Faces[faceIndex].Get(5)]);
        CreateCubelet(facetopleft.clone(), 2, 2, () => materials[cube.Faces[faceIndex].Get(4)]);
    }

    this.Initialize = function (c) {
        cube = c;
        var margin = .08;
        var outline = .02;


        _scene = CreateScene();

        CreateFace(cube, 0, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 3), margin, outline);
        CreateFace(cube, 1, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 2, new THREE.Vector3(-1.5, 1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 3, new THREE.Vector3(1.5, 1.5, 1.5), new THREE.Vector3(0, 0, -3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 4, new THREE.Vector3(1.5, 1.5, -1.5), new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(cube, 5, new THREE.Vector3(-1.5, -1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, -3), margin, outline);
    }

    this.UpdateCubelets = function () {
        updateCubeletMats.forEach(fn => fn());
    }
    
    this.IsAnimating = function () {
        return animationQueue.length > 0;
    }

    // Move animations
    function QueueRotationAnimation(move, rotationAxis) {
        var counter = animationSpeed;

        animationQueue.push(function () {

            if (counter-- === animationSpeed) {
                move();
                updateCubeletMats.forEach(fn => fn());
            }

            allMeshes.forEach(function (mesh) {
                var rotMatrix = new THREE.Matrix4();

                rotMatrix.makeRotationAxis(rotationAxis.normalize(), (counter / animationSpeed) * Math.PI / 2);
                mesh.matrix = rotMatrix;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });

            if (counter <= 0) {
                allMeshes.forEach(function (mesh) {
                    mesh.matrix = new THREE.Matrix4();
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                animationQueue.shift();
            }
        });
    }

    function QueueFaceAnimation(baseRotation, rotationAxis, startMoves, endMoves) {
        var counter = animationSpeed;

        animationQueue.push(function () {
            if (counter-- === animationSpeed) {
                allMeshes.forEach(function (mesh) {
                    mesh.matrix = baseRotation;
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                startMoves();
                updateCubeletMats.forEach(fn => fn());
            }

            topMeshes.forEach(function (mesh) {
                var rotMatrix = new THREE.Matrix4();
                rotMatrix.makeRotationAxis(rotationAxis.normalize(), (counter / animationSpeed) * Math.PI / 2);
                rotMatrix.multiply(baseRotation);
                mesh.matrix = rotMatrix;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });

            if (counter <= 0) {
                allMeshes.forEach(function (mesh) {
                    mesh.matrix = new THREE.Matrix4();
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                animationQueue.shift();
                endMoves();
                updateCubeletMats.forEach(fn => fn());
            }
        });
    }

    function QueueDoubleLayerTurn(baseRotation, rotationAxis, startMoves, endMoves) {
        var counter = animationSpeed;

        function resetTop() {
            topMeshes.forEach(function (mesh) {
                mesh.matrix = baseRotation;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });
        }

        animationQueue.push(function () {

            if (counter-- === animationSpeed) {
                allMeshes.forEach(function (mesh) {
                    mesh.matrix = baseRotation;
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });

                startMoves();
                updateCubeletMats.forEach(fn => fn());
            }

            allMeshes.forEach(function (mesh) {
                var rotMatrix = new THREE.Matrix4();
                rotMatrix.makeRotationAxis(rotationAxis.normalize(), (counter / animationSpeed) * Math.PI / 2);
                rotMatrix.multiply(baseRotation);
                mesh.matrix = rotMatrix;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });
            resetTop();

            if (counter <= 0) {
                allMeshes.forEach(function (mesh) {
                    mesh.matrix = new THREE.Matrix4();
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                endMoves();
                updateCubeletMats.forEach(fn => fn());
                animationQueue.shift();
            }
        });
    }

    // Moves - Full cube rotations
    this.Z = function () {
        QueueRotationAnimation(() => cube.Z(), new THREE.Vector3(0, 0, 1));
    }

    this.Zi = function () {
        QueueRotationAnimation(() => cube.Zi(), new THREE.Vector3(0, 0, -1));
    }

    this.Y = function () {
        QueueRotationAnimation(() => cube.Y(), new THREE.Vector3(0, 1, 0));
    }

    this.Yi = function () {
        QueueRotationAnimation(() => cube.Yi(), new THREE.Vector3(0, -1, 0));
    }

    this.X = function () {
        QueueRotationAnimation(() => cube.X(), new THREE.Vector3(1, 0, 0));
    }

    this.Xi = function () {
        QueueRotationAnimation(() => cube.Xi(), new THREE.Vector3(-1, 0, 0));
    }

    // Moves - Single face turns
    this.U = function () {
        QueueFaceAnimation(new THREE.Matrix4(), new THREE.Vector3(0, 1, 0), () => cube.U(), () => { });
    }

    this.Ui = function () {
        QueueFaceAnimation(new THREE.Matrix4(), new THREE.Vector3(0, -1, 0), () => cube.Ui(), () => { });
    }

    this.R = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { cube.Zi(); cube.U(); }, () => { cube.Z(); });
    }

    this.Ri = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { cube.Zi(); cube.Ui(); }, () => { cube.Z(); });
    }

    this.L = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { cube.Z(); cube.U(); }, () => { cube.Zi(); });
    }

    this.Li = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { cube.Z(); cube.Ui(); }, () => { cube.Zi(); });
    }

    this.F = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI / 2), new THREE.Vector3(0, 0, 1), () => { cube.X(); cube.U(); }, () => { cube.Xi(); });
    }

    this.Fi = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI / 2), new THREE.Vector3(0, 0, -1), () => { cube.X(); cube.Ui(); }, () => { cube.Xi(); });
    }

    this.B = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(-Math.PI / 2), new THREE.Vector3(0, 0, -1), () => { cube.Xi(); cube.U(); }, () => { cube.X(); });
    }

    this.Bi = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(-Math.PI / 2), new THREE.Vector3(0, 0, 1), () => { cube.Xi(); cube.Ui(); }, () => { cube.X(); });
    }

    this.D = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI), new THREE.Vector3(0, -1, 0), () => { cube.Xi(); cube.Xi(); cube.U(); }, () => { cube.X(); cube.X(); });
    }

    this.Di = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI), new THREE.Vector3(0, 1, 0), () => { cube.Xi(); cube.Xi(); cube.Ui(); }, () => { cube.X(); cube.X(); });
    }

    //Moves - Double layer turns
    this.d = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4(), new THREE.Vector3(0, -1, 0), () => { cube.U(); cube.Yi(); }, () => { });
    }

    this.di = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4(), new THREE.Vector3(0, 1, 0), () => { cube.Ui(); cube.Y(); }, () => { });
    }

    this.r = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { cube.Z(); cube.U(); cube.Yi(); }, () => { cube.Zi(); });
    }

    this.ri = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { cube.Z(); cube.Ui(); cube.Y(); }, () => { cube.Zi(); });
    }

    this.I = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { cube.Zi(); cube.U(); cube.Yi(); }, () => { cube.Z(); });
    }

    this.Ii = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { cube.Zi(); cube.Ui(); cube.Y(); }, () => { cube.Z(); });
    }
}