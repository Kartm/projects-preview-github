<template>
  <card class="commit-item">
    <div class="commit-item__created-info">
      <div class="commit-item__author-info">
        <a :href="commit.author.user.url"
          ><img class="commit-item__author-logo" :src="commit.author.avatarUrl"
        /></a>
        <a class="commit-item__author-link" :href="authorLink">{{
          commit.author.name
        }}</a>
      </div>
      <div class="commit-item__created-date">
        <i>{{ date }}</i>
      </div>
    </div>
    <div class="commit-item__commit-info">
      <span v-html="commit.message" />
    </div>
  </card>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator';
import Card from '@/components/atoms/Card.vue';

export interface ICommit {
  id: string;
  message: string;
  date: Date;
  author: {
    name: string;
    email: string;
    avatarUrl: string;
    user: {
      url: string;
    };
  };
}

@Component({ components: { Card } })
export default class CommitItem extends Vue {
  @Prop({ type: Object, required: true })
  private readonly commit!: ICommit;

  private get date() {
    return new Date(this.commit.date).toString().split('GMT')[0].trim();
  }

  private get authorLink() {
    return `mailto:${this.commit.author.email}`;
  }
}
</script>

<style lang="scss">
.commit-item {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  margin: 5px 10px;
  padding: 10px;

  &__created-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 0.5px rgba(34, 34, 34, 0.2) solid;
  }

  &__author-info {
    display: flex;
    align-items: center;
  }

  &__author-link:link {
    color: grey;
    text-decoration: none;
  }

  &__author-logo {
    width: 36px;
    height: auto;
    border-radius: 50%;
    margin-right: 10px;
  }

  &__created-date {
    color: rgb(158, 158, 158);
    font-size: 12px;
  }

  &__commit-info {
    white-space: pre-line;
    font-size: 10px;
    flex: 1;
  }
}
</style>