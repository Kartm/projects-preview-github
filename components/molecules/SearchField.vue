<template>
  <div class="header">
    <input
      v-model="inputValue"
      @input="handleInput"
      @change="handleChange"
      :list="datalistId"
      v-bind="$attrs"
    />

    <datalist :id="datalistId">
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.description }}
      </option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator';
import generateId from '@/utils/generate-id';

export interface SearchFieldOption {
  value: string;
  title: string;
  description: string;
  metadata: any;
}

@Component
export default class SearchField extends Vue {
  @Prop({ type: Array, default: () => [] })
  private readonly options!: SearchFieldOption[];

  private inputValue = '';
  private datalistId = '';

  private mounted() {
    // generate unique id to combine input & datalist
    this.datalistId = generateId();
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.$emit('onInput', input.value);
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;

    const option = this.options.find((option) => option.value === input.value);

    if (option) {
      this.$emit('onSelect', option);
    }
  }
}
</script>

<style lang="scss">
</style>