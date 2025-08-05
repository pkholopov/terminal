export default {
  descriptionEasterEggsCommands: {
    description: 'Команды для взлома',
  },
  hack: {
    description: 'Взломать систему',
    // hidden: true,
    execute: () => {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
      return {
        type: 'output',
        text: 'Взломано!'
      }
    }
  },
  tilt: {
    hidden: true,
    execute: (deg) => {
      deg = deg || 1
      const appContainer = document.getElementById('app')
      appContainer.style.transform = `rotate(${deg}deg)`
    }
  },
  shake: {
    hidden: true,
    execute: () => {
      const appContainer = document.getElementById('app')
      appContainer.classList.add('shake')
      setTimeout(() => {
        appContainer.classList.remove('shake')
      }, 2000)
    }
  }
}
