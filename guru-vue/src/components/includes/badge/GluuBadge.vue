<template>
  <span :class="color">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    color: String
  }
};
</script>

<style lang="scss">
@import 'GluuBadge';
</style>
