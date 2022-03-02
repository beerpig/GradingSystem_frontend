<template>
  <el-container class="home_container">
    <el-header>
      <el-link type="primary" :underline="false" class="home_title" @click="jumpAddZip">远见元智能科创目评价系统</el-link>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"
            ><img
              src="https://s1.ax1x.com/2018/02/08/93yKtU.jpg"
              style="
                width: 40px;
                height: 40px;
                border-radius: 20px;
                margin: 10px 0px 10px 10px;
                float: right;
              "
            />
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
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #83a798">
        <el-menu :default-active="$route.path" router>
          <el-submenu :index="0">
            <template slot="title"
              ><i class="el-icon-goods"></i>个人管理</template
            >
            <!-- <el-menu-item index="/productManage">
              <div style="position: relative;left: 20px;">
                <i class="el-icon-s-unfold"></i>提交管理
              </div>
            </el-menu-item> -->
            <!-- <el-menu-item index="/add">
              <div style="position: relative;left: 20px;">
                <i class="el-icon-circle-plus"></i>添加商品
              </div>
            </el-menu-item> -->
            <el-menu-item index="/addZip">
              <div style="position: relative; left: 20px">
                <i class="el-icon-circle-plus"></i>添加作品
              </div>
            </el-menu-item>
            <el-menu-item index="/Collapse">
              <div style="position: relative; left: 20px">
                <i class="el-icon-finished"></i>评分查看
              </div>
            </el-menu-item>
          </el-submenu>

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
          <router-view></router-view>
        </el-main>
        <el-footer>@CopyRight</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    jumpAddZip() {
      this.$router.push({ path: "/addZip"});
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

.el-header {
  background-color: #485f55;
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
  background-color: #bfcfca;
  color: #fff;
  font-size: 22px;
  line-height: 60px;
}

.home_title {
  color: #fff;
  font-size: 22px;
  display: inline;
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
  float: right;
}

.userinfo-inner {
  cursor: pointer;
  color: #fff;
}
</style>
