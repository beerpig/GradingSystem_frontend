<template>
  <div>
        <el-collapse class="form">

                <div v-for="data in datas">
                    
                  	<Reply  :data="data" />
                </div>
        </el-collapse>
  </div>
</template>

<script>
import Reply from './Reply.vue';

export default {
    data(){
        return{ 
//           datas:[{"id": 1,"name": "python","pid": 0,"childlist": [{"id": 4,"name": "爬虫","pid": 1 }]},
//  {"id": 2,"name": "java","pid": 0},
//  {"id": 3,"name": "html", "pid": 0}]
            datas: [{'pid': 0, 'name': 'SCORE', 'id': 1, 'childlist': [{'pid': 1, 'name': 'AI', 'id': 2, 'data': 86.0}, {'pid': 1, 'name': 'TRUES', 'id': 3, 'data': 78}, {'pid': 1, 'name': 'BIAS', 'id': 4, 'data': 8.0}]}, {'pid': 0, 'name': 'FILES', 'id': 5, 'childlist': [[{'pid': 5, 'name': 'NAME', 'id': 6, 'data': '互联网+商业计划书 初赛'}, {'pid': 5, 'name': 'LABELS', 'id': 7, 'childlist': [{'pid': 7, 'name': '__label__ACADEMIC', 'id': 8, 'childlist': [{'pid': 8, 'name': 'items', 'id': 9, 'data': ['研究员', '教授', '知名人士', '研究生', '副教授', '专业人士', '副校长', '学院', '大学', '博士', '讲师']}, {'pid': 8, 'name': 'score', 'id': 10, 'data': 1}]}, {'pid': 7, 'name': '__label__INDUSTRIAL', 'id': 11, 'childlist': [{'pid': 11, 'name': 'items', 'id': 12, 'data': ['业界']}, {'pid': 11, 'name': 'score', 'id': 13, 'data': 1}]}, {'pid': 7, 'name': '__label__BUSINESS', 'id': 14, 'childlist': [{'pid': 14, 'name': 'items', 'id': 15, 'data': ['预测', '现状', '前景', '市场潜力', '工业', '营业额', '市场前景', '分析', '营收', '产业', '前瞻性', '销售额', '发展潜力', '规模', '净利润']}, {'pid': 14, 'name': 'score', 'id': 16, 'data': 1}]}, {'pid': 7, 'name': '__label__INVESTMENT', 'id': 17, 'childlist': [{'pid': 17, 'name': 'items', 'id': 18, 'data': ['资源整合', '资金', '投资', '融资', '合作意向', '投融资']}, {'pid': 17, 'name': 'score', 'id': 19, 'data': 1}]}, {'pid': 7, 'name': '__label__PATENTS', 'id': 20, 'childlist': [{'pid': 20, 'name': 'items', 'id': 21, 'data': ['知识产权', '专利', '专利申请', '一等奖', '发明人']}, {'pid': 20, 'name': 'score', 'id': 22, 'data': 1}]}]}, {'pid': 5, 'name': 'ENTITYS', 'id': 23, 'childlist': [[{'pid': 23, 'name': 'name', 'id': 24, 'data': '南京航空航天大学'}, {'pid': 23, 'name': 'score', 'id': 25, 'data': 1.25}], [{'pid': 25, 'name': 'name', 'id': 26, 'data': '董事长'}, {'pid': 25, 'name': 'score', 'id': 27, 'data': 2}], [{'pid': 27, 'name': 'name', 'id': 28, 'data': '上海大学'}, {'pid': 27, 'name': 'score', 'id': 29, 'data': 1.25}], [{'pid': 29, 'name': 'name', 'id': 30, 'data': '校长'}, {'pid': 29, 'name': 'score', 'id': 31, 'data': 2}], [{'pid': 31, 'name': 'name', 'id': 32, 'data': '上海外国语大学'}, {'pid': 31, 'name': 'score', 'id': 33, 'data': 1.25}], [{'pid': 33, 'name': 'name', 'id': 34, 'data': '教授'}, {'pid': 33, 'name': 'score', 'id': 35, 'data': 1.5}], [{'pid': 35, 'name': 'name', 'id': 36, 'data': '北京航空航天大学'}, {'pid': 35, 'name': 'score', 'id': 37, 'data': 1.5}], [{'pid': 37, 'name': 'name', 'id': 38, 'data': '副教授'}, {'pid': 37, 'name': 'score', 'id': 39, 'data': 1.25}], [{'pid': 39, 'name': 'name', 'id': 40, 'data': '西北工业大学'}, {'pid': 39, 'name': 'score', 'id': 41, 'data': 1.5}], [{'pid': 41, 'name': 'name', 'id': 42, 'data': '专利'}, {'pid': 41, 'name': 'score', 'id': 43, 'data': 1.5}], [{'pid': 43, 'name': 'name', 'id': 44, 'data': '一等奖'}, {'pid': 43, 'name': 'score', 'id': 45, 'data': 2}]]}], [{'pid': 45, 'name': 'NAME', 'id': 46, 'data': '备赛报名表Application form 青空计划'}, {'pid': 45, 'name': 'LABELS', 'id': 47, 'childlist': [{'pid': 47, 'name': '__label__ACADEMIC', 'id': 48, 'childlist': [{'pid': 48, 'name': 'items', 'id': 49, 'data': []}, {'pid': 48, 'name': 'score', 'id': 50, 'data': 0}]}, {'pid': 47, 'name': '__label__INDUSTRIAL', 'id': 51, 'childlist': [{'pid': 51, 'name': 'items', 'id': 52, 'data': []}, {'pid': 51, 'name': 'score', 'id': 53, 'data': 0}]}, {'pid': 47, 'name': '__label__BUSINESS', 'id': 54, 'childlist': [{'pid': 54, 'name': 'items', 'id': 55, 'data': ['产业']}, {'pid': 54, 'name': 'score', 'id': 56, 'data': 1}]}, {'pid': 47, 'name': '__label__INVESTMENT', 'id': 57, 'childlist': [{'pid': 57, 'name': 'items', 'id': 58, 'data': []}, {'pid': 57, 'name': 'score', 'id': 59, 'data': 0}]}, {'pid': 47, 'name': '__label__PATENTS', 'id': 60, 'childlist': [{'pid': 60, 'name': 'items', 'id': 61, 'data': ['一等奖']}, {'pid': 60, 'name': 'score', 'id': 62, 'data': 1}]}]}, {'pid': 45, 'name': 'ENTITYS', 'id': 63, 'childlist': [[{'pid': 63, 'name': 'name', 'id': 64, 'data': '一等奖'}, {'pid': 63, 'name': 'score', 'id': 65, 'data': 2}]]}]]}]
,
          online: 0
        }
    },
    components:{
        'Reply':Reply,
    },
}
</script>

<style>
    /deep/ .el-collapse-item__content{
		text-align: left;
		margin-left: 100px;
	}
</style>
