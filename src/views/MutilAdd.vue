<template>
  <div class="home">
    <div class="container">
      <div class="addZujian"></div>
      <div class="zujianContent">
        <div>请添加项目</div>
        <!-- Vue提供了 component ,来展示对应名称的组件 -->
        <!-- component 是一个占位符, :is 属性,可以用来指定要展示的组件的名称 -->
        <component
          v-for="(item, index) in comName"
          :is="item.name"
          :key="item.id"
          :idx="index"
          @func="getContent(index)"
          @fromSubAddFileInfo="saveFile"
          @fromSubAddFileRemove="removeFile"
        ></component>
      </div>
      <div  style="float: right; display: inline-block">
        <el-button type="primary" class="zujianBtn" @click="zujian"
          >新增项目</el-button
        >
      </div>
      <div style="float: left; display: inline-block">
        <el-button type="primary" @click="mutilHandler">开始评分</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// 引入子组件
import SubAdd from "./SubAdd";
export default {
  data() {
    return {
      comName: [],
      formData: new FormData(),
      fileList: [],
      num: 0,
    };
  },
  components: {
    SubAdd,
  },
  methods: {
    // 添加组件1
    zujian() {
        if (this.comName.length > 4) {
            this.$message.error("只能上传5个项目！");
            return;
        }
      ++this.num;
      console.log("this.num=>", this.num);
      this.comName.push({
        name: "SubAdd",
        id: this.num,
      });
    },
    // remove文件后删除组件
    removeFile(idx) {
        this.fileList.splice(idx, 1);
        console.log("removeFile=>", this.fileList.length);
    },
    // 删除组件
    getContent(index) {
      console.log("getContent=>", index);
      this.comName.splice(index, 1);
      this.fileList.splice(index, 1);

      console.log("getContentFileListLength=>", this.fileList.length);
    },
    // 从子组件保存文件
    saveFile(fileInfo) {
      console.log("从子组件保存文件");
      var file = fileInfo.file;
      console.log("saveFile.file=>", file);
      var idx = fileInfo.idx;
      var planName = fileInfo.planName;

      if (idx < this.fileList.length) {
        this.fileList[idx].file = file;
        this.fileList[idx].planName = planName;
      } else {
        this.fileList.push(fileInfo);
      }
      console.log("this.fileList.length=>", this.fileList.length);
      // let formData = new FormData();
      //   this.formData.append("fil", file);
      // formData.append("idx", idx);
      // console.log("idx=>", idx);
      // console.log("this.fileForm[idx]=>", this.fileForm[idx])
      // if (this.fileForm[idx] === undefined) {
      //     this.fileForm.push({'data': formData, 'index': idx});
      // }
      // else {
      //     this.fileForm[idx].data = formData;
      // }
      // console.log("fileForm.length=>", this.fileForm.length);
    },
    mutilHandler() {
      //   this.formData.append("fileList", this.fileList);
      if (this.fileList.length === 0) {
          this.$message.error("请至少上传一个文件！");
          return;
      }
      for (var i = 0; i < this.fileList.length; i++) {
        console.log(i);
        this.formData.append("files", this.fileList[i].file);
        this.formData.append("planName", this.fileList[i].planName);
      }
      console.log("mutil=>", this.formData.getAll("files"));
      console.log("mutil=>", this.formData.getAll("planName"));
      this.comName = [];
      this.fileList = [];
      this.$axios
        .post("/handler", this.formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((resp) => {
          console.log("mutilHandler");
        });
      this.formData = new FormData();
    },
  },
};
</script>
