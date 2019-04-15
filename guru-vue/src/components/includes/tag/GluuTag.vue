<template>
  <span class="multiselect__tag gluu-tag" v-bind:class="type">
    <span>{{ tag.name }}</span>
    <i aria-hidden="true" tabindex="1" class="multiselect__tag-icon" v-on:click="$emit('clear', tag)"></i>
  </span>
</template>

<script>
export default {
  name: 'GluuTag',
  props: {
    tag: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: "solid"
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';

.gluu-tag.solid {
  @include gluu-tag();
}

.gluu-tag.outline {
  @include gluu-tag(white, $base-color);
}
</style>