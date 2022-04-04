<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-table :data="uploadHistory">
            <el-table-column prop="no" label="序号" />
            <el-table-column prop="upload_time" label="时间" />
            <el-table-column prop="user_name" label="用户名" />
            <el-table-column prop="ip" label="IP 地址" />
            <el-table-column label="文件">
              <template slot-scope="scope">
                <el-button size="mini" @click="download(scope.row.no)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column label="评分">
              <template slot-scope="scope">
                <span>{{ scope.row.score }}</span>
                <el-button size="mini" style="margin-left: 0.3rem">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="人工评分">
              <template slot-scope="scope">
                <el-row type="flex" align="middle">
                  <el-col :span="16">
                    <el-input/>
                  </el-col>
                  <el-col :span="8">
                    <el-button size="mini" style="margin-left: 0.3rem">
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
    }
  },
  mounted() {
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
  },
};
</script>

<style>
</style>
