import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import { MapControls } from 'https://unpkg.com/three@0.145.0/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience'



export default class Camera {
    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    change() {
        var maxzoom = 2
        var minzoom = 10
        console.log()
        var _v = new THREE.Vector3()

        if (this.instance.position.distanceTo(_v) < maxzoom) {
            this.instance.position.multiplyScalar(maxzoom / this.instance.position.distanceTo(_v))
        }

        if (this.instance.position.distanceTo(_v) > minzoom) {
            this.instance.position.multiplyScalar(minzoom / this.instance.position.distanceTo(_v))
        }
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            1000)
        this.instance.position.set(0, 0, 5)
        this.instance.lookAt(new THREE.Vector3(0, 0, 0))
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new MapControls(this.instance, this.canvas)
        this.controls.rotateSpeed = 0.5
        this.controls.enablePan = false

        this.controls.enableDamping = true

        this.controls.addEventListener('change', (e) => this.change())

    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
        this.scaleRatio = this.experience.scaleRatio
    }

    update() {
        if (this.controls)
            this.controls.update()
    }
}

