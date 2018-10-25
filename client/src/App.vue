<template>
  <div id="app">
    <NavbarComponent @data-like="dataLike"/>
    <router-view :video-likes="videoLikes"/>
  </div>
</template>

<script>
  import { mapActions } from "vuex"
  import NavbarComponent from "@/components/NavbarComponent/index.vue"

  export default {
    name: 'App',
    data: function () {
      return {
        videoLikes : []
      }
    },
    components: {
      NavbarComponent
    },
    created() {
      this.setIslogin()
      this.setUserEmail()
    },
    methods: {
      ...mapActions(["setIslogin", "setUserEmail"]),
      dataLike: function (val) {
        this.videoLikes = val
      }
    }
  }
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
