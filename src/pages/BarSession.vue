<template>
  <div class="flex flex-wrap min-h-full">

    <topbar>
      <div class="flex-1 text-center">
        {{ barSession.type.name }} - {{ barSession.date.getDate() }}-{{ barSession.date.getMonth() }}-{{ barSession.date.getFullYear() }}
      </div>
      <div class="flex-1 text-right">
        <em class="text-grey">Laatst opgeslagen: {{ lastSavedDateForHumans }}</em>
        <button @click="barSession.store(); lastSavedDate = new Date()" class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 ml-2 rounded">
          Opslaan
        </button>
      </div>
    </topbar>

    <div class="w-full md:w-5/6 py-8">
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
import TopBar from '@/components/TopBar'
import CashStateForm from '@/components/CashStateForm'
import Totals from '@/components/Totals'

export default {
  name: 'BarSession',
  components: {
    'topbar': TopBar,
    'cash-state-form': CashStateForm,
    'totals': Totals
  },
  data () {
    return {
      barSession: this.$parent.currentSession,
      lastSavedDate: undefined
    }
  },
  computed: {
    lastSavedDateForHumans () {
      return this.lastSavedDate ? window.moment().fromNow() : 'nooit'
    }
  }
}
</script>
