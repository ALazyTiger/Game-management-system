<template>
  <div class="index">
    <img src="../../../../static/images/1.gif">
    <div class="user-info-list">欢迎登陆**后台</div>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, payMoney } from "@/api/api.js";
export default {
  name: 'HelloWorld',
  data () {
    return {
     name: "admin",
    }
  },
  components: {},
  created() {
   
  },
  computed: {
    accountName() {
      let accountName = localStorage.getItem("accountName");
      return accountName ? accountName : this.name;
    }    
  },
  mounted() {},
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.index{
  padding: 50px 0;
  font-size: 32px;
  text-align: center;
  .user-info{
    .user-avator{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .user-info-cont{
      font-size: 14px;
      color: #999;
      .user-info-name {
        font-size: 30px;
        color: #222;
      }
    }
  }
}
</style>
