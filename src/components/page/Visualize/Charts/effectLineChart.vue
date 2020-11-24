<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
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
      type: Array ,
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
  },
  data() {
    return {
      chart: null,
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
        grid: {
          top: 100,
          left: '3%',
          right: '3%',
          bottom: '3%',
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
          name: this.chartUnit,
          axisTick: {
            show: false
          }
        }],
        series: [
          
         {
          name: this.chartTitle, 
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
          data: this.chartData
        },
        

        ]
      })
    },
    
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  }
}
</script>
