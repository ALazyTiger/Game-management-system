<template>
  <div class="content">
    <div class="crumbs">道具流水查询</div>
    <div class="container">
      
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          <el-date-picker v-model="searchTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
        <div class="demo-input-suffix ">
          <el-input placeholder="请输入玩家ID或名字" v-model="rolequerySearch" class="input-with-select">
          </el-input>
        </div>
        <div class="demo-input-suffix ">
          <el-input placeholder="请输入道具名或ID" v-model="rolequerySearch" class="input-with-select">
             <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
        </div>
        
         <div class="demo-input-suffix">
            <el-button type="primary">导出表格<i class="el-icon-upload el-icon--right"></i></el-button>
         </div>
      </div>
      
      <el-table :data="PropertyList" border class="table" ref="multipleTable">
        <el-table-column prop="name" label="玩家昵称"></el-table-column>
        <el-table-column prop="propertyName" label="道具名"></el-table-column>
        <el-table-column prop="num" label="数量" ></el-table-column>
        <el-table-column prop="road" label="途径"></el-table-column>
        <el-table-column prop="date" label="变更时间" sortable ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="100"
        ></el-pagination>
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
      searchTime:"",
      rolequerySearch: "",
      cur_page: 1,
      PropertyList: [
        {
          "name":'测试1号',
          "propertyName":"经验瓶",
          "num":"+300",
          "road":"消费金币购买",
          "date":"2020.10.10 9:30",
        },
        {
          "name":'测试1号',
          "propertyName":"升星石",
          "num":"-300",
          "road":"升星消耗",
          "date":"2020.10.10 9:30",
        },
        {
          "name":'测试1号',
          "propertyName":"英雄1",
          "num":"+1",
          "road":"抽卡获得",
          "date":"2020.10.10 9:30",
        }
      ],
      
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
          this.propertyList = data.List;
          // console.log(this.rolequeryList)
        }
      );
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
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style>