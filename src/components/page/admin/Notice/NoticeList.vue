<template>
  <div class="content">
    <div class="crumbs">公告列表<div class="tips"><span></span></div></div>
    <div class="container">
      <el-table :data="NoticeList" border class="table" ref="multipleTable">
        <el-table-column prop="noticeTime" label="创建时间" sortable width="150"></el-table-column>
        <el-table-column prop="canalList" label="渠道"  width="240"></el-table-column>
        <el-table-column prop="title" label="公告标题"> </el-table-column>
        <el-table-column  width="140">
          <template slot-scope="scope">
            <el-tooltip  content="点击再次编辑" placement="top-start">
              <router-link :to="'/notice/'+scope.row.id">
                <el-button  @click="showHorse(scope.row)" size="small">再次编辑</el-button>
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="operator"  label="操作人员" width="100"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import vNotice from "./PublishNotice.vue";
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      cur_page: 1,
      NoticeList: [
         {
        "id":1,
        "canalList": ["全渠道"],//渠道id,
        "noticeTime":"20201104",
        "title":"给玩家的一封信",
        "operator":"账号id"
        },
        {
          "id":2,
        "canalList": ["全渠道"],//渠道id,
        "horseTime":"20201104",
        "horseTimeRange":"",
        "status":  false,
        "operator":"账号id"
        }
      ],
      dialogFormVisible:true,
      noticeId:''
    };
  },
   created() {
    this.getrolequeryList();
  },
  components: {
    vNotice,
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
      margin-bottom: 20px;
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