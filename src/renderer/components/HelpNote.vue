<template>
  <div class="help-note relative">
    <div v-if="icon" class="help-note-circle">?</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      default: true
    }
  }
}
</script>