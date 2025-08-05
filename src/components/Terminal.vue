<script setup>
import { ref, nextTick } from 'vue'
import {commands} from '@/commands/commands'
import { useTerminalStore } from '@/stores/terminal'
import CommandLine from './CommandLine.vue'

const terminalStore = useTerminalStore()

const terminalOutput = ref(null)
const terminalRef = ref(null)
const commandLineRef = ref(null)

const handleCommand = (commandWithArgs) => {

  const [command, ...args] = commandWithArgs.split(' ')
  
  terminalStore.addToOutput({ text: commandWithArgs, type: 'command' })
  
  if (commands[command]) {
    const result = commands[command].execute(...args)
    if (result) {
      terminalStore.addToOutput({ text: result?.text, type: result?.type || 'output', html: result?.html || false })
    }
  } else {
    terminalStore.addToOutput({ 
      text: `Команда "${command}" не найдена. Введите "help" для списка команд.`, 
      type: 'error' 
    })
  }
  
  nextTick(() => {    
    document.documentElement.scrollTop = terminalRef.value.scrollHeight
  })
}
</script>

<template>
  <div class="terminal" ref="terminalRef">
    <div ref="terminalOutput" class="terminal-output">
      <div v-for="(item, index) in terminalStore.output" :key="index" :class="item.type">
        <span v-if="item.type === 'command'" class="prompt">$</span>
        <span v-if="item.html" v-html="item.text"></span>
        <span v-else v-text="item.text"></span>
      </div>
    </div>
    <CommandLine @command="handleCommand" ref="commandLineRef"/>
  </div>
</template>

<style scoped>
.terminal {
  /* color: #00ff00; */
  /* background-color: #000; */
  padding: 20px;
  border-radius: 5px;
  margin: 0 auto;
  /* height: 100dvh; */
}

.terminal-output {
  overflow-y: auto;
  margin-bottom: 10px;
}

.info {
  color: #00c000;
}

.command {
  color: #ffffff;
  margin-bottom: 5px;
}

.output {
  color: #00ff00;
  white-space: pre-wrap;
  margin-bottom: 10px;
}

.error {
  color: #ff0000;
}

.prompt {
  color: #00ff00;
  margin-right: 10px;
}
</style>
