<template>
    <div>
       <p>This is home view</p>
        <div class = "container-fluid">
          <div class="col-md-4">
            <Listvideo></Listvideo>
          </div>
        </div>
    </div>
</template>

<script>
import Listvideo from '@/components/Listvideo.vue'
export default {
  name: 'Homepage',
  components: {
    Listvideo
  }
}
</script>

<style>

</style>
