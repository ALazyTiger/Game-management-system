<template>
  <div class="content">
    <div class="crumbs">
      排行榜查询<div class="tips"><span></span></div>
    </div>
    <div class="container">
      <div class="rolequery-box">
        <div class="demo-input-suffix">
          <span>区服：</span>
          <el-select v-model="select_cate" placeholder="筛选区服" class="handle-select mr10">
            <el-option
              v-for="item in ServiceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="demo-input-suffix">
          <span>类型：</span>
            <el-select v-model="rolequerySelect"  slot="prepend" class="rolequery-select" placeholder="请选择">
                <el-option  v-for="item in rolequeryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
      </div>
      <el-table :data="rolequeryList" border class="table" ref="multipleTable">
        <el-table-column prop="id" label="角色ID" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="昵称" width="320"></el-table-column>
        <el-table-column prop="name" label="排名" width="200"></el-table-column>
        <el-table-column prop="name" label="等级" width="200"></el-table-column>
        <el-table-column prop="name" label="战力" width="200"></el-table-column>
        <el-table-column prop="date" label="时间" ></el-table-column>
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
      ServiceOptions: [
        {
          value: 1,
          label: "盖亚大陆"
        },
        {
          value: 2,
          label: "冰雪魔窟"
        },
        {
          value: 3,
          label: "狂野沙漠"
        }
      ],
      select_cate: "",
      rolequeryOptions: [
        {
          value: "1",
          label: "等级"
        },
        {
          value: "2",
          label: "战力"
        },
        {
          value: "3",
          label: "竞技场"
        },
        {
          value: "4",
          label: "公会"
        },
        {
          value: "5",
          label: "星耀试炼"
        },
        {
          value: "6",
          label: "围剿魔物"
        }
      ],
      rolequerySelect: "1",
      rolequerySearch: "",
      cur_page: 1,
      rolequeryList: [],
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
    search() {
      this.getrolequeryList();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      // width: 800px;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
    .rolequery-select {
      width: 100px;
    }
    .handle-input {
      width: 300px;
    }
    .input-with-select {
      width: 508px;
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