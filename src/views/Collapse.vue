<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <div>
        <el-collapse-item
          v-for="(p, index) in plan"
          :name="index"
          :title="p.name"
          :key="index"
          style=""
        >
          <div style="margin-left: 0px" class="score-show">
            <span style="font-size: 30px">score : </span>
            <span :style="scoreComputed(p.msg)" style="">{{
              p.msg
            }}</span>
          </div>
          <div style="font-size: 18px">评分画像：</div>
          <div id="word-img">
            <el-image
              :src="'data:image/png;base64,' + p.pic"
              :fit="fit"
              style="text-align: center"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <!-- <div>
            <el-button type="primary" @click="downloadFile(p.zip_file)">下载文件</el-button>
          </div> -->
          <!-- <span v-for="item in dic.SCORE" style="font-size: 36px; color: red">
          {{ item }}
        </span> -->
        </el-collapse-item>
      </div>
    </el-collapse>
  </div>
</template>

<script>
import fileDownload from "js-file-download";

export default {
  created() {
    console.log("collapse receive:" + this.dic);
  },
  computed: {
    scoreComputed() {
      return function (s) {
        if (s >= 80) {
          return "font-size: 62px; color: red; font-weight: bold";
        }
        return "font-size: 62px; color: green; font-weight: bold";
      };
      //   var score_ = this.dic * 1;
    },
  },
  data() {
    return {
      activeNames: [0],
      //   dic: this.$route.params.responses.data.msg,
      // dic: this.$store.state.toCollapseData,
      dic: "",
      // pic: this.$route.params.responses.data.wordcloud,
      pic: "",
      plan: [],
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
    if (sessionStorage.getItem("scoredata")) {
      console.log("created");
      //   this.dic = sessionStorage.getItem("collapsedata");
      //   this.pic = sessionStorage.getItem("pic");
      this.scoredata = sessionStorage.getItem("scoredata");
      console.log("this.scoredata=>", this.scoredata);
      var scoredataJson = JSON.parse(this.scoredata);
      console.log("scoredataJson=>", scoredataJson);
      // console.log("scoredataJson.plan=>", scoredataJson.plan);
      //   this.dic = scoredataJson.msg;
      //   this.pic = scoredataJson.pic;
      this.plan = scoredataJson.plan;
    }
  },
  methods: {
    downloadFile(url_) {
      this.$axios
        ({
          url: "/download/" + url_,
          method: "get",
          headers: {
            "Content-Type": "application/json; application/octet-stream",
          },
          responseType: "blob",
        })
        .then((resp) => {
          const blob = new Blob([resp.data]);
          const link = document.createElement("a");
          link.download = "file.zip"; // a标签添加属性
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);
          document.body.appendChild(link);
          link.click(); // 执行下载
          URL.revokeObjectURL(link.href); // 释放 bolb 对象
          document.body.removeChild(link); // 下载完成移除元素
        });
    },

    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang='less' scoped>
.score-show {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
/deep/ .el-collapse-item__header {
  font-size: 24px;
}
</style>