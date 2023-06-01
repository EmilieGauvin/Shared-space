import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../Experience'

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time

        this.sunSpeed = 0.0001

        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setHemisphereLight()
    }

    setHemisphereLight() {
        this.sun = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 16),
            new THREE.MeshBasicMaterial({ color: '#ffc933' }))
        this.sun.position.set(0, 0, 10)
        this.scene.add(this.sun)

        this.hemisphereLight = new THREE.HemisphereLight('#ffa494', '#00126b', 5)
        this.scene.add(this.hemisphereLight)

        this.hemisphereLight.position.set(1, 0, 0)
        //Debug
        if (this.debug.active) {
            this.debugFolder.addColor(this.hemisphereLight, 'color').name('sky color')
            this.debugFolder.addColor(this.hemisphereLight, 'groundColor').name('ground color')
            this.debugFolder.add(this.hemisphereLight, 'intensity').name(' intensity').min(0).max(5)
        }
    }

    update() {
        this.hemisphereLight.position.set(Math.cos(this.time.elapsed * this.sunSpeed), 0.5 * Math.cos(this.time.elapsed * this.sunSpeed), Math.sin(this.time.elapsed * this.sunSpeed))
        this.sun.position.copy(this.hemisphereLight.position.multiplyScalar(20))
    }

}
