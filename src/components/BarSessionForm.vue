<template>
  <div>
    <cash-state-form :cashState="barSession.initialCashState" title="Kas bij aanvang"></cash-state-form>
    <cash-state-form :cashState="barSession.finalCashState" title="Kas na afloop"></cash-state-form>
    <cash-state-form :cashState="barSession.effluentCashState" title="Kas naar wisselkuis"></cash-state-form>

    <totals :barSession="barSession"></totals>

  </div>
</template>

<script>
import BarSession from '../BarSession'
import CashStateForm from '@/components/CashStateForm'
import Totals from '@/components/Totals'

export default {
  name: 'BarSessionForm',
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
