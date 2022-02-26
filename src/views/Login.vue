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
                  style="font-size: 18px; width: 195px"
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
                  style="font-size: 18px; width: 195px"
                  show-password
                />
              </el-form-item>
            </div>
          </el-form>
          <br />
          <div class="log-box">
            <div class="log-box-text">忘记密码</div>
            <button type="primary" class="login_btn" @click="loginF('loginForm')">
              Login
            </button>
          </div>

          <br />
          <div class="warn">@beerpig</div>
          <button type="primary" class="register_btn" @click="register">
            若无账号请点击注册
          </button>
        </div>
        <!-- </form> -->
        <!-- 右侧的注册盒子 -->
        <div class="background">
          <div class="title">Welcome to WH System Management Center</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mock from "../mock.js";
export default {
  name: "Login",

  data: function () {
    return {
      loginForm: {
        name: "",
        pwd: "",
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

  methods: {
    register() {
      this.$router.push("/register");
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
          //    service({url: '/login',method: 'post',data: qs.stringify(this.loginData)})
          //      .then(response => {
          //        const { data } = response
          //        //Cookies.set('Authorization',data.data.token)
          //        alert('submit!!!' +'\n'+ data.msg)
          //      })
          //      .catch(error => {
          //        console.log(error)
          //      })
          
          this.$axios.post("/login", _this.loginForm).then(function (resp) {
              console.log(resp)
            if (resp.data.code === 10000) {
              // let { success, token } = resp.data;
              // console.log(success);
                sessionStorage.setItem('username', _this.loginForm.name)
                sessionStorage.setItem('token', resp.data.token);
                _this.$alert(
                  "【" + _this.loginForm.name + "】添加成功" + resp.data,
                  "",
                  {
                    confirmButtonText: "确定",
                    callback: (action) => {
                      _this.$router.push({path: "/addZip"});
                    },
                  }
                );
                // _this.$router.push({path: "addZip"})
              // if (token) {
              // }
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
  text-decoration: underline;
}
.login_btn {
  background-color: #5f8276; /* Green */
  border: none;
  color: #fafafa;
  padding: 5px 22px;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  border-radius: 20px;
  outline: none;
}
.login_btn:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  background-color: #0b5137;
  transition: all 0.2s ease-in;
}

.warn {
  margin-top: 60px;
  /* margin-right:120px; */
  margin-left: -120px;
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
  font-size: 12px;
  text-decoration: underline;
  display: flex;
  margin-left: 25px;
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
  font-size: 27px;
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