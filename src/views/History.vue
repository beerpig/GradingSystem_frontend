<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-table :data="uploadHistory" stripe border>
            <el-table-column :index="recordIndex" type="index" width="80" align="center" v-if="userType === '3'" />
            <el-table-column prop="upload_time" label="时间" width="250" align="center" v-if="userType === '3'"/>
            <el-table-column prop="user_name" label="用户名" :width="userType === '3' ? undefined : 130" v-if="userType === '3'" />
            <el-table-column prop="ip" label="IP 地址" width="130" align="center" v-if="userType === '3'" />
            <el-table-column label="文件" width="100" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="download(scope.row.no)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column label="评分" width="130" align="center" v-if="userType === '3'">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>{{ scope.row.score }}</span>
                  <el-button size="mini" style="margin-left: 0.3rem">
                    查看
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="分配" width="100" align="center" v-if="userType === '3'">
              <template slot-scope="scope">
                <el-button size="mini" @click="assign(scope.row.no)">选择顾问</el-button>
              </template>
            </el-table-column>
            <el-table-column label="人工评分" align="center" v-if="userType === '2'">
              <template slot-scope="scope">
                <el-row type="flex" align="middle">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      placeholder="手动评语"
                      :autosize="{ minRows: 3 }"
                      v-model="scope.row.comment"
                    />
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  align="middle"
                  justify="end"
                  style="margin-top: 0.5rem;"
                >
                  <el-col :span="4">
                    <el-input type="number" placeholder="手动评分" v-model="scope.row.score" />
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      size="mini"
                      style="margin-left: 0.3rem"
                      @click="submit(scope.row)"
                    >
                      提交
                    </el-button>
                  </el-col>
                </el-row>
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
      this.uploadHistory = resp.data.records;
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
    assign(id) {
      this.$router.push(`/historyAssignUser/${id}`);
    },
    submit(row) {
      this.$axios
        .post(
          `/comment/${row.no}`,
          { score: row.score, comment: row.comment},
        );
    },
  },
};
</script>

<style>
</style>
