<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col>
          <el-form label-width="100px" ref="form" :model="form">
            <el-form-item label="姓名" required>
              <el-col :span="6">
                <el-input v-model="form.name" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="性别" required>
              <el-col :span="3">
                <el-input v-model="form.gender" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="工作单位" required>
              <el-col :span="8">
                <el-input v-model="form.company" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="出生年月" required>
              <el-col :span="8">
                <el-input v-model="form.birthday" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="联系地址" required>
              <el-col :span="10">
                <el-input v-model="form.address" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="手机号码" required>
              <el-col :span="8">
                <el-input v-model="form.phoneNumber" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="现任职务" required>
              <el-col :span="8">
                <el-input v-model="form.occupation" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="学历" required>
              <el-col :span="8">
                <el-input v-model="form.education" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="专业特长" required>
              <el-col :span="12">
                <el-input v-model="form.speciality" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="行业领域" required>
              <el-col :span="12">
                <el-input v-model="form.area" @input="changed" />
              </el-col>
            </el-form-item>
            <el-form-item label="主要业绩">
              <el-input v-model="form.performance" type="textarea" @input="changed" />
            </el-form-item>
            <el-form-item label="主要社会兼职">
              <el-input v-model="form.partTime" type="textarea" @input="changed" />
            </el-form-item>
          </el-form>
          <el-button @click="submit">提交</el-button>
          <el-button @click="clear">清空</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
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
    }
  },
  mounted() {
    this.userType = sessionStorage.getItem("usertype");

    const savedForm = JSON.parse(sessionStorage.getItem("applyConsultant"));
    if (savedForm) {
      this.form = savedForm;
    }
  },
  methods: {
    changed() {
      sessionStorage.setItem("applyConsultant", JSON.stringify(this.form));
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$axios.post(`/applyConsultant`, { form: JSON.stringify(this.form) });
      });
    },
    clear() {
      this.form = {
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
      };
      this.changed();
    },
  },
};
</script>

<style>
</style>
