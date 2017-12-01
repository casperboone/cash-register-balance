<template>
  <div>
    <div class="mx-4 rounded shadow overflow-hidden">
      <div class="bg-white px-8 py-4">
        <h3 class="text-xl font-semibold text-grey-black">{{ title }}</h3>
      </div>


      <div class="p-8 bg-grey-lighter">
        <div class="text-center">
        Ingevuld door: <input type="text" v-model="cashState.author" placeholder="Voornaam Achternaam" class="form-input bg-white mt-1 block w-full text-center">
        </div>
      </div>

      <div class="p-8 bg-grey-lightest">

        <div v-for="bill in cashState.bills" :key="bill.amount">
          <div class="flex justify-between mb-3 items-center">
            <div class="flex-auto">
              <input type="text" v-model.number="bill.count" class="form-input w-32">  x &euro; {{ bill.amount | currency('') }}
            </div>
            <div class="flex-auto text-right pr-4">&euro; {{ bill.total() | currency('') }}</div>
          </div>
        </div>

        <div class="text-right">
          Noodwisselgeld - &euro;
          <input type="text" v-model.number="cashState.emergencyCash" class="form-input text-right w-32">
        </div>

      </div>
      
      <div class="p-8 bg-grey-lighter">
        <div class="flex justify-between mb-3 items-center">
            <div class="flex-auto">
              Totaal
            </div>
            <div class="flex-auto text-right pr-4">&euro; {{ cashState.total() | currency('') }}</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CashStateForm',
  props: ['cashState', 'title']
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
