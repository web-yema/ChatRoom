<template>
<div>
   <Navs :showlt="true" >
     <div slot="center">编辑资料</div>
     <div slot="right" @click="preservation">保存</div>
   </Navs>
  <div class="new-content-box">
    <div class="new-content-list">
      <div>
        <slot name="lsit-left"></slot>
      </div>
      <router-link to="editportrait">
        <img
          class="imgbox"
          :src='portrait'
          alt
        />
      </router-link>
      <ul class="list-item">
        <li class="title">{{users}}</li>
        <li class="text-item">{{autographs}}</li>
      </ul>
    </div>
    <div class="editinfo">
      <form>
        <label class="label-block">
          <span class="name">签名：</span><input class="content" type="text" :placeholder=autographs v-model="autographs" />
        </label>
        <label class="label-block">
          <span class="name">昵称：</span><input class="content" type="text" :placeholder=users v-model="users"/>
        </label>
        <label class="label-block lable-radio">
          <span class="name">性别：</span>
          <input class="content" id="radio" type="radio" v-model="checked"  value="男"  name="1" />男
          <input class="content" id="radio" type="radio" v-model="checked" name="1"  value="女"  />女
        </label>
        <label class="label-block">
          <span class="name">生日：</span><input class="content birthday" v-model="birthday" readonly type="text" @click="showDatePicker" />
        </label>
      </form>
    </div>
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Navs from '@/components/Nav'
export default {
  components: { Navs },
  data () {
    return {
      arra: true,
      birthday: '',
      checked: '男',
      users: '',
      autographs: ''
    }
  },
  computed: {
    ...mapState(['user', 'username', 'portrait', 'autograph'])
  },
  created () {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    this.birthday = year + '-' + this.zeroize(month) + '-' + this.zeroize(day)
    this.users = this.user
    this.autographs = this.autograph
  },
  methods: {
    zeroize (obj) {
      if (obj < 10) {
        return '0' + obj
      } else {
        return obj
      }
    },
    showDatePicker () {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '出生日期',
          min: new Date(1899, 0, 1),
          max: new Date(),
          value: new Date(),
          onSelect: this.selectHandle
        })
      }

      this.datePicker.show()
    },
    selectHandle (date, selectedVal, selectedText) {
      this.birthday = `${selectedText[0]}-${this.zeroize(selectedText[1])}-${this.zeroize(selectedText[2])}`
    },
    // 保存
    preservation () {
      let obj = {
        username: this.username,
        user: this.users,
        autograph: this.autographs,
        checked: this.checked,
        birthday: this.birthday
      }
      console.log(obj)
    }
  }
}
</script>
<style lang="less" scoped>
.new-content-box {
  width: 100vw;
  height: 100vh;
  padding: 0 20px 20px;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  background-color: #F6F6F6;
}
.new-content-list {
  text-align: center;
  color: #aaa;
  height: 100xh;
  margin-top: 20px;
  overflow: hidden;
  .imgbox {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .list-item {
    flex: 1;
    font-size: 30px;
    padding: 0 20px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
x    li {
      margin-bottom: 5px;
    }
    .title {
      color: #000;
      font-size: 50px;
      height: 56px;
      line-height: 56px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .text-item {
      font-size: 32px;
      margin: 5px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .list-state {
    font-size: 33px;
    line-height: 100px;
    text-align: right;
    .tian {
      padding: 15px 30px;
      background: rgba(245, 245, 245, 0.89);
      border-radius: 50px;
      border: none;
    }
  }
}
.editinfo{
  font-size: 40px;
  margin: 50px 20px;
  text-align: left;
  .label-block{
    display: block;
    .content{
      width: 500px;
      height: 100px;
    }
    .birthday{
      border: 1px solid #000;
      text-indent: 20px;
      height: 70px;
      margin: 20px 0 0 0;
    }
  }
  .lable-radio{
    margin: 20px 0;
    #radio{
      width: 30px;
      height: 30px;
    }
  }
}
</style>
