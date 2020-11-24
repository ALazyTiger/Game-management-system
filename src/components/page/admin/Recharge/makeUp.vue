<template>
  <div class="content">
    <div class="crumbs">发放充值补偿</div>
    <div class="container">
      <div class="makeUp-box">
        <el-input placeholder="请输入玩家ID 或 名字" v-model="roles" class="input-with-select"></el-input>
      </div>
      <div class="makeUp-box">
        <el-select v-model="select_makeUp" placeholder="请选择补偿金额" class="input-with-select">
          <el-option v-for="item in makeUpOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="makeUp-box">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      roles: "",
      select_makeUp: "",
      makeUpOptions: [
        {
          value: 1,
          label: "6元"
        },
        {
          value: 2,
          label: "30元"
        },
        {
          value: 3,
          label: "68元"
        }
      ],
    };
  },
  created() {},
  computed: {},
  mounted() {
    },
  methods: {
    handleChange(item) {
        console.log(item);
    },
    onSubmit() {
      console.log("submit!");
    },
    Addexperience() {
      dataGet(
        "/getRole??Service=" + this.select_cate + "&roleId=" + this.roleId,
        {},
        (data, all) => {
          this.roleName = data.roleName;
          // console.log(this.rolequeryList)
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>

.content {
  .crumbs {
    margin: 10px 0;
    font-size: 20px;
    color: #333;
    font-weight: bold;
  }
  .container {
    padding: 30px;
    background: #fff;
    border: 1px solid #b3b3b6;
    border-radius: 5px;
    .makeUp-box {
      margin-bottom: 20px;
      .input-with-select{
        width: 500px;
      }
    }
  }
}
</style>