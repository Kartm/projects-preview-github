<template>
  <button class="custom-button" v-on="$listeners" v-bind="$attrs">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({ inheritAttrs: true })
export default class CustomButton extends Vue {}
</script>

<style lang="scss">
.custom-button {
  background-color: #3c1784;
  color: whitesmoke;
  height: 24px;
  font-weight: unset;
  // border: none;
  border: 0.5px #3c1784 solid;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
}
</style>