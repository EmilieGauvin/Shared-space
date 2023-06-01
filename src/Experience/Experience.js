import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World.js'
import Debug from './Utils/Debug'
import sources from './World/sources'
import Resources from './Utils/Resources'
import PointerEvents from './Utils/PointerEvents'

let instance = null

export default class Experience {
    constructor(canvas) {
        if (instance) {
            return instance
        }
        instance = this

        //Global acces
        window.experience = this

        //Options
        this.canvas = canvas

        //Set up
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.pointerEvents = new PointerEvents()
        this.pointer = this.pointerEvents.pointer
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)

        this.colorIndex = 0
        this.world = new World()

        this.sizes.on('resize', () => {
            this.resize()
        })

        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })

    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }


    update() {
        this.camera.update()
        this.renderer.update()
        if (this.world) this.world.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        //Travers the wholde scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if (this.debug.active)
            this.debug.ui.destroy()
    }
}
