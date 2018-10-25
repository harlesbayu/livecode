<template>
  <div>
    <!-- Search Form -->
      <form>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search videos across YouTube..."
            aria-label="Search videos across YouTube..."
            aria-describedby="go-button-addon"
            auto-complete="off"
            autofocus
            v-model="titlesearch"
            >
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="go-button-addon" @click="search">
              Go!
            </button>
          </div>
        </div>
      </form>

      <!-- Video List -->
        <ul class="list-unstyled">
          <a class="video-link" v-for="(item, index) in items" :key="index">
            <li class="media my-4">
              <img class="mr-3" :src="item.snippet.thumbnails.default.url">
              <div class="media-body">
                 <router-link :to="{ path : `/details/${item.id.videoId}` }">
                  <h5>{{ item.snippet.title }}</h5>
                 </router-link>
                 {{ item.id.videoId }}
                 {{ item.snippet.description.slice(0,80) }}...
                <br />
              </div>
            </li>
          </a>
        </ul>
  </div>
</template>

<script>
 import axios from "axios"
export default {
  name: "LeftContent",
  props: ["videoLikes"],
  data: function () {
    return {
      items: [],
      titlesearch: ""
    }
  },
  created() {
    this.documentReady()
  },
  methods : {
    documentReady: function () {
    
      axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAVoF85bzdJw-00LaeUvGQh5KjPW0nwYQI')
      .then((response) => {
        this.items = response.data.items
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    search: function () {
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.titlesearch}&key=AIzaSyAVoF85bzdJw-00LaeUvGQh5KjPW0nwYQI`)
      .then((response) => {
        this.items = response.data.items
        this.$router.push('/')
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  watch: {
    videoLikes: function (val) {
     let temp = []
     for(let i = 0; i < val.length; i++){
       
       temp.push(val[i].detailVideo[0])
     }
     this.items = temp
    }
  }
}
</script>

<style>

</style>
