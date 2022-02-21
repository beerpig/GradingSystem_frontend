<template>
  <div style="margin-top: 60px; margin-left: 80px; width: 600px">
    <el-form
      :inline="false"
      ref="form2"
      :rules="rules2"
      :model="form2"
      label-width="100px"
      style="padding: 30px 0"
    >
      <!-- <el-form-item label="导入方式" prop="importType">
        <el-select v-model="form2.importType" placeholder="请选择导入方式">
          <el-option
            v-for="item in importTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="选取文件" prop="fileList">
        <el-upload
          class="upload-demo"
          drag
          ref="newupload"
          :action="action"
          accept=".jpg,.zip,.rar"
          :on-change="onChange"
          :on-success="onSuccess"
          :file-list="form2.fileList"
          :auto-upload="false"
          :v-model="form2.fileList"
          :data="form2"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <!-- <el-button type="primary" @click="importFilepost">导入</el-button> -->
        
        <el-button type="primary" @click="centerDialogVisible = true"
          >导入</el-button
        >
        <el-button type="primary" @click="onCancel">取消</el-button>
        <!-- <el-button type="primary" @click="open">Jump</el-button> -->
        <el-dialog
          title="协议书"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <span>协议书内容</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="importFilepost">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddZip",
  data() {
    return {
      form2: {
        importType: "increment",
        fileList: [],
        filebase64: "",
      },
      rules2: {
        fileList: [{ required: true, message: "请选择文件", trigger: "blur" }],
      },
      action: "/handler",
      centerDialogVisible: false,
    };
  },
  created() {
    let _this = this;
    axios
      .get("http://localhost:8181/productCategory/init")
      .then(function (resp) {
        _this.options1 = resp.data;
      });
  },
  methods: {
    open(response) {
        this.$alert("后端返回:" + response, '评分结果', {
          confirmButtonText: '确定',
        //   callback: action => {
        //     this.$message({
        //       type: 'info',
        //       message: `action: ${ action }`
        //     });
        //   }

        });
        this.$router.push({name: 'Collapse', params: {responses: response}})
      },
    //onChange这里我根据我的业务需求进行修改替换上一次的上传文件了
    onChange(file, fileList) {
      //文件状态改变时的钩子函数
      this.$refs.form2.clearValidate("fileList");
      if (fileList.length > 0) {
        this.form2.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
      }
    },
    onSuccess(response, file, fileList) {
      //文件上传成功时的钩子
      console.log(response)
      if (response.msg == "successfully") {
        // if(response.state==1){
        this.$message.success("导入成功");
        this.dialogVisible2 = false;
        this.open(response)
      } else {
        this.$message.error("导入失败");
      }
      this.form2.fileList = [];
      this.$refs["form2"].resetFields();
      this.$refs["newupload"].clearFiles();
    },
    uplaodFile(response) {
      if (response.state == 1) {
        this.$message.success("导入成功");
        this.dialogVisible2 = false;
      } else {
        this.$message.error("导入失败");
      }
      this.form2.fileList = [];
      this.$refs["form2"].resetFields();
      this.$refs["newupload"].clearFiles();
    },
    importFilepost() {
      //导入提交---
      // let _this = this;
      // const form = new FormData();
      // form.append('beer', params.file);
      // this.$refs.newupload.submit(); 跨域问题
      // this.axios.post("http://127.0.0.1:5000/handler", form).then(
      //                 res => {
      //                     this.result = res.data
      //                     console.log(res.data)
      //                 }
      //             ).catch(res => {
      //                 console.log("error")
      //             })
      if (this.centerDialogVisible) {
        this.centerDialogVisible = false;
      }
      this.$refs.form2.validate((valid) => {
        if (valid) {
          //触发组件的action
          this.$refs.newupload.submit(); //主要是这里
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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

<style lang='less' scoped>
</style>


</style>