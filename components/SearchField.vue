<template>
  <div class="header">
    <input
      v-model="inputValue"
      @input="handleInput"
      @change="handleChange"
      list="ice-cream-flavors"
      placeholder="Provide GitHub project name"
    />

    <datalist id="ice-cream-flavors">
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
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import debounce from '@/utils/debounce';

export interface Metadata {
  id: string;
}

export interface SearchOption {
  value: string;
  title: string;
  description: string;
  metadata: Metadata;
}

@Component
export default class SearchField extends Vue {
  private inputValue = '';
  private options: SearchOption[] = [];

  private debouncedFetchData = debounce(this.fetchData, 500);

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.debouncedFetchData(input.value);
  }

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;

    const option = this.options.find((option) => option.value === input.value);

    if (option) {
      console.log(`Change: ${input.value}`);
      this.$router.push({
        path: `/project/${option?.metadata.id}`,
      });
    }
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
              } as SearchOption)
          ),
        ];
      });
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  text-align: center;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
}
.header div {
  width: 50%;
}
.title {
  font-size: 22px;
}
</style>