<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          用户名：{{ application.userName }}
        </el-col>
        <el-col :span="12">
          状态：
          <span v-if="this.application.status === 0">未审核</span>
          <span v-if="this.application.status === 1" style="color: #F56C6C">已拒绝</span>
          <span v-if="this.application.status === 2" style="color: #67C23A">已通过</span>
          <el-button
            type="success"
            @click="pass()"
            v-if="this.application.status === 0"
            style="margin-left: 0.5rem"
          >
            通过
          </el-button>
          <el-button
            type="danger"
            @click="reject()"
            v-if="this.application.status === 0"
          >
            拒绝
          </el-button>
        </el-col>
        <el-col>
          <el-form label-width="100px" ref="form" :model="form" style="margin-top: 1rem">
            <el-form-item label="姓名" required>
              <el-col :span="6">
                <el-input disabled v-model="application.form.name" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="性别" required>
              <el-col :span="3">
                <el-input disabled v-model="application.form.gender" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="工作单位" required>
              <el-col :span="8">
                <el-input disabled v-model="application.form.company" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="出生年月" required>
              <el-col :span="8">
                <el-input disabled v-model="application.form.birthday" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="联系地址" required>
              <el-col :span="10">
                <el-input disabled v-model="application.form.address" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="手机号码" required>
              <el-col :span="8">
                <el-input disabled v-model="application.form.phoneNumber" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="现任职务" required>
              <el-col :span="8">
                <el-input disabled v-model="application.form.occupation" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="学历" required>
              <el-col :span="8">
                <el-input disabled v-model="application.form.education" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="专业特长" required>
              <el-col :span="12">
                <el-input disabled v-model="application.form.speciality" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="行业领域" required>
              <el-col :span="12">
                <el-input disabled v-model="application.form.area" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="主要业绩">
              <el-input disabled v-model="application.form.performance" type="textarea" @input="changed" />
            </el-form-item>
            <el-form-item label="主要社会兼职">
              <el-input disabled v-model="application.form.partTime" type="textarea" @input="changed" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table :data="uploadHistory" stripe border>
            <el-table-column :index="recordIndex" type="index" width="80" align="center" />
            <el-table-column label="文件" width="100" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="download(scope.row.no)">下载</el-button>
              </template>
            </el-table-column>
            <el-table-column label="评分" width="130" align="center">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>{{ scope.row.ai_score }}</span>
                  <el-button size="mini" style="margin-left: 0.3rem">
                    查看
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="人工评分" align="center">
              <template slot-scope="scope">
                <el-row type="flex" align="middle">
                  <el-col :span="24">
                    <el-input
                      disabled
                      type="textarea"
                      placeholder="手动评语"
                      :autosize="{ minRows: 3 }"
                      v-model="scope.row.comment"
                    />
                  </el-col>
                </el-row>
                <el-row style="margin-top: 0.5rem;">
                  <el-col :span="4">
                    <el-input disabled type="number" placeholder="手动评分" v-model="scope.row.score" />
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
  props: ["id"],
  data() {
    return {
      application: {
        status: 0,
        userName: "",
        form: {
          name: "",
          gender: "",
          company: "",
          birthday: "",
          address: "",
          phoneNumber: "",
          occupation: "",
          education: "",
          speciality: "",
          area: "",
          performance: "",
          partTime: "",
        },
      },
      uploadHistory: [],
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get(`/consultantApplications/by-id/${this.id}`)
        .then((resp) => {
          const { application } = resp.data;
          this.application.userName = application.userName;
          this.application.status = application.status;
          this.application.form = JSON.parse(application.form_json);
          this.$axios.get(`/historyRecord/toUser/${application.user_id}`)
            .then((resp) => {
              this.uploadHistory = resp.data.records;
            });
        });
    },
    reject() {
      this.$axios.post(`/applications/${this.id}/reject`).then(() => this.refresh());
    },
    pass() {
      this.$axios.post(`/applications/${this.id}/pass`).then(() => this.refresh());
    },
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
  },
};
</script>

<style>
</style>
