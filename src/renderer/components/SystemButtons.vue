<template>
    <div>
        <button @click="openPos" class="w-full bg-blue border border-blue hover:bg-blue-dark text-white font-bold p-4 rounded">
          Open Kassa
        </button>
        <button @click="shutdown" class="w-full bg-red-light border border-red hover:bg-red text-white font-bold p-4 mt-4 rounded">
          Systeem Afsluiten
        </button>
    </div>
</template>

<script>
import { spawn } from 'child_process'

export default {
  methods: {
    openPos () {
      this.$emit('openPos')
      const ls = spawn('cmd.exe', ['/c', 'open_pos.bat'])

      console.log('cmd.exe', ['/c', 'open_pos.bat'])

      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })

      ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
      })

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    },
    shutdown () {
      this.$emit('shutdown')
      spawn('cmd.exe', ['/c', 'shutdown.bat'])
    }
  }
}
</script>
