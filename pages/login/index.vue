<template>
  <div class="login-page">
    <loading-indicator v-if="loading" />
    <div class="login-page__prompt">
      <a className="login-link" :href="githubAuthUrl">
        <span>Login with GitHub</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LoadingIndicator from '@/components/atoms/LoadingIndicator.vue';

@Component({ components: { LoadingIndicator } })
export default class MainPage extends Vue {
  private client_id = process.env.VUE_APP_CLIENT_ID;
  private client_secret = process.env.VUE_APP_CLIENT_SECRET;
  private redirect_uri = process.env.VUE_APP_REDIRECT_URI;
  private loading = false;

  private get githubAuthUrl() {
    return `https://github.com/login/oauth/authorize?scope=user&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`;
  }

  private mounted() {
    const code = this.$route.query['code'];

    if (code) {
      // Request to exchange code for an access token
      this.loading = true;
      this.$api
        .$post(
          `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&code=${code}`
        )
        .then((paramsString) => new URLSearchParams(paramsString))
        .then((params) => {
          const token = params.get('access_token');

          if (token) {
            localStorage.setItem('github_token', `Bearer ${token}`);
            this.$api.setHeader('Authorization', `Bearer ${token}`);
          }

          this.loading = false;

          this.$router.push({
            path: '/',
          });
        });
    }
  }
}
</script>
<style lang="scss">
.login-page {
  &__prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 32px 10px;
    color: #f3f3f3;
    background-color: #922432;
  }
}
</style>
