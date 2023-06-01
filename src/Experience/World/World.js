import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../Experience'
import Environment from './Environment'
import Objects from './Objects'
import Stars from './Stars'
import Models from './Models'


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.models = new Models()
            this.objects = new Objects()
            this.stars = new Stars()
            this.environment = new Environment()
        })
    }

    update() {

        if (this.objects)
            this.objects.update()
        if (this.environment)
            this.environment.update()
    }
}





