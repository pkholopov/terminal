<script setup>
import { terminalConsole } from './utils/console'
import TerminalHeader from './components/TerminalHeader.vue'
import Terminal from './components/Terminal.vue'

terminalConsole.info('Веб терминал. v0.0.1. Vue 3. Pinia. Vite.')
</script>

<template>
  <div class="app">
    <TerminalHeader />
    <Terminal />
  </div>
</template>

<style>
.app {
  background-color: #000;
  color: #00ff00;
  min-height: 100dvh;
  position: relative;
}
</style>
