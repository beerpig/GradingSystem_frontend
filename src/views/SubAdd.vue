<template>
  <div class="home">
    <!-- <el-checkbox style="display: inline; float: left; padding-right: 20px"></el-checkbox> -->
    <!-- <el-tag type="success" style="display: inline; float: left">{{tags[idx]}}</el-tag> -->

    <el-form
      :inline="false"
      ref="form2"
      :rules="rules2"
      :model="form2"
      label-width="100px"
    >
      <el-form-item :label="'项目 '+tags[idx]+' 名称'" prop="planName">
        <el-input v-model="form2.planName" style="width: 80%"></el-input>
        <div class="container" style="display: inline; float: right">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del"
          ></el-button>
        </div>
      </el-form-item>
      <el-form-item label="选取文件" prop="fileList" style="text-align: left">
        <el-upload
          class="upload-demo"
          ref="newupload"
          :action="action"
          accept=".zip,.rar, .docx, .pdf"
          :on-change="onChange"
          :on-success="onSuccess"
          :on-remove="onRemove"
          :file-list="form2.fileList"
          :auto-upload="false"
          :v-model="form2.fileList"
          :data="form2"
          style="margin-left: 10%"
        >
          <el-button size="small" type="primary"> 点击上传 </el-button>
          <span
            slot="tip"
            class="el-upload__tip"
            style="font-size: 8px; margin-left: 5%"
          >
            请上传不超过30M大小的文件，支持*.docx、*.zip、*.rar、*.pdf
          </span>
        </el-upload>
      </el-form-item>
    </el-form>

    <!-- <div class="tableLine"><span class="midText">分割线</span></div> -->
    <!-- <br /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: ["1", "2", "3", "4", "5"],
      form2: {
        fileList: [],
        idx: "",
        planName: "",
      },
      dialogVisible: false,
      importContent: "导入",
      isImportContentDisable: false,
      rules2: {
        fileList: [{ required: true, message: "请选择文件", trigger: "blur" }],
      },
      action: "/handler",
    };
  },
  props: ["idx"],
  methods: {
    del() {
      console.log("props.idx=>", this.idx);
      // 子组件向父组件传值（此处传递一个空值） - 父组件将执行getContent方法
      this.$emit("func", "");
    },
    onRemove(file, fileList) {
      this.$emit("fromSubAddFileRemove", this.idx);
      console.log("onRemove");
    },
    //onChange这里我根据我的业务需求进行修改替换上一次的上传文件了
    onChange(file, fileList) {
      //文件状态改变时的钩子函数
      this.$refs.form2.clearValidate("fileList");
      if (fileList.length > 0) {
        this.form2.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
      }
      const isLt2M = file.size / 1024 / 1024 < 30;
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 30MB!",
          type: "warning",
        });
        this.form2.fileList = [];
        return false;
      }
      //   let formData = new FormData();
      let f = this.$refs.newupload.uploadFiles.pop().raw;
      //   formData.append("files", f);
      let fileInfo = {
        file: f,
        idx: this.idx,
        planName: this.form2.planName,
      };
      this.$emit("fromSubAddFileInfo", fileInfo);
      //   console.log("fromSubAddFileIdx=>", this.idx);
      return isLt2M;
    },
    onSuccess(response) {
      //文件上传成功时的钩子
      console.log("onSuccess:", response);
      if (response) {
        if (response.data.code === 10000) {
          this.$message.success("导入成功");
          this.dialogVisible2 = false;
          sessionStorage.setItem("collapsedata", response.data.msg);
          sessionStorage.setItem("pic", response.data.pic);
          var dataStr = JSON.stringify(response.data);
          console.log("dataStr=>", dataStr);
          sessionStorage.setItem("scoredata", dataStr);
          this.$router.push({
            name: "查看评分",
            params: { responses: response },
          });
        } else if (response.data.code === 11100) {
          this.$message.error("文件不合法，请重新上传！");
        } else if (response.data.code === 11111) {
          this.$message.error("抱谦，您上传的文档无法正确识别！");
        }
      }

      this.form2.fileList = [];
      this.$refs["form2"].resetFields();
      this.$refs["newupload"].clearFiles();
      this.importContent = "导入";
      this.isImportContentDisable = false;
    },
    importFilepost() {
      if (this.form2.isAgree === false) {
        this.$message.error("请勾选下方协议书！");
      } else {
        this.$refs.form2.validate((valid) => {
          if (valid) {
            let files = [];
            let formData = new FormData();
            // 解决 this.$refs.newupload.submit() 不走拦截器的bug
            for (var i = 0; i < this.form2.fileList.length; i++) {
              let file = this.$refs.newupload.uploadFiles.pop().raw;
              formData.append("files", file);
            }
            console.log("valid:", valid);
            if (this.form2.isAgree === false) {
              this.$message.error("请勾选下方协议书！");
            } else {
              this.$message.success("结果评审中，请稍等....");
              this.importContent = "评审中";
              this.isImportContentDisable = true;
              this.$axios.post("/handler", formData).then((resp) => {
                this.onSuccess(resp);
              });
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    onCancel() {
      //取消
      this.$refs.form2.resetFields();
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
    },
  },
};
</script>
<style scoped>
.tableLine {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}
.midText {
  position: absolute;
  left: 50%;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}
.el-form {
  margin-bottom: 0px;
}
</style>