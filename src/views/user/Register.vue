<template>
  <div>
    <div>
      <Navs :showlt="true" styles="background:#fff; color:#aaa"></Navs>
      <div class="content" style="background:#fff; padding: 0px 20px;">
        <h2>设置昵称账号与密码</h2>
        <input class="inputs btm" v-model="form.user" placeholder="昵称" />
        <input class="inputs btm" v-model="form.username" placeholder="账号" />
        <input class="inputs btm" v-model="form.password" type="password" placeholder="密码" />
        <div class="tips" v-if="show">{{text}}</div>
        <div class="btn-box">
          <div class="login-btn" @click="onRegister('myPopup2')">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setRegister } from '@/api/user'
import Navs from '@/components/Nav'

export default {
  components: { Navs },
  data () {
    return {
      form: {
        user: '',
        username: '',
        password: ''
      },
      show: false,
      text: ''
    }
  },
  methods: {
    async SetRegisters (data) {
      await setRegister(data).then(item => {
        if (item.code === 444) {
          this.tips(item.message)
        }
        if (item.code === 20000) {
          this.tips(item.message)
          this.$router.push('/login')
        }
      })
    },

    tips (text) {
      this.show = true
      this.text = text
      setTimeout(() => {
        this.show = false
      }, 1000)
    },
    // 注册
    onRegister () {
      if (this.form.user.length === 0) {
        this.$message({ title: '请输入昵称' })
        return
      }
      if (this.form.username.length === 0) {
        this.$message({ title: '请输入账号' })
        return
      }
      let reg = /^[0-9a-zA-Z]+$/
      console.log(reg.test(this.form.username))
      if (!reg.test(this.form.username)) {
        this.$message({ title: '输入的账号只能是英文和数字' })
        return
      }
      if (this.form.password.length < 6) {
        this.$message({ title: '请输入密码并且密码长度不能小于6位' })
        return
      }

      this.SetRegisters(this.form)
    }
  }
}
</script>
<style  scoped>
.inputs {
  height: 80px;
  width: 100%;
  font-size: 33px;
  line-height: 80px;
  padding: 10px 20px;
  box-sizing: border-box;
  border: none;
}
.btm {
  border-bottom: 1px solid whitesmoke;
}
.btn-box {
  padding: 0px 20px;
  box-sizing: border-box;
}
.login-btn {
  width: 100%;
  background: deepskyblue;
  height: 80px;
  line-height: 80px;
  color: #fff;
  font-size: 33px;
  border-radius: 15px;
  margin: 40px 0;
}
.btn-content {
  display: flex;
  justify-content: space-between;
  color: deepskyblue;
  font-size: 28px;
}
.tips {
  position: absolute;
  width: 94%;
  line-height: 90px;
  height: 90px;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid whitesmoke;
  border-radius: 15px;
  background: #fff;
  font-size: 30px;
  color: red;
}
</style>
