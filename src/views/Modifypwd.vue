<template>
  <div class="modifycipher">
    <Navs :showlt="true">
      <div slot="center">修改密码</div>
    </Navs>
    <div class="oldandnew">
      <div class="oldpassword-frame">
        <div class="oldpassword">旧密码：</div>
        <p><input type="text" v-model="form.password" placeholder="若包含字母，请注意区分大小写" /></p>
        <span>{{Tips}}</span>
      </div>
      <div>
        <div class="oldpassword">新密码：</div>
        <p><input type="text" v-model="form.newpassword" placeholder="6-14位，至少包含数字、字母" /></p>
        <span>{{Tips2}}</span>
      </div>
    </div>
    <div class="determine">
      <button @click="determine">确定</button>
    </div>
  </div>
</template>
<script>
import Navs from '@/components/Nav'
import { upadatapassword } from '@/api/user.js'
import { mapState } from 'vuex'
export default {
  components: { Navs },
  props: [],
  data () {
    return {
      Tips: '', // 提示
      Tips2: '', // 提示2
      form: {
        password: '', // 旧密码
        newpassword: '' // 新密码
      }
      // username:'', // 用户
    }
  },
  computed: {
    ...mapState(['username'])
  },
  methods: {
    // 确定修改
    determine () {
      // 旧密码
      if (this.form.password.length === 0) {
        this.Tips = '请输入密码'
      } else {
        this.Tips = ''
      }
      // 新密码
      if (this.form.newpassword.length < 6) {
        this.Tips2 = '请输入密码并且密码长度不能小于6位'
      } else {
        this.Tips2=''
        // 调用 接口
      this.upadatapasswords()
      }
      
    },
    async upadatapasswords(){
      const data = await upadatapassword({password:this.form.password,newpassword:this.form.newpassword,username:this.username})
      console.log(data);
      if(data.code === 20000){
        this.$message({ title: `${data.message}${',二秒后跳转到登录页'}` })
        this.form = '' 
        setTimeout(() => {
          localStorage.removeItem('token') // 清空本地缓冲
          this.$router.push('/login') // 调用跳转到登陆页的方法
        }, 2000);
      } else if(data.code === 404) {
        this.Tips = data.message
        this.Tips2 = data.message
      } else if(data.code === 4004){
        this.Tips = data.message
      }
    }
  }
}
</script>
<style lang="less" scoped>
.modifycipher {
  width: 100%;
  height: 100vh;
  background: rgba(245, 245, 245, 0.89);
  .oldandnew {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .oldpassword-frame{
      margin: 30px 0;
    }
    p{
      width: 100%;
      background: #fff;
    }
    input {
      width: 90%;
      height: 90px;
      font-size: 30px;
    }
    input::-webkit-input-placeholder {
      font-size: 30px;
    }
    .oldpassword {
      width: 100%;
      height: 70px;
      font-size: 35px;
      text-align: left;
      line-height: 70px;
      margin-left: 36px;
      color: #868686;
    }
    span{
      display: block;
      width: 90%;
      font-size: 25px;
      color: red;
      text-align: left;
      margin-left: 34px;
      margin-top: 20px;
    }
  }
  // 确定
  .determine{
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
      width: 90%;
      height: 80px;
      background: #0078FE;
      font-size: 30px;
      color: #fff;
      border-radius:10px;
      border: none;
    }
    button:active{
      background: #8ABAF0;
    }
  }
}
</style>
