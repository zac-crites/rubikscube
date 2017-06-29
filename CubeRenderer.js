function CubeRenderer(cube) {

    var _updateCubeletMats = [];
    var _meshes = [];
    var _topLayerMeshes = [];
    var _bottomLayersMeshes = [];
    var _cube = cube;
    var _animationSpeed = 8;
    var _animationQueue = [];
    var _animationListeners = [];


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

        CreateFace('U', new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, 3), margin, outline);
        CreateFace('L', new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(0, 0, 3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace('F', new THREE.Vector3(-1.5, 1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace('R', new THREE.Vector3(1.5, 1.5, 1.5), new THREE.Vector3(0, 0, -3), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace('B', new THREE.Vector3(1.5, 1.5, -1.5), new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, -3, 0), margin, outline);
        CreateFace('D', new THREE.Vector3(-1.5, -1.5, 1.5), new THREE.Vector3(3, 0, 0), new THREE.Vector3(0, 0, -3), margin, outline);

        function CreateFace(face, facetopleft, right, down, margin, outline, addTop) {

            right.divideScalar(3);
            down.divideScalar(3);

            var back = right.clone().cross(down).normalize().multiplyScalar(.001);

            var marginRight = right.clone().normalize().multiplyScalar(margin);
            var marginDown = down.clone().normalize().multiplyScalar(margin);

            var outlineRight = marginRight.clone().normalize().multiplyScalar(outline);
            var outlineDown = marginDown.clone().normalize().multiplyScalar(outline);

            var width = right.clone().sub(marginRight).sub(marginRight);
            var height = down.clone().sub(marginDown).sub(marginDown);

            CreateCubelet(facetopleft.clone(), 0, 0, () => materials[_cube.GetFacelet(face, 0)]);
            CreateCubelet(facetopleft.clone(), 1, 0, () => materials[_cube.GetFacelet(face, 1)]);
            CreateCubelet(facetopleft.clone(), 2, 0, () => materials[_cube.GetFacelet(face, 2)]);
            CreateCubelet(facetopleft.clone(), 0, 1, () => materials[_cube.GetFacelet(face, 7)]);
            CreateCubelet(facetopleft.clone(), 1, 1, () => materials[_cube.GetFacelet(face)]);
            CreateCubelet(facetopleft.clone(), 2, 1, () => materials[_cube.GetFacelet(face, 3)]);
            CreateCubelet(facetopleft.clone(), 0, 2, () => materials[_cube.GetFacelet(face, 6)]);
            CreateCubelet(facetopleft.clone(), 1, 2, () => materials[_cube.GetFacelet(face, 5)]);
            CreateCubelet(facetopleft.clone(), 2, 2, () => materials[_cube.GetFacelet(face, 4)]);

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

                layerGroup = (face === 'U' || (face !== 'D' && y === 0)) ? _topLayerMeshes : _bottomLayersMeshes;
                layerGroup.push(stickerMesh);
                layerGroup.push(outlineMesh);

                _updateCubeletMats.push(() => stickerMesh.material = getMaterial());
            }
        }
    })();

    // Move animations
    function Animate(baseRotation, topRotationAxis, bottomRotationAxis, startMoves, endMoves) {
        var duration = _animationSpeed;
        var counter = _animationSpeed;

        _animationQueue.push(function () {
            if (counter-- === duration) {
                _meshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(baseRotation));
                startMoves();
                _updateCubeletMats.forEach(fn => fn());
            }

            if (topRotationAxis) {
                var rotationMatrix = new THREE.Matrix4().makeRotationAxis(topRotationAxis, (counter / duration) * Math.PI / 2).multiply(baseRotation);
                _topLayerMeshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(rotationMatrix));
            }

            if (bottomRotationAxis) {
                var rotationMatrix = new THREE.Matrix4().makeRotationAxis(bottomRotationAxis, (counter / duration) * Math.PI / 2).multiply(baseRotation);
                _bottomLayersMeshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(rotationMatrix));
            }

            if (counter <= 0) {
                _meshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(new THREE.Matrix4()));
                _animationQueue.shift();
                endMoves();
                _updateCubeletMats.forEach(fn => fn());
                _animationListeners.forEach(fn => fn());
            }
        });
    }

    this.AddAnimationCompletedListener = (listener) => _animationListeners.push(listener);

    this.IsAnimating = () => _animationQueue.length > 0;

    // Moves - Full cube rotations
    this.Z = () => Animate(new THREE.Matrix4(), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), () => _cube.Z(), () => { });

    this.Z2 = () => { this.Z(); this.Z(); }

    this.Zi = () => Animate(new THREE.Matrix4(), new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, -1), () => _cube.Zi(), () => { });

    this.Y = () => Animate(new THREE.Matrix4(), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0), () => _cube.Y(), () => { });

    this.Yi = () => Animate(new THREE.Matrix4(), new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, -1, 0), () => _cube.Yi(), () => { });

    this.Y2 = () => { this.Y(); this.Y(); }

    this.X = () => Animate(new THREE.Matrix4(), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 0, 0), () => _cube.X(), () => { });

    this.Xi = () => Animate(new THREE.Matrix4(), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(-1, 0, 0), () => _cube.Xi(), () => { });

    this.X2 = () => { this.X(); this.X(); }

    // Moves - Single face turns
    this.U = () => Animate(new THREE.Matrix4(), new THREE.Vector3(0, 1, 0), null, () => _cube.U(), () => { });

    this.Ui = () => Animate(new THREE.Matrix4(), new THREE.Vector3(0, -1, 0), null, () => _cube.Ui(), () => { });

    this.U2 = () => { this.U(); this.U(); }

    this.R = () => Animate(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(1, 0, 0), null, () => { _cube.Zi(); _cube.U(); }, () => { _cube.Z(); });

    this.Ri = () => Animate(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), new THREE.Vector3(-1, 0, 0), null, () => { _cube.Zi(); _cube.Ui(); }, () => { _cube.Z(); });

    this.R2 = () => { this.R(); this.R(); }

    this.L = () => Animate(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(-1, 0, 0), null, () => { _cube.Z(); _cube.U(); }, () => { _cube.Zi(); });

    this.Li = () => Animate(new THREE.Matrix4().makeRotationZ(Math.PI / 2), new THREE.Vector3(1, 0, 0), null, () => { _cube.Z(); _cube.Ui(); }, () => { _cube.Zi(); });

    this.L2 = () => { this.L(); this.L(); }

    this.F = () => Animate(new THREE.Matrix4().makeRotationX(Math.PI / 2), new THREE.Vector3(0, 0, 1), null, () => { _cube.X(); _cube.U(); }, () => { _cube.Xi(); });

    this.Fi = () => Animate(new THREE.Matrix4().makeRotationX(Math.PI / 2), new THREE.Vector3(0, 0, -1), null, () => { _cube.X(); _cube.Ui(); }, () => { _cube.Xi(); });

    this.F2 = () => { this.F(); this.F(); }

    this.B = () => Animate(new THREE.Matrix4().makeRotationX(-Math.PI / 2), new THREE.Vector3(0, 0, -1), null, () => { _cube.Xi(); _cube.U(); }, () => { _cube.X(); });

    this.Bi = () => Animate(new THREE.Matrix4().makeRotationX(-Math.PI / 2), new THREE.Vector3(0, 0, 1), null, () => { _cube.Xi(); _cube.Ui(); }, () => { _cube.X(); });

    this.B2 = () => { this.B(); this.B(); }

    this.D = () => Animate(new THREE.Matrix4().makeRotationX(Math.PI), new THREE.Vector3(0, -1, 0), null, () => { _cube.Xi(); _cube.Xi(); _cube.U(); }, () => { _cube.X(); _cube.X(); });

    this.Di = () => Animate(new THREE.Matrix4().makeRotationX(Math.PI), new THREE.Vector3(0, 1, 0), null, () => { _cube.Xi(); _cube.Xi(); _cube.Ui(); }, () => { _cube.X(); _cube.X(); });
  
    this.D2 = () => { this.D(); this.D(); }

    //Moves - Double layer turns
    this.d = () => Animate(new THREE.Matrix4(), null, new THREE.Vector3(0, -1, 0), () => { _cube.U(); _cube.Yi(); }, () => { });

    this.di = () => Animate(new THREE.Matrix4(), null, new THREE.Vector3(0, 1, 0), () => { _cube.Ui(); _cube.Y(); }, () => { });

    this.r = () => Animate(new THREE.Matrix4().makeRotationZ(Math.PI / 2), null, new THREE.Vector3(1, 0, 0), () => { _cube.Z(); _cube.U(); _cube.Yi(); }, () => { _cube.Zi(); });

    this.ri = () => Animate(new THREE.Matrix4().makeRotationZ(Math.PI / 2), null, new THREE.Vector3(-1, 0, 0), () => { _cube.Z(); _cube.Ui(); _cube.Y(); }, () => { _cube.Zi(); });

    this.I = () => Animate(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), null, new THREE.Vector3(-1, 0, 0), () => { _cube.Zi(); _cube.U(); _cube.Yi(); }, () => { _cube.Z(); });

    this.Ii = () => Animate(new THREE.Matrix4().makeRotationZ(- Math.PI / 2), null, new THREE.Vector3(1, 0, 0), () => { _cube.Zi(); _cube.Ui(); _cube.Y(); }, () => { _cube.Z(); });
}