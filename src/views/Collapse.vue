<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
		  <div style="margin-left: 400px">
			<span style="font-size: 30px">score : </span>
			<span :style="scoreComputed">{{dic}}</span>
		  </div>
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
  computed: {
	  scoreComputed() {
		//   var score_ = this.dic * 1;
		  if (this.dic >= 80) {
			  return 'font-size: 62px; color: red; font-weight: bold';
		  }
		  return 'font-size: 62px; color: green; font-weight: bold';
	  }
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