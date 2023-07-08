<template>
  <div class="w-64 m-auto">
    <help-note>
      Time to start your bar session! Click the button below to start the POS software.
    </help-note> 
    <button @click="openPos()" class="bg-blue border border-blue hover:bg-blue-dark text-white font-bold p-4 rounded w-full">
      Start POS software
    </button>
    <help-note v-if="loading" :icon="false" class="mt-2 flex items-center">
      <div class="lds-ring mr-2"><div></div><div></div><div></div><div></div></div>
      Starting POS software...
    </help-note> 
    <help-note v-if="showClosingNote" class="mt-2">When you return to this screen, please press next to continue.</help-note> 
  </div>
</template>

<script>
import { spawn } from 'child_process'

export default {
  props: ['barSession'],
  data () {
    return {
      loading: false,
      showClosingNote: false
    }
  },
  methods: {
    openPos () {
      this.loading = true
      setInterval(() => {
        this.showClosingNote = true
        this.loading = false
      }, 60000)

      spawn('cmd.exe', ['/c', 'C:\\open_pos.bat'])
    }
  }
}
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 0px;
  border: 8px solid #3490dc;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #3490dc transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
