<template>
  <div class="cash-state-form">
      <div class="px-8 py-4 bg-grey-lighter">
        <div class="text-center">
          <input :disabled="!cashState.editable" type="text" v-model="cashState.author" placeholder="Ingevuld door: Voornaam Achternaam" class="form-input bg-white mt-1 block w-full text-center">
        </div>
      </div>

      <div class="p-8 bg-grey-lightest">

        <div class="grid">
          <div v-for="bill in cashState.bills" :key="bill.amount">
            <div class="flex justify-between mb-3 items-center">
              <div class="flex-auto">
                <input :disabled="!cashState.editable" type="text" v-model.number="bill.count" class="form-input w-16">  x &euro; {{ bill.amount | currency('') }}
              </div>
              <div class="flex-auto text-right pr-3">&euro; {{ bill.total() | currency('') }}</div>
            </div>
          </div>

          <div class="text-right" v-if="cashState.editable">
            Noodwisselgeld - &euro;
            <input type="text" v-model.number="cashState.emergencyCash" class="form-input text-right w-32">
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
export default {
  name: 'CashStateForm',
  props: ['cashState']
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
