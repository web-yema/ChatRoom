<template>
  <div class="nar-bar-content">
    <!-- {{friendsData}} -->
    <div class="fenzu-box" v-for="(item,index) in friendsDatas" :key="index">
      <div @click="btn(index)">
        <span>{{friendsShow[index]==true?"↓":">"}}</span>
        {{item.title}} {{item.FriendsList.length}}
      </div>
      <ul v-show="friendsShow[index]">
        <div v-for="(items,index) in item.FriendsList" :key="index">
          <div @click="btns(items)">
            <HaoList :itemarr="items"></HaoList>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import HaoList from '../Haolist'
import { mapState, mapMutations } from 'vuex'
export default {
  components: { HaoList },
  data () {
    return {
      showis: [],
      friendsDatas: [
        { title: '我的好友', FriendsList: [] },
        { title: '同学', FriendsList: [] },
        { title: '朋友', FriendsList: [] }
      ]
    }
  },
  watch: {
    friendsData (a, b) {
      if (a) {
        this.friendsDatas = this.friendsData
      }
    }
  },
  computed: {
    ...mapState(['friendsData', 'friendsShow'])
  },
  mounted () {
    if (this.friendsData.length !== 0) {
      this.friendsDatas = this.friendsData
    }
  },
  methods: {
    ...mapMutations(['showBtn']),
    btn (id) {
      this.showBtn(id)
    },
    btns (item) {
      this.$store.dispatch('chatdata', { item })
      this.$router.push({
        name: 'frienddetails'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.fenzu-box {
  text-align: left;
  box-sizing: border-box;
}
</style>
