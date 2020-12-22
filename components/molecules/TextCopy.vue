<template>
  <span class="text-copy">
    <custom-input
      class="text-copy__input"
      type="text"
      :value="value"
      readonly
    />
    <custom-button
      class="text-copy__button"
      :class="buttonClasses"
      @click="onCopy"
    >
      {{ buttonText }}
    </custom-button>
  </span>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator';
import CustomInput from '@/components/atoms/CustomInput.vue';
import CustomButton from '@/components/atoms/CustomButton.vue';
import copyToClipboard from '@/utils/copy-to-clipboard';

@Component({ components: { CustomInput, CustomButton } })
export default class TextCopy extends Vue {
  @Prop({ required: true, type: String }) private readonly value!: string;

  private copied = false;

  private get buttonClasses() {
    return {
      'text-copy__button--copied': this.copied,
    };
  }

  private get buttonText() {
    return this.copied ? 'Copied' : 'Copy';
  }

  private onCopy() {
    copyToClipboard(this.value);
    this.copied = true;
  }
}
</script>

<style lang="scss">
.text-copy {
  &__button {
    min-width: 60px;

    &--copied {
      background-color: #917eb8;
    }
  }
}
</style>