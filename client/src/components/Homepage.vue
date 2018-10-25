<template>
    <div>
       <p>This is home view</p>
        <div class = "container-fluid">
          <div class="col-md-4">
            <Listvideo></Listvideo>
          </div>
          <div class="col-md-8">
            <router-view></router-view>
          </div>
        </div>
    </div>
</template>

<script>
import Listvideo from '@/components/Listvideo.vue'
import Detail from '@/views/Detail.vue'
export default {
  name: 'Homepage',
  components: {
    Listvideo, Detail
  }
}
</script>

<style>

</style>
