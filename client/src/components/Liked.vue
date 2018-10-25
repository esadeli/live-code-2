<template>
    <div>
        <ul class="list-unstyled">
            <a v-for="(video,index) in likedvideos" :key="index" href="JavaScript:Void(0);" class="video-link">
              <li class="media my-4">
                <div class="media-body">
                  <h5 class="mt-0 mb-1">{{ video.title }}</h5>
                  <br />
                </div>
              </li>
              <p>Likes: {{ video.likes.length }}</p>
              <div v-if="token !==null && token!== ''">
                <button type="button" v-on:click="likevideo(video.title, video.url)" class="btn btn-success">Like / Unlike</button>
              </div>
            </a>
          </ul>
    </div>
</template>

<script>
export default {
  name: 'Liked',
  methods: {
    likevideo (title, url) {
       let likeobj = {
        token: this.token,
        url: url,
        title: title
      }
      this.$store.dispatch('likeobj', likeobj) 
    }
  },
  computed: {
    token () {
      return this.$store.state.token  
    },
    likedvideos () {
      return this.$store.state.likedvideos  
    }  
  }
}
</script>

<style>

</style>
