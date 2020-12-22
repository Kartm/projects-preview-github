<template>
  <span class="labeled-select">
    <label class="labeled-select__label" :for="selectId">{{ label }}</label>

    <select
      class="labeled-select__select"
      @change="handleChange"
      :value="preselectedValue"
      :id="selectId"
    >
      <option value="">
        {{ `#` }}
      </option>
      <option v-for="(option, i) in options" :value="option.value" :key="i">
        {{ option.text }}
      </option>
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

  private get preselectedValue() {
    return this.preselected ? this.preselected.value : '';
  }

  private handleChange(event: Event) {
    const select = event.target as HTMLSelectElement;

    const option = this.options.filter(
      (option) => option.value === select.value
    );

    if (option.length === 0) {
      return;
    }

    this.$emit('onChange', option[0]);
  }
}
</script>

<style lang="scss">
.labeled-select {
  &__label {
    font-size: 12px;
  }

  &__select {
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    background-color: ghostwhite;
    border: 0.5px #c5c5c5 solid;
  }
}
</style>