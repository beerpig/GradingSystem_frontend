<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col
        :span="10"
        class="logo"
        :class="collapsed ? 'logo-collapse-width' : 'logo-width'"
      >
        {{ collapsed ? "" : sysName }}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"
            ><img src="https://s1.ax1x.com/2018/02/08/93yKtU.jpg" />
            {{ sysUserName }}</span
          >
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="settings"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item divided @click.native="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo el-menu-expand"
          @open="handleopen"
          @close="handleclose"
          @select="handleselect"
          unique-opened
          router
          v-if="!collapsed"
        >
          <template
            v-for="(item, index) in $router.options.routes"
            v-if="!item.hidden"
          >
            <el-submenu :index="index + ''" v-if="!item.leaf">
              <template slot="title"
                ><i :class="item.iconCls"></i>{{ item.name }}</template
              >
              <el-menu-item
                v-for="child in item.children"
                :index="child.path"
                :key="child.path"
                v-if="!child.hidden"
                >{{ child.name }}</el-menu-item
              >
            </el-submenu>
            <el-menu-item
              v-if="item.leaf && item.children.length > 0"
              :index="item.children[0].path"
              ><i :class="item.iconCls"></i
              >{{ item.children[0].name }}</el-menu-item
            >
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul
          class="el-menu el-menu-vertical-demo collapsed"
          v-if="collapsed"
          ref="menuCollapsed"
        >
          <li
            v-for="(item, index) in $router.options.routes"
            v-if="!item.hidden"
            class="el-submenu item"
          >
            <template v-if="!item.leaf">
              <div
                class="el-submenu__title"
                style="padding-left: 20px"
                @mouseover="showMenu(index, true)"
                @mouseout="showMenu(index, false)"
              >
                <i :class="item.iconCls"></i>
              </div>
              <ul
                class="el-menu submenu"
                :class="'submenu-hook-' + index"
                @mouseover="showMenu(index, true)"
                @mouseout="showMenu(index, false)"
              >
                <li
                  v-for="child in item.children"
                  v-if="!child.hidden"
                  :key="child.path"
                  class="el-menu-item"
                  style="padding-left: 40px"
                  :class="$route.path == child.path ? 'is-active' : ''"
                  @click="$router.push(child.path)"
                >
                  {{ child.name }}
                </li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div
                  class="el-submenu__title el-menu-item"
                  style="
                    padding-left: 20px;
                    height: 56px;
                    line-height: 56px;
                    padding: 0 20px;
                  "
                  :class="
                    $route.path == item.children[0].path ? 'is-active' : ''
                  "
                  @click="$router.push(item.children[0].path)"
                >
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{ $route.name }}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item
                v-for="item in $route.matched"
                :key="item.path"
              >
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
      <!--修改密码界面-->
      <el-dialog
        title="修改密码"
        v-model="setpwdFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="setpwdForm"
          label-width="80px"
          :rules="setpwdFormRules"
          ref="setpwdForm"
        >
          <el-row>
            <el-form-item label="原密码" prop="oldpass">
              <el-input
                type="password"
                v-model="setpwdForm.oldpass"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
              <el-input
                type="password"
                v-model="setpwdForm.newpass"
                auto-complete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirpass">
              <el-input
                type="password"
                v-model="setpwdForm.confirpass"
                auto-complete="off"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="setpwdFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click.native="editSubmit"
            :loading="editLoading"
            >提交</el-button
          >
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
// import { setpwd } from "../api/api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度请大于8"));
      } else {
        if (this.setpwdForm.confirpass !== "") {
          this.$refs.setpwdForm.validateField("confirpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.setpwdForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      sysName: "vueadmin",
      collapsed: false,
      sysUserName: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },

      setpwdFormVisible: false,
      editLoading: false,
      setpwdFormRules: {
        oldpass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newpass: [{ validator: validatePass, trigger: "blur" }],
        confirpass: [{ validator: validatePass2, trigger: "blur" }],
      },
      setpwdForm: {
        oldpass: "",
        newpass: "",
        confirpass: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleopen() {
      //console.log('handleopen');
    },
    handleclose() {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {},
    //退出登录
    logout: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("token");
          _this.$router.push("/login");
        })
        .catch(() => {});
    },
    //修改密码
    settings: function () {
      this.setpwdFormVisible = true;
    },
    editSubmit: function () {
      this.$refs.setpwdForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认修改吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.setpwdForm);
            setpwd(para).then((res) => {
              this.editLoading = false;
              let { code, msg } = res.data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: "error",
                });
              } else {
                this.$message({
                  message: msg,
                  type: "success",
                });
              }
              this.$refs["setpwdForm"].resetFields();
              this.setpwdFormVisible = false;
            });
          });
        }
      });
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
  },
  // mounted() {
  //   var token = sessionStorage.getItem("token");
  //   var user = sessionStorage.getItem("name");
  //   if (token && user) {
  //     user = JSON.parse(user);
  //     this.sysUserName = user || "";
  //   } else {
  //     sessionStorage.removeItem("token");
  //     this.$router.push("/login");
  //   }
  // }
};
</script>

<style scoped>
.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}
.userinfo-inner {
  cursor: pointer;
  color: #fff;
}
.logo-width {
      width: 230px;
    }
</style>