<template>
  <div class="content">
    <div class="crumbs">批量封号禁言<div class="tips"><span>*</span>通过上传文件的方式直接对多个角色进行冻结、禁言操作</div></div>
    <div class="container">
      <div class="rolequery-box">
         <div class="demo-input-suffix">
            <el-button type="primary">导入<i class="el-icon-upload el-icon--right"></i></el-button>
            <input type="file" id="my_file" class="fileinput" @change="myfile">
         </div>
        <div class="demo-input-suffix">
          <el-button type="primary"  @click="dialogShow(1)">角色批量禁言</el-button>
          <el-button type="primary"  @click="dialogShow(2)">角色批量冻结</el-button>
        </div>
      </div>
      <el-table :data="rolequeryList" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="角色ID" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="名称" width="220"></el-table-column>
        <el-table-column prop="online" label="是否在线" width="150">
          <template slot-scope="scope">
            <span class="green" v-if="scope.row.online">是</span>
            <span class="red" v-else>否</span>
          </template>
        </el-table-column>
         <el-table-column prop="online" label="是否禁言" width="150">
          <template slot-scope="scope">
            <span class="green" v-if="scope.row.forbidden">是</span>
            <span class="red" v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="online" label="是否封号" width="150">
          <template slot-scope="scope">
            <span class="green" v-if="scope.row.seal">是</span>
            <span class="red" v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作时间"></el-table-column>
      </el-table>
      <el-dialog :title="(dialogFormTit==1)?'角色禁言':'角色封号'" center :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form">
          <el-form-item :label="(dialogFormTit==1)?'禁言时间':'封号时间'" :label-width="formLabelWidth">
            <el-radio-group v-model="form.timeselect">
            <el-radio label="houre">小时</el-radio>
            <el-radio label="day">天</el-radio>
            <el-radio label="forever">永久</el-radio>
          </el-radio-group>
          <el-input v-model="form.time" :max="form.TimeMax" :disabled="form.timeselect=='forever'"  class="roleId-input mr10"></el-input>
          </el-form-item>
          <el-form-item label="操作原因" :label-width="formLabelWidth">
            <el-input v-model="form.explain" autocomplete="off"  class="roleId-input mr10"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false;dialogFormTit=''">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
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
          value:1,
          label: "盖亚大陆",
        },
        {
          value: 2,
          label: "冰雪魔窟",
        },
        {
          value: 3,
          label: "狂野沙漠",
        }
      ],
      select_cate:'',
      rolequeryOptions: [
        {
          value: "id",
          label: "ID"
        }
      ],
      roleId:'',
      rolequerySelect: "id",
      rolequerySearch: "",
      cur_page: 1,
      rolequeryList: [
        {
          "id": 1,
          "name": "欧皇",
          "online":false,
          "date": "2019-03-24",
        },
        {
          id: 2,
          name: "感觉你有点傻",
          online:true,
           date: "2019-03-24",
        },
        {
          id: 3,
          name: "史克郎",
          online:false,
           date: "2019-03-24",
        }
      ],
      fileText:'',
      dialogFormTit:'',
      dialogFormVisible: false,
      form: {
          timeselect:'houre',
          time: 1,
          TimeMax:'',
          explain:'违规操作'
      },
      formLabelWidth: '120px'
    };
  },
   created() {
    // this.getrolequeryList();
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
    myfile() {
    var file = document.getElementById("my_file").files[0];
    var reader = new FileReader();
    //将文件以文本形式读入页面
    reader.readAsText(file, "gb2312");
    reader.onload = function (e) {
      this.fileText = e.target.result.split("\n");
     console.log(this.fileText)
    }
  },
  dialogShow(id){
    if(this.fileText ==''){
      this.$message('请先选择文件');
    }else{
      this.dialogFormVisible = true;
    this.dialogFormTit = id;
    }
    
  },
    submitForm(){
      console.log(this.dialogFormTit)
      if( this.dialogFormTit == 1){
        this.dialogFormTit="";
        this.dialogFormVisible = false;
        console.log("禁言成功")
      }else if( this.dialogFormTit == 2){
        this.dialogFormTit="";
        this.dialogFormVisible = false;
         console.log("封号成功")
      }
    }
   },
   computed:{
    formTime() {
      return this.form.time;
    },
    timeselect(){
      return this.form.timeselect;
    }
  },
  watch:{
    formTime(val) {
      // timeselect
      if(this.form.timeselect =='houre'){
        this.form.TimeMax = 24;
        if(val > 24) this.form.time=24;
      }else if(this.form.timeselect =='day'){
        this.form.TimeMax = 365;
        if(val > 365) this.form.time=365;
      }else if(this.form.timeselect =='forever'){
        this.form.time='';
      }
    },
    timeselect(val) {
      if(this.form.timeselect =='forever'){
        this.form.time='';
      }
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
          position: relative;
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