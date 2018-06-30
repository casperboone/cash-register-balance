<template>
  <div>
    <topbar></topbar>

    <div class="flex flex-wrap min-h-full py-8 px-4">
      <div class="w-full md:w-2/3">

        <div class="mx-4 rounded shadow">
          <div class="bg-white px-8 py-4">
            <h3 class="text-xl font-semibold text-grey-black">Ga verder met de vorige sessie ...</h3>
          </div>

          <div v-if="barSessionFiles.empty">
            <p>Er zijn geen vorige barsessies gevonden</p>
          </div>
          <div v-else>
            <div 
              :class="['px-8', 'py-3', 'bg-grey-lighter', 'border-b', 'hover:bg-grey', 'hover:text-white', 'cursor-pointer']"
              @click="loadSession(barSessionFiles[0])">
              <strong>{{ formatDate(barSessionFiles[0].parseDate()) }}</strong> - {{ barSessionFiles[0].parseType().name }}
            </div>
          </div> 

        </div>

      </div>
      <div class="w-full md:w-1/3">
        
        <div class="mx-4 rounded shadow">
          <div class="bg-white px-8 py-4">
            <h3 class="text-xl font-semibold text-grey-black">... of creeër een nieuwe</h3>
          </div>

          <div class="p-8 bg-grey-lighter">
            <datepicker v-model="createForm.date" :monday-first="true" format="dd-MM-yyyy" input-class="form-input bg-white w-full"></datepicker>

            <div class="relative mt-4">
              <select v-model="createForm.type" class="form-input bg-white w-full">
                <option v-for="type in types" :key="type.id" v-text="type.name" :value="type"></option>
              </select>
              <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <button class="mt-4 bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full" @click="createSession()">Ga verder</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import BarSession from '../BarSession'
import BarSessionFile from '../BarSessionFile'
import BarSessionType from '../BarSessionType'
import CashStateForm from '@/components/CashStateForm'
import Totals from '@/components/Totals'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

export default {
  name: 'BarSession',
  components: {
    'topbar': TopBar,
    'cash-state-form': CashStateForm,
    'totals': Totals,
    'datepicker': Datepicker
  },
  data () {
    const types = BarSessionType.all()

    // Try to guess the correct type and date for the form based on the current datetime
    const sixHoursInMillis = 6 * 60 * 60 * 1000
    const day = new Date(Date.now() - sixHoursInMillis)
    const weekDay = day.getDay()
    const typeIndex = (weekDay > 1 && weekDay < 6 ? weekDay - 2 : 5)

    return {
      barSessionFiles: BarSessionFile.all(),
      paginate: ['barSessionFiles'],
      types: types,
      createForm: {
        type: types[typeIndex],
        date: day
      }
    }
  },
  methods: {
    createSession () {
      this.$parent.currentSession = new BarSession(this.createForm.type, this.createForm.date)

      this.$router.push('barsession')
    },
    loadSession (file) {
      this.$parent.currentSession = file.read()

      this.$router.push('barsession')
    },
    formatDate (date) {
      return moment(date).format('DD-MM-YYYY')
    }
  }
}
</script>

<style lang="postcss">
ul.paginate-links > li.active > a {
  background-color: #b9ccd6;
  color: white;
}
ul.paginate-links > li.disabled > a {
  color: #9babb4;
  cursor: not-allowed;
}
</style>