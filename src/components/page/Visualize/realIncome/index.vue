<template>
  <div class="content">
    <div class="crumbs">实际收入</div>
    <div class="container">
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          <el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="内部订单号" value="1"></el-option>
              <el-option label="渠道订单号" value="2"></el-option>
              <el-option label="用户ID" value="3"></el-option>
            </el-select>
          </el-input>
        </div>
      </div>
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          注册渠道：
           <el-radio-group v-model="canalList" @change="canalChange">
            <el-radio v-for="item in canalOptions" :key="item.label" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group> 
        </div>
      </div>
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          支付方式：
          <el-radio-group v-model="payList" @change="canalChange">
            <el-radio v-for="item in payOptions" :key="item.label" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group> 
        </div>
      </div>
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          购买类型：
          <el-radio-group v-model="payType" @change="canalChange">
            <el-radio v-for="item in payTypeOptions" :key="item.label" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group> 
        </div>
      </div>
      <div class="rolequery-box">
        <div class="demo-input-suffix ">
          购买时间：
          <el-date-picker v-model="searchTime" align="right" type="date" placeholder="开始日期" end-placeholder="结束日期" >
          </el-date-picker>
        </div>
         <div class="demo-input-suffix">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
         </div>
      </div>
      <el-table :data="dataList" border class="table" ref="multipleTable">
        <el-table-column prop="name" label="内部订单号" sortable></el-table-column>
        <el-table-column prop="num" label="渠道订单号" ></el-table-column>
        <el-table-column prop="num" label="用户ID" ></el-table-column>
        <el-table-column prop="num" label="用户昵称" ></el-table-column>
        <el-table-column prop="num" label="注册渠道" ></el-table-column>
        <el-table-column prop="num" label="支付方式" ></el-table-column>
        <el-table-column prop="num" label="购买类型" ></el-table-column>
        <el-table-column prop="num" label="购买金额" ></el-table-column>
        <el-table-column prop="num" label="购买时间" ></el-table-column>
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
      select: '1',
      input2:'',
      canalOptions:[
        {label:'taptap',value:"taptap"},
        {label:'小米',value:"xiaomi"},
        {label:'华为',value:"huawei"},
        {label:'好游快爆',value:"haoyoukuaibao"},
      ],
      payOptions:[
        {label:'支付宝',value:"1"},
        {label:'微信支付',value:"2"},
      ],
      payTypeOptions:[
        {label:'钻石',value:"1"},
        {label:'水晶',value:"2"},
      ],
      canalList: "xiaomi",
      payList: "1",
      payType:"2",
      searchTime:"",
      rolequerySearch: "",
      cur_page: 1,
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
      .input-with-select{
        width: 380px;
      }
      .el-select {
        width: 130px;
      }
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style>