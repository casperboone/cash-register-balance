<template>
  <span>
    <topbar>
      <div class="flex-1 text-center">
        <div class="mb-1">{{ barSession.type.name }} - {{ barSession.date.getDate() }}-{{ barSession.date.getMonth() }}-{{ barSession.date.getFullYear() }}</div>
        <em class="text-grey">Laatst opgeslagen: {{ lastSavedDateForHumans }}</em>
      </div>
      <div class="flex-1 text-right">
        <button @click="back()" class="hover:text-grey-darker text-grey font-bold p-2 ml-2 rounded">
          Sluiten
        </button>
        <bar-session-printer :bar-session="barSession" :cash-states="cashStateForms"></bar-session-printer>
        <button @click="saveSession" class="bg-blue border border-blue hover:bg-blue-dark text-white font-bold py-2 px-4 ml-2 rounded">
          Opslaan
        </button>
      </div>
    </topbar>
  
    <div class="flex flex-wrap min-h-full">
      <div class="w-full md:w-2/3 py-8">
        <div class="mx-4">
            
            <div class="mx-4 rounded shadow overflow-hidden">
              <div class="bg-white">
                <div class="-mb-px flex justify-between">
                    <a 
                      v-for="cashStateForm in cashStateForms"
                      :key="cashStateForm.title"
                      :class="[cashStateForm.visible ? 'text-teal-dark' : 'text-grey-dark', cashStateForm.visible ? 'border-teal-dark' : 'border-transparent', 'no-underline', 'border-b-2', 'text-lg', 'tracking-wide', 'font-semibold', 'py-3', 'px-8']" 
                      @click="setVisibleForm(cashStateForm)"
                      href="#">
                      {{ cashStateForm.title }}
                    </a>
                </div>
              </div>
              <cash-state-form 
                v-for="cashStateForm in cashStateForms"
                :key="cashStateForm.title"
                v-show="cashStateForm.visible"
                :cashState="cashStateForm.cashState()">
              </cash-state-form>
            </div>
        </div>

      </div>

      <div class="w-full md:w-1/3 bg-grey-lighter shadow p-8">
          <totals :barSession="barSession"></totals>

          <system-buttons @shutdown="saveSession" class="mt-16"></system-buttons>
      </div>
    </div>
  </span>
</template>

<script>
import BarSession from '../BarSession'
import BarSessionType from '../BarSessionType'
import TopBar from '@/components/TopBar'
import BarSessionPrinter from '@/components/BarSessionPrinter'
import CashStateForm from '@/components/CashStateForm'
import Totals from '@/components/Totals'
import SystemButtons from '@/components/SystemButtons'
import { remote } from 'electron'

export default {
  name: 'BarSession',
  components: {
    'topbar': TopBar,
    'bar-session-printer': BarSessionPrinter,
    'cash-state-form': CashStateForm,
    'totals': Totals,
    'system-buttons': SystemButtons
  },
  data () {
    let barSession = this.$parent.currentSession ? this.$parent.currentSession : new BarSession(BarSessionType.getById(0), new Date())

    return {
      barSession: barSession,
      lastSavedDate: undefined,
      cashStateForms: [
        {
          title: 'Kas bij aanvang',
          cashState: () => barSession.initialCashState,
          visible: true
        },
        {
          title: 'Kas na afloop',
          cashState: () => barSession.finalCashState,
          visible: false
        },
        {
          title: 'Naar grijze kluis',
          cashState: () => barSession.effluentCashState(),
          visible: false
        }
      ]
    }
  },
  computed: {
    lastSavedDateForHumans () {
      return this.lastSavedDate ? window.moment().fromNow() : 'nooit'
    }
  },
  methods: {
    saveSession () {
      this.barSession.store()
      this.lastSavedDate = new Date()
    },
    back () {
      remote.dialog.showMessageBox({
        message: 'Weet je zeker dat je terug wilt gaan naar het overzicht?',
        buttons: ['Niet opslaan en teruggaan', 'Annuleren']
      }, (buttonId) => { if (buttonId === 0) { this.$router.push('/') } })
    },
    setVisibleForm (visibleForm) {
      this.cashStateForms.forEach(form => (form.visible = form === visibleForm))
    }
  }
}
</script>
