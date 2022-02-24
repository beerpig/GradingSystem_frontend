<template>
              <div class="verification-wrap">
                    <el-button type="text" @click="verificationButton"
                      >点击进行验证</el-button
                    >
                    <el-dialog
                      title="请完成安全验证"
                      :visible.sync="dialogbuttonVisible"
                      width="30%"
                    >
                      <div class="verification-slide">
                        <slide-verify
                          :l="40"
                          :r="10"
                          :w="370"
                          :h="150"
                          ref="slideblock"
                          @again="onAgain"
                          @fulfilled="onFulfilled"
                          @success="onSuccess"
                          @fail="onFail"
                          :imgs="puzzleImgList"
                          @refresh="onRefresh"
                          :accuracy="accuracy"
                          :slider-text="text"
                        ></slide-verify>
                      </div>
                    </el-dialog>
             </div>
</template>

<script>
import aa from "../assets/images/bg1.png"  //  如果使用网络图片资源就无需引入
export default {
  data() {
    return {
      dialogbuttonVisible: false,
      puzzleImgList: [
      ],
      text: "向右滑",
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
    }
   },
  methods: {
    //滑块的显示和隐藏
    verificationButton() {
      this.dialogbuttonVisible = true;
    },
    // 验证成功，触发该方法
    onSuccess(times) {
      console.log("验证成功");
      let ms = (times / 1000).toFixed(1);
      this.$message.success("login success, 耗时 " + ms + "s");
      setTimeout(()=> {
        this.dialogbuttonVisible = false;
        this.$router.push({name: 'Collapse'})
      }, 1000)
    },
    onFail() {
      console.log("验证不通过");
      this.$message.error("验证不通过");
    },
    onRefresh() {
      console.log("点击了刷新小图标");
      this.$message.success();
    },
    onFulfilled() {
      console.log("刷新成功啦！");
    },
    onAgain() {
      console.log("检测到非人为操作的哦！");
      this.$message.error("try again");
      // 刷新
      this.$refs.slideblock.reset();
    },
  }
}
</script>