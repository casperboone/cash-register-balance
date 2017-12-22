<template>
  <div class="flex flex-wrap min-h-full py-8 w-3/4 m-auto">

        <div class="w-full md:w-2/3">

          <div class="mx-4 rounded shadow overflow-hidden">
            <div class="bg-white px-8 py-4">
              <h3 class="text-xl font-semibold text-grey-black">Ga verder met een bestaande sessie...</h3>
            </div>

            <div class="px-8 py-2 bg-grey-lighter border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lightest border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lighter border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lightest border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lighter border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lightest border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lighter border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lightest border-b">
              Item
            </div>
            <div class="px-8 py-2 bg-grey-lighter border-b">
              Item
            </div>
            
          </div>

        </div>
        <div class="w-full md:w-1/3">
          
          <div class="mx-4 rounded shadow overflow-hidden">
            <div class="bg-white px-8 py-4">
              <h3 class="text-xl font-semibold text-grey-black">... of creeër een nieuwe</h3>
            </div>

            <div class="p-8 bg-grey-lighter">
              <router-link to="barsession">Form</router-link>
            </div>
          </div>

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
