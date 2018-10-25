<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" @click="home" style="color: white; cursor: pointer">Vuedio</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!-- use .active on .nav-item if you want to highlight current link -->
          <li class="nav-item">
            <a href="JavaScript:Void(0);" class="nav-link">
              Trending
            </a>
          </li>
          <li class="nav-item">
            <a @click="seeVideoLike" class="nav-link">
              Liked Videos <span class="badge badge-info">{{ lotalLike.length }}</span>
            </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">

          <li style="padding-right:10px;" v-if="error">
            <p style="color: red;"> {{ errMessage }} <span @click="closeError" style="color: white;">close</span></p>
          </li>

          <li v-if="!isLogin">
            <input type="text" class="form-control" placeholder="Email" v-model="email">
          </li>
          <li v-if="!isLogin">
            <input type="password" class="form-control" placeholder="Password" v-model="password">
          </li>
    
          <li class="nav-item" v-if="!isLogin">
            <a class="btn btn-warning" @click="btnLogin">Login</a>
          </li>
          <li class="nav-item" v-else>
            <a class="btn btn-danger" @click="btnLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>

  </nav>
</template>

<script>
import axios from "axios"
import config from "@/assets/config.js"
import {mapActions, mapState} from "vuex"

export default {
  name: "NavbarComponent",
  data: function () {
    return {
      email: "",
      password: "",
      error: false,
      errMessage: "",
      videosLike: {},
      lotalLike: []
    }
  },
  created() {
    this.videolike()
  },
  methods: {
    ...mapActions(["setIslogin", "setUserEmail"]),
    btnLogin: function () {
      let data = {
        email: this.email,
        password: this.password
      }
      axios({
        method: "POST",
        url: `${config.port}/users/signin`,
        data
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", response.data.email)
        this.errMessage = ""
        this.error = false
        this.setIslogin()
        this.setUserEmail()
      }).catch((err) => {
        this.errMessage = ""
        this.error = true
        this.errMessage = err.response.data.message
      });
    },
    btnLogout: function () {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      this.setIslogin()
      this.setUserEmail()
    },
    closeError: function () {
      this.errMessage = ""
      this.error = false
    },
    home: function () {
      this.$router.push("/")
    },
    videolike: function () {
      axios({
        method: "GET",
        url:`${config.port}/videos/mylikevideos`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        this.lotalLike = response.data.video
      }).catch((err) => {
         console.log(err.response)
      });
    },
    seeVideoLike: function () {
      this.$emit("data-like",  this.lotalLike)
    }
  },
  computed: {
    ...mapState(["isLogin"])
  }
}
</script>

<style>

</style>
