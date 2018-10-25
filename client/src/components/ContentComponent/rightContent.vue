<template>
  <div>
     <!-- Player and Detail -->
      <div class="mt-4">
        <div class="card mb-2" style="width: 100%;">
          <div class="card-body">
            <img v-if="video.snippet"  :src="video.snippet.thumbnails.high.url" alt="">
            <h5 class="card-title" v-if="video.snippet">{{ video.snippet.title }}</h5>
            <p class="card-text" v-if="video.snippet">
              {{ video.snippet.description }}
            </p>
          </div>
        </div>
        <!-- <strong>Video Title</strong>&nbsp; -->
        <div v-if="isLogin">
          <button class="btn btn-sm btn-primary" @click="likevideos(video)">Like this Video!</button><br />
          <button class="btn btn-sm btn-primary" @click="unlikevideos">Unlike this Video!</button><br />
        </div> 
        <br />
        <pre class="card">Video description goes here, you can addnewline too!</pre>
        <br />
      </div>
  </div>
</template>

<script>
import axios from "axios"
import config from "@/assets/config.js"
import { mapState } from 'vuex';
export default {
  name: "RightContent",
  data: function () {
    return {
      video: []
    }
  },
  created() {
    this.documentReady()
  },
  methods: {
    documentReady: function () {
      let videoId = this.$route.params.id
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${videoId}&key=AIzaSyAVoF85bzdJw-00LaeUvGQh5KjPW0nwYQI`)
      .then((response) => {
        this.video = response.data.items[0]
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    likevideos: function (video) {
     
      let data = {
        videoId: video.id.videoId,
        detailVideo : video
      }
      axios({
        method: "POST",
        url: `${config.port}/videos/like`,
        data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err.response.data.message);      
      });

    },
    unlikevideos: function () {

    }
  },
  computed: {
      ...mapState(["isLogin"]),

      checkPrams : {
        get : function () {
          return this.$route.params.id
        }
      }
    },
    watch: {
      checkPrams: function (val) {
        let videoId = this.$route.params.id
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${val}&key=AIzaSyAVoF85bzdJw-00LaeUvGQh5KjPW0nwYQI`)
        .then((response) => {
          this.video = response.data.items[0]
          // this.items = response.data.items
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
}
</script>

<style>

</style>
