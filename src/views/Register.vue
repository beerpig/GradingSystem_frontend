<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="loginbox-in">
          <el-form ref="registerForm" :model="registerForm" :rules="fieldRules">
            <div class="userbox">
              <!-- <el-form-item label="用户名" prop="username"> -->
              <span class="iconfont">&#xe817;</span>

              <el-form-item prop="name">
                <el-input
                  class="user"
                  id="user"
                  v-model="registerForm.name"
                  placeholder="用户名"
                  size="small"
                  style="font-size: 18px; width: 195px"
                @input="inputOnInput($event)"
                />
              </el-form-item>
            </div>
            <br />
            <div class="pwdbox">
              <span class="iconfont">&#xe775;</span>
              <el-input
                class="pwd"
                id="password"
                v-model="pwd"
                size="small"
                show-password
                placeholder="密码"
                style="font-size: 18px"
              ></el-input>
            </div>
            <br />
            <div class="pwdbox">
              <span class="iconfont">&#xe775;</span>
              <el-input
                class="pwd"
                id="re_password"
                v-model="repwd"
                size="small"
                show-password
                placeholder="确认密码"
                style="font-size: 18px"
              ></el-input>
            </div>

            <br />

            <div class="pwdbox">
              <span class="iconfont">&#xe775;</span>
              <el-input
                class="phone"
                id="phone_num"
                v-model="phone"
                size="small"
                style="font-size: 18px"
                placeholder="输入手机号"
              ></el-input>
            </div>

            <br />

            <div class="pwdbox">
              <span class="iconfont">&#xe775;</span>
              <el-input
                class="captcha"
                id="captcha_slide"
                v-model="captcha"
                size="small"
                style="font-size: 18px"
                placeholder="输入验证码"
              ></el-input>
            </div>
          </el-form>

            <br />
          <button type="primary" class="register_btn" @click="get_captcha">
            获取验证码
          </button>
          <button type="primary" class="register_btn" @click="register">
            注册
          </button>
        </div>

        <!-- 右侧的注册盒子 -->
        <div class="background">
          <div class="title">Welcome to WH System Management Center</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data: function () {
    return {
      registerForm: {
        name: "",
        pwd: "",
        repwd: "",
      },

      fieldRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
        ],
      },
      //   user_list:[
      //   {
      //     username:'admin',
      //     password:'123'
      //   },

      //   ]
    };
  },
  methods: {
      register() {

      },
      get_captcha() {

      }
  },
};
</script>

<style scoped>
.loginbox {
  display: flex;
  position: absolute;
  width: 800px;
  height: 400px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4e655d;
}
.loginbox-in {
  background-color: #89ab9e;
  width: 280px;
}
.userbox {
  margin-top: 50px;
  height: 40px;
  width: 230px;
  display: flex;
  margin-left: 25px;
}
.pwdbox {
  height: 40px;
  width: 225px;
  display: flex;
  margin-left: 25px;
}

.background {
  width: 570px;
  background-image: url("./img/Christmas_Trees.png");
  background-size: cover;
  font-family: sans-serif;
}
.title {
  margin-top: 320px;
  font-weight: bold;
  font-size: 20px;
  color: #4e655d;
}
.title:hover {
  font-size: 21px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}
.uesr-text {
  position: left;
}
input {
  outline-style: none;
  border: 0;
  border-bottom: 1px solid #e9e9e9;
  background-color: transparent;
  height: 20px;
  font-family: sans-serif;
  font-size: 15px;
  color: #445b53;
  font-weight: bold;
}
/* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus {
  border-bottom: 2px solid #445b53;
  background-color: transparent;
  transition: all 0.2s ease-in;
  font-family: sans-serif;
  font-size: 15px;
  color: #445b53;
  font-weight: bold;
}
input:hover {
  border-bottom: 2px solid #445b53;
  background-color: transparent;
  transition: all 0.2s ease-in;
  font-family: sans-serif;
  font-size: 15px;
  color: #445b53;
  font-weight: bold;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #89ab9e inset !important;
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  font-size: 15px;
  font-weight: bold;
}
.log-box {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 174px;
  margin-left: 30px;
  color: #4e655d;
  margin-top: -5px;
  align-items: center;
}
.log-box-text {
  color: #4e655d;
  font-size: 12px;
  text-decoration: underline;
}
.register_btn {
  background-color: #5f8276; /* Green */
  border: none;
  color: #fafafa;
  padding: 7px 35px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 20px;
  outline: none;
}
.register_btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  background-color: #0b5137;
  transition: all 0.2s ease-in;
}

.warn {
  margin-top: 60px;
  margin-right: 110px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 17px;
}

.register_btn:hover {
  font-weight: bold;
  cursor: pointer;
}
@font-face {
  font-family: "iconfont";
  src: url("./font/iconfont.eot");
  src: url("./font/iconfont.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("./font/iconfont.woff2") format("woff2"),
    url("./font/iconfont.woff") format("woff"),
    url("./font/iconfont.ttf") format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("./font/iconfont.svg#iconfont") format("svg");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 22px;
  color: #4e655d;
  margin-right: 10px;
  margin-top: 3px;
}

.icon-key:before {
  content: "\e775";
}

.icon-account:before {
  content: "\e817";
}

/deep/ .el-input__inner {
  background-color: #8aac9e;
}
</style>