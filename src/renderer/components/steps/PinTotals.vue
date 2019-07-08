<template>
  <div class="flex">
    <div class="mr-4 flex-1">
      <help-note class="mb-4">
        Please enter the totals of both PIN terminals below. You can find the correct total on the tickets printed during the previous step. Use the 'TOTAAL' amount under 'EFT TOTALEN' (see image on the right). 
      </help-note>

      <div class="rounded shadow bg-grey-lighter flex mb-4">
          <div class="bg-white px-8 py-4 flex flex-col justify-center flex-1">
            <h3 class="text-xl font-semibold text-grey-black">Fixed PIN Terminal Total</h3>
          </div>
          <div class="p-4 bg-grey-lighter">
            <div class="flex items-center">
              <button :class="['checkbox mr-4', !noFixedPinTotal ? 'checkbox-checked' : '']" @click="noFixedPinTotal = !noFixedPinTotal">
                <div class="checkmark" />
              </button>
              <money-input v-model="barSession.actualFixedPinTotal" @focus="$event.target.select()" :disabled="noFixedPinTotal"></money-input>
            </div>
            <div v-if="$v.barSession.actualFixedPinTotal.$error">
              <div class="error mt-4 w-48" v-if="!$v.barSession.actualFixedPinTotal.minValue">
                Amount cannot be zero. If the terminal was unused, please uncheck the checkbox.
              </div>
            </div>
          </div>
      </div>

      <div class="rounded shadow bg-grey-lighter flex mb-4">
          <div class="bg-white px-8 py-4 flex flex-col justify-center flex-1">
            <h3 class="text-xl font-semibold text-grey-black">Mobile PIN Terminal Total</h3>
          </div>
          <div class="p-4 bg-grey-lighter">
            <div class="flex items-center">
              <button :class="['checkbox mr-4', !noMobilePinTotal ? 'checkbox-checked' : '']" @click="noMobilePinTotal = !noMobilePinTotal">
                <div class="checkmark" />
              </button>
              <money-input v-model="barSession.actualMobilePinTotal" @focus="$event.target.select()" :disabled="noMobilePinTotal"></money-input>
            </div>
            <div v-if="$v.barSession.actualMobilePinTotal.$error">
              <div class="error mt-4 w-48" v-if="!$v.barSession.actualMobilePinTotal.minValue">
                Amount cannot be zero. If the terminal was unused, please uncheck the checkbox.
              </div>
            </div>
          </div>
      </div>
    </div>

    <help-note class="w-64">
      <img src="static/images/pin-terminal-ticket.jpg" class="mb-4" />
    </help-note>
  </div>
</template>

<script>
import MoneyInput from '../MoneyInput'
import { minValue } from 'vuelidate/lib/validators'

export default {
  props: ['barSession'],
  components: { MoneyInput },
  data () {
    return {
      noFixedPinTotal: false,
      noMobilePinTotal: false
    }
  },
  validations: {
    barSession: {
      actualFixedPinTotal: {
        minValue: function (value) { return this.noFixedPinTotal ? true : minValue(0.01)(value) }
      },
      actualMobilePinTotal: {
        minValue: function (value) { return this.noMobilePinTotal ? true : minValue(0.01)(value) }
      }
    },
    form: ['barSession.actualFixedPinTotal', 'barSession.actualMobilePinTotal']
  },
  methods: {
    validate () {
      this.$v.form.$touch()
      const isValid = !this.$v.form.$invalid
      this.$emit('on-validate', this.$data, isValid)
      return isValid
    }
  }
}
</script>
