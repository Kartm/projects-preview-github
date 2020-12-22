<template>
  <div class="container">
    <h2>Project list</h2>
    <search-field />
  </div>
</template>

<script lang="ts">
import SearchField from '@/components/SearchField.vue';
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  components: {
    SearchField,
  },
})
export default class MainPage extends Vue {}
</script>
<style lang="scss">
</style>
