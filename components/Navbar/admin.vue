<template>
  <v-app light>
    <div>
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
        light
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            color="primary"
          >
            <v-list-item-action> </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>


        </v-list>
      </v-navigation-drawer>
    </div>

    <v-main>
      <div class="headcontainer">
        <v-app-bar :clipped-left="clipped" fixed app>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
          <v-spacer />
        </v-app-bar>
        <v-img
          class="cover"
          :src="require(`~/assets/image/cover.png`)"
          :aspect-ratio="16 / 3"
        >
        </v-img>
      </div>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
export default Vue.extend ({
  name: 'AdminNavbar',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
       
        {
          icon: 'mdi-chart-bubble',
          title: 'News Manage',
          to: '/staff/newsMNlist',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Bone Manage',
          to: '/staff/boneMN',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Organ Manage',
          to: '/staff/organMN',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Doner Manage',
          to: '/staff/donerMN',
        },
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
})
</script>

<style>
.container {
  margin-top: 5rem;
}
.headcontainer {
  flex-direction: column;
  margin-top: 120 px;
}
</style>
