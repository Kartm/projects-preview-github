<template>
  <div class="container">
    <h2>Project list</h2>
    <search-field
      :options="options"
      @onInput="handleInput"
      @onSelect="handleSelect"
      placeholder="Provide GitHub project name"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import SearchField, {
  SearchFieldOption,
} from '@/components/molecules/SearchField.vue';
import debounce from '@/utils/debounce';

export interface Metadata {
  id: string;
}

@Component({
  inheritAttrs: true,
  components: {
    SearchField,
  },
})
export default class MainPage extends Vue {
  private options: SearchFieldOption[] = [];
  private debouncedFetchData = debounce(this.fetchData, 500);

  private handleInput(phrase: string) {
    this.debouncedFetchData(phrase);
  }

  private handleSelect(option: SearchFieldOption) {
    const metadata = option.metadata as Metadata;

    this.$router.push({
      path: `/project/${metadata.id}`,
    });
  }

  async fetchData(phrase: string) {
    this.$api
      .$post(
        '/graphql',
        JSON.stringify({
          query: `
        {
          search(query: "${phrase}", type: REPOSITORY, first: 10) {
            edges {
              node {
                ... on Repository {
                  id
                  name
                  description
                  url
                }
              }
            }
          }
        }
    `,
        })
      )
      .then((res) => res.data)
      .then((data) => {
        this.options = [
          ...data.search.edges.map(
            (edge: any) =>
              ({
                value: edge.node.url,
                title: edge.node.name,
                description: edge.node.description,
                metadata: {
                  id: edge.node.id,
                } as Metadata,
              } as SearchFieldOption)
          ),
        ];
      });
  }
}
</script>
<style lang="scss">
</style>
