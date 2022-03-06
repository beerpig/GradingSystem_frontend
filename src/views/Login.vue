<template>
  <div class="container">
    <div class="main">
      <!-- 整个注册盒子 -->
      <div class="loginbox">
        <!-- 左侧的注册盒子 -->
        <!-- <form ref="loginForm" :model="loginData"> -->
        <div class="loginbox-in">
          <el-form ref="loginForm" :model="loginForm" :rules="fieldRules">
            <div class="userbox">
              <span class="iconfont">&#xe817;</span>
              <el-form-item prop="name">
                <el-input
                  class="user"
                  id="user"
                  v-model="loginForm.name"
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
                  type="password"
                  v-model="loginForm.pwd"
                  placeholder="密码"
                  size="small"
                  style="font-size: 14px; width: 193px"
                  show-password
                />
              </el-form-item>
            </div>

            <br/>
            <div class="pwdbox">
              <span class="iconfont">&#xe776;</span>
              <el-form-item prop="code" style="display: inline-block !important;">
                <el-input
                  class="captcha"
                  id="captcha_slide"
                  v-model="loginForm.code"
                  size="small"
                  style="font-size: 14px; width: 102px"
                  placeholder="输入验证码"
                ></el-input>
              </el-form-item>
              <el-form-item style="display: inline-block !important; margin-top: 5px; width: 200px">
                <el-image
                  :src="'data:image/png;base64,' + captcha_img"
                  :fit="fit"
                  style="width: 80px; height: 30px"
                  @click="get_captcha_img"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-form-item>
            </div>
          </el-form>
          <br />
          <div class="log-box">
            <div class="log-box-text" style="margin-top: 181px">忘记密码</div>
            <button type="primary" class="login_btn" @click="loginF('loginForm')" style="margin-top: 30px">
              登录
            </button>
            <!-- <button type="primary" class="login_wechat" @click="setWxerwma">微信登录</button> -->
          </div>

          <br />
          <div class="warn"></div>
          <button type="primary" class="register_btn" @click="register" >
            注册
          </button>
        </div>
        <!-- </form> -->
        <!-- 右侧的注册盒子 -->
        <div class="background">
          <div class="title">远见元智能科创顶目评价系统</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",

  data: function () {
    return {
      captcha_img: "",
      urltest: "",
      loginForm: {
        name: "",
        pwd: "",
        code: ""
      },
      fieldRules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
        ],
        pwd: [
          { required: true, message: "密码不能为空", trigger: "change" },
        ],
      },
      action: "/login",
    //   user_list: [
    //     {
    //       id: "1",
    //       username: "admin",
    //       password: "123",
    //     },
    //   ],
    };
  },
  mounted() {
    this.get_captcha_img();
  },
  methods: {
    get_captcha_img() {
      this.$axios.get("/testGetCaptcha").then((resp) => {
        console.log("get_captcha_img=>", resp);
        this.captcha_img = resp.data.img;
      });
    },
    register() {
      this.$router.push("/register");
    },
    // 设置微信二维码函数
    setWxerwma () {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
      const wxElement = document.body.appendChild(s)
      console.log("wxElement =>", wxElement);
      // const uri = `${window.location.origin}callback/wx/` // 这里是你的回调uri
      const uri = encodeURIComponent("127.0.0.1:8080")
      wxElement.onload = () => {
        const obj = new WxLogin({
          id: 'wx_login_container', // 需要显示的容器id
          appid: "wx398a330716af094a", // appid wx*******
          scope: 'snsapi_login', // 网页默认即可
          redirect_uri: encodeURIComponent(uri), // 授权成功后回调的url
          state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
          style: 'black', // 提供"black"、"white"可选。二维码的样式
          href: "data:text/css;base64,QGNoYXJzZXQgIlVURi04IjsNCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7ZGlzcGxheTogbm9uZTt9DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmV9DQouaW1wb3dlckJveCAuc3RhdHVzIHt0ZXh0LWFsaWduOiBjZW50ZXI7fSANCg=="

        })
        if (!obj) {
          console.error('wx-error')
        }
      }
      
    },

    // getParams: function () {
    //         // 取到路由带过来的参数
    //         var routerParams = this.$route.query.list;
    //         this.user_list = routerParams;
    // },
    loginF(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/login", _this.loginForm).then(function (resp) {
              console.log(resp)
            if (resp.data.code === 10000) {
              // let { success, token } = resp.data;
              // console.log(success);
                sessionStorage.setItem('username', _this.loginForm.name)
                sessionStorage.setItem('token', resp.data.token);
                console.log("loginning....");
                _this.$router.push({ path: "/"});
                // _this.$alert(
                //   "【" + _this.loginForm.name + "】添加成功" + resp.data,
                //   "",
                //   {
                //     confirmButtonText: "确定",
                //     callback: (action) => {
                //       _this.$router.push({path: "/addZip"});
                //     },
                //   }
                // );
                // _this.$router.push({path: "addZip"})
              // if (token) {
              // }
            }
            else if (resp.data.code === 10001) {
              _this.$message.error("用户名或密码错误，请重新输入！");
            }
            else {
              _this.$message.error("登录失败！");
            }
          })
          .catch(function (error) {
              console.log(error)
          });

          // alert('validate');
        } else {
          console.log("illegad submit!!");
          return false;
        }
      });
    },
    login() {
      var flag = 0;
      //如果是有参数传递
      if (!this.$route.query.list) {
        this.user_list.forEach((item) => {
          if (item.username == this.name) {
            if (item.password == this.pwd) {
              flag = 1; //用户存在，并且密码正确
            }
          }
        });
        if (flag == 1) {
          //可以跳转到主页
          this.$router.push("Homepage");
        } else {
          alert("用户名或密码错误，请重新输入");
        }
      } else {
        // 取到路由带过来的参数
        var routerParams = this.$route.query.list;
        this.user_list = routerParams;
        this.user_list.forEach((item) => {
          if (item.username == this.name) {
            if (item.password == this.pwd) {
              flag = 1; //用户存在，并且密码正确
            }
          }
        });
        if (flag == 1) {
          //可以跳转到主页
          // this.$router.push("Homepage");
          this.$router.push({
            path: '"Homepage',
          });
        } else {
          alert("用户名或密码错误，请重新输入");
        }
      }
    },
  },
};
</script>

<style scoped>
.impowerBox .title {display: none;}
.impowerBox .info {display: none;}
.status_icon {display: none}
.impowerBox .status {text-align: center;} 
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
  background-color: rgb(225,225,230);
  width: 280px;
  opacity: 0.7;
}
.userbox {
  margin-top: 90px;
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
  /* background-image: url("./img/uI85JA.jpeg"); */
  background-size: cover;
  font-family: sans-serif;
}
.title {
  margin-top: -10px;
  font-weight: bold;
  font-size: 30px;
  color: rgb(22,115,156);
}
/* .title:hover {
  font-size: 21px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
} */
/*.uesr-text {*/
/*  position: left;*/
/*}*/
input {
  outline-style: none;
  border: 0;
  border-bottom: 1px solid #e9e9e9;
  background-color: transparent;
  height: 20px;
  font-family: sans-serif;
  font-size: 15px;
  color: #ffffff;
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
  /* 修改默认背景框的颜色 */
  box-shadow: 0 0 0px 1000px #89ab9e inset !important;
  /* 修改默认字体的颜色 */
  -webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
  font-size: 15px;
  /* 修改默认字体的样式 */
  font-weight: bold;
}
.log-box {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 190px;
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
.login_btn {
  background-color: rgb(122,177,242); /* Green */
  border: none;
  color: #fafafa;
  padding: 5px 74px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 5px;
  outline: none;
  position: absolute;
  left: 58px;
  top: 241px;
}
.login_btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  background-color: #5F82D0;
  transition: all 0.2s ease-in;
}

.warn {
  margin-top: 60px;
  /* margin-right:120px; */
  margin-left: 28px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 17px;
}

.register_btn {
  background-color: transparent; /* Green */
  border: none;
  text-decoration: none;
  font-size: 12px;
  /* border-radius: 20px;   */
  color: #4e655d;
  display: flex;
  margin-left: 52px;
  margin-top: 3px;
  outline: none;
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
  color: black;
  margin-right: 10px;
  margin-top: 8px;
}

.icon-key:before {
  content: "\e775";
}

.icon-account:before {
  content: "\e817";
}

/deep/ .el-input__inner {
  background-color: #ffffff;
}
</style>
