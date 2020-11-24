<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// import resize from './mixins/resize'
// require('echarts/theme/macarons') // echarts theme
export default {
  
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    chartTitle: {
      type: String,
      default: ''
    },
    chartUnit:{
      type: String,
      default: ''
    },
    chartType: { //1：7天，2：14天，3：30天
      type: String,
      default: '1'
    },
    chartTitles:['次日留存', '五日留存','七日留存','十四日留存','三十日留存'],
    chartColors:["#2d8cf0","#19be6b","#ff9900","#E46CBB","#9A66E4","#ed3f14"],
  },
  data() {
    return {
      chart: null,
      xAxisData:[]
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          top: 20,
          text: this.chartTitle,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 22,
            // color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
         legend: {
          top: 40,
          icon: 'rect',
          itemWidth: 20,
          itemHeight: 14,
          itemGap: 15,
          data: this.chartTitles,
          left: '10%',
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: (()=>{
            var num ;
            if (this.chartType ==1) {
                num = 7;
            }else if (this.chartType ==2) {
                num = 14;
            }else if (this.chartType ==3) {
                num = 30;
            }
            var sevenDates = [],
                timeInterval= 1000 * 60 * 60 * 24,
                DaysAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * num ,
                nowDay = new Date();
            for (var i=0;i< num ;i++){ 
              var t_date = new Date(DaysAgo + timeInterval *i);
                  sevenDates.push([(t_date.getMonth()<9) ? '0'+ (t_date.getMonth()+1) : (t_date.getMonth()+1), (t_date.getDate()<10) ? '0'+t_date.getDate() : t_date.getDate()].join('/'));
              }       
              return sevenDates;
      })()
        }],
        yAxis: [{
          type: 'value',
          name: '',
          axisTick: {
            show: false
          }
        }],
        series: [
         {
          name: '次日留存', 
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
           areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: this.chartData.nextStay
        },
        {
          name: '五日留存',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
           areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(49, 154, 255, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(49, 154, 255, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(49, 154, 255)',
              borderColor: 'rgba(49, 154, 255,0.2)',
              borderWidth: 12
            }
          },
          data: this.chartData.fiveStay
        },
        
        {
          name: '七日留存',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
           areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(154, 102, 228, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(154, 102, 228, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(154, 102, 228)',
              borderColor: 'rgba(154, 102, 228,0.2)',
              borderWidth: 12
            }
          },
          data: this.chartData.sevenStay
        },
        {
          name: '十四日留存',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
           areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(25, 190, 107, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(25, 190, 107, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(25, 190, 107)',
              borderColor: 'rgba(25, 190, 107,0.2)',
              borderWidth: 12
            }
          },
          data: this.chartData.fourteenStay
        },
        {
          name: '三十日留存',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 2
            }
          },
           areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 153, 0, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(255, 153, 0, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(255, 153, 0)',
              borderColor: 'rgba(255, 153, 0,0.2)',
              borderWidth: 12
            }
          },
          data: this.chartData.thirtyStay
        },
         ]
      })
    },
    
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        console.log(val)
        this.setOptions(val)
      }
    }
  }
}
</script>
