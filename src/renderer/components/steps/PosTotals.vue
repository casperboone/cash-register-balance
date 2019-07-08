<template>
  <div>
    <div class="rounded shadow bg-grey-lighter flex mb-4">
        <div class="bg-white px-8 py-4 flex flex-col justify-center">
          <h3 class="text-xl font-semibold text-grey-black">Your Name</h3>
        </div>
        <div class="p-4 bg-grey-lighter flex-1 flex">
          <input v-model.trim="barSession.closingAuthorName" type="text" :class="{'form-input bg-white w-full flex-1': true, 'form-input-error': $v.barSession.closingAuthorName.$error}" placeholder="e.g. John Smith">
          <div v-if="$v.barSession.closingAuthorName.$error">
            <div class="error m-0 ml-2 h-full" v-if="!$v.barSession.closingAuthorName.required">Name is required</div>
          </div>
        </div>
    </div>

    <div class="flex">
      <div class="rounded shadow mr-4 flex-1">
        <div class="bg-white px-8 py-4 flex">
          <h3 class="text-xl font-semibold text-grey-black flex-1">Review POS totals</h3>
          <button @click="refetchPosData()" class="border rounded px-2 text-sm">Refetch POS data</button>
        </div>
        <div class="px-8 py-4 bg-grey-lighter">
          <div class="flex justify-between items-center mb-2">
            <div>Cash Total</div>
            <div><money-input v-model="barSession.posCashTotal" :disabled="noManualPosTotals"></money-input></div>
          </div>
          <div class="flex justify-between items-center mb-2">
            <div>PIN Total</div>
            <div><money-input v-model.number="barSession.posPinTotal" :disabled="noManualPosTotals"></money-input></div>
          </div>
          <div class="flex justify-between items-center">
            <div>Free Total</div>
            <div><money-input v-model.number="barSession.posFreeTotal" :disabled="noManualPosTotals"></money-input></div>
          </div>

          <div class="text-sm text-grey mt-2" v-if="unicenta">
            POS data from session closed at {{ this.unicenta.endDate | moment('YYYY-MM-DD HH:mm:ss') }}.
          </div>

          <div class="mt-4">
            <label>
              <button :class="['checkbox', noManualPosTotals ? 'checkbox-checked' : '']" @click="noManualPosTotals = !noManualPosTotals">
                <div class="checkmark" />
              </button>
              The POS totals are correct and do not need manual corrections
            </label>
          </div>
        </div>
      </div>
      <div>
        <help-note class="mb-4 w-64">
          Please check if the totals of the POS software below are correct. If this is not the case, uncheck the checkbox, and please correct it manually.
        </help-note>
      </div>
    </div>
  </div>
</template>

<script>
import Unicenta from '@/Unicenta'
import MoneyInput from '../MoneyInput'
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['barSession'],
  components: { MoneyInput },
  data () {
    return {
      unicenta: undefined,
      blockFields: true,
      noManualPosTotals: true
    }
  },
  validations: {
    barSession: {
      closingAuthorName: {
        required
      }
    },
    form: ['barSession.closingAuthorName']
  },
  methods: {
    validate () {
      this.$v.form.$touch()
      var isValid = !this.$v.form.$invalid
      this.$emit('on-validate', this.$data, isValid)
      return isValid
    },
    updateFromParent () {
      if (!this.barSession.posDataRetrieved) {
        new Unicenta().requestTotals().then(totals => {
          this.barSession.posDataRetrieved = true
          this.barSession.posCashTotal = totals.cashTotal
          this.barSession.posPinTotal = totals.pinTotal
          this.barSession.posFreeTotal = totals.freeTotal

          this.unicenta = totals
        }).finally(() => { this.blockFields = false })
      } else {
        this.blockFields = false
      }
    },
    refetchPosData () {
      new Unicenta().requestTotals().then(totals => {
        this.barSession.posCashTotal = totals.cashTotal
        this.barSession.posPinTotal = totals.pinTotal
        this.barSession.posFreeTotal = totals.freeTotal

        this.unicenta = totals
      })
    }
  }
}
</script>
