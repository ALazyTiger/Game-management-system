<template>
  <div class="content">
    <div class="crumbs">鲸鱼用户（Top100）</div>
    <div class="container">
      
      <el-table :data="dataList" border class="table" ref="multipleTable">
        <el-table-column prop="name" label="排名" sortable></el-table-column>
        <el-table-column prop="num" label="用户ID" ></el-table-column>
        <el-table-column prop="num" label="用户昵称" ></el-table-column>
        <el-table-column prop="num" label="绑定手机" ></el-table-column>
        <el-table-column prop="num" label="付费总额" ></el-table-column>
        <el-table-column prop="num" label="注册时间" ></el-table-column>
        <el-table-column prop="num" label="注册渠道" ></el-table-column>
        <el-table-column prop="num" label="注册IP" ></el-table-column>
        <el-table-column prop="num" label="首笔付费时间" ></el-table-column>
        <el-table-column prop="num" label="最后付费时间" ></el-table-column>
        <el-table-column prop="num" label="最后登录IP" ></el-table-column>
        <el-table-column prop="num" label="最后登录时间" ></el-table-column>
      </el-table>									
    </div>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      dataList: [],
      
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
    canalChange(value){
      console.log(value)
    },
    search() {
      this.getrolequeryList();
    },
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
  }
}
</style>