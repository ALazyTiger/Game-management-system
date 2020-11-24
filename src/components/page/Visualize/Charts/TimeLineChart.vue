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
    chartDate: { 
      type: Date,
      default: ""
    },
    chartColors:["#2d8cf0","#19be6b","#ff9900","#E46CBB","#9A66E4","#ed3f14"],
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
      console.log(this.chartData)
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
            var DatesList = [],
                timeInterval= 1000 * 60 * 60 * 2,
                startDate = new Date(this.chartDate.toLocaleDateString()).getTime(),
                endDate = new Date(this.chartDate.toLocaleDateString()).getTime()+24*60*60*1000-1;
            for (var i=0;i< 13 ;i++){ 
              var t_date =new Date(startDate + timeInterval * i)
              if(new Date(startDate + timeInterval * i).getTime() > endDate) t_date = new Date(new Date(startDate + timeInterval * i).getTime()-1);
                 DatesList.push([(t_date.getHours()<9) ? '0'+ (t_date.getHours()) : (t_date.getHours()), (t_date.getMinutes()<10) ? '0'+t_date.getMinutes() : t_date.getMinutes()].join(':'));
                
                // var getFullYear = t_date.getFullYear(),
                //     getMonth    = (t_date.getMonth()<10) ? '0'+ (t_date.getMonth()+1) : (t_date.getMonth()+1),
                //     getDay      = (t_date.getDay()<10) ? '0'+t_date.getDay() : t_date.getDay(),
                //     getHours    = (t_date.getHours()<10) ? '0'+ (t_date.getHours()) : (t_date.getHours()),
                //     getMinutes  = (t_date.getMinutes()<10) ? '0'+t_date.getMinutes() : t_date.getMinutes();

                // // DatesList.push(getFullYear+'/'+ getMonth +'/'+ getDay+'\n'+ getHours +':'+ getMinutes)
                // DatesList.push(getMonth +'/'+ getDay+' '+ getHours +':'+ getMinutes)
              }       
              return DatesList;
      })()
        }],
         yAxis: [{
          type: 'value',
          name: `(${this.chartUnit})`,
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
