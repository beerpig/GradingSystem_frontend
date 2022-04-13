<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-button @click="toEdit" v-if="!isEditing">编辑</el-button>
          <el-button @click="submit" v-if="isEditing">提交</el-button>
          <el-table :data="uploadHistory.filter((u) => isEditing || u.isWaiting)" stripe border style="margin-top: 1rem;">
            <el-table-column :index="recordIndex" type="index" width="80" align="center" />
            <el-table-column prop="upload_time" label="时间" width="250" align="center" />
            <el-table-column prop="user_name" label="用户名" />
            <el-table-column prop="ip" label="IP 地址" width="130" align="center" />
            <el-table-column label="文件" width="100" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="download(scope.row.no)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column label="评分" width="130" align="center">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>{{ scope.row.score }}</span>
                  <el-button size="mini" style="margin-left: 0.3rem">
                    查看
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="待评语" width="100" align="center" sortable sort-by="isWaiting">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isWaiting" />
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
      uploadHistory: [],
      userType: '0',
      isEditing: false,
    }
  },
  mounted() {
    this.userType = sessionStorage.getItem("usertype");
    this.$axios.get("/historyRecord", {
      params: {
        username: sessionStorage.getItem("username"),
      },
    }
    ).then((resp) => {
      this.uploadHistory = resp.data.records.map((r) => ({ ...r, isWaiting: r.isWaiting !== 0 }));
    });
  },
  methods: {
    download(id) {
      this.$axios.get(`download_by_no/${id}`, { responseType: 'blob' })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.zip');
          document.body.appendChild(link);
          link.click();
        });
    },
    recordIndex(index) {
      return this.uploadHistory[index].no;
    },
    submit() {
      this.isEditing = false;
      this.$axios.post(`/specifyBP`, { bps: this.uploadHistory.filter((r) => r.isWaiting).map((r) => r.no) });
    },
    toEdit() {
      this.isEditing = true;
    },
  },
};
</script>

<style>
</style>
