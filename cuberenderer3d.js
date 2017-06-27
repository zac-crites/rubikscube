function CubeRenderer3d(cube) {

    var _updateCubeletMats = [];
    var _meshes = [];
    var _topLayerMeshes = [];
    var _cube = cube;
    var _animationSpeed = 11;
    var _animationQueue = [];

    // Create the scene
    var _scene = (() => {
        var rendererWidth = 400;
        var rendererHeight = 400;
        var renderer = new THREE.WebGLRenderer();
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, rendererWidth / rendererHeight, 0.1, 1000);

        renderer.setSize(rendererWidth, rendererHeight);
        camera.position.y = 7.5;
        camera.position.z = 8;

        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.minDistance = controls.maxDistance = 7;
        controls.enablePan = false;
        controls.reset();

        document.getElementById("cube3d").appendChild(renderer.domElement);

        function DrawFrame() {
            requestAnimationFrame(DrawFrame);
            if (_animationQueue.length > 0)
                _animationQueue[0]();
            renderer.render(scene, camera);
        }
        DrawFrame();

        this.ResetCamera = () => controls.reset();

        return scene;
    })();

    // Build the cube mesh
    (() => {
        var outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });

        var materials = []
        materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
        materials.push(new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
        materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
        materials.push(new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }));
        materials.push(new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }));
        materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide }));

        var margin = .08;
        var outline = .02;

        CreateFace(0, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 3), margin, outline);
        CreateFace(1, new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(2, new THREE.Vector3(-1.5, 1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(3, new THREE.Vector3(1.5, 1.5, 1.5), new THREE.Vector3(0, 0, -3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(4, new THREE.Vector3(1.5, 1.5, -1.5), new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace(5, new THREE.Vector3(-1.5, -1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, -3), margin, outline);

        function CreateFace(faceIndex, facetopleft, right, down, margin, outline, addTop) {

            right.divideScalar(3);
            down.divideScalar(3);

            var back = right.clone().cross(down).normalize().multiplyScalar(.001);

            var marginRight = right.clone().normalize().multiplyScalar(margin);
            var marginDown = down.clone().normalize().multiplyScalar(margin);

            var outlineRight = marginRight.clone().normalize().multiplyScalar(outline);
            var outlineDown = marginDown.clone().normalize().multiplyScalar(outline);

            var width = right.clone().sub(marginRight).sub(marginRight);
            var height = down.clone().sub(marginDown).sub(marginDown);

            CreateCubelet(facetopleft.clone(), 0, 0, () => materials[_cube.Faces[faceIndex].Get(0)]);
            CreateCubelet(facetopleft.clone(), 1, 0, () => materials[_cube.Faces[faceIndex].Get(1)]);
            CreateCubelet(facetopleft.clone(), 2, 0, () => materials[_cube.Faces[faceIndex].Get(2)]);
            CreateCubelet(facetopleft.clone(), 0, 1, () => materials[_cube.Faces[faceIndex].Get(7)]);
            CreateCubelet(facetopleft.clone(), 1, 1, () => materials[_cube.Faces[faceIndex].Center]);
            CreateCubelet(facetopleft.clone(), 2, 1, () => materials[_cube.Faces[faceIndex].Get(3)]);
            CreateCubelet(facetopleft.clone(), 0, 2, () => materials[_cube.Faces[faceIndex].Get(6)]);
            CreateCubelet(facetopleft.clone(), 1, 2, () => materials[_cube.Faces[faceIndex].Get(5)]);
            CreateCubelet(facetopleft.clone(), 2, 2, () => materials[_cube.Faces[faceIndex].Get(4)]);

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

                _meshes.push(stickerMesh);
                _meshes.push(outlineMesh);
                if (faceIndex === 0 || (faceIndex < 5 && y === 0)) {
                    _topLayerMeshes.push(stickerMesh);
                    _topLayerMeshes.push(outlineMesh);
                }

                _updateCubeletMats.push(() => stickerMesh.material = getMaterial());
            }
        }
    })();

    this.IsAnimating = function () {
        return _animationQueue.length > 0;
    }

    // Move animations
    function QueueRotationAnimation(move, rotationAxis) {
        var counter = _animationSpeed;

        _animationQueue.push(function () {

            if (counter-- === _animationSpeed) {
                move();
                _updateCubeletMats.forEach(fn => fn());
            }

            _meshes.forEach(function (mesh) {
                var rotMatrix = new THREE.Matrix4();

                rotMatrix.makeRotationAxis(rotationAxis.normalize(), (counter / _animationSpeed) * Math.PI / 2);
                mesh.matrix = rotMatrix;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });

            if (counter <= 0) {
                _meshes.forEach(function (mesh) {
                    mesh.matrix = new THREE.Matrix4();
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                _animationQueue.shift();
            }
        });
    }

    function QueueFaceAnimation(baseRotation, rotationAxis, startMoves, endMoves) {
        var counter = _animationSpeed;

        _animationQueue.push(function () {
            if (counter-- === _animationSpeed) {
                _meshes.forEach(function (mesh) {
                    mesh.matrix = baseRotation;
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                startMoves();
                _updateCubeletMats.forEach(fn => fn());
            }

            _topLayerMeshes.forEach(function (mesh) {
                var rotMatrix = new THREE.Matrix4();
                rotMatrix.makeRotationAxis(rotationAxis.normalize(), (counter / _animationSpeed) * Math.PI / 2);
                rotMatrix.multiply(baseRotation);
                mesh.matrix = rotMatrix;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });

            if (counter <= 0) {
                _meshes.forEach(function (mesh) {
                    mesh.matrix = new THREE.Matrix4();
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                _animationQueue.shift();
                endMoves();
                _updateCubeletMats.forEach(fn => fn());
            }
        });
    }

    function QueueDoubleLayerTurn(baseRotation, rotationAxis, startMoves, endMoves) {
        var counter = _animationSpeed;

        function resetTop() {
            _topLayerMeshes.forEach(function (mesh) {
                mesh.matrix = baseRotation;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });
        }

        _animationQueue.push(function () {

            if (counter-- === _animationSpeed) {
                _meshes.forEach(function (mesh) {
                    mesh.matrix = baseRotation;
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });

                startMoves();
                _updateCubeletMats.forEach(fn => fn());
            }

            _meshes.forEach(function (mesh) {
                var rotMatrix = new THREE.Matrix4();
                rotMatrix.makeRotationAxis(rotationAxis.normalize(), (counter / _animationSpeed) * Math.PI / 2);
                rotMatrix.multiply(baseRotation);
                mesh.matrix = rotMatrix;
                mesh.rotation.setFromRotationMatrix(mesh.matrix);
            });
            resetTop();

            if (counter <= 0) {
                _meshes.forEach(function (mesh) {
                    mesh.matrix = new THREE.Matrix4();
                    mesh.rotation.setFromRotationMatrix(mesh.matrix);
                });
                endMoves();
                _updateCubeletMats.forEach(fn => fn());
                _animationQueue.shift();
            }
        });
    }

    // Moves - Full cube rotations
    this.Z = function () {
        QueueRotationAnimation(() => _cube.Z(), new THREE.Vector3(0, 0, 1));
    }

    this.Zi = function () {
        QueueRotationAnimation(() => _cube.Zi(), new THREE.Vector3(0, 0, -1));
    }

    this.Y = function () {
        QueueRotationAnimation(() => _cube.Y(), new THREE.Vector3(0, 1, 0));
    }

    this.Yi = function () {
        QueueRotationAnimation(() => _cube.Yi(), new THREE.Vector3(0, -1, 0));
    }

    this.X = function () {
        QueueRotationAnimation(() => _cube.X(), new THREE.Vector3(1, 0, 0));
    }

    this.Xi = function () {
        QueueRotationAnimation(() => _cube.Xi(), new THREE.Vector3(-1, 0, 0));
    }

    // Moves - Single face turns
    this.U = function () {
        QueueFaceAnimation(new THREE.Matrix4(), new THREE.Vector3(0, 1, 0), () => _cube.U(), () => { });
    }

    this.Ui = function () {
        QueueFaceAnimation(new THREE.Matrix4(), new THREE.Vector3(0, -1, 0), () => _cube.Ui(), () => { });
    }

    this.R = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { _cube.Zi(); _cube.U(); }, () => { _cube.Z(); });
    }

    this.Ri = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { _cube.Zi(); _cube.Ui(); }, () => { _cube.Z(); });
    }

    this.L = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { _cube.Z(); _cube.U(); }, () => { _cube.Zi(); });
    }

    this.Li = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { _cube.Z(); _cube.Ui(); }, () => { _cube.Zi(); });
    }

    this.F = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI / 2), new THREE.Vector3(0, 0, 1), () => { _cube.X(); _cube.U(); }, () => { _cube.Xi(); });
    }

    this.Fi = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI / 2), new THREE.Vector3(0, 0, -1), () => { _cube.X(); _cube.Ui(); }, () => { _cube.Xi(); });
    }

    this.B = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(-Math.PI / 2), new THREE.Vector3(0, 0, -1), () => { _cube.Xi(); _cube.U(); }, () => { _cube.X(); });
    }

    this.Bi = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(-Math.PI / 2), new THREE.Vector3(0, 0, 1), () => { _cube.Xi(); _cube.Ui(); }, () => { _cube.X(); });
    }

    this.D = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI), new THREE.Vector3(0, -1, 0), () => { _cube.Xi(); _cube.Xi(); _cube.U(); }, () => { _cube.X(); _cube.X(); });
    }

    this.Di = function () {
        QueueFaceAnimation(new THREE.Matrix4().makeRotationX(Math.PI), new THREE.Vector3(0, 1, 0), () => { _cube.Xi(); _cube.Xi(); _cube.Ui(); }, () => { _cube.X(); _cube.X(); });
    }

    //Moves - Double layer turns
    this.d = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4(), new THREE.Vector3(0, -1, 0), () => { _cube.U(); _cube.Yi(); }, () => { });
    }

    this.di = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4(), new THREE.Vector3(0, 1, 0), () => { _cube.Ui(); _cube.Y(); }, () => { });
    }

    this.r = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { _cube.Z(); _cube.U(); _cube.Yi(); }, () => { _cube.Zi(); });
    }

    this.ri = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { _cube.Z(); _cube.Ui(); _cube.Y(); }, () => { _cube.Zi(); });
    }

    this.I = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(-1, 0, 0), () => { _cube.Zi(); _cube.U(); _cube.Yi(); }, () => { _cube.Z(); });
    }

    this.Ii = function () {
        QueueDoubleLayerTurn(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(1, 0, 0), () => { _cube.Zi(); _cube.Ui(); _cube.Y(); }, () => { _cube.Z(); });
    }
}