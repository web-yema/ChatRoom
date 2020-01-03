<template>
  <div class="nar-bar-content">
    <div v-if="friendsData.length!==0">
      <div v-for="item in friendsData" :key="item._id">
        <div v-for="(items,index) in item.FriendsList" :key="index">
          <div @click="btns(items)">
            <HaoList :itemarr="items"></HaoList>
          </div>
        </div>
      </div>
    </div>
    <div class="notime" v-else>暂无好友</div>
  </div>
</template>

<script>
import HaoList from '../Haolist'
import { mapState } from 'vuex'

export default {
  components: { HaoList },
  computed: {
    ...mapState(['user', 'username', 'RoomList', 'friendsData'])
  },
  data () {
    return {
      friendLsit: []
    }
  },

  mounted () {},
  methods: {
    btns (item) {
      this.$store.dispatch('chatdata', { item })
      this.$router.push({
        name: 'frienddetails'
      })
    }
  }
}
</script>
<style scoped>
.notime {
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a6a5a5;
  font-size: 30px;
}
</style>
