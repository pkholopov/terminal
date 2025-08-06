import { sleep } from "@/utils/sleep"
import { useTerminalStore } from "@/stores/terminal"

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
  flip: {
    hidden: true,
    execute: () => {
      const appContainer = document.getElementById('app')
      // appContainer.style.transform = `rotate(180deg)`
      appContainer.classList.toggle('flip')
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
  },
  sleep: {
    hidden: true,
    execute: async () => {
      const terminalStore = useTerminalStore()
      terminalStore.isExecuting = true
      await sleep(2000)
      terminalStore.isExecuting = false
    }
  }
}
