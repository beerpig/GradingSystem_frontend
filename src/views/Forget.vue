<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <div class="loginbox-in">
          <el-form
            ref="registerForm"
            :model="registerForm"
            :rules="fieldRules"
            :inline="true"
          >
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
                  style="font-size: 14px; width: 193px"
                />
              </el-form-item>
            </div>
            <br />
            <div class="pwdbox">
              <span class="iconfont">&#xe775;</span>
              <el-form-item prop="pwd">
                <el-input
                  class="pwd"
                  id="password"
                  v-model="registerForm.pwd"
                  size="small"
                  show-password
                  placeholder="新密码"
                  style="font-size: 14px; width: 193px"
                ></el-input>
              </el-form-item>
            </div>
            <br />
            <div class="pwdbox">
              <span class="iconfont">&#xe824;</span>
              <el-form-item prop="repwd">
                <el-input
                  class="repwd"
                  id="re_password"
                  v-model="registerForm.repwd"
                  size="small"
                  show-password
                  placeholder="确认密码"
                  style="font-size: 14px; width: 193px"
                ></el-input>
              </el-form-item>
            </div>

            <br />

            <!-- <div class="pwdbox">
              <span class="iconfont">&#xe79a;</span>
              <el-form-item prop="phone">
                <el-input
                  class="phone"
                  id="phone_num"
                  v-model="registerForm.phone"
                  size="small"
                  style="font-size: 14px; width: 188px"
                  placeholder="输入手机号"
                ></el-input>
              </el-form-item>
            </div> -->
            <div class="pwdbox">
              <span class="iconfont">&#xe812;</span>
              <el-form-item prop="email">
                <el-input
                  class="email"
                  id="email"
                  v-model="registerForm.email"
                  size="small"
                  style="font-size: 14px; width: 193px"
                  placeholder="输入邮箱"
                ></el-input>
              </el-form-item>
            </div>

            <br />
            <div class="pwdbox" style="width: 250px">
              <span class="iconfont">&#xe776;</span>
              <el-form-item
                prop="code"
                style="display: inline-block !important"
              >
                <el-input
                  class="captcha"
                  id="captcha_slide"
                  v-model="registerForm.code"
                  size="small"
                  style="font-size: 14px; width: 108px; float: left"
                  placeholder="输入验证码"
                ></el-input>
                <button
                  type="primary"
                  class="register_btn"
                  @click="sendEmail('registerForm')"
                  style="display: inline; float: right; margin-top: 4px"
                >
                  发送验证码
                </button>
              </el-form-item>
              <el-form-item
                style="display: inline-block !important; margin-top: 5px"
              >
              </el-form-item>
            </div>
          </el-form>

          <br />
          <!-- <button
            type="primary"
            class="register_btn"
            @click="get_captcha('registerForm')"
          >
            {{ content }}
          </button> -->
          <button
            type="primary"
            class="returnLogin"
            @click="toRegister"
            style="
              display: inline;
            "
          >
            没账号？请点击注册
          </button>
          <button
            type="primary"
            class="register_btn"
            @click="updatePass('registerForm')"
            style="float: right; width: 85px; margin-right: 22px"
          >
            确定
          </button>
        </div>

        <!-- 右侧的注册盒子 -->
        <div class="background">
          <div class="title">远见元智能科创项目评价系统</div>
        </div>
      </div>
    </div>
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
export default {
  name: "Forget",

  data: function () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.registerForm.confirmPwd !== "") {
        //   this.$refs.registerForm.validateField("pwd");
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (
        /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(
          value
        ) == false
      ) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        if (
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ) == false
        ) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }
    };
    var validateUserName = (rule, value, callback) => {
      this.$axios
        .get("/getUserName", {
          params: {
            username: value,
          },
        })
        .then((resp) => {
          console.log("getUserName:", resp);
          if (resp.data.code == 10101) {
            callback(new Error("用户名已被占用！"));
          } else {
            callback();
          }
        });
    };
    return {
      captcha_img: "",
      content: "获取验证码",
      totalTime: 60,
      canClick: true,
      display: true,

      dialogbuttonVisible: false,
      puzzleImgList: [],
      text: "向右滑",
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
      registerForm: {
        name: "",
        pwd: "",
        repwd: "",
        // phone: "",
        code: "",
        email: "",
      },

      fieldRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          // { validator: validateUserName, trigger: "blur", required: true },
        ],
        pwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        repwd: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur", required: true },
        ],
        email: [
          { validator: validateEmail, trigger: "blur" },
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        // phone: [
        //   { required: true, message: "请输入手机号", trigger: "blur" },
        //   { validator: validatePhone, trigger: "blur", required: true },
        // ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 4,
            max: 4,
            message: "请输入长度4位的验证码",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.get_captcha_img();
  },
  methods: {
    toRegister() {
      this.$router.push("/register");
    },
    updatePass(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/updatePass", _this.registerForm).then((resp) => {
            if (resp) {
              if (resp.data.code === 11101) {
                _this.$message.success("密码设置成功!");
                _this.$router.push({ path: "/login" });
              } else if (resp.data.code === 11110) {
                _this.$message.error("用户名或邮箱错误！");
              } else if (resp.data.code === 11100) {
                _this.$message.error("验证码错误！");
              }
            }
          });
        }
      });
    },
    sendEmail(formName) {
      let _this = this;
      this.$refs[formName].validateField("email", (valid) => {
        if (valid !== "邮箱格式错误") {
          this.$message.success("邮箱发送中...");
          this.$axios
            .get("/sendMail", {
              params: {
                email: _this.registerForm.email,
              },
            })
            .then((resp) => {
              if (resp.data.code === 11010) {
                _this.$message.success("发送邮箱验证码成功！");
              }
            });
        } else {
          this.$message.error("请输入正确邮箱地址！");
        }
      });
    },
    get_captcha_img() {
      this.$axios.get("/testGetCaptcha").then((resp) => {
        console.log("get_captcha_img=>", resp);
        this.captcha_img = resp.data.img;
      });
    },
    login() {
      this.$router.push("/login");
    },
    register(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        console.log("validate...", valid);
        if (valid) {
          this.$axios.post("/register", _this.registerForm).then((resp) => {
            console.log("validate....", resp);
            if (resp.data.code === 10010) {
              let code = resp.data.code;
              console.log("code:", code);
              if (code === 10010) {
                _this.$alert(
                  "【" + _this.registerForm.name + "】注册成功",
                  "",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      _this.$router.push({ path: "/login" });
                    },
                  }
                );
                // sessionStorage.setItem("token", token);
              }
            } else if (resp.data.code === 10011) {
              this.$message.error("注册失败，验证码错误！");
            } else if (resp.data.code === 11000) {
              this.$message.error("注册失败，手机号！");
            } else {
              this.$message.error("注册失败！");
            }
          });
        }
      });
    },
    //滑块的显示和隐藏
    get_captcha(formName) {
      // if (!this.canClick) {
      //   return;
      // }

      let _this = this;
      this.$refs[formName].validateField("phone", (valid) => {
        if (valid !== "手机号格式错误" && _this.canClick) {
          console.log("valid:", valid);
          this.dialogbuttonVisible = true;
        } else {
          this.$message.error("请输入正确手机号！");
        }
      });
    },
    // 验证成功，触发该方法
    onSuccess(times) {
      let _this = this;
      console.log("验证成功");
      let ms = (times / 1000).toFixed(1);
      this.$message.success("login success, 耗时 " + ms + "s");
      setTimeout(() => {
        this.dialogbuttonVisible = false;
        // this.$router.push({path: "/addZip"})
        this.$axios.post("/captchaLaunch", _this.registerForm).then((resp) => {
          if (resp) {
            if (resp.data.code === 10110) {
              this.$message.success("发送验证码成功！");
              _this.canClick = false;
              let timer = window.setInterval(() => {
                _this.totalTime--;
                _this.content = _this.totalTime + "s后重新发送";
                if (_this.totalTime < 0) {
                  window.clearInterval(timer);
                  _this.content = "重新发送验证码";
                  _this.totalTime = 60;
                  _this.canClick = true; //这里重新开启
                }
              }, 1000);
            } else if (resp.data.code === 10111) {
              this.$message.error("验证码发送失败，请重试！");
            }
          }
        });
      }, 1000);
    },
    onFail() {
      console.log("验证不通过");
      this.$message.error("验证不通过");
    },
    onRefresh() {
      console.log("点击了刷新小图标");
      // this.$message.success();
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
  },
};
</script>

<style lang="less" scoped>
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
  background-color: rgb(225, 225, 230);
  width: 280px;
  opacity: 0.7;
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
  margin-top: 50px;
  background-image: url("./img/bg_2.jpeg");
  background-size: cover;
  font-family: sans-serif;
}
.title {
  margin-top: -10px;
  font-weight: bold;
  font-size: 30px;
  color: rgb(22, 115, 156);
}
/* .title:hover {
  font-size: 21px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
} */
/* .uesr-text {
  position: left;
} */
input {
  outline-style: none;
  border: 0;
  border-bottom: 1px solid #e9e9e9;
  background-color: transparent;
  height: 20px;
  font-family: sans-serif;
  font-size: 15px;
  color: #fff;
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
  text-decoration: none;
  position: absolute;
  margin-left: 152px;
  margin-top: 174px;
}
.register_btn {
  background-color: rgb(122, 177, 242); /* Green */
  border: none;
  color: #fafafa;
  padding: 7px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 5px;
  outline: none;
}

.returnLogin {
  background-color: transparent; /* Green */
  border: none;
  text-decoration: none;
  font-size: 12px;
  /* border-radius: 20px;   */
  color: #4e655d;
  font-size: 12px;
  text-decoration: underline;
  display: flex;
  margin-left: 25px;
  outline: none;
}

.returnLogin:hover {
  font-weight: bold;
  cursor: pointer;
}

.register_btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  background-color: #5f82d0;
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
  font-size: 24px;
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

@media screen and (max-width: 600px) {
  .background {
    display: none;
  }

  .loginbox {
    width: 280px;
  }
  .log-box-text {
    margin-left: 60%;
    margin-top: -7%;
  }
}

/deep/ .el-input__inner {
  background-color: #fff;
}
</style>