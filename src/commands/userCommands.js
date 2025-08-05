import { useUserStore } from '../stores/user'
import { terminalConsole } from '@/utils/console'

export default {
  descriptionUserCommands: {
    description: 'Команды для работы с пользователем',
  },
  whoami: {
    description: 'Показать информацию о пользователе',
    hidden: true,
    execute: () => {
      const userStore = useUserStore()
      return {
        type: 'output',
        text: `${userStore.userName} (Дата входа: ${userStore.userLoginTime})`
      }
    }
  },
  name: {
    description: 'Изменить имя пользователя',
    execute: (...args) => {

      const argsHandlers = {
        '-color': {
          description: 'Изменить цвет имени пользователя',
          execute: (index) => {
            const userStore = useUserStore()
            userStore.userConfig.color = restArgs[index + 1]
          }
        }
      }

      const [name, ...restArgs] = args
      
      restArgs.forEach((arg, index) => {
        const handler = argsHandlers[arg]
        if (handler) {
          handler.execute(index)
        }
      })
      
      const userStore = useUserStore()
      userStore.setUserName(name)
      terminalConsole.info(`Имя пользователя изменено на ${name}`)
      return {
        type: 'output',
        text: `Имя пользователя изменено на ${name}`
      }
    }
  }
}
