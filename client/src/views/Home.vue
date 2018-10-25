<template>
  <div class="home">
     <!-- Content -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-7">
        <div class="mt-4">
          <LeftContent :video-likes="videoLikes"/>
        </div>
      </div>

      <div class="col-xl-5">
        <router-view></router-view>
      </div>

    </div>
  </div>
  </div>
</template>

<script>

import LeftContent from "../components/ContentComponent/leftContent"
// import RightContent from "../components/ContentComponent/rightContent"

export default {
  name: 'home',
  props: ["videoLikes"],
  components: {
    LeftContent,
    // RightContent
  }
}
</script>
