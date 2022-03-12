<template>
  <div class="home">
    <div class="container">
      <div class="addZujian">
        <div>
          <span>组件库</span>
          <span style="color: #bbb; margin-left: 10px; font-size: 14px"
            >点击使用</span
          >
        </div>
        <div class="zujianBtn" @click="zujian">添加组件1</div>
      </div>
      <div class="zujianContent">
        <div>组件展示区</div>
        <!-- Vue提供了 component ,来展示对应名称的组件 -->
        <!-- component 是一个占位符, :is 属性,可以用来指定要展示的组件的名称 -->
        <component
          v-for="(item, index) in comName"
          :is="item.name"
          :key="item.id"
          :idx="index"
          @func="getContent(index)"
          @fromSubAddFileInfo="saveFile"
        ></component>
        <el-button type="primary" @click="mutilHandler">批量添加</el-button>
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
      ++this.num;
      this.comName.push({
        name: "SubAdd",
        id: this.num,
      });
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

      if (idx < this.fileList.length) {
        this.fileList[idx].file = file;
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
      for (var i = 0; i < this.fileList.length; i++) {
        console.log(i);
        this.formData.append("files", this.fileList[i].file);
      }
      console.log("mutil=>", this.formData.getAll("files"));
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
