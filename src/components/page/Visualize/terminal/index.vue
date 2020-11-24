<template>
  <div class="content">
    <div class="crumbs">终端统计</div>
    <div class="container">
      <div class="rolequery-box mt20">
        <div class="demo-input-suffix">
          渠道筛选：
          <el-radio-group v-model="canalList" @change="canalChange">
            <el-radio v-for="item in canalOptions" :key="item" :label="item.label" :value="item.value"></el-radio>
          </el-radio-group> 
        </div>
      </div>
      <div class="rolequery-box mt20">
        <div class="demo-input-suffix ">
           用户类型：
          <el-select v-model="customerType" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
      </div>
      <div class="rolequery-box mt20">
        <div class="demo-input-suffix ">
           时间范围：
          <el-date-picker v-model="searchTime" align="right" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
          
        </div>
         <div class="demo-input-suffix">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
         </div>
      </div>
      
      <el-table :data="dataList" border class="table" ref="multipleTable">
        <el-table-column prop="name" label="机型" sortable></el-table-column>
        <el-table-column prop="num" label="人数" ></el-table-column>
        <el-table-column prop="road" label="分辨率"></el-table-column>
        <el-table-column prop="date" label="人数"  ></el-table-column>
        <el-table-column prop="date" label="操作系统"  ></el-table-column>
        <el-table-column prop="date" label="人数"  ></el-table-column>
        <el-table-column prop="date" label="联网方式"  ></el-table-column>
        <el-table-column prop="date" label="人数"  ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
//根据实际路径引入刚才封装的js文件
import { dataGet, dataPost, dataDelete, dataPostXD } from "@/api/api.js";
export default {
  data: function() {
    return {
      canalOptions:[
        {label:'全部渠道',value:""},
        {label:'taptap',value:"taptap"},
        {label:'小米',value:"xiaomi"},
        {label:'华为',value:"huawei"},
        {label:'好游快爆',value:"haoyoukuaibao"},
      ],
      pickerOptions: {
         shortcuts: [
           {
            text: '今日',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
              picker.$emit('pick', [start, end]);
            }
          },
           {
            text: '昨日',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近十四天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        options: [{
          value: '1',
          label: '新增用户'
        }, {
          value: '2',
          label: '活跃用户'
        }, {
          value: '3',
          label: '付费用户'
        }],
      customerType: '',
      canalList: "",//渠道id,
      searchTime:"",
      rolequerySearch: "",
      cur_page: 1,
      dataList: [],
      
    };
  },
  created() {
    // this.getrolequeryList();
  },
  components: {countTo },
   computed: {
     leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    }
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
    .content-con {
    width: 100%;
    height: 100%;
    position: relative;
    .left-area {
      float: left;
      height: 100%;
      display: table;
      text-align: center;
      .iconfont {
        display: table-cell;
        font-size: 36px;
        color: #fff;
        vertical-align: middle;
      }
    }
    .right-area {
      float: left;
      height: 100%;
      display: table;
      text-align: center;
      background: #fff;
      .content-outer{
        font-size: 50px;
      }
    }
  }
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