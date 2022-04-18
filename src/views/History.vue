<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-table :data="uploadHistory" stripe border>
            <el-table-column
              label="id"
              width="80"
              align="center"
              v-if="userType === '3'"
            >
              <template slot-scope="scope">
                {{ scope.row.no }}
              </template>
            </el-table-column>
            <el-table-column
              prop="upload_time"
              label="时间"
              width="250"
              align="center"
              v-if="userType === '3'"
            />
            <el-table-column
              prop="user_name"
              label="用户名"
              align="center"
              :width="userType === '3' ? undefined : 130"
              v-if="userType === '3'"
            />
            <el-table-column
              prop="ip"
              label="IP 地址"
              width="130"
              align="center"
              v-if="userType === '3'"
            />
            <el-table-column label="文件" width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="download(scope.row.no)" v-if="userType === '3'" size="small">
                  下载
                </el-button>
                <button
                  class="download_bt"
                  @click="download(scope.row.no)"
                  style="
                    border: none;
                    background-color: #fff;
                    font-size: 18px;
                    color: #606266;
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-top: 12px;
                    transform: translateX(-50%);
                    white-space: nowrap;
                  "
                  v-else
                >
                  下载<br/>商业<br/>计划书
                </button>
              </template>
            </el-table-column>
            <el-table-column
              label="评分"
              width="130"
              align="center"
              v-if="userType === '3'"
            >
              <template slot-scope="scope">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <span>{{ scope.row.score }}</span>
                  <el-button size="mini" style="margin-left: 0.3rem">
                    查看
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="分配"
              width="130"
              align="center"
              v-if="userType === '3'"
            >
              <template slot-scope="scope">
                <el-button size="mini" @click="assign(scope.row.no)"
                  >选择顾问</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              label="顾问评价及打分"
              align="center"
              v-if="(userType === '2') | (userType === '4')"
            >
              <template slot-scope="scope">
                <el-row type="flex" align="middle">
                  <el-col :span="24">
                    <el-input
                      type="textarea"
                      placeholder="请根据左侧商业计划书给出您的评语（300～500字）"
                      :autosize="{ minRows: 3 }"
                      v-model="scope.row.comment"
                    />
                  </el-col>
                </el-row>
                <el-row
                  type="flex"
                  align="middle"
                  justify="end"
                  style="margin-top: 0.5rem"
                >
                  <span>评分：</span>
                  <el-col :span="4">
                    <el-input
                      type="number"
                      placeholder="70"
                      v-model="scope.row.score"
                    />
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
      userType: "0",
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.userType = sessionStorage.getItem("usertype");
      this.$axios
        .get("/historyRecord", {
          params: {
            username: sessionStorage.getItem("username"),
          },
        })
        .then((resp) => {
          this.uploadHistory = resp.data.records;
        });
    },
    download(id) {
      this.$axios({
          method: 'get',
          url: `download_by_no/${id}`,
          responseType: 'blob'
      }).then( res => {
          if (res.data) {
              let blob = new Blob([res.data], {
                  type: "application/zip"
              });
              saveAs(blob, 'file');
          }
      }).catch( error => {
          console.log('error',error);
      })
      // this.$axios
      //   .get(`download_by_no/${id}`, { responseType: "blob" })
      //   .then((response) => {
      //     const url = window.URL.createObjectURL(new Blob([response.data]));
      //     const link = document.createElement("a");
      //     link.href = url;
      //     link.setAttribute("download", "file.zip");
      //     document.body.appendChild(link);
      //     link.click();
      //   });
    },
    assign(id) {
      this.$router.push(`/historyAssignUser/${id}`);
    },
    submit(row) {
      this.$axios
        .post(`/comment/${row.no}`, {
          score: row.score,
          comment: row.comment,
        })
        .then(() => {
          this.$message.success("提交成功");
          this.$router.go(0);
          this.refresh();
        });
      this.$router.go(0);
    },
  },
};
</script>

<style>
.download_bt:hover {
  text-decoration: underline;
  color: blue;
}
</style>
