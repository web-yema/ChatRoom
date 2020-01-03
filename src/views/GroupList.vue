<template>
    <div>
        <div>
         <div v-for="(items,index) in dataList" :key="index">
          <div @click="btns(items)">
            <HaoList :itemarr="items"></HaoList>
          </div>
        </div>
    </div>
    </div>
</template>
<script>
import HaoList from '@/components/Haolist'
export default {
  components: { HaoList },
  data () {
    return {
      dataList: []
    }
  },
  created () {
    this.dataList = this.$route.params.data
  },
  methods: {
    btns (item) {
    //   console.log(item)
      this.$router.push({ path: `/addto?id=${item.roomNumber}&messageValue=2` })
    }
  }
}
</script>
