<template>
  <div class="content">
    <div class="crumbs">跑马灯列表<div class="tips"><span></span></div></div>
    <div class="container">
      <el-table :data="HorseList" border class="table" ref="multipleTable">
        <el-table-column prop="horseTime" label="创建时间" sortable ></el-table-column>
        <el-table-column prop="canalList" label="渠道"></el-table-column>
        <el-table-column label="详细情况">
          <template slot-scope="scope">
             <el-tooltip  content="点击查看详情" placement="top-start">
              <el-button  @click="showHorse(scope.row)" size="small">详情</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.status" content="点击按钮关闭跑马灯" placement="top-start">
              <span class="green" @click="changeHorseStatus(scope.row)">开启</span>
            </el-tooltip>
            <span class="red" v-else>关闭</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator"  label="操作人员"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </div>
    <el-dialog title="跑马灯详情" center :visible.sync="dialogFormVisible" width="58%">
      <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="渠道：">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" disabled>全选</el-checkbox>
            <span class="d-i-b">
              <el-checkbox-group v-model="form.canalList" disabled>
                <el-checkbox  v-for="item in canalOptions" :key="item" :label="item" :value="item"></el-checkbox>
              </el-checkbox-group>
            </span>
          </el-form-item>
          <el-form-item label="跑马灯内容：">
            <el-input type="textarea" v-model="form.desc" disabled></el-input>
          </el-form-item>
           <el-form-item label="跑马灯展示：">
             <span class="d-i-b mr10"><el-input  v-model="form.frequency" class="role-input " placeholder="输入次数" disabled></el-input></span>
             <span class="d-i-b">/</span>
             <span class="d-i-b ml10"><el-input  v-model="form.horseTime" class="role-input " placeholder="输入时间" disabled></el-input></span>
          </el-form-item>
          <el-form-item label="跑马灯展示时间：">
            <el-date-picker v-model="form.horseTimeRange" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" disabled></el-date-picker>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      cur_page: 1,
      HorseList: [
        {
        "canalList": ["全渠道"],//渠道id,
        "horseTime":"20201104",
        "horseTimeRange":"",
        "status":  true,
        "operator":"账号id"
        },
        {
        "canalList": ["全渠道"],//渠道id,
        "horseTime":"20201104",
        "horseTimeRange":"",
        "status":  false,
        "operator":"账号id"
        }
     ],
     dialogFormVisible: false,
     checkAll: false,
      isIndeterminate: false,
      canalOptions:["taptap","小米","华为","好游快爆"],
      form: {
        "canalList": [],//渠道id,
        "desc": "",
        "frequency":"",
        "horseTime":"",
        "horseTimeRange":""
      }
    };
  },
   created() {
     console.log(this.$router)
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
        this.HorseList = data.List;  
        // console.log(this.rolequeryList)
      });
    },
    changeHorseStatus(){

    },
    showHorse() {
      this.dialogFormVisible = true;
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