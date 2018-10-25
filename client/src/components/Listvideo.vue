<template>
    <div>
      <!-- Search Form -->
          <form>
            <div class="input-group mb-3">
              <input
                v-model="keyword"
                type="text"
                class="form-control"
                placeholder="Search videos across YouTube..."
                aria-label="Search videos across YouTube..."
                aria-describedby="go-button-addon"
                auto-complete="off"
                autofocus>
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="go-button-addon"
                  v-on:click="searchvideo()">
                  Go!
                </button>
              </div>
            </div>
          </form>

          <!-- Video List -->
          <ul class="list-unstyled">
            <a v-for="(video,index) in listvideos" :key="index" href="JavaScript:Void(0);" class="video-link">
              <li class="media my-4">
                <img class="mr-3" v-bind:src="video.snippet.thumbnails.default.url">
                <div class="media-body">
                  <h5 class="mt-0 mb-1">{{ video.snippet.title }}</h5>
                  <br />
                </div>
              </li>
              <div v-if="token !==null && token!== ''">
                <button type="button" v-on:click="likevideo(video.snippet.title, video.snippet.thumbnails.default.url)" class="btn btn-success">Like</button>
              </div>
              <router-link :to="{ name: 'id', params: { id: video.etag }}">
                <button type="button" v-on:click="detailvideo(video.snippet.title, video.snippet.thumbnails.default.url, video.etag)" class="btn btn-secondary">Details</button>
              </router-link>
            </a>
          </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Listvideo',
  data () {
    return {
      listvideos: [],
      keyword: ''
    }
  },
  methods: {
    getvideo () {
      let self = this
      axios.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyC5EzdbVWOSipBo17FiRzioGloXeAMNH_M&part=snippet,id&order=date&maxResults=15')
        .then(result => {
          self.listvideos = []
          self.listvideos = result.data.items
          // console.log('HASIL-----', result.data.items)
        })
        .catch(error => {
          console.log('ERROR GET Youtube video ', error)
        })
    },
    searchvideo () {
      let self = this
      axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC5EzdbVWOSipBo17FiRzioGloXeAMNH_M&part=snippet,id&order=date&maxResults=15&q=${self.keyword}`)
        .then(result => {
          self.listvideos = []
          self.listvideos = result.data.items
          // console.log('HASIL Search-----', result.data.items)
        })
        .catch(error => {
          console.log('ERROR GET Youtube video ', error)
        })
    },
    likevideo (title, url) {
      // console.log('like video-------', title, url)
      let likeobj = {
        token: this.token,
        url: url,
        title: title
      }
      this.$store.dispatch('likeobj', likeobj)
    },
    detailvideo (title, url, id) {
      console.log('detail--------', title, url, id)
      this.$router.push({ path: `/${id}` })
    }
  },
  created () {
    this.getvideo()
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  }
}
</script>

<style>

</style>
