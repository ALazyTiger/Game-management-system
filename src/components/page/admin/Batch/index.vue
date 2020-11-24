<template>
  <div class="content">
    <div class="crumbs">批量发放充值、道具补偿<div class="tips"><span></span></div></div>
    <div class="container">
      <div class="roleId-box">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="批量导入：">
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <input type="file"  class="fileinput">
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
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
      ServiceOptions: [
        {
          value: 1,
          label: "盖亚大陆"
        },
        {
          value: 2,
          label: "冰雪魔窟"
        },
        {
          value: 3,
          label: "狂野沙漠"
        }
      ],
      select_cate: "",
      form: {
        server: "",
        userId: "",
        region: "",
        CodeNum:1,
        CodeCDK:'',
        starDate: "",
        endDate: "",
        canal: "",
        region: "",
        filter: "",
        delivery: '',
        deliveryNum:1,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {},
  computed: {},
  mounted() {
      
    },
  methods: {
      handleSelect(item) {
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
    .roleId-box {
      margin-bottom: 20px;
    }
    .demo-input-suffix {
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
    .handle-select {
      width: 305px;
    }
    .roleId-input {
      width: 305px;
    }
    .del-dialog-cnt {
      font-size: 16px;
      text-align: center;
    }
    .table {
      width: 100%;
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
}
</style>