import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useFileSystemStore = defineStore('fileSystem', () => {
  const currentDirectory = ref(['root', 'home'])

  const pathToString = (path) => {
    return path.join('/')
  }

  const setCurrentDirectory = (directory) => {
    currentDirectory.value = directory
  }

  const checkDirectoryExists = (directory) => {
    let currentDirectory = directoriesTree
    for (let i = 1; i < directory.length; i++) {
      currentDirectory = currentDirectory.children.find(child => child.name === directory[i])
      if (!currentDirectory) {
        return false
      }
    }
    return true
  }

  const getCurrentDirectory = () => {
    return currentDirectory.value
  }

  const getChildren = (directory) => {
    let currentDirectory = directoriesTree
    for (let i = 1; i < directory.length; i++) {
      currentDirectory = currentDirectory.children.find(child => child.name === directory[i])
      if (!currentDirectory) {
        return
      }
    }
    return currentDirectory.children
  }

  const getParentDirectory = (directory) => {
    let currentDirectory = directoriesTree
    for (let i = 1; i < directory.length; i++) {
      currentDirectory = currentDirectory.children.find(child => child.name === directory[i])
      if (!currentDirectory) {
        return
      }
    }
    return currentDirectory
  }

  const directoriesTree = reactive({
    name: 'root',
    type: 'directory',
    children: [
      {
        name: 'home',
        type: 'directory',
        children: []
      },
      {
        name: 'config',
        type: 'directory',
        children: [
          {
            name: 'config.json',
            type: 'file'
          }
        ]
      }
    ]
  })

  const addDirectory = (parentDirectory, directoryName) => {
    const directoryChildren = getChildren(parentDirectory)
    directoryChildren.push({
      name: directoryName,
      type: 'directory',
      children: []
    })
  }

  const removeDirectory = (parentDirectory, directoryName) => {
    let parent = getParentDirectory(parentDirectory)
    parent.children = parent.children.filter(child => child.name !== directoryName)
  }

  const printDirectoriesTree = () => {
    let result = ''
    const printDirectory = (directory, level) => {
      result += `${' '.repeat(level)} ${directory.name} ${directory.type === 'directory' ? '' : '*'} \n`
      directory?.children?.forEach(child => {
        printDirectory(child, level + 3)
      })
    }
    printDirectory(directoriesTree, 0)
    return result
  }


  return {
    directoriesTree,
    currentDirectory,
    pathToString,
    setCurrentDirectory,
    checkDirectoryExists,
    getCurrentDirectory,
    getChildren,
    addDirectory,
    removeDirectory,
    printDirectoriesTree
  }
}, {
  persist: {
    key: 'fileSystem',
    storage: localStorage,
    pick: ['directoriesTree', 'currentDirectory']
  }
})


