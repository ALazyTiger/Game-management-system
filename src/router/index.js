import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/components/page/common/Home.vue'], resolve)//主页
const login = resolve => require(['@/components/page/Login/index'], resolve)//登录
const Readme = resolve => require(['@/components/page/readme/index.vue'], resolve)//欢迎页面
const error401 = resolve => require(['@/components/page/error/401.vue'], resolve)//401
const error403 = resolve => require(['@/components/page/error/403.vue'], resolve)//403
const error404 = resolve => require(['@/components/page/error/404.vue'], resolve)//404
const error500 = resolve => require(['@/components/page/error/500.vue'], resolve)//500

const rolePermission = resolve => require(['@/components/page/Permission/role.vue'], resolve)//权限管理
const account = resolve => require(['@/components/page/Permission/account.vue'], resolve)//角色管理

const property = resolve => require(['@/components/page/admin/property/index.vue'], resolve)//道具列表
const rolequery = resolve => require(['@/components/page/admin/Role/query.vue'], resolve)//角色信息查询
const forbiddenList = resolve => require(['@/components/page/admin/Role/forbiddenList.vue'], resolve)//封禁记录
const editCoin = resolve => require(['@/components/page/admin/Role/editCoin.vue'], resolve)//修改角色主要货币
const editCoinList = resolve => require(['@/components/page/admin/Role/editCoinList.vue'], resolve)//角色货币修改记录

const userEmail = resolve => require(['@/components/page/admin/Email/userEmail.vue'], resolve)//玩家邮件
const emailList = resolve => require(['@/components/page/admin/Email/emailList.vue'], resolve)//邮件列表
const serverEmail = resolve => require(['@/components/page/admin/Email/serverEmail.vue'], resolve)//全服邮件
//公告管理
const PublishHorse = resolve => require(['@/components/page/admin/Notice/PublishHorse.vue'], resolve)//发布跑马灯
const PublishNotice = resolve => require(['@/components/page/admin/Notice/PublishNotice.vue'], resolve)//发布公告
const HorseList = resolve => require(['@/components/page/admin/Notice/HorseList.vue'], resolve)//跑马灯列表
const NoticeList = resolve => require(['@/components/page/admin/Notice/NoticeList.vue'], resolve)//公告列表
// 流水管理
const propertyList = resolve => require(['@/components/page/admin/Definite/property.vue'], resolve)//道具流水查询
const CoinList = resolve => require(['@/components/page/admin/Definite/CoinList.vue'], resolve)//金币流水查询
const DiamondsList = resolve => require(['@/components/page/admin/Definite/DiamondsList.vue'], resolve)//钻石流水查询
const Crystal = resolve => require(['@/components/page/admin/Definite/Crystal.vue'], resolve)//水晶流水流水查询
const goodsList = resolve => require(['@/components/page/admin/Definite/goodsList.vue'], resolve)//角色物品查询
//发放补偿
const makeUp = resolve => require(['@/components/page/admin/Recharge/makeUp.vue'], resolve)//发放充值补偿
const makeUpList = resolve => require(['@/components/page/admin/Recharge/makeUpList.vue'], resolve)//充值补偿记录
/**
 * 运营部分
 */
const overview = resolve => require(['@/components/page/Visualize/overview/index.vue'], resolve)//数据总览
const realTime = resolve => require(['@/components/page/Visualize/realTime/index.vue'], resolve)//实时数据
const daily = resolve => require(['@/components/page/Visualize/daily/index.vue'], resolve)//日报
const separate = resolve => require(['@/components/page/Visualize/separate/index.vue'], resolve)//分服数据
const terminal = resolve => require(['@/components/page/Visualize/terminal/index.vue'], resolve)//终端统计
const increase = resolve => require(['@/components/page/Visualize/increase/index.vue'], resolve)//滚服新增
const lively = resolve => require(['@/components/page/Visualize/lively/index.vue'], resolve)//滚服新增
const scatter = resolve => require(['@/components/page/Visualize/scatter/index.vue'], resolve)//活跃用户等级分布
const interval = resolve => require(['@/components/page/Visualize/interval/index.vue'], resolve)//活跃时段分布
const dailyLoss = resolve => require(['@/components/page/Visualize/dailyLoss/index.vue'], resolve)//每日流失
const lossAnalysis = resolve => require(['@/components/page/Visualize/lossAnalysis/index.vue'], resolve)//流失等级分析
const paymentLoss = resolve => require(['@/components/page/Visualize/paymentLoss/index.vue'], resolve)//流失付费分析
const tracking = resolve => require(['@/components/page/Visualize/tracking/index.vue'], resolve)//付费用户追踪
const payment = resolve => require(['@/components/page/Visualize/payment/index.vue'], resolve)//单笔付费分析
const preferences = resolve => require(['@/components/page/Visualize/preferences/index.vue'], resolve)//付费购买喜好
const incomeRatio = resolve => require(['@/components/page/Visualize/incomeRatio/index.vue'], resolve)//注收比
const worth = resolve => require(['@/components/page/Visualize/worth/index.vue'], resolve)//用户生命周期价值
const whale = resolve => require(['@/components/page/Visualize/whale/index.vue'], resolve)//鲸鱼用户（Top100）
const realIncome = resolve => require(['@/components/page/Visualize/realIncome/index.vue'], resolve)//实际收入

Vue.use(Router)

export default new Router({
  // mode: 'history',//（使用history模式）
  routes: [
    {
      path: '/',
      component: login,
      redirect: '/login',
    },
    {
      path: '/login',
      name: '登录',
      component: login,
    },
    {
      path: '/readme',
      component: Home,
      children: [
        {
          path: '/',
          name: '关于我们',
          component: Readme
        },
        {
          path: '/401',
          name: '401',
          component: error401
        },
        {
          path: '/403',
          name: '403',
          component: error403
        },
        {
          path: '/404',
          name: '404',
          component: error404
        },
        {
          path: '/500',
          name: '系统出现未知错误',
          component: error500
        },
        {
          path: '/rolePermission',
          name: '权限管理',
          component: rolePermission
        },
        {
          path: '/account',
          name: '角色管理',
          component: account
        },
        {
          path: '/property',
          name: '道具列表',
          component: property
        },
        {
          path: '/rolequery',
          name: '角色信息查询',
          component: rolequery
        },
        {
          path: '/forbiddenList',
          name: '封号禁言',
          component: forbiddenList
        },
        {
          path: '/editCoin',
          name: '修改角色货币',
          component: editCoin
        },
        {
          path: '/editCoinList',
          name: '角色货币修改记录',
          component: editCoinList
        },
        {
          path: '/userEmail',
          name: '玩家邮件',
          component: userEmail
        },
        {
          path: '/serverEmail',
          name: '全服邮件',
          component: serverEmail
        },
        {
          path: '/emailList',
          name: '邮件列表',
          component: emailList
        },
        {
          path: '/PublishHorse',
          name: '发布跑马灯',
          component: PublishHorse
        },
        {
          path: '/HorseList',
          name: '跑马灯列表',
          component: HorseList,
          meta: {
            hideInMenu: false,
            notCache: true
          },
        },
        {
          path: '/PublishNotice',
          name: '发布公告',
          component: PublishNotice
        },
        {
          path: '/notice/:id',
          name: '编辑公告',
          component: PublishNotice
        },
        {
          path: '/NoticeList',
          name: '公告列表',
          component: NoticeList,
          meta: {
            hideInMenu: true,
            notCache: true
          },
        },
        {
          path: '/CoinList',
          name: '金币流水',
          component: CoinList
        },
        {
          path: '/DiamondsList',
          name: '钻石流水',
          component: DiamondsList
        },
        {
          path: '/Crystal',
          name: '水晶流水',
          component: Crystal
        },
        {
          path: '/propertyList',
          name: '道具流水',
          component: propertyList
        },
        {
          path: '/goodsList',
          name: '固定道具流水',
          component: goodsList
        },
        {
          path: '/makeUp',
          name: '发放充值补偿',
          component: makeUp
        },
        {
          path: '/makeUpList',
          name: '充值补偿记录',
          component: makeUpList
        },
        {
          path: '/overview',
          name: '数据总览',
          component: overview
        },
        {
          path: '/realTime',
          name: '实时数据',
          component: realTime
        },
        {
          path: '/daily',
          name: '日报',
          component: daily
        },
        {
          path: '/separate',
          name: '分服数据',
          component: separate
        },
        {
          path: '/terminal',
          name: '终端统计',
          component: terminal
        },
        {
          path: '/increase',
          name: '滚服新增',
          component: increase
        },
        {
          path: '/lively',
          name: '活跃数据',
          component: lively
        },
        {
          path: '/scatter',
          name: '活跃用户等级分布',
          component: scatter
        },
        {
          path: '/interval',
          name: '活跃时段分布',
          component: interval
        },
        {
          path: '/dailyLoss',
          name: '每日流失',
          component: dailyLoss
        },
        {
          path: '/lossAnalysis',
          name: '流失等级分析',
          component: lossAnalysis
        },
        {
          path: '/paymentLoss',
          name: '流失付费分析',
          component: paymentLoss
        },
        {
          path: '/tracking',
          name: '付费用户追踪',
          component: tracking
        },
        {
          path: '/payment',
          name: '单笔付费分析',
          component: payment
        },
        {
          path: '/preferences',
          name: '付费购买喜好',
          component: preferences
        },
        {
          path: '/incomeRatio',
          name: '注收比',
          component: incomeRatio
        },
        {
          path: '/worth',
          name: '用户生命周期价值',
          component: worth
        },
        {
          path: '/whale',
          name: '鲸鱼用户（Top100）',
          component: whale
        },
        {
          path: '/realIncome',
          name: '实际收入',
          component: realIncome
        }
        
      ]
    },
    
    {
      path: "*", // 此处需特别注意置于最底部
      redirect: "/404" //无匹配到的路径自动重定向到404页面
    }
  ]
})
