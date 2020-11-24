<template>
  <div class="content">
    <div class="crumbs">角色货币修改记录<div class="tips"><span></span></div></div>
    <div class="container">
      <div class="rolequery-box">
        <div class="rolequery-box">
        <div class="demo-input-suffix">
          <el-input placeholder="请输入玩家ID 或 名字" v-model="rolequerySearch" class="input-with-select">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
      </div>
      <el-table :data="rolequeryList" border class="table" ref="multipleTable">
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="coin" label="货币类型">
          <template slot-scope="scope">
            <span v-if="scope.row.coin == 1">金币</span>
            <span v-else-if="scope.row.coin == 2">钻石</span>
          </template>
        </el-table-column>
        <el-table-column prop="coinNum" label="修改前数量"> </el-table-column>
        <el-table-column prop="surplusCoin" label="修改后数量"> </el-table-column>
        <el-table-column prop="date" label="修改时间"  sortable ></el-table-column>
        <el-table-column prop="operator"  label="操作人员"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100"></el-pagination>
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
      rolequerySearch:'',
      cur_page: 1,
      rolequeryList: [
        {
          "serverid":10086, //服务器id
          "id": 11752003275,//角色id
          "name": "欧皇",//角色昵称
          "coin":2,//货币类型
          "currencyVal":'-2000',//货币操作数量
          "currencySurplus":'98250',//货币剩余
          "date": "2019-03-24",//时间
          "operator":"李某某",//操作者
          "msg":"减少钻石"//操作说明
        }
      ],
    };
  },
   created() {
    this.getrolequeryList();
  },
  computed: {},
   methods: {
     // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getrolequeryList();
    },
     getrolequeryList() {
      dataGet("/getList?size=20&page="+this.cur_page+"&"+this.rolequerySelect+"=" + this.rolequerySearch,{ },(data, all) => {
        this.rolequeryList = data.List;  
        // console.log(this.rolequeryList)
      });
    },
    search() {
      this.getrolequeryList();
    },
    
   },
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
      margin-bottom: 50px;
      .input-with-select{
        width: 568px;
      }
    }
    .demo-input-suffix {
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
       span{
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