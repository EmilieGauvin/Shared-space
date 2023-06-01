import * as THREE from 'https://unpkg.com/three@0.145.0/build/three.module'
import Experience from '../Experience.js'
import axios from 'axios'
import { gsap } from 'gsap'

export default class Objects {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.pointerEvents = this.experience.pointerEvents
        this.pointer = this.experience.pointer
        this.cityRaycaster = new THREE.Raycaster()
        this.cityArray = []
        this.cityNames = ['Copenhague', 'Paris', 'Lorient', 'New York', 'London', 'Strasbourg', 'Bogota', 'Berlin', 'Amsterdam', 'Stockholm', 'Madrid', 'Lisbon', 'Roma', 'Athens', 'Budapest', 'Buenos Aires', 'Oslo', 'Ljubljana', 'Santiago']
        this.cityRadius = 0.4
        this.tl = gsap.timeline()

        this.waterTexture = this.resources.items.waterTexture
        this.waterTexture.repeat.set(6, 6)
        this.waterTexture.rotation = Math.PI * 0.35
        this.waterTexture.wrapS = THREE.RepeatWrapping
        this.waterTexture.wrapT = THREE.RepeatWrapping

        this.fieldsTexture = this.resources.items.fieldsTexture
        this.fieldsTexture.repeat.set(6, 6)
        this.fieldsTexture.wrapS = THREE.RepeatWrapping
        this.fieldsTexture.wrapT = THREE.RepeatWrapping

        this.forestTexture = this.resources.items.forestTexture
        this.forestTexture.repeat.set(10, 10)
        this.forestTexture.wrapS = THREE.RepeatWrapping
        this.forestTexture.wrapT = THREE.RepeatWrapping

        this.buildingTexture = this.resources.items.buildingTexture
        this.buildingTexture.repeat.set(5, 5)
        this.buildingTexture.wrapS = THREE.RepeatWrapping
        this.buildingTexture.wrapT = THREE.RepeatWrapping

        this.houseTexture = this.resources.items.houseTexture
        this.houseTexture.repeat.set(30, 30)
        this.houseTexture.wrapS = THREE.RepeatWrapping
        this.houseTexture.wrapT = THREE.RepeatWrapping

        this.models = this.experience.world.models

        this.resource = this.resources.items.planetModel


        axios.get(`https://sheet.best/api/sheets/f5776daa-2214-4572-bb75-4805d878a6a2`)
            .then(response => {
                this.form = response.data
                this.formDataLength = this.form.length - 1
                // console.log(this.form)

                this.setIcosahedron()
                this.setCities()
            })
            .catch(error => {
                console.error('There was an error!', error)
            })

        this.setSphere()

        this.raycaster = new THREE.Raycaster()
        this.pointerEvents.on('pointerDown', () => {
            this.selectCurrent()
        })
    }

    setSphere() {
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.995, 16, 16),
            new THREE.MeshStandardMaterial({ color: 'blue' }))
    }

    setIcosahedron() {

        const waterMaterial = new THREE.MeshStandardMaterial({
            map: this.waterTexture,
            dithering: true
        })

        const fieldsMaterial = new THREE.MeshStandardMaterial({
            map: this.fieldsTexture,
            dithering: true
        })

        const forestMaterial = new THREE.MeshStandardMaterial({
            map: this.forestTexture,
            dithering: true
        })

        const buildingMaterial = new THREE.MeshStandardMaterial({
            map: this.buildingTexture,
            dithering: true
        })

        const houseMaterial = new THREE.MeshStandardMaterial({
            map: this.houseTexture,
            dithering: true
        })

        this.icosahedronGeometry = new THREE.IcosahedronGeometry(1, 8)
        this.icosahedron = new THREE.Mesh(
            this.icosahedronGeometry,
            [
                waterMaterial,
                buildingMaterial,
                houseMaterial,
                forestMaterial,
                fieldsMaterial
            ])

        const duration = 1
        this.tl.from(this.icosahedron.scale, { duration: duration, x: 0, y: 0, z: 0 })


        this.scene.add(this.icosahedron)


        for (let i = 0; i < (this.icosahedron.geometry.attributes.position.count / 3); i++) {
            if (!this.form[i].materialIndex) this.icosahedronGeometry.addGroup(this.form[i].startVertex, 3, 0)
            else this.icosahedronGeometry.addGroup(this.form[i].startVertex, 3, this.form[i].materialIndex)

            let pos = this.icosahedronGeometry.attributes.position
            let a = new THREE.Vector3().fromBufferAttribute(pos, i * 3)
            let b = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 1)
            let c = new THREE.Vector3().fromBufferAttribute(pos, i * 3 + 2)
            let faceCenter = new THREE.Vector3().addVectors(a, b).add(c).multiplyScalar(1 / 3)

            if (this.form[i].materialIndex === '1' || this.form[i].materialIndex === '2' || this.form[i].materialIndex === '3') {
                this.models.cloneModel(+this.form[i].materialIndex, this.tl, 0.01, duration + Math.random() * 0.3, faceCenter, this.form[i].rotation, this.form[i].scale)
            }
        }

        this.resources.showMenu()
    }

    setCities() {
        const countStart = this.icosahedron.geometry.attributes.position.count / 3
        for (let i = countStart; i < this.form.length; i++) {
            if (this.form[i].cityName != '' || this.form[i].cityName != 'null') {
                this.buildCity(i, this.form[i].cityName, this.form[i].cityCenterX, this.form[i].cityCenterY, this.form[i].cityCenterZ)
            }
        }
    }

    buildCity(index, name, x, y, z) {
        //add city name
        //Parent div
        var parentDiv = document.createElement('div')
        parentDiv.classList.add('city')
        // parentDiv.classList.add('visible')
        document.querySelector('.App').appendChild(parentDiv)

        //Child Div
        var childDiv = document.createElement('div')
        childDiv.innerText = name
        childDiv.classList.add('text')
        parentDiv.appendChild(childDiv)

        //Pin Div
        var pinDiv = document.createElement('div')
        pinDiv.classList.add('pin')
        parentDiv.appendChild(pinDiv)

        const city = {
            position: new THREE.Vector3(x, y, z),
            element: parentDiv,
            name: name,
            index: index,
        }
        this.cityArray.push(city)


    }

    selectCurrent() {
        this.raycaster.setFromCamera(this.pointer, this.camera.instance)
        this.intersects = this.raycaster.intersectObject(this.icosahedron)
        if (this.intersects.length) {
            //Change color
            var index = this.intersects[0].face.a / 3
            this.icosahedron.geometry.groups[index] = { start: this.intersects[0].face.a, count: 3, materialIndex: this.experience.colorIndex }

            //Find center to build model
            let pos = this.icosahedronGeometry.attributes.position
            let a = new THREE.Vector3().fromBufferAttribute(pos, this.intersects[0].face.a)
            let b = new THREE.Vector3().fromBufferAttribute(pos, this.intersects[0].face.b)
            let c = new THREE.Vector3().fromBufferAttribute(pos, this.intersects[0].face.c)
            let faceCenter = new THREE.Vector3().addVectors(a, b).add(c).multiplyScalar(1 / 3)

            this.scene.children.forEach(object => {
                if (object.position.equals(faceCenter)) this.scene.remove(object)
            })

            let rotation = Math.random() * 2
            let scale = 1.2 + (Math.random() - 0.5)
            if (this.experience.colorIndex === 1 || this.experience.colorIndex === 2 || this.experience.colorIndex === 3) {
                this.models.cloneModel(this.experience.colorIndex, this.tl, 0.1, 0, faceCenter, rotation, scale)
            }

            //Build city
            if (this.experience.colorIndex === 1 || this.experience.colorIndex === 2) {
                let citySize = 0

                this.scene.children.forEach(child => {
                    if (child.position.distanceTo(faceCenter) < 0.4 && child.children.length) {
                        if (child.children[0].name === 'building') citySize += 2
                        if (child.children[0].name === 'house') citySize += 1
                    }
                })

                this.cityArray.forEach(city => {
                    if (city.position.distanceTo(faceCenter) < (this.cityRadius * 2)) citySize = 0
                })

                if (citySize > 35) {
                    const randomCityNameIndex = Math.floor(Math.random() * this.cityNames.length)

                    let cityName = prompt('A new city is born !', `What's its name?`)
                    if (cityName == null || cityName == '' || cityName == `What's its name?`) {
                        cityName = this.cityNames[randomCityNameIndex]
                    }


                    console.log('new city ' + cityName)
                    const city =
                    {
                        groupsIndex: 0,
                        startVertex: 0,
                        materialIndex: 0,
                        rotation: 0,
                        scale: 0,
                        cityName: cityName,
                        cityCenterX: faceCenter.x,
                        cityCenterY: faceCenter.y,
                        cityCenterZ: faceCenter.z

                    }
                    axios.post(`https://sheet.best/api/sheets/f5776daa-2214-4572-bb75-4805d878a6a2`, city)
                        .then(response => {
                            console.log(response)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    this.formDataLength += 1
                    console.log(this.formDataLength)
                    this.buildCity(this.formDataLength, city.cityName, faceCenter.x, faceCenter.y, faceCenter.z)
                }
            }

            //Destroy city
            if (this.experience.colorIndex === 0 || this.experience.colorIndex === 3 || this.experience.colorIndex === 4) {

                this.cityArray.forEach(city => {
                    if (city.position.distanceTo(faceCenter) < this.cityRadius) {

                        let citySize = 0
                        this.scene.children.forEach(child => {
                            if (child.position.distanceTo(city.position) < 0.4 && child.children.length) {
                                if (child.children[0].name === 'building') citySize += 2
                                if (child.children[0].name === 'house') citySize += 1
                            }
                        })

                        if (citySize <= 25) {
                            console.log('destroy ' + city.name)
                            axios.delete(`https://sheet.best/api/sheets/f5776daa-2214-4572-bb75-4805d878a6a2/${city.index}`)
                                .then(response => {
                                    console.log(city.name + 'destroyed')
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                            city.element.remove()
                            this.cityArray.shift(city)
                        }
                    }
                })
            }

            //Update database
            this.form[index] =
            {
                groupsIndex: index,
                startVertex: this.intersects[0].face.a,
                materialIndex: this.experience.colorIndex,
                rotation: rotation,
                scale: scale,
                cityName: 0,
                cityCenterX: 0,
                cityCenterY: 0,
                cityCenterZ: 0
            }

            axios.put(`https://sheet.best/api/sheets/f5776daa-2214-4572-bb75-4805d878a6a2/${index}`, this.form[index])
                .then(response => {
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    update() {
        for (const city of this.cityArray) {
            const screenPosition = city.position.clone()
            screenPosition.project(this.camera.instance)


            this.cityRaycaster.setFromCamera(screenPosition, this.camera.instance)
            const intersects = this.cityRaycaster.intersectObject(this.sphere)

            if (intersects.length === 0) {
                city.element.classList.add('visible')
            }
            else {
                const intersectionDistance = intersects[0].distance
                const pointDistance = city.position.distanceTo(this.camera.instance.position)

                if (intersectionDistance < pointDistance) {
                    city.element.classList.remove('visible')
                }
                else {
                    city.element.classList.add('visible')
                }
            }

            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5
            city.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }

    }
}