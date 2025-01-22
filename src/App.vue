<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> 메뉴 </v-list-item-title>
          <!-- <v-list-item-subtitle> OCR </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="navbar navbar-expand navbar-dark bg-dark">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a href class="navbar-brand" @click.prevent>리드파일 관리</a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!currentUser" class="mr-4" depressed to="/register">
        <font-awesome-icon icon="user-plus" />Sign Up
      </v-btn>
      <v-btn v-if="!currentUser" class="mr-4" depressed to="/login">
        <font-awesome-icon icon="sign-in-alt" />Login
      </v-btn>
      <v-btn v-if="currentUser" class="mr-4" depressed to="/profile">
        <font-awesome-icon icon="user" />
            {{ currentUser.username }}
      </v-btn>
      <v-btn v-if="currentUser" class="mr-4" href @click.prevent="logOut">
        <font-awesome-icon icon="sign-out-alt" />LogOut
      </v-btn>
    </v-app-bar>
    <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
  </v-app>
  
</template>

<script>
export default {
    data: () => ({
    drawer: null,
    items: [
      //{ title: '로그인', icon: 'mdi-account', to: '/login'},
      { title: '리드파일', icon: 'mdi-help-box', to: '/pricing'},
    ],
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>