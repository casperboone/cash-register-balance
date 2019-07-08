<template>
    <div class="rounded shadow">
      <div class="bg-white px-8 py-4">
        <h3 class="text-xl font-semibold text-grey-black">Session Details</h3>
      </div>
      <div class="p-8 bg-grey-lighter">
        <div class="mb-1 text-sm font-bold">Date</div>
        <datepicker v-model="barSession.date" :monday-first="true" format="yyyy-MM-dd" input-class="form-input bg-white w-full"></datepicker>

        <div class="mt-4 mb-1 text-sm font-bold">Type</div>
        <div class="flex justify-between text-center leading-24">
          <div :class="['bg-white rounded shadow h-24 w-32', barSession.type == type ? 'border-4 border-blue-darker' : '']" v-for="type in types" :key="type.id" @click="barSession.type = type">{{ type.name }}</div>
        </div>
        
        <div class="mt-4 mb-1 text-sm font-bold">Your Name</div>
        <input v-model.trim="barSession.originalAuthorName" type="text" :class="{'form-input bg-white w-full': true, 'form-input-error': $v.barSession.originalAuthorName.$error}" placeholder="e.g. John Smith">
        <div v-if="$v.barSession.originalAuthorName.$error">
          <div class="error" v-if="!$v.barSession.originalAuthorName.required">Name is required</div>
        </div>

      </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Datepicker from 'vuejs-datepicker'
import BarSessionType from '../../BarSessionType'

export default {
  props: ['barSession'],
  components: { Datepicker },
  data () {
    return {
      types: BarSessionType.all()
    }
  },
  validations: {
    barSession: {
      originalAuthorName: {
        required
      }
    },
    form: ['barSession.originalAuthorName']
  },
  methods: {
    validate () {
      this.$v.form.$touch()
      var isValid = !this.$v.form.$invalid
      this.$emit('on-validate', this.$data, isValid)
      return isValid
    }
  }
}
</script>
