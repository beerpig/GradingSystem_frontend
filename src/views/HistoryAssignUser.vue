<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <h1>未分配用户</h1>
          <ul>
            <li v-for="(user, index) in freeUsers" :key="index" style="margin-top: 0.5rem">
              <el-button @click="assign(user.id)">{{ user.userName }}</el-button>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <h1>已分配用户</h1>
          <ul>
            <li v-for="(user, index) in usedUsers" :key="index" style="margin-top: 0.5rem">
              <el-button @click="deassign(user.id)">{{ user.userName }}</el-button>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      allUsers: [],
      assignedUsers: [],
    }
  },
  props: ["id"],
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get("/users_by_type/2")
        .then((resp) => {
        this.allUsers = resp.data.users;
      });
      this.$axios.get(`/assigned_users/${this.id}`)
        .then((resp) => {
        this.assignedUsers = resp.data.users;
      });
    },
    assign(userId) {
      this.$axios.post(`/assign/${this.id}/${userId}`)
        .then(() => this.refresh());
    },
    deassign(userId) {
      this.$axios.delete(`/assign/${this.id}/${userId}`)
        .then(() => this.refresh());
    }
  },
  computed: {
    freeUsers() {
      return this.allUsers.filter((user) => {
        return !this.assignedUsers.some((au) => au.user_id === user.id);
      })
    },
    usedUsers() {
      return this.allUsers.filter((user) => {
        return this.assignedUsers.some((au) => au.user_id === user.id);
      })
    },
  },
};
</script>

<style>
</style>
