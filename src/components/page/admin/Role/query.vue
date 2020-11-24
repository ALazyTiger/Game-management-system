<template>
  <div class="content">
    <div class="crumbs">角色信息查询<div class="tips"><span>*</span>查询游戏角色的一切信息</div></div>
    <div class="container">
      <div class="rolequery-box">
        <div class="demo-input-suffix">
            <el-input placeholder="请输入玩家ID 或 名字" v-model="rolequerySearch" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <mailTable :tableData="tableData" ></mailTable>
    </div>
  </div>
</template>

<script>
import mailTable from "../../common/tableComponent"
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
      userID:'',
      userName:'',
      tableData: [
        {"key": "角色id", "value": 100010},
        {"key": "角色昵称", "value": "感觉你有点傻"},
        {"key": "角色等级", "value": 15},
        {"key": "剩余金币", "value": 20000},
        {"key": "剩余钻石", "value": 999999},
        {"key": "总花费金币", "value": 123456},
        {"key": "总花费钻石", "value": 123456},
        {"key": "所属公会", "value": "史克郎"},
        {"key": "战斗力", "value": 1234567},
        {"key": "充值总金额", "value": 12345},
        {"key": "竞技场排名", "value": 12},
        {"key": "渠道", "value": "taptap"},
        {"key": "登录ip", "value": "192.168.2.6"},
        {"key": "是否在线", "value": true},
        {"key": "是否禁言", "value": true},
      ],
      forbiddenBtn:true,
      sealBtn:true,
      dialogFormTit:'',
      dialogFormVisible: false,
      form: {
          UserId: '',
          UserName:'',
          timeselect:'houre',
          time: 1,
          TimeMax:'',
          explain:'违规操作'
      },
      formLabelWidth: '120px'
    };
  },
   created() {
    this.getrolequery();
  },
  computed: {},
    components: {
    mailTable,

  },
  methods: {
      forbidden(id,name){
       this.dialogFormTit = 1
      this.dialogFormVisible = true;
      this.form.UserId =id
      this.form.UserName = name
    },
    seal(row,name){
      this.dialogFormTit = 2
      this.dialogFormVisible = true;
      this.form.UserId = id
      this.form.UserName = name
    },
     getrolequery() {
       
      dataGet("/getRole?server="+this.select_cate+"&"+this.rolequerySelect+"=" + this.rolequerySearch,{ },(data, all) => {
        this.rolequeryList = data.List;  
        // console.log(this.rolequeryList)
        
      });
      
    },
    search() {
      this.getrolequery();
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
      margin-bottom: 50px;
      .input-with-select{
        width: 568px;
      }
    }
    .demo-input-suffix {
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
      // width: 800px;
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
  }
}
</style>