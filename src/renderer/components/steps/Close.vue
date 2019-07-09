<template>
  <div class="m-auto">
    <div class="shadow mb-4 bg-white pl-4 pr-8 py-4">
      <h3 class="text-xl font-semibold text-grey-black flex">
        <span class="bg-blue-darker text-white rounded-full text-center w-8 h-8 mr-2 flex items-center justify-around">1</span>
        Put POS totals ticket in envelope
        <div class="text-right flex-1 text-sm leading-loose font-normal">(see step 4)</div>
      </h3>
    </div>

    <div class="shadow mb-4 bg-white pl-4 pr-8 py-4">
      <h3 class="text-xl font-semibold text-grey-black flex">
        <span class="bg-blue-darker text-white rounded-full text-center w-8 h-8 mr-2 flex items-center justify-around">2</span>
        Put PIN terminal totals ticket of both terminals in envelope
        <div class="text-right flex-1 text-sm leading-loose font-normal">(see step 5)</div>
      </h3>
    </div>

    <div class="shadow mb-4 bg-white pl-4 pr-8 py-4">
      <h3 class="text-xl font-semibold text-grey-black flex">
        <span class="bg-blue-darker text-white rounded-full text-center w-8 h-8 mr-2 flex items-center justify-around">3</span>
        Put Cash Register Balance Ticket in envelope
        <div class="text-right flex-1 text-sm leading-loose font-normal">(see step 7)</div>
      </h3>
    </div>

    <div class="shadow mb-4 bg-white pl-4 pr-8 py-4">
      <h3 class="text-xl font-semibold text-grey-black flex">
        <span class="bg-blue-darker text-white rounded-full text-center w-8 h-8 mr-2 flex items-center justify-around">4</span>
        Bring envelope to the safe
      </h3>
    </div>

    <div class="shadow mb-4 bg-white pl-4 pr-8 py-4">
      <h3 class="text-xl font-semibold text-grey-black flex">
        <span class="bg-blue-darker text-white rounded-full text-center w-8 h-8 mr-2 flex items-center justify-around">5</span>
        Put wireless PIN terminal on charger
      </h3>
    </div>

    <div class="flex">
      <div class="shadow bg-white pl-4 pr-8 py-4 flex-1 mr-4">
        <h3 class="text-xl font-semibold text-grey-black flex">
          <span class="bg-blue-darker text-white rounded-full text-center w-8 h-8 mr-2 flex items-center justify-around">6</span>
          Shut down system
        </h3>
      </div>
      <button @click="shutdown()" class="text-base bg-red border border-red hover:bg-red-dark text-white font-bold px-4 rounded">
        Shut Down
      </button>
    </div>
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
