<template>
  <div>
    <div class="flex mb-8">
      <div class="rounded shadow flex-1 bg-grey-lighter">
        <div class="bg-white px-8 py-4">
          <h3 class="text-xl font-semibold text-grey-black">Theoretical Revenue</h3>
        </div>
        <div class="p-8 bg-grey-lighter">
          <div class="flex justify-between items-center mb-2">
            <div>POS Cash Total</div>
            <div>{{ barSession.posCashTotal | currency }}</div>
          </div>
          <div class="flex justify-between items-center mb-2">
            <div>POS PIN Total</div>
            <div>{{ barSession.posPinTotal | currency }}</div>
          </div>
          <div class="flex justify-between items-center">
            <div>POS Free Total*</div>
            <div>{{ barSession.posFreeTotal | currency }}</div>
          </div>
          <div><small>* Drinks for bar crew, not included in total</small></div>
        </div>
        <div class="px-8 py-6 bg-white">
          <div class="flex justify-between items-center">
              <div class="flex-auto">
                Theoretical Revenue
              </div>
              <div class="flex-auto text-right">{{ barSession.posCashTotal + barSession.posPinTotal | currency }}</div>
            </div>
        </div>
      </div>
      
      <div class="rounded shadow flex-1 bg-grey-lighter ml-4">
        <div class="bg-white px-8 py-4">
          <h3 class="text-xl font-semibold text-grey-black">Actual Revenue</h3>
        </div>
        <div class="p-6 bg-grey-lighter">
          <div class="flex justify-between items-center mx-2 mb-6">
            <div>Actual PIN Total</div>
            <div>{{ barSession.actualPinTotal | currency }}</div>
          </div>

          <div class="flex justify-between items-center mx-2 mb-2">
            <div>Actual Cash Total</div>
            <div>--</div>
          </div>
        </div>
        <div class="px-8 py-6 bg-white">
          <div class="flex justify-between items-center">
              <div class="flex-auto">
                Actual Revenue
              </div>
              <div class="flex-auto text-right">{{ barSession.actualPinTotal | currency }}</div>
            </div>
        </div>
      </div>


      <div class="ml-4 flex-1 flex flex-col">
        <help-note class="mb-0">Please review the information in this overview. If you've made a mistake, go back to the corresponding step and correct your mistake.</help-note>
      </div>

    </div>

    <div class="flex">
        <help-note class="mb-0 flex-1 mr-4">
          When you press 'Print Tickets', two tickets will be printed. Put the first one in the envelope, put the second one in the cash drawer.
        </help-note>

        <button @click="print()" class="bg-blue border border-blue hover:bg-blue-dark text-white font-bold px-8 rounded">Print Tickets</button>
    </div> 

    <bar-session-ticket v-show="false" ref="ticket" :barSession="barSession"></bar-session-ticket>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import BarSessionTicket from '../BarSessionTicket'

export default {
  components: { BarSessionTicket },
  props: ['barSession'],
  methods: {
    print () {
      ipcRenderer.send('print', this.$refs.ticket.$el.innerHTML)
    }
  }
}
</script>
