import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const randomNumber = Math.floor(Math.random() * 1000)
  const userName = ref('Anonimous' + randomNumber)
  const userLoginTime = ref(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)

  const userConfig = ref({
    color: '#00ff00'
  })

  const setUserName = (name) => {
    userName.value = name
    userLoginTime.value = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  }
  return {
    userName,
    userLoginTime,
    userConfig,
    setUserName
  }
}, {
  persist: {
    key: 'user',
    storage: localStorage,
    pick: ['userName', 'userConfig']
  }
})


