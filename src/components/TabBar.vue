<template>
  <div class="content-tab">
    <ul class="tab-ul">
      <router-link to="/" tag="li">
        <i class="iconfont icon-xiaoxi-copy"></i>
        <p>消息</p>
      </router-link>
      <router-link to="/contacts" tag="li">
        <i class="iconfont icon-lianxiren-copy"></i>
        <p>联系人</p>
      </router-link>

      <!-- <router-link tag="li">
          <i class="iconfont icon-chakan"></i>
          <p>看点</p>
        </router-link>
        <router-link tag="li">
          <i class="iconfont icon-iconfontdongtaidianji"></i>
          <p>联系人</p>
      </router-link>-->
    </ul>
  </div>
</template>

<style lang="less" scoped>
.content-tab {
  height: 120px;
  background: snow;
  overflow: hidden;
  box-sizing: border-box;
}
.tab-ul {
  box-sizing: border-box;
  display: flex;
}
.tab-ul li {
  flex: 1;
  //   font-weight: bold;
  color: #aaa;
  // padding-top: 10px;

  &.router-link-exact-active {
    color: deepskyblue;
    p {
      color: #000;
    }
  }
}
.tab-ul li i {
  font-size: 60px;
}
.tab-ul li p {
  padding-top: 10px;
  font-size: 28px;
}
</style>
