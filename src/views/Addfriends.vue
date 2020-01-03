<template>
  <div class="addfriends">
    <Navs :showlt="true">
      <div slot="center">添加</div>
    </Navs>
    <div class="inp-box">
      <input class="inputs" type="text" v-model="inputs" />
      <div class="quxiao" @click="onQuxiao">取消</div>
    </div>
    <ul class="friend-box" v-if="inputs.length">
      <li @click="lookforsb">找人：{{inputs}}</li>
      <li @click="searchforgroup">找群：{{inputs}}</li>
    </ul>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import { getlookforsb, getaddgroup } from '@/api/user'
export default {
  components: { Navs },
  data () {
    return {
      inputs: ''
    }
  },
  methods: {
    async getlookforsbs (data) {
      await getlookforsb(data).then(item => {
        if (item.code === 444) {
          this.$message({ title: item.message })
        } else {
          this.$router.push({ path: `/addto?id=${item.data.username}` })
        }
      })
    },
    async getaddgroups (data) {
      await getaddgroup(data).then(item => {
        if (item.code === 444) {
          this.$message({ title: item.message })
        } else {
          this.$router.push({ name: `grouplist`, params: { data: item.data } })
        }
      })
    },
    onQuxiao () {
      this.inputs = ''
    },
    lookforsb () {
      this.getlookforsbs({
        username: this.inputs
      })
    },
    searchforgroup () {
      this.getaddgroups({
        username: this.inputs
      })
    }
  }
}
</script>
<style lang="less" scoped>
.addfriends{
  width: 100%;
  height: 100vh;
  background: rgba(245, 245, 245, 0.89);
}
.inp-box {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.inputs {
  flex: 1.5;
  height: 80px;
  //   width: 100%;
  font-size: 33px;
  line-height: 80px;
  padding: 10px 20px;
  box-sizing: border-box;
  // background: rgba(245, 245, 245, 0.89);
  border-radius: 40px;
}
.quxiao {
  padding: 20px;
  color: deepskyblue;
  font-size: 40px;
}
.friend-box {
  width: 100%;
  margin-top: 20px;
  li {
    text-align: left;
    font-size: 40px;
    margin: 20px 10px;
  }
}
</style>
