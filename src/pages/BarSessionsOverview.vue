<template>
  <div class="flex flex-wrap min-h-full py-8 w-3/4 m-auto">

        <div class="w-full md:w-2/3">

          <div class="mx-4 rounded shadow overflow-hidden">
            <div class="bg-white px-8 py-4">
              <h3 class="text-xl font-semibold text-grey-black">Ga verder met een bestaande sessie...</h3>
            </div>

            <div 
              v-for="(file, i) in barSessionFiles" 
              :key="file.filePath" 
              :class="['px-8', 'py-2', i % 2 == 0 ? 'bg-grey-lighter' : 'bg-grey-lightest', 'border-b']"
              v-text="file.filePath"
              @click="loadSession(file)">
            </div>
            
          </div>

        </div>
        <div class="w-full md:w-1/3">
          
          <div class="mx-4 rounded shadow overflow-hidden">
            <div class="bg-white px-8 py-4">
              <h3 class="text-xl font-semibold text-grey-black">... of creeër een nieuwe</h3>
            </div>

            <div class="p-8 bg-grey-lighter">
              <a @click="createSession()">create</a>
            </div>
          </div>

      </div>



  </div>
</template>

<script>
import BarSession from '../BarSession'
import BarSessionFile from '../BarSessionFile'
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
      barSessionFiles: BarSessionFile.all()
    }
  },
  methods: {
    createSession () {
      this.$parent.currentSession = new BarSession()

      this.$router.push('barsession')
    },
    loadSession (file) {
      this.$parent.currentSession = file.read()

      this.$router.push('barsession')
    }
  }
}
</script>
