<template>
  <div class="w-64 m-auto">
    <help-note>
      Time to start your bar session! Click the button below to start the POS software.
    </help-note> 
    <button @click="openPos()" class="bg-blue border border-blue hover:bg-blue-dark text-white font-bold p-4 rounded w-full">
      Start POS software
    </button>
    <help-note v-if="showClosingNote" class="mt-2">When you return to this screen, please press next to continue.</help-note> 
  </div>
</template>

<script>
import { spawn } from 'child_process'

export default {
  props: ['barSession'],
  data () {
    return {
      showClosingNote: false
    }
  },
  methods: {
    openPos () {
      setInterval(() => { this.showClosingNote = true }, 5000)

      spawn('cmd.exe', ['/c', 'C:\\open_pos.bat'])
    }
  }
}
</script>
