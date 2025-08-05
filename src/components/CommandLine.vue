<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useFileSystemStore } from '@/stores/fileSystem'
import { useTerminalStore } from '@/stores/terminal'

const emit = defineEmits(['command'])

const userStore = useUserStore()
const fileSystemStore = useFileSystemStore()
const terminalStore = useTerminalStore()

const command = ref('')
const input = ref(null)
const commandHistory = storeToRefs(terminalStore).commandHistory
const historyIndex = ref(0)
const currentDirectory = computed(() => {
  return fileSystemStore.pathToString(fileSystemStore.getCurrentDirectory())
})


onMounted(() => {
  input.value.focus()
})

const returnFocus = () => {
  input.value.focus()
}

const executeCommand = () => {
  if (command.value.trim()) {
    emit('command', command.value.trim())
    commandHistory.value.push(command.value.trim())
    historyIndex.value = commandHistory.value.length
    command.value = ''
  }
}

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return
  
  historyIndex.value = Math.max(
    0, 
    Math.min(commandHistory.value.length, historyIndex.value + direction)
  )
  
  if (historyIndex.value === commandHistory.value.length) {
    command.value = ''
  } else {
    command.value = commandHistory.value[historyIndex.value]
  }
}
</script>

<template>
  <div class="command-line">
    <span class="prompt">
      <span :style="`color: ${userStore.userConfig.color}`">{{ userStore.userName }}</span>:<span class="directory">{{ currentDirectory }}</span>$</span>
    <input 
      v-model="command" 
      @keyup.enter="executeCommand" 
      @keyup.up="navigateHistory(-1)"
      @keyup.down="navigateHistory(1)"
      @blur="returnFocus"
      ref="input"
      type="text" 
      class="input" 
    />
  </div>
</template>

<style scoped>
.command-line {
  display: flex;
  align-items: center;
}

.prompt {
  /* color: #00ff00; */
  margin-right: 5px;
}

.directory {
  color: #368dff;
}

.input {
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: 16px;
  flex-grow: 1;
  outline: none;
  padding: 5px;
}
</style>
