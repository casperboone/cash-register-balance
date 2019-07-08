<template>
  <div class="relative">
    <div class="absolute z-10 top-0 p-3 leading-tight text-grey">
      &euro;
    </div>
    <input type="number" v-model="displayValue" @blur="isInputActive = false" @focus="$event.target.select(); isInputActive = true" class="form-input text-right" :disabled="disabled">
  </div>
</template>

<script>
export default {
  props: ['value', 'disabled'],
  data: function () {
    return {
      isInputActive: false,
      update: false
    }
  },
  computed: {
    displayValue: {
      get: function () {
        return this.value
      },
      set: function (modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(',', '.'))

        if (isNaN(newValue)) {
          newValue = 0
        }

        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style scoped>
input:before {
  display: block;
  content: '&euro;'
}
</style>
