<template>
  <div class="content">
    <div class="crumbs">查询玩家的封号禁言情况</div>
    <div class="container">
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          <el-input placeholder="请输入玩家ID 或 名字" v-model="rolequerySearch" class="input-with-select">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="rolequeryList" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="角色ID" sortable width="240"></el-table-column>
        <el-table-column prop="name" label="名称" width="240"></el-table-column>
        <el-table-column  label="是否在线" width="180">
           <template slot-scope="scope">
            <span class="green" v-if="scope.row.online">是</span>
            <span class="red" v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button v-if="scope.row.forbidden" @click="unforbidden(scope.row)" type="text" size="small">解除禁言</el-button>
              <el-button v-else @click="forbidden(scope.row)" type="text" size="small">禁言</el-button>
            </span>
            <span>
              <el-button v-if="scope.row.seal" @click="unseal(scope.row)" type="text" size="small">解除封号</el-button>
              <el-button v-else @click="seal(scope.row)" type="text" size="small">封号</el-button>
            </span>
          </template>
        </el-table-column>
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
      rolequeryOptions: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "name",
          label: "名称"
        }
      ],
      rolequerySelect: "id",
      rolequerySearch: "",
      roleId:'',
      cur_page: 1,
      rolequeryList: [
        {
          "id": 11752003275,
          "name": "欧皇",
          "online":false,
          "forbidden" :true,
          "seal":false,
          "date": "2019-03-24",
        },
        {
          "id": 11752003275,
          "name": "欧皇1",
          "online":true,
          "forbidden" :false,
          "seal":true,
          "date": "2019-03-24",
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
    forbidden(){
       this.$confirm('此操作将永久禁言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁言成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    seal(){
      this.$confirm('此操作将永久封号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁言成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    unforbidden(row){
      console.log(row);
       this.$prompt('此操作将解除 【'+row.name+'】 【'+row.id+'】禁言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:row.explain,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解除禁言成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    unseal(row){
      console.log(row);
        this.$prompt('此操作将解除 【'+row.name+'】 【'+row.id+'】封号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:row.explain,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '解除封号成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
    .del-dialog-cnt {
      font-size: 16px;
      text-align: center;
    }
    .table {
      width: 100%;
      font-size: 14px;
      margin-bottom: 50px;
    }
  }
}
</style>