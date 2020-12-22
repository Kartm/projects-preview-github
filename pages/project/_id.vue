<template>
  <div v-if="isLoading">Loading project...</div>
  <div v-else>
    <h1>{{ `Project ${name}` }}</h1>
    <h3>{{ description }}</h3>
    <text-copy :value="url" />
    <text-copy :value="sshUrl" />
    <p v-for="commit in commits">
      <i>{{ commit.date }}</i>
      <span>{{ commit.message }}</span>
      <span>{{ commit.author.name }}</span>
      <span>{{ commit.author.email }}</span>
      <br /><br />
    </p>
  </div>
</template>
<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator';
import TextCopy from '@/components/TextCopy.vue';

interface Commit {
  message: string;
  date: Date;
  author: {
    name: string;
    email: string;
  };
}

@Component({ components: { TextCopy } })
export default class Project extends Vue {
  private name = '';
  private description = '';
  private sshUrl = '';
  private url = '';
  private isLoading = true;
  private commits: Commit[] = [];

  private async mounted() {
    await this.fetchProjectData();
  }

  async fetchProjectData() {
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
                        history(first: 10) {
                          edges {
                            node {
                              committedDate
                              message
                              author {
                                email
                                name
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
              message: edge.node.message,
              date: edge.node.committedDate,
              author: {
                name: edge.node.author.name,
                email: edge.node.author.email,
              },
            } as Commit)
        );

        console.log(this.commits);
        this.isLoading = false;
      });
  }
}
</script>