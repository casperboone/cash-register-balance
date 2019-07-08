<template>
  <div class="h-full flex flex-col">
    <top-bar>
      <div class="text-right">
        <div class="font-bold text-xl mb-1">{{ barSession.type.name }}</div>
        <div class="text-xs text-grey-dark">{{ barSession.date | moment('DD MMM YYYY') }}</div>
      </div>
    </top-bar>

    <form-wizard class="pt-4 px-8" title="" subtitle="" color="#103d60" shape="circle" @on-change="saveSession">
      <tab-content title="Session Details" :before-change="()=>validateStep('session-details')">
        <help-note v-if="currentSessionIsAPreviousSession" class="bg-yellow-lighter"><strong>Please note:</strong> You're continuing with the previous session. If this was unintentional, <a @click="createNewSession" class="bg-yellow-dark p-2 rounded">click here</a> to start a new session.</help-note>
        <session-details :barSession="barSession" ref="session-details"></session-details>
        <button v-if="!currentSessionIsAPreviousSession" @click="continueWithPreviousSession" class="border border-black rounded mt-4 py-2 px-4 text-sm">&laquo; Continue with previous session</button>
      </tab-content>
      <tab-content title="Start POS" :before-change="()=>updateComponent('totals')">
          <start-pos :barSession="barSession" ref="start-pos"></start-pos>
      </tab-content>
      <tab-content title="Totals" :before-change="()=>validateStep('totals')">
          <totals :barSession="barSession" ref="totals"></totals>
      </tab-content>
      <tab-content title="Review / Print">
        <review :barSession="barSession"></review>
      </tab-content>
      <tab-content title="Close">
          <close></close>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import BarSession from '@/BarSession'
import BarSessionFile from '@/BarSessionFile'
import SessionDetails from '@/components/steps/SessionDetails'
import StartPos from '@/components/steps/StartPos'
import Totals from '@/components/steps/Totals'
import Review from '@/components/steps/Review'
import Close from '@/components/steps/Close'

export default {
  name: 'BarSession',
  components: {
    TopBar,
    FormWizard,
    TabContent,
    SessionDetails,
    StartPos,
    Totals,
    Review,
    Close
  },
  data () {
    return {
      barSession: new BarSession(),
      previousSessionFile: BarSessionFile.all()[0],
      currentSessionIsAPreviousSession: false
    }
  },
  methods: {
    validateStep (name) {
      return this.$refs[name].validate()
    },
    updateComponent (ref) {
      this.$refs[ref].updateFromParent()

      return true
    },
    saveSession (oldIndex, newIndex) {
      if (newIndex > 0) {
        this.barSession.saveToDisk()
      }
    },
    continueWithPreviousSession () {
      this.barSession = this.previousSessionFile.read()
      this.currentSessionIsAPreviousSession = true
    },
    createNewSession () {
      this.barSession = new BarSession()
      this.currentSessionIsAPreviousSession = false
    }
  }
}
</script>

<style lang="postcss">
  .vue-form-wizard {
    flex: 1!important;
    display: flex!important;
    flex-direction: column!important;
  }
  .vue-form-wizard .wizard-navigation {
    flex: 1!important;
  }
  .vue-form-wizard .wizard-header {
    padding: 0!important;
  }
  .vue-form-wizard.md .wizard-navigation .wizard-progress-with-circle {
    left: -2rem!important;
  }
  .vue-form-wizard .wizard-icon-circle {
    background-color: #f3f7f9!important;
  }
  .vue-form-wizard .wizard-nav-pills>li>a {
    color: #596a73!important;
  }
</style>