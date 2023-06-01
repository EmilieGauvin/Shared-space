import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class PointerEvents extends EventEmitter {
    constructor() {
        super()

        this.experience = new Experience()
        this.sizes = this.experience.sizes

        this.pointer = new THREE.Vector2()//initiate the mouse in 0,0

        // Events
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Touch down
            window.addEventListener('touchstart', (event) => {
                if (event.touches.length != 1) {
                    event.preventDefault()
                }
                else {
                    this.updateTouch(event)
                    this.trigger('pointerDown')
                }
            })


        } else {
            // Pointer down
            window.addEventListener('pointerdown', (event) => {
                if (event.button != 0) return
                this.updatePointer(event)
                this.trigger('pointerDown')
            })
        }
    }

    updateTouch(event) {
        var touch = event.touches[0]
        var x = touch.pageX
        var y = touch.pageY
        this.pointer.x = x / this.sizes.width * 2 - 1 //normalize the coord.
        this.pointer.y = - (y / this.sizes.height) * 2 + 1 //normalize …
    }

    updatePointer(event) {
        this.pointer.x = event.clientX / this.sizes.width * 2 - 1 //normalize the coord.
        this.pointer.y = - (event.clientY / this.sizes.height) * 2 + 1 //normalize …
    }
}
