<template>
  <div class="w-64 m-auto">
    <help-note>
      If you've printed the tickets in the previous step, you're finished! Good job :)
    </help-note> 
    <button @click="shutdown()" class="bg-red border border-red hover:bg-red-dark text-white font-bold p-4 rounded w-full">
      Shutdown System
    </button>
  </div>
</template>

<script>
import { spawn } from 'child_process'

export default {
  methods: {
    shutdown () {
      spawn('cmd.exe', ['/c', 'C:\\shutdown.bat'])
    }
  }
}
</script>
