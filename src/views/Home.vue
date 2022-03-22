<template>
  <el-container class="home_container">
    <el-header>
        
      <el-link
        type="primary"
        :underline="false"
        class="home_title"
        @click="jumpAddZip"
        style="font-size: 30px; color: #fff"
        >
        <img
          src="./../assets/logo.png"
          style="
            width: 40px;
            height: 40px;
            border-radius: 20px;
            vertical-align: middle;
          "
        /> <span class="home_title_span">远见元智能科创项目评价系统</span></el-link
      >
      <el-dropdown trigger="hover" class="userinfo">
        <div class="el-dropdown-link userinfo-inner">
          <div>
            <span
              style="
                font-size: 16px;
                color: #fff;
                margin-right: 10px;
                margin-top: 10px;
              "
              >{{ welcomeUser }}
            </span>
            <br />
            <span @click="setEmail" style="float: left">{{ sysUserName }}</span>
          </div>
          <div class="img-display">
            <img
              src="https://s1.ax1x.com/2018/02/08/93yKtU.jpg"
              style="
                width: 40px;
                height: 40px;
                border-radius: 20px;
                vertical-align: middle;
              "
            />
          </div>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogPasswordFormVisible = true"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item divided @click.native="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-dialog title="修改密码" :visible.sync="dialogPasswordFormVisible">
      <el-form :model="pwdForm" ref="pwdForm" :rules="fieldRules">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="pwd">
          <el-input
            v-model="pwdForm.pwd"
            autocomplete="off"
            show-password
            placeholder="请填写旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          :label-width="formLabelWidth"
          prop="pwdNew"
        >
          <el-input
            v-model="pwdForm.pwdNew"
            autocomplete="off"
            show-password
            placeholder="请填写新密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          :label-width="formLabelWidth"
          prop="repwd"
        >
          <el-input
            v-model="pwdForm.repwd"
            autocomplete="off"
            show-password
            placeholder="请确认新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendPwd('pwdForm')"
          >确认修改</el-button
        >
      </div>
    </el-dialog>
    <el-container class="el-container">
      <el-aside
        :width="isCollapse ? '66px' : '200px'"
        style="background-color: #fff"
      >
        <el-menu
          :default-active="$route.path"
          router
          :default-openeds="openeds"
          :collapse="isCollapse"
        >
          <el-submenu index="0" style="text-align: left">
            <template slot="title"
              ><i class="el-icon-goods"></i
              ><span slot="title">项目评分</span></template
            >
            <el-menu-item index="/addZip">
              <div style="position: relative; left: 20px">
                <i class="el-icon-circle-plus"></i>添加作品
              </div>
            </el-menu-item>
            <el-menu-item index="/collapse">
              <div style="position: relative; left: 20px">
                <i class="el-icon-finished"></i>评分结果
              </div>
            </el-menu-item>
            <el-menu-item index="/mutilAdd">
              <div style="position: relative; left: 20px">
                <i class="el-icon-folder-add"></i>批量上传
              </div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/history" v-if="userType === '2'" style="text-align: left">
            <div>
              <i class="el-icon-finished"></i>上传记录
            </div>
          </el-menu-item>

          <!-- <el-submenu :index="1">
            <template slot="title"
              ><i class="el-icon-finished"></i>数据统计</template
            >
            <el-menu-item index="/bar">
              <div style="position: relative; left: 20px">
                <i class="el-icon-s-data"></i>柱状图
              </div>
            </el-menu-item>
            <el-menu-item index="/pie">
              <div style="position: relative; left: 20px">
                <i class="el-icon-s-marketing"></i>饼图
              </div>
            </el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/addZip' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              v-text="this.$router.currentRoute.name"
            ></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- <div class="welcome">
            <div class="content">

              <div class="sub-title">欢迎体验</div>
              <div class="title">远见元智能科创目评价系统</div>
              <div class="desc">- 基于Vue + ElementUI + Flask</div>
            </div>
            <div class="img"></div>
          </div> -->

          <router-view></router-view>
        </el-main>
      </el-container>
      <el-dialog title="邮箱验证" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="fieldRules">
          <el-form-item
            label="邮箱地址"
            :label-width="formLabelWidth"
            prop="email"
          >
            <el-input
              v-model="form.email"
              autocomplete="off"
              placeholder="请填写邮箱地址"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱验证码"
            :label-width="formLabelWidth"
            prop="code"
          >
            <el-input
              v-model="form.code"
              autocomplete="off"
              placeholder="请填写邮箱验证码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="sendEmailCode('form')"
            >校验</el-button
          >
          <el-button type="primary" @click="sendEmail('form')"
            >发送验证码</el-button
          >
        </div>
      </el-dialog>

      <!-- <el-input :value="dialogFormVisible"></el-input> -->
    </el-container>
    <el-footer class="footer"
      ><div class="footer-copyright">
        远见（无锡）大数据科技有限公司 2021-2022 © ALL Rights Reserved
      </div></el-footer
    >
  </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
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
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value === this.pwdForm.pwd) {
        callback(new Error("新旧密码不能相同!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.pwdNew) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      screenWidth: document.body.clientWidth,
      isCollapse: false,
      openeds: ["0"],
      uniqueOpened: false,
      sysUserName: "",
      userType: "0",
      welcomeUser: "欢迎，" + sessionStorage.getItem("username"),
      dialogFormVisible: this.$store.state.toDialogFormVisible,
      dialogFormEmail: this.$store.state.toDialogFormEmail,
      dialogPasswordFormVisible: false,
      // dialogFormVisible: true,
      form: {
        email: this.$store.state.toDialogFormEmail,
        code: "",
        username: sessionStorage.getItem("username"),
      },
      pwdForm: {
        user: "",
        pwd: "",
        pwdNew: "",
        repwd: "",
      },
      formLabelWidth: "120px",
      fieldRules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        code: [
          {
            min: 4,
            max: 4,
            message: "请输入4位验证码",
            trigger: "change",
          },
        ],
        pwd: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        pwdNew: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
          { validator: validatePass1, trigger: "blur" },
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
      },
    };
  },
  components: {
    HelloWorld,
  },
  created() {
    var user = sessionStorage.getItem("username");
    var usertype = sessionStorage.getItem("usertype");
    this.userType = usertype;
    console.log("usertype=>", usertype);
    if (usertype === "2") {
      this.sysUserName = "评委";
    } else if (usertype === "1") {
      this.sysUserName = "已验证";
    } else {
      this.sysUserName = "未验证邮箱，点击验证";
    }
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;

      if (this.screenWidth < 1000) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  },
  methods: {
    setEmail() {
      let _this = this;
      if (sessionStorage.getItem("usertype") === "1") {
        return;
      }
      this.$axios
        .get("/getEmail", {
          params: {
            username: sessionStorage.getItem("username"),
          },
        })
        .then((resp) => {
          if (resp) {
            console.log("email=>", resp.data.email);
            this.form.email = resp.data.email;
            this.dialogFormVisible = true;
            // _this.$store.commit('setDialogFormVisible');
            // _this.$store.commit('setDialogFormEmail', {data: resp});
          }
        });
    },
    sendEmailCode(formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/emailValidate", _this.form).then((resp) => {
            if (resp) {
              if (resp.data.code === 11011) {
                _this.$message.success("邮箱验证成功!");
                console.log("dialogFormVisible=>", this.dialogFormVisible);
                this.sysUserName =
                  "欢迎，" + sessionStorage.getItem("username");
                sessionStorage.setItem("usertype", "1");
                this.dialogFormVisible = false;
              } else if (resp.data.code === 11100) {
                _this.$message.error("邮箱验证码错误！");
              }
            }
          });
        } else {
          this.$message.error("error");
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
                email: _this.form.email,
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
    jumpAddZip() {
      this.$router.push({ path: "/addZip" });
    },
    sendPwd(formName) {
      let _this = this;
      this.pwdForm.user = sessionStorage.getItem("username");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/resetPwd", _this.pwdForm).then((resp) => {
            if (resp) {
              if (resp.data.code === 11101) {
                this.$message.success("密码修改成功！");
                this.dialogPasswordFormVisible = false;
              }
            }
          });
        }
      });
    },
    logout() {
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style>
.home_container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}



.el-container {
  display: flex;
}

.el-header {
  background-color: #449aff;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-aside {
  background-color: #ececec;
}

.el-main {
  background-color: #fff;
  color: #000;
  text-align: center;
}

.el-footer {
  background-color: #449aff;
  color: #fff;
  font-size: 22px;
  line-height: 30px;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
}

.home_userinfo {
  color: #fff;
  cursor: pointer;
}

.home_userinfoContainer {
  display: inline;
  margin-right: 20px;
}

.userinfo {
  text-align: right;
  padding-right: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userinfo-inner {
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 300px) and (max-width: 1000px) {
  .home_title_span {
    display: none;
  }
  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }
  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
  .img-display {
    display: none;
  }
  /* .userinfo {
    display: none;
  } */
}
</style>
