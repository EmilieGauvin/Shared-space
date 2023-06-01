import { useState, useEffect } from 'react'
import './App.css'
import Experience from './Experience/Experience'
import { gsap } from 'gsap'


function App() {
  const experience = new Experience
  const durationMenuAnimation = 0.5
  const scaleMenuAnimation = 1.3

  useEffect(() => {
    gsap.to('.help', { y: '+20', ease: 'power1.inOut', duration: 1, repeat: Infinity, yoyo: true })
  }, [])

  experience.resources.on('showMenu', () => {
    gsap.killTweensOf('.help')
    gsap.to('.button', { x: '+30vw', ease: 'back.out(1.3)', duration: 1, delay: 1 })
    gsap.to('.help', { x: '45vw', y: '45vh', ease: 'power1.out', duration: 1, delay: 0.5 })
    gsap.to('.help-text', { cursor: 'help', visibility: 'visible', duration: 1, delay: 1 })
  })


  const handleHelpClick = () => {
    gsap.to('.help', { x: '0vw', y: '0vh', scale: 10, ease: 'power1.out', duration: 0.5 })
    gsap.to('.help-text', { opacity: 0.1, ease: 'power1.out', duration: 0.5 })
    gsap.to('.help-background', { visibility: 'visible', duration: 1, delay: 0.5 })
  }

  const handleHelpQuit = () => {
    gsap.to('.help', { x: '45vw', y: '45vh', scale: 1, ease: 'power1.out', duration: 0.5 })
    gsap.to('.help-text', { opacity: 1, ease: 'power1.out', duration: 1 })
    gsap.to('.help-background', { visibility: 'hidden', duration: 1 })
  }


  const handleClickBuilding = () => {
    experience.colorIndex = 1
    gsap.to('.building', { scale: scaleMenuAnimation, duration: durationMenuAnimation })
    gsap.to('.house', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.water', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.forest', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.field', { scale: 1, duration: durationMenuAnimation })
  }

  const handleClickHouse = () => {
    experience.colorIndex = 2
    gsap.to('.building', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.house', { scale: scaleMenuAnimation, duration: durationMenuAnimation })
    gsap.to('.water', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.forest', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.field', { scale: 1, duration: durationMenuAnimation })
  }

  const handleClickWater = () => {
    experience.colorIndex = 0
    gsap.to('.building', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.house', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.water', { scale: scaleMenuAnimation, duration: durationMenuAnimation })
    gsap.to('.forest', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.field', { scale: 1, duration: durationMenuAnimation })
  }

  const handleClickForest = () => {
    experience.colorIndex = 3
    gsap.to('.building', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.house', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.water', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.forest', { scale: scaleMenuAnimation, duration: durationMenuAnimation })
    gsap.to('.field', { scale: 1, duration: durationMenuAnimation })
  }

  const handleClickField = () => {
    experience.colorIndex = 4
    gsap.to('.building', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.house', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.water', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.forest', { scale: 1, duration: durationMenuAnimation })
    gsap.to('.field', { scale: scaleMenuAnimation, duration: durationMenuAnimation })
  }

  return (
    <div className='App'>
      <div className='help'>
        <p onClick={handleHelpClick} className='help-text'>?</p>
      </div>

      <div onClick={handleHelpQuit} className='help-background'>
        <p>This is a shared Space.<br />Build cities and plant trees,<br />take care of what the ones before you created or take over the whole planet, your choice.<br />
          visit portfolio at <a className='textButton' href='http://emiliegauvin.com/' target='_blank'><i>emiliegauvin.com</i></a></p>
      </div>
      <div className='buttons'>

        {/* <h4>Select a builder tool:</h4> */}

        <button onClick={handleClickBuilding} className='button building'>
          <div></div>
          <h1>BUILDING</h1>
        </button>
        <button onClick={handleClickHouse} className='button house'>
          <div></div>
          <h1>HOUSE</h1>
        </button>
        <button onClick={handleClickWater} className='button water'>
          <div></div>
          <h1>WATER</h1>
        </button>
        <button onClick={handleClickForest} className='button forest'>
          <div></div>
          <h1>FOREST</h1>
        </button>
        <button onClick={handleClickField} className='button field'>
          <div></div>
          <h1>FIELD CROPS</h1>
        </button>
      </div>
      {/* <h4>Left click: use builder tool / Right click: rotate planet</h4> */}

    </div>
  )
}

export default App
