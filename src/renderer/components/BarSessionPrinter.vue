<template>
    <div class="inline">
        <button @click="print" class="bg-white border border-teal-dark hover:bg-teal-dark hover:text-white text-teal-dark font-bold py-2 px-4 ml-2 rounded">Afdrukken</button>
        <bar-session-ticket v-show="false" ref="ticket" :bar-session="barSession" :cash-states="cashStates"></bar-session-ticket>
        <bar-session-cash-specification-ticket v-show="false" ref="ticketCashSpecification" :bar-session="barSession" :cash-states="cashStates"></bar-session-cash-specification-ticket>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import BarSessionTicket from '@/components/BarSessionTicket'
import BarSessionCashSpecificationTicket from '@/components/BarSessionCashSpecificationTicket'

export default {
  props: ['barSession', 'cashStates'],
  components: {
    'bar-session-ticket': BarSessionTicket,
    'bar-session-cash-specification-ticket': BarSessionCashSpecificationTicket
  },
  methods: {
    print () {
      ipcRenderer.send('print', this.$refs.ticket.$el.innerHTML)
      setTimeout(() => {
        ipcRenderer.send('print', this.$refs.ticketCashSpecification.$el.innerHTML)
      }, 2000)
    }
  }
}
</script>
