<template>
  <div class="welcome" >
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">远见元智能科创项目评价系统</div>
      <div class="desc">- 基于Vue + ElementUI + Flask</div>
    </div>
    <div class="img"></div>
  </div>
</template>

<style>
.welcome {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 80%;
  margin-top: 100px;
  flex-wrap: wrap;
}
.welcome .content {
  margin-top: 130px;
}
.welcome .content .sub-title {
  font-size: 30px;
  line-height: 42px;
  color: #333;
  margin-left: -355px;
}
.welcome .content .title {
  font-size: 40px;
  line-height: 62px;
  color: #409eff;
}
.welcome .content .desc {
  text-align: right;
  font-size: 14px;
  color: #999;
}
.welcome .img {
  margin-left: 105px;
  background-image: url("./img/welcome.png");
  width: 371px;
  height: 438px;
}
</style>