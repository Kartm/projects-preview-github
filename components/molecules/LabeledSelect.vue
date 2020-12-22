<template>
  <span class="labeled-select">
    <label :for="selectId">{{ label }}</label>

    <select name="pets" :id="selectId">
      <option value="">--Please choose an option--</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import generateId from '@/utils/generate-id';

export interface LabeledSelectOption {
  value: string;
  text: string;
}

@Component
export default class LabeledSelect extends Vue {
  @Prop({ type: String })
  private readonly label!: string;
  @Prop({ type: Array, default: () => [] })
  private readonly options!: LabeledSelectOption[];
  @Prop({ type: Object, default: null })
  private readonly preselected!: LabeledSelectOption;

  private selectId = '';

  private mounted() {
    // generate unique id to combine label & select
    this.selectId = generateId();
  }
}
</script>

<style lang="scss">
</style>