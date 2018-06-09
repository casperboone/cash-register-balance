<template>
  <div class="cash-state-form">
      <div class="px-8 py-4 bg-grey-lighter">
        <div class="text-center">
          <input :disabled="!cashState.editable" type="text" v-model="cashState.author" placeholder="Ingevuld door: Voornaam Achternaam" :class="'form-input mt-1 block w-full text-center ' + (cashState.editable ? 'bg-white' : 'py-0')">
        </div>
      </div>

      <div class="p-8 bg-grey-lightest">

        <div v-if="!cashState.editable" class="bg-red  bg-teal text-white rounded px-4 py-2 -mt-4 mb-4"><strong>Let op:</strong> Deze informatie kan niet worden bewerkt.</div>

        <div class="grid">
          <div v-for="bill in cashState.bills" :key="bill.amount">
            <div class="flex justify-between mb-3 items-center">
              <div class="flex-auto">
                <input :disabled="!cashState.editable" type="text" v-model.number="bill.count" :class="(cashState.editable ? ['form-input', 'w-16'] : ['form-input-disabled', 'w-16'])" @click="checkAmountsAvailable()" @keydown="checkAmountsAvailable()" @change.native="checkAmountsAvailable()">  x &euro; {{ bill.amount | currency('') }}
              </div>
              <div class="flex-auto text-right pr-3">&euro; {{ bill.total() | currency('') }}</div>
            </div>
          </div>

          <div class="text-right" v-if="cashState.editable">
            Noodwisselgeld - &euro;
            <input type="text" v-model.number="cashState.emergencyCash" class="form-input text-right w-32" @select="checkAmountsAvailable()" @keydown="checkAmountsAvailable()">
          </div>
        </div>

      </div>

      <div class="px-8 py-6 bg-grey-lighter">
        <div class="flex justify-between mb-3 items-center">
            <div class="flex-auto">
              Totaal
            </div>
            <div class="flex-auto text-right pr-4">&euro; {{ cashState.total() | currency('') }}</div>
          </div>
      </div>
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  name: 'CashStateForm',
  props: ['cashState'],
  methods: {
    checkAmountsAvailable () {
      if (this.cashState.author.length === 0) {
        remote.dialog.showMessageBox({
          message: 'Vul eerst je naam in in het bovenstaande tekstvak.',
          buttons: ['Sluiten']
        })
        event.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

.grid {
  display: grid;
  grid-template-rows: repeat(6, auto);
  grid-gap: 0em 1em;
  grid-auto-flow: column;
}
</style>
