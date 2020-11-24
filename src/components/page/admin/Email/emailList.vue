<template>
  <div class="content">
    <div class="crumbs">邮件记录<div class="tips"><span></span></div></div>
    <div class="container">
      <el-table :data="EmailList" border class="table" ref="multipleTable">
        <el-table-column prop="emailtype" label="邮件类型"></el-table-column>
        <el-table-column prop="date" label="发送时间" sortable> </el-table-column>
        <el-table-column prop="titil" label="邮件标题"> </el-table-column>
        <el-table-column prop="operator"  label="操作人员" ></el-table-column>
        <el-table-column   label="邮件详情">
          <template slot-scope="scope">
            <el-button  @click="showEmail(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </div>
    <el-dialog title="邮件详情" center :visible.sync="dialogFormVisible" width="58%">
      <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="邮件属性：">
            <span>{{form.resource}}</span>
          </el-form-item>
          <el-form-item label="玩家ID或名字：">
            <el-input v-model="form.player" placeholder="输入玩家ID或名字" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮件标题：">
            <el-input v-model="form.region" placeholder="输入邮件标题" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮件内容：">
            <el-input type="textarea" v-model="form.desc" placeholder="输入邮件内容" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮件发送时间：">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date" disabled></el-date-picker>
            <span>输入时间代表到达指定时间系统自动发送，不输入时间代表立即发送</span>
          </el-form-item>
          <el-form-item label="道具：">
            <div class="deliveryList">
              <el-select v-model="form.deliveryOne" filterable placeholder="请选择" disabled>
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryOneNum"  disabled ></el-input-number>
            </div>
            <div class="deliveryList">
              <el-select v-model="form.deliveryTwo"  filterable placeholder="请选择" disabled>
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryTwoNum"  disabled ></el-input-number>
            </div>
            <div class="deliveryList">
              <el-select v-model="form.deliveryThree"  filterable placeholder="请选择" disabled>
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value" disabled></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryThreeNum"  disabled ></el-input-number>
            </div>
            <div class="deliveryList">
              <el-select v-model="form.deliveryFour"  filterable placeholder="请选择" disabled>
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryFourNum"  disabled ></el-input-number>
            </div>
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
      EmailList: [
        {
          "emailtype":"玩家邮件",
          "date":"20200914 10:09",
          "titil": "玩家补偿",//邮件标题
          "operator":"账号id"
        }
      ],
      dialogFormVisible: false,
      deliveryOptions:[
        {
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      form: {
        "resource": "官方",
        "player": "",
        "region": "",
        "desc": "",
        "date": "",
        "deliveryOne": "",
        "deliveryOneNum":1,
        "deliveryTwo": "",
        "deliveryTwoNum":1,
        "deliveryThree": "",
        "deliveryThreeNum":1,
        "deliveryFour": "",
        "deliveryFourNum":1,
      }
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
        // this.rolequeryList = data.List;  
        // console.log(this.rolequeryList)
      });
    },
    showEmail() {
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
    
  }
}
</style>