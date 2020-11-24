<template>
  <div class="content">
    <div class="crumbs">修改角色货币</div>
    <div class="container">
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          <el-input placeholder="请输入玩家ID 或 名字" v-model="rolequerySearch" class="input-with-select">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="role-box" >
        <div class="role-list">
          <span>角色名称：</span>
          <el-input  v-model="roleName" class="role-input mr10" disabled></el-input>
        </div>
        <div class="role-list">
          <span>当前金币：</span>
           <el-input  v-model="Coin" class="role-input mr10" disabled></el-input>
           <el-button :type="editCoin ? 'primary' : '' " icon="el-icon-edit" @click="editCoin=true">修改</el-button>
           <el-input  v-model="newCoin" class="role-input ml10" v-if="editCoin" >
             <el-button slot="append" @click="reviseCoinNum" :disabled="newCoin > 0 ? false : true">确定修改</el-button>
           </el-input>
        </div>
        <div class="role-list">
          <span>当前钻石：</span>
          <el-input  v-model="Diamonds" class="role-input mr10" disabled></el-input>
          <el-button :type="editDiamonds ? 'primary' : '' "  icon="el-icon-edit" @click="editDiamonds=true">修改</el-button>
          <el-input  v-model="newDiamonds" class="role-input ml10" v-if="editDiamonds" >
            <el-button slot="append"  @click="reviseDiamonds" :disabled="newDiamonds > 0 ? false : true">确定修改</el-button>
          </el-input>
        </div>
        <div class="role-list">
          <span>当前水晶：</span>
          <el-input  v-model="Crystal" class="role-input mr10" disabled></el-input>
          <el-button :type="editCrystal ? 'primary' : '' "  icon="el-icon-edit" @click="editCrystal=true">修改</el-button>
          <el-input  v-model="newCrystal" class="role-input ml10" v-if="editCrystal" >
            <el-button slot="append" @click="reviseCrystal" :disabled="newCrystal > 0 ? false : true">确定修改</el-button>
          </el-input>
        </div>
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
      roleId: "",
      roleName: "测试11号",
      Coin:'12223',newCoin:'',editCoin:false,
      Diamonds:"1234",newDiamonds:"",editDiamonds:false,
      Crystal:"123",newCrystal:"",editCrystal:false,
    };
  },
   created() {
   
  },
  computed: {},
   methods: {
     getroleName() {
        this.roleName = "欧皇";  
      dataGet("/getRole??Service="+this.select_cate+"&roleId="+this.roleId,{ },(data, all) => {
        this.roleName = data.roleName;  
        // console.log(this.rolequeryList)
      });
    },
    reviseCoinNum(){
      dataGet("/getRole??Service="+this.select_cate+"&roleId="+this.roleId,{ },(data, all) => {
        this.roleName = data.roleName;  
        // console.log(this.rolequeryList)
      });
    },
    reviseDiamonds(){
      dataGet("/getRole??Service="+this.select_cate+"&roleId="+this.roleId,{ },(data, all) => {
        this.roleName = data.roleName;  
        // console.log(this.rolequeryList)
      });
    },
    reviseCrystal(){
      dataGet("/getRole??Service="+this.select_cate+"&roleId="+this.roleId,{ },(data, all) => {
        this.roleName = data.roleName;  
        // console.log(this.rolequeryList)
      });
    },
     search() {
      this.getroleName();
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
    .role-list {
      margin-bottom: 20px ;
      span{
        display: inline-block;
        width: 70px;
        text-align: right;
      }
      .role-input {
        width: 260px;
      }
    }
  }
}
</style>