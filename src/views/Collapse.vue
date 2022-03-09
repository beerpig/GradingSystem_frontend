<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
		  <span style="font-size: 26px">score : </span>
		  <span style="font-size: 54px; color: red; font-weight: bold">{{dic}}</span>
        <!-- <span v-for="item in dic.SCORE" style="font-size: 36px; color: red">
          {{ item }}
        </span> -->
      </el-collapse-item>
    </el-collapse>
	<div style="text-align: left; margin-left: 0px"> 评分画像</div>
    <div id="word-img">
      <el-image :src="'data:image/png;base64,' + pic" :fit="fit">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("collapse receive:" + this.dic);
  },
  data() {
    return {
      activeNames: ["1"],
    //   dic: this.$route.params.responses.data.msg,
	// dic: this.$store.state.toCollapseData,
	dic: '',
    // pic: this.$route.params.responses.data.wordcloud,
	pic: ''
	// dic :{
	// 	SCORE: {
	// 		AI: 86.0,
	// 		TRUES: 78,
	// 		BIAS: 8.0
	// 	},
	// 	FILES: [
	// 		{
	// 			NAME: "互联网+商业计划书 初赛",
	// 			LABELS: {
	// 				__label__ACADEMIC: {
	// 					items: [
	// 						"研究员",
	// 						"教授",
	// 						"知名人士",
	// 						"研究生",
	// 						"副教授",
	// 						"专业人士",
	// 						"副校长",
	// 						"学院",
	// 						"大学",
	// 						"博士",
	// 						"讲师"
	// 					],
	// 					score: 1
	// 				},
	// 				__label__INDUSTRIAL: {
	// 					items: [
	// 						"业界"
	// 					],
	// 					score: 1
	// 				},
	// 				__label__BUSINESS: {
	// 					items: [
	// 						"预测",
	// 						"现状",
	// 						"前景",
	// 						"市场潜力",
	// 						"工业",
	// 						"营业额",
	// 						"市场前景",
	// 						"分析",
	// 						"营收",
	// 						"产业",
	// 						"前瞻性",
	// 						"销售额",
	// 						"发展潜力",
	// 						"规模",
	// 						"净利润"
	// 					],
	// 					score: 1
	// 				},
	// 				__label__INVESTMENT: {
	// 					items: [
	// 						"资源整合",
	// 						"资金",
	// 						"投资",
	// 						"融资",
	// 						"合作意向",
	// 						"投融资"
	// 					],
	// 					score: 1
	// 				},
	// 				__label__PATENTS: {
	// 					items: [
	// 						"知识产权",
	// 						"专利",
	// 						"专利申请",
	// 						"一等奖",
	// 						"发明人"
	// 					],
	// 					score: 1
	// 				}
	// 			},
	// 			ENTITYS: [
	// 				{
	// 					name: "南京航空航天大学",
	// 					score: 1.25
	// 				},
	// 				{
	// 					name: "董事长",
	// 					score: 2
	// 				},
	// 				{
	// 					name: "上海大学",
	// 					score: 1.25
	// 				},
	// 				{
	// 					name: "校长",
	// 					score: 2
	// 				},
	// 				{
	// 					name: "上海外国语大学",
	// 					score: 1.25
	// 				},
	// 				{
	// 					name: "教授",
	// 					score: 1.5
	// 				},
	// 				{
	// 					name: "北京航空航天大学",
	// 					score: 1.5
	// 				},
	// 				{
	// 					name: "副教授",
	// 					score: 1.25
	// 				},
	// 				{
	// 					name: "西北工业大学",
	// 					score: 1.5
	// 				},
	// 				{
	// 					name: "专利",
	// 					score: 1.5
	// 				},
	// 				{
	// 					name: "一等奖",
	// 					score: 2
	// 				}
	// 			]
	// 		},
	// 		{
	// 			NAME: "备赛报名表Application form 青空计划",
	// 			LABELS: {
	// 				__label__ACADEMIC: {
	// 					items: [],
	// 					score: 0
	// 				},
	// 				__label__INDUSTRIAL: {
	// 					items: [],
	// 					score: 0
	// 				},
	// 				__label__BUSINESS: {
	// 					items: [
	// 						"产业"
	// 					],
	// 					score: 1
	// 				},
	// 				__label__INVESTMENT: {
	// 					items: [],
	// 					score: 0
	// 				},
	// 				__label__PATENTS: {
	// 					items: [
	// 						"一等奖"
	// 					],
	// 					score: 1
	// 				}
	// 			},
	// 			ENTITYS: [
	// 				{
	// 					name: "一等奖",
	// 					score: 2
	// 				}
	// 			]
	// 		}
	// 	]
	// },
    //   dic :{
    //   	'SCORE': {'AI': 86.0}
    //     }
    };
  },
  mounted() {
	//   var _this = this;
    // _this.dic = this.$store.state.toCollapseData;
  },
  created() {
	  if (sessionStorage.getItem('collapsedata')) {
		  this.dic = sessionStorage.getItem('collapsedata');
		  this.pic = sessionStorage.getItem('pic');
	  }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang='less' scoped>
.el-collapse-item__content {
  padding-bottom: 100px;
}
/deep/ .el-collapse-item__content {
  text-align: left;
  margin-left: 100px;
}
/deep/ .el-image__inner {
	width: 80%;
	height: 80%;
}
</style>