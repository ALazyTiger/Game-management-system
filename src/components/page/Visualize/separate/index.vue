<template>
  <div class="content">
    <div class="crumbs">分服数据</div>
    <div class="container">
      <div class="rolequery-box mt20">
        <div class="demo-input-suffix">
          渠道筛选：
          <el-radio-group v-model="canalList" @change="canalChange">
            <el-radio v-for="item in canalOptions" :key="item.label" :label="item.label" :value="item.value"></el-radio>
          </el-radio-group> 
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
        <el-table-column prop="name" label="服务器" sortable></el-table-column>
        <el-table-column prop="num" label="设备新增" ></el-table-column>
        <el-table-column prop="road" label="账号新增"></el-table-column>
        <el-table-column prop="date" label="转化率%"  ></el-table-column>
        <el-table-column prop="date" label="新增付费人数"  ></el-table-column>
        <el-table-column prop="date" label="新增付费率%"  ></el-table-column>
        <el-table-column prop="date" label="新增付费金额"  ></el-table-column>
        <el-table-column prop="date" label="活跃人数"  ></el-table-column>
        <el-table-column prop="date" label="付费人数"  ></el-table-column>
        <el-table-column prop="date" label="付费率%"  ></el-table-column>
        <el-table-column prop="date" label="付费金额"  ></el-table-column>
        <el-table-column prop="date" label="Arpu"  ></el-table-column>
        <el-table-column prop="date" label="Arppu"  ></el-table-column>
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
      inforCardData: [
        { title: '新增用户', icon: 'person-add', count: 0, color: '#2d8cf0' },
        { title: '当前在线人数', icon: 'locate', count: 0, color: '#19be6b' },
        { title: '当前在线用户总时长', icon: 'map', count: 0, color: '#e46cbb' },
        { title: '当前登录用户人次', icon: 'chatbubbles', count: 0, color: '#9a66e4' },
      ],
      left:36,
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
      canalList: "taptap",//渠道id,
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