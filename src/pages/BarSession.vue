<template>
  <div class="flex flex-wrap min-h-full">

    <div class="w-full md:w-5/6 py-8">

    <button @click="barSession.store()">save</button>
    <button @click="barSession.file.read()">read and log to console</button>
      <div class="flex flex-wrap mx-4">
        <div class="w-full md:w-1/3">
          <cash-state-form :cashState="barSession.initialCashState" title="Kas bij aanvang"></cash-state-form>
        </div>
        <div class="w-full md:w-1/3">
          <cash-state-form :cashState="barSession.finalCashState" title="Kas na afloop"></cash-state-form>
        </div>
        <div class="w-full md:w-1/3">
          <cash-state-form :cashState="barSession.effluentCashState()" title="Naar grijze kluis"></cash-state-form>
        </div>
      </div>

    </div>

    <div class="w-full md:w-1/6 bg-grey-lighter shadow p-8">
        <totals :barSession="barSession"></totals>
    </div>

  </div>
</template>

<script>
import BarSession from '../BarSession'
import CashStateForm from '@/components/CashStateForm'
import Totals from '@/components/Totals'

export default {
  name: 'BarSession',
  components: {
    'cash-state-form': CashStateForm,
    'totals': Totals
  },
  data () {
    return {
      barSession: new BarSession()
    }
  }
}
</script>
