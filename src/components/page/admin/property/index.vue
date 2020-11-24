<template>
  <div class="content">
    <div class="crumbs">道具列表<div class="tips"><span>*</span>查询游戏所有的道具信息</div></div>
    <div class="container">
      <div class="rolequery-box">
        <div class="demo-input-suffix ">
          <el-input placeholder="请输入道具ID 或 名字" v-model="propertySearch" class="input-with-select">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
         <el-button type="primary"  @click="dialogFormVisible = true">手动新增道具</el-button>
         <div class="demo-input-suffix">
            <el-button type="primary">导入表格<i class="el-icon-upload el-icon--right"></i></el-button>
            <input type="file"  class="fileinput">
         </div>
         <div class="demo-input-suffix">
            <el-button type="primary">导出表格<i class="el-icon-upload el-icon--right"></i></el-button>
         </div>
      </div>
      <el-table :data="propertyList" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="道具ID" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="道具名称" width="320"></el-table-column>
        <el-table-column prop="descriptions" label="道具描述"></el-table-column>
        <el-table-column prop="cost" label="道具价值"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </div>
    <el-dialog title="新增道具" center :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="propertyForm" >
        <el-form-item label="道具" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="道具名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="道具拼音" :label-width="formLabelWidth"  prop="descriptions">
          <el-input v-model="form.descriptions" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('propertyForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      propertyOptions: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "name",
          label: "名称"
        }
      ],
      propertySelect: "id",
      propertySearch: "",
      dialogFormVisible :false,
      form: {
        id: '',
        name: '',
        descriptions: '',
      },
      rules: {
        id: [
          { required: true, message: '道具ID不能为空'},
          { type: 'number', message: '道具ID为数字值'}
        ],     
        name: [
          { required: true, message: "名称不能为空" }
        ],
        descriptions: [
          { required: true, message: "道具拼音缩写不能为空"}
        ],
      },
      formLabelWidth: '120px',
      cur_page: 1,
      propertyList: [
        {
          id: 1,
          name: "钻石",
          descriptions: "钻石",
          cost:0.00001
        },
        {
          id: 2,
          name: "金币",
          descriptions: "金币主要用于英雄升级和装备强化",
          cost:0.01
        }
      ]
    };
  },
   created() {
    this.getpropertyList();
  },
  computed: {},
   methods: {
     // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getpropertyList();
    },
     getpropertyList() {
      dataGet("/getList?size=20&page="+this.cur_page+"&"+this.propertySelect+"=" + this.propertySearch,{ },(data, all) => {
        this.propertyList = data.List;  
        // console.log(this.propertyList)
      });
      
    },
    search() {
      this.getpropertyList();
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
      });
    }
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
      position: relative;
      margin-bottom: 15px;
      display: inline-block;
      margin: 0 10px;
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