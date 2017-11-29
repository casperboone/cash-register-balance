<template>
  <div class="hello">
    <h1>{{ title }}</h1>

    Ingevuld door: <input type="text" v-model="cashState.author">

    <div v-for="bill in cashState.bills" :key="bill.amount">
      <input type="text" v-model.number="bill.count">
      &euro; {{ bill.amount }}
      - total: {{ bill.total() }}
    </div>

    <div>
      Noodwisselgeld - &euro;
      <input type="text" v-model.number="cashState.emergencyCash">
    </div>

    Total: {{ cashState.total() }}
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
