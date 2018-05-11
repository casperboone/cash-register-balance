<template>
    <div class="inline">
        <button @click="print" class="bg-white border border-teal-dark hover:bg-teal-dark hover:text-white text-teal-dark font-bold py-2 px-4 ml-2 rounded">Afdrukken</button>
        <bar-session-ticket v-show="false" ref="ticket" :bar-session="barSession" :cash-states="cashStates"></bar-session-ticket>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import BarSessionTicket from '@/components/BarSessionTicket'

export default {
  props: ['barSession', 'cashStates'],
  components: {
    'bar-session-ticket': BarSessionTicket
  },
  methods: {
    print () {
      ipcRenderer.send('print', this.$refs.ticket.$el.innerHTML)
    }
  }
}
</script>
