import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTerminalStore = defineStore('terminal', () => {
  const output = ref([
    { text: 'Добро пожаловать в терминал!', type: 'info' },
    { text: 'Введите "help" для списка команд', type: 'info' }
  ])

  const commandHistory = ref([])

  const addToOutput = (outputItem) => {
    output.value.push(outputItem)
  }

  const clearOutput = () => {
    output.value = []
  }

  return {
    output,
    commandHistory,
    addToOutput,
    clearOutput
  }
}, {
  persist: {
    key: 'terminal',
    storage: sessionStorage,
    pick: ['output', 'commandHistory']
  }
})

