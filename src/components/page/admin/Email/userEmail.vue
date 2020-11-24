<template>
  <div class="content">
    <div class="crumbs">玩家邮件<div class="tips"><span></span></div></div>
    <div class="container">
      <div class="roleId-box">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="邮件属性：">
            <span>{{form.resource}}</span>
          </el-form-item>
          <el-form-item label="玩家ID或名字：">
            <el-input v-model="form.player" placeholder="输入玩家ID或名字"></el-input>
          </el-form-item>
          <el-form-item label="邮件标题：">
            <el-input v-model="form.region" placeholder="输入邮件标题"></el-input>
          </el-form-item>
          <el-form-item label="邮件内容：">
            <el-input type="textarea" v-model="form.desc" placeholder="输入邮件内容"></el-input>
          </el-form-item>
          <el-form-item label="邮件发送时间：">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.date"></el-date-picker>
            <span>输入时间代表到达指定时间系统自动发送，不输入时间代表立即发送</span>
          </el-form-item>
          <el-form-item label="道具：">
            <div class="deliveryList">
              <el-select v-model="form.deliveryOne" filterable placeholder="请选择" >
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryOneNum" @change="handleChange" :min="1" ></el-input-number>
            </div>
            <div class="deliveryList">
              <el-select v-model="form.deliveryTwo"  filterable placeholder="请选择" >
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryTwoNum" @change="handleChange" :min="1" ></el-input-number>
            </div>
            <div class="deliveryList">
              <el-select v-model="form.deliveryThree"  filterable placeholder="请选择" >
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryThreeNum" @change="handleChange" :min="1" ></el-input-number>
            </div>
            <div class="deliveryList">
              <el-select v-model="form.deliveryFour"  filterable placeholder="请选择" >
                <el-option v-for="item in deliveryOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="ml10 mr10">道具数量：</span>
              <el-input-number v-model="form.deliveryFourNum" @change="handleChange" :min="1" ></el-input-number>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发送</el-button>
          </el-form-item>
        </el-form>
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
      
      select_cate: "",
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
  created() {},
  computed: {},
  mounted() {
    },
  methods: {
     
     handleChange(value) {
        console.log(value);
    },
      handleSelect(item) {
        console.log(item);
      },
    onSubmit() {
      console.log("submit!");
    },
    Addexperience() {
      dataGet(
        "/getRole??Service=" + this.select_cate + "&roleId=" + this.roleId,
        {},
        (data, all) => {
          this.roleName = data.roleName;
          // console.log(this.rolequeryList)
        }
      );
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
    .roleId-box {
      margin-bottom: 20px;
    }
    .demo-input-suffix {
      margin-right: 15px;
      margin-bottom: 15px;
      display: inline-block;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
    }
    .deliveryList {
      margin-bottom: 15px ;
    }
    
  }
}
</style>