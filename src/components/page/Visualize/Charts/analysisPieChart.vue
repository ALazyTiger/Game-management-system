<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '420px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartTitle: {
      type: String,
      default: ''
    },
    chartUnit:{
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
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
      var colors=['#393939','#f5b031','#fad797','#59ccf7','#c3b4df'];  
      this.chart.setOption({
        title: {
          top: 5,
          text: this.chartTitle,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 22,
          },
          left: 'center',
        },
         tooltip: {
          trigger: 'item',
          formatter: `{a} <br/>{b}: {c}  ${this.chartUnit}`
          // formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        color:['#FF0000','#ff3f40','#ff7f40','#ffbf41','#ffff01','#bfc041','#00be40','#008081','#0000fe','#4100c0','#81007f','#be0040'],
        legend: {
        orient: 'vertical',
        left: 0,
        data: (()=>{ 
          var legendsList = [];    
          for(var i = 0;i<this.chartData.length;i++){
            legendsList.push(this.chartData[i].name)
          }
           return legendsList;
        })()
    },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['30%', '60%'],
                // radius: ['16%', '68%'],
                // roseType: 'radius',
                label: {
                    formatter: `{b|{b}：}{c}  ${this.chartUnit}`,
                    backgroundColor: '#334455',
                    color: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    padding: [0, 7],
                    rich: {
                        
                        hr: {
                            borderColor: '#334455',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 14,
                            lineHeight: 33,
                            color: '#eee',
                        },
                        c: {
                            fontSize: 18,
                            lineHeight: 33,

                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                },
                data: this.chartData
            }
        ]
      })
    }
  }
}
</script>
