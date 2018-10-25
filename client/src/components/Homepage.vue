<template>
    <div>
        <div class = "container-fluid">
          <div class="row">
            <div class="col-md-4">
              <Listvideo></Listvideo>
            </div>
            <div class="col-md-4">
              <p>For Detail Part</p>
              <!--
              <router-view></router-view>
              -->
            </div>
            <div class="col-md-4">
                <p>For Trending Lists</p>
                <Liked></Liked>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Listvideo from '@/components/Listvideo.vue'
import Detail from '@/views/Detail.vue'
import Liked from '@/components/Liked.vue'
export default {
  name: 'Homepage',
  components: {
    Listvideo, Detail, Liked
  }
}
</script>

<style>

</style>
