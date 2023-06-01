import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import { clone } from 'https://unpkg.com/three@0.145.0/examples/jsm/utils/SkeletonUtils.js'
import { gsap } from 'gsap'

import Experience from '../Experience'

export default class Models {
    constructor(center) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        //setup building
        this.buildingModel = this.resources.items.buildingModel.scene
        this.buildingModelTexture = this.resources.items.buildingModelTexture
        this.buildingModelTexture.flipY = false
        this.buildingModel.children[0].material = new THREE.MeshStandardMaterial({ map: this.buildingModelTexture })

        //Setup House
        this.houseModel = this.resources.items.houseModel.scene
        this.houseModelTexture = this.resources.items.houseModelTexture
        this.houseModelTexture.flipY = false
        this.houseModel.children[0].material = new THREE.MeshStandardMaterial({ map: this.houseModelTexture })

        //Setup Forest
        this.forestModel = this.resources.items.forestModel.scene
        this.forestModelTexture = this.resources.items.forestModelTexture
        this.forestModelTexture.flipY = false
        this.forestModel.children[0].material = new THREE.MeshStandardMaterial({ map: this.forestModelTexture })

    }

    cloneBuildingModel(tl, duration, start, center, rotation, scale) {
        this.cloneModelGeneral(this.buildingModel, tl, duration, start, center, rotation, scale)
    }

    cloneHouseModel(tl, duration, start, center, rotation, scale) {
        this.cloneModelGeneral(this.houseModel, tl, duration, start, center, rotation, scale)
    }

    cloneForestModel(tl, duration, start, center, rotation, scale) {
        this.cloneModelGeneral(this.forestModel, tl, duration, start, center, rotation, scale)
    }

    cloneModel(index, tl, duration, start, center, rotation, scale) {
        var cloneModel
        if (index === 1) cloneModel = clone(this.buildingModel)
        if (index === 2) cloneModel = clone(this.houseModel)
        if (index === 3) cloneModel = clone(this.forestModel)

        cloneModel.scale.set(0.25, 0.25, 0.25 * scale)

        cloneModel.position.copy(center)
        cloneModel.children[0].rotation.z = rotation * Math.PI
        cloneModel.lookAt(0, 0, 0)

        start != 0 ?
            tl.from(cloneModel.scale, { duration: duration, x: 0, y: 0, z: 0 }, start) :
            gsap.from(cloneModel.scale, { duration: duration, x: 0, y: 0, z: 0 })

        this.scene.add(cloneModel)
    }
}

