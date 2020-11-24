<template>
  <div class="content">
    <div class="crumbs">充值补偿记录</div>
    <div class="container">
      <el-table :data="rolequeryList" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="玩家ID" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="玩家名称" width="320"></el-table-column>
        <el-table-column prop="amount" label="补偿金额" width="200"></el-table-column>
        <el-table-column prop="date" label="时间" ></el-table-column>
        <el-table-column prop="operator" label="操作者" width="200"></el-table-column>

      </el-table>
      <div class="pagination" v-if="cur_page > 1">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="100"
        ></el-pagination>
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
      cur_page: 1,
      rolequeryList: [
        {
          "id":"0001",
          "name":"测试1号",
          "amount":"98元",
          "date":"2020.09.30 9:20",
          "operator":"张三"
        }
      ],
    };
  },
  created() {
    this.getrolequeryList();
  },
  computed: {
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getrolequeryList();
    },
    getrolequeryList() {
      dataGet(
        "/getList?size=20&page=" +
          this.cur_page +
          "&" +
          this.rolequerySelect +
          "=" +
          this.rolequerySearch,
        {},
        (data, all) => {
          this.rolequeryList = data.List;
          // console.log(this.rolequeryList)
        }
      );
    },
    search() {
      this.getrolequeryList();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    .rolequery-box {
      margin-bottom: 20px;
    }
    .demo-input-suffix {
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
      // width: 800px;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
    .rolequery-select {
      width: 100px;
    }
    .handle-input {
      width: 300px;
    }
    .input-with-select {
      width: 508px;
    }
    .rolequery-input {
      width: 300px;
      display: inline-block;
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