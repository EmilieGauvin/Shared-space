import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../Experience.js'


export default class Objects
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        this.setParticules()
    }

    setParticules() 
    {
        // Geometry
        const particlesGeometry = new THREE.BufferGeometry()
        const count = 500

        const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

        for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
        {
            positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values


        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            sizeAttenuation: true
        })

        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        this.scene.add(particles)

    }

    update()
    {
    
    }
}