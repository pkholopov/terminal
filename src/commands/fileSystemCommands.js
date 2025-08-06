import { useFileSystemStore } from '../stores/fileSystem'
import { terminalConsole } from '@/utils/console'

export default {
  descriptionFSCommands: {
    description: 'Команды для работы с директориями',
  },
  cd: {
    description: 'Переход в другую директорию',
    execute: (directory) => {
      const fileSystemStore = useFileSystemStore()
      if (directory === '..') {
        if (fileSystemStore.getCurrentDirectory().length === 1) {
          return
        }
        fileSystemStore.getCurrentDirectory().pop()
      } else if (directory === '/' || !directory) {
        fileSystemStore.setCurrentDirectory(['root'])
      } else {
        directory = directory.split('/')
        let tempPath = fileSystemStore.getCurrentDirectory().concat(directory)
        if (!fileSystemStore.checkDirectoryExists(tempPath)) {
          terminalConsole.error(`Директория ${tempPath.join('/')} не существует`)
          return {
            type: 'error',
            text: `Директория ${tempPath.join('/')} не существует`
          }
        }
        fileSystemStore.setCurrentDirectory(tempPath)        
      }
    }
  }, 
  mkdir: {
    description: 'Создание новой директории',
    execute: (directoryName) => {
      const fileSystemStore = useFileSystemStore()
      if (directoryName) {
        fileSystemStore.addDirectory(fileSystemStore.getCurrentDirectory(), directoryName)
      } else {
        terminalConsole.error('Название директории не указано')
        return {
          type: 'error',
          text: 'Название директории не указано'
        }
      }
    }
  },
  rm: {
    description: 'Удаление директории',
    execute: (directoryName) => {
      console.log(directoryName);
      
      const fileSystemStore = useFileSystemStore()
      if (directoryName) {
        if (!fileSystemStore.checkDirectoryExists(fileSystemStore.getCurrentDirectory().concat(directoryName.split('/')))) {
          terminalConsole.error(`Директория ${directoryName} не существует`)
          return {
            type: 'error',
            text: `Директория ${directoryName} не существует`
          }
        }
        fileSystemStore.removeDirectory(fileSystemStore.getCurrentDirectory(), directoryName)
      } else {
        terminalConsole.error('Название директории не указано')
        return {
          type: 'error',
          text: 'Название директории не указано'
        }
      }
    }
  }, 
  ls: {
    description: 'Список директорий и файлов',
    execute: () => {
      const fileSystemStore = useFileSystemStore()
      const children = fileSystemStore.getChildren(fileSystemStore.getCurrentDirectory())
      let outputText
      children.length ? outputText = children.map(child => child.name).join(' ') : outputText = 'Директория пуста'
      terminalConsole.output(outputText)
      return {
        type: 'output',
        text: outputText
      }
    }
  },
  tree: {
    description: 'Вывод дерева директорий',
    execute: () => {
      const fileSystemStore = useFileSystemStore()
      return {
        type: 'output',
        text: fileSystemStore.printDirectoriesTree()
      }
    }
  }
}
