<template>
  <loading-indicator v-if="isLoading" />
  <div v-else class="project-page">
    <section class="project-page__header">
      <div class="project-page__header-text">
        <h1>{{ name }}</h1>
        <h4>{{ description }}</h4>
      </div>
      <div class="project-page__copy-buttons">
        <label>Clone the repository:</label>
        <text-copy :value="url" />
        <text-copy :value="sshUrl" />
      </div>
    </section>
    <section class="project-page__controls">
      <labeled-select label="Showing latest commits: " />
    </section>
    <section class="project-page__commit-list">
      <section class="project-page__scroll-area">
        <commit-item
          v-for="commit in commits"
          :commit="commit"
          :key="commit.id"
        />
      </section>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LoadingIndicator from '@/components/atoms/LoadingIndicator.vue';
import TextCopy from '@/components/molecules/TextCopy.vue';
import LabeledSelect, {
  LabeledSelectOption,
} from '@/components/molecules/LabeledSelect.vue';
import { Context } from '@nuxt/types';
import CommitItem, { ICommit } from '@/components/molecules/CommitItem.vue';

@Component({
  components: { TextCopy, LoadingIndicator, CommitItem, LabeledSelect },
})
export default class Project extends Vue {
  private name = '';
  private description = '';
  private sshUrl = '';
  private url = '';
  private isLoading = true;
  private commits: ICommit[] = [];

  private options: LabeledSelectOption[] = [];
  private selected: LabeledSelectOption | null = null;

  private async mounted() {
    this.options = [10, 20, 50, 100].map(
      (count) =>
        ({
          value: count.toString(),
          text: count.toString(),
        } as LabeledSelectOption)
    );

    this.selected = this.options[1];

    await this.fetchProjectData(+this.selected.value);
  }

  async fetchProjectData(commitCount: number) {
    const { id } = this.$route.params;

    this.$api
      .$post(
        '/graphql',
        JSON.stringify({
          query: `
            {
              node(id: "${id}") {
                ... on Repository {
                  id
                  name
                  description
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        id
                        history(first: ${commitCount}) {
                          edges {
                            node {
                              id
                              committedDate
                              message
                              author {
                                email
                                name
                                avatarUrl
                                user {
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  sshUrl
                  url
                }
              }
            }
        `,
        })
      )
      .then((res) => res.data)
      .then((data) => {
        this.name = data.node.name;
        this.description = data.node.description;
        this.sshUrl = data.node.sshUrl;
        this.url = data.node.url;
        this.commits = data.node.defaultBranchRef.target.history.edges.map(
          (edge: any) =>
            ({
              id: edge.node.id,
              message: edge.node.message,
              date: edge.node.committedDate,
              author: {
                name: edge.node.author.name,
                email: edge.node.author.email,
                avatarUrl: edge.node.author.avatarUrl,
                user: {
                  url: edge.node.author.user.url,
                },
              },
            } as ICommit)
        );

        this.isLoading = false;
      });
  }
}
</script>

<style lang="scss">
.project-page {
  color: #283747;
  background-color: #f3f3f3;

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: #f3f3f3;
    background-color: #922432;
  }

  &__header-text {
  }

  &__copy-buttons {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  &__controls {
    padding: 0 10px;
    margin: 10px 0;

    select {
      width: 60px;
    }
  }

  &__commit-list {
    padding: 10px 0;
    box-sizing: border-box;
  }

  &__scroll-area {
    overflow-y: auto;
    flex-grow: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>