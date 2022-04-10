<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-table :data="applications" stripe border style="margin-top: 1rem;">
            <el-table-column prop="userName" label="用户名" />
            <el-table-column label="状态" width="100" align="center" sortable sort-by="status">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">未审核</span>
                <span v-if="scope.row.status === 1" style="color: #F56C6C">已拒绝</span>
                <span v-if="scope.row.status === 2" style="color: #67C23A">已通过</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button size="small" @click="view(scope.row.id)">
                  查看
                </el-button>
                <el-button
                  size="small"
                  type="success"
                  @click="pass(scope.row.id)"
                  v-if="scope.row.status === 0"
                >
                  通过
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="reject(scope.row.id)"
                  v-if="scope.row.status === 0"
                >
                  拒绝
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      applications: [],
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get("/consultantApplications")
        .then((resp) => {
          this.applications = resp.data.applications;
        });
    },
    reject(id) {
      this.$axios.post(`/applications/${id}/reject`).then(() => this.refresh());
    },
    pass(id) {
      this.$axios.post(`/applications/${id}/pass`).then(() => this.refresh());
    },
    view(id) {
      this.$router.push(`/consultantApplication/${id}`);
    }
  },
};
</script>

<style>
</style>
