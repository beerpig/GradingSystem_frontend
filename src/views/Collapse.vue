<template>
	<div>
		<el-collapse v-model="activeNames" @change="handleChange"  >
			<el-collapse-item title="SCORE"    name="1" >
				<div v-for="item in dic.SCORE" >
					{{item}}
				</div>
			</el-collapse-item>
		</el-collapse>
		<el-collapse v-model="activeNames" @change="handleChange"  >
			<el-collapse-item  title="FILES"  name="2" >
				<div v-for="(item,index) in dic.FILES" :key="index">
					<el-collapse-item :title=item.NAME   :name=item.index >
						<div  v-for="(item2,key) in item.LABELS">
							<el-collapse-item  :title=key  :name=item2.index >

								<div  v-for="(item3,index) in item2.items">
									{{item3}}
								</div>
								score = {{ item2.score }}
							</el-collapse-item>
						</div>



							<el-collapse-item  title=ENTITY  :name=item.index >
								<div v-for="(item1,key) in item.ENTITYS">
								<!--<div  v-for="(item3,index) in item1.items">-->
								<!--	{{item3}}-->
								<!--</div>-->
									{{item1.name}}
									{{item1.score}}
								<!--score = {{ item2.score }}-->
								</div>
							</el-collapse-item>


					</el-collapse-item>




				</div>

				<!--<el-collapse v-model="activeNames" @change="handleChange" v-for="(item1,index) in item1" :key="index" >-->
				<!--	<el-collapse-item  :title=item.NAME  :name=item.index>-->
				<!--		11-->
				<!--	</el-collapse-item>-->
				<!--</el-collapse>-->
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
export default {
	created() {
		console.log("collapse receive:" + this.dic)
	},
	data() {
		return {
			activeNames: ["1"],
			// dic : this.$route.params.responses,
			dic :{
				SCORE: {
					AI: 86.0,
					TRUES: 78,
					BIAS: 8.0
				},
				FILES: [
					{
						NAME: "互联网+商业计划书 初赛",
						LABELS: {
							__label__ACADEMIC: {
								items: [
									"研究员",
									"教授",
									"知名人士",
									"研究生",
									"副教授",
									"专业人士",
									"副校长",
									"学院",
									"大学",
									"博士",
									"讲师"
								],
								score: 1
							},
							__label__INDUSTRIAL: {
								items: [
									"业界"
								],
								score: 1
							},
							__label__BUSINESS: {
								items: [
									"预测",
									"现状",
									"前景",
									"市场潜力",
									"工业",
									"营业额",
									"市场前景",
									"分析",
									"营收",
									"产业",
									"前瞻性",
									"销售额",
									"发展潜力",
									"规模",
									"净利润"
								],
								score: 1
							},
							__label__INVESTMENT: {
								items: [
									"资源整合",
									"资金",
									"投资",
									"融资",
									"合作意向",
									"投融资"
								],
								score: 1
							},
							__label__PATENTS: {
								items: [
									"知识产权",
									"专利",
									"专利申请",
									"一等奖",
									"发明人"
								],
								score: 1
							}
						},
						ENTITYS: [
							{
								name: "南京航空航天大学",
								score: 1.25
							},
							{
								name: "董事长",
								score: 2
							},
							{
								name: "上海大学",
								score: 1.25
							},
							{
								name: "校长",
								score: 2
							},
							{
								name: "上海外国语大学",
								score: 1.25
							},
							{
								name: "教授",
								score: 1.5
							},
							{
								name: "北京航空航天大学",
								score: 1.5
							},
							{
								name: "副教授",
								score: 1.25
							},
							{
								name: "西北工业大学",
								score: 1.5
							},
							{
								name: "专利",
								score: 1.5
							},
							{
								name: "一等奖",
								score: 2
							}
						]
					},
					{
						NAME: "备赛报名表Application form 青空计划",
						LABELS: {
							__label__ACADEMIC: {
								items: [],
								score: 0
							},
							__label__INDUSTRIAL: {
								items: [],
								score: 0
							},
							__label__BUSINESS: {
								items: [
									"产业"
								],
								score: 1
							},
							__label__INVESTMENT: {
								items: [],
								score: 0
							},
							__label__PATENTS: {
								items: [
									"一等奖"
								],
								score: 1
							}
						},
						ENTITYS: [
							{
								name: "一等奖",
								score: 2
							}
						]
					}
				]
			}
		};
	},
	methods: {
		handleChange(val) {
			console.log(val);
		},
	},
};
</script>
<style lang='less' scoped>
 .el-collapse-item__content{
	 padding-bottom:100px
 }
	/deep/ .el-collapse-item__content{
		text-align: left;
		margin-left: 100px;
	}
   
</style>