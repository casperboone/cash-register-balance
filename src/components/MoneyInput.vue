<template>
  <input type="number" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true" class="form-input">
</template>

<script>
export default {
    props: ["value"],
    data: function() {
        return {
            isInputActive: false,
            update: false
        }
    },
    computed: {
        displayValue: {
            get: function() {
                return this.value
            },
            set: function(modifiedValue) {
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
