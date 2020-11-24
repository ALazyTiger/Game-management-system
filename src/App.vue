<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">

    @import "./assets/css/base.scss";
    html{
        height: 100%;
    }
    body{
        height: 100%;
        overflow: hidden;
    }
    #app {
        height: 100%;
            overflow: hidden;
    }

    .menu .svg-icon {
        font-size: 20px;
        margin-right: 5px;
    }
    
    .el-form .el-form-item__label{
      position: relative;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 10px 0 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .el-form .is-required{
      position: relative;
      padding: 0 0 0 10px;
    
    }
    .el-form .is-required:before{
      content: '*';
      color: #F56C6C;
      margin-right: 0px;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      line-height: 40px;
    }
   .el-form .is-required:after{
      content: ':';
      color: #606266;
      margin-left: 0px;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      line-height: 40px;
    }
    .el-form-item.is-required:not(.is-no-asterisk) 
    .el-form-item__label-wrap>.el-form-item__label:before, 
    .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
    content: '';
    color: #F56C6C;
    margin-right: 0px;
}
</style>
