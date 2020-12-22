<template>
  <input class="custom-input" v-on="$listeners" v-bind="$attrs" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({ inheritAttrs: true })
export default class CustomInput extends Vue {}
</script>

<style lang="scss">
.custom-input {
  border-radius: 4px;
  border: 0.5px solid #c5c5c5;
  padding: 2px;
}
</style>