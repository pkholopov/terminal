import fileSystemCommands from "./fileSystemCommands"
import userCommands from "./userCommands"
import easterEggsCommands from "./easterEggsCommands"
import { terminalConsole } from "@/utils/console"
import { useTerminalStore } from '../stores/terminal'


export const commands = {
  help: {
    description: 'Показать список команд',
    execute: () => {
      let result = 'Доступные команды:\n\n'
      for (const cmd in commands) {
        if(commands[cmd].hidden) continue
        if (cmd.startsWith('description')) {
          result += `\n \n ${commands[cmd].description}\n\n`
          continue
        }
        result += `  ${cmd} — ${commands[cmd].description}\n`
      }
      terminalConsole.output(result)
      return {
        type: 'output',
        text: result
      }
    }
  },
  author: {
    description: 'Информация об авторе',
    execute: (command) => {
      const commandsActions = {
        github: () => {
          window.open('https://github.com/pkholopov', '_blank')
        },
        vk: () => {
          window.open('https://vk.com/id16759766', '_blank')
        },
        phone: () => {
          return {
            html: true,
            type: 'output',
            text: '<a href="tel:+70000000000">+7 (000) 000-00-00</a>'
          }
        }
      }
      if (commandsActions[command]) {
        return commandsActions[command]()
      } else {
        return {
          type: 'output',
          text: 'Автор: Холопов Павел. Чтобы перейти на страницу автора, введите "author github" или "author vk". Чтобы получить номер телефона, введите "author phone"'
        }
      }
    }
  },
  clear: {
    description: 'Очистить экран терминала',
    execute: () => {
      const terminalOutputStore = useTerminalStore()
      terminalOutputStore.clearOutput()
    }
  },
  ...userCommands,
  ...fileSystemCommands,
  ...easterEggsCommands
}
