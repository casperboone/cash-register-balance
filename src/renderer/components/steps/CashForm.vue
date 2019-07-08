<template>
  <div class="flex">
    <div class="rounded shadow flex-1">
        <div class="bg-white px-8 py-4 flex">
          <h3 class="text-xl font-semibold text-grey-black flex-1">{{ title }}</h3>
          <button v-if="cashDrawerContents.supportsPredictions()" @click="cashDrawerContents.predict(true)" class="border rounded px-2 text-sm">Repredict Contents</button>
        </div>
        <div class="p-8 bg-grey-lighter">

          <div class="grid">
            <div v-for="bill in cashDrawerContents.bills" :key="bill.amount">
              <div class="flex justify-between items-center">
                <div class="flex-auto">
                  <input type="text" v-model.number="bill.count" class="form-input w-16" @focus="$event.target.select()">  x {{ bill.amount | currency }}
                </div>
                <div class="flex-auto text-right pr-3">{{ bill.total() | currency }}</div>
              </div>
            </div>

            <div class="text-right" v-if="cashDrawerContents.supportsEmergencyCash()">
              Emergency Cash - &euro;
              <input type="text" v-model.number="cashDrawerContents.emergencyCash" class="form-input text-right w-32" @focus="$event.target.select()">
            </div>
          </div>

        </div>

        <div class="px-8 py-6 bg-white">
          <div class="flex justify-between items-center">
              <div class="flex-auto">
                Total
              </div>
              <div class="flex-auto text-right pr-4">{{ cashDrawerContents.total() | currency }}</div>
            </div>
        </div>

      </div>

      <div class="px-2 w-64">
        <button @click="openCashDrawer()" class="bg-blue border border-blue hover:bg-blue-dark text-white font-bold p-4 mb-2 rounded w-full">Open Cash Drawer</button>
        <slot>
          <help-note>Please fill in the amount of bank notes / coins present in the cash drawer.</help-note>
          <help-note>If a certain bank note / coin is not present, leave the amount at zero.</help-note>
          <help-note>
            Please also fill in the amount of 'emergency cash'. This is the sum of the amount of money in the small 
            plastic bags, which are present in the cash drawer.
          </help-note>
        </slot>
      </div>

    </div>
</template>

<script>
import { spawn } from 'child_process'

export default {
  props: ['title', 'cashDrawerContents'],
  methods: {
    updateFromParent () {
      if (this.cashDrawerContents.supportsPredictions()) {
        this.cashDrawerContents.predict()
      }
    },
    openCashDrawer () {
      spawn('cmd.exe', ['/c', 'C:\\open_cash_drawer.bat'])
    }
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-rows: repeat(6, auto);
  grid-gap: .5em 1em;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
}
</style>