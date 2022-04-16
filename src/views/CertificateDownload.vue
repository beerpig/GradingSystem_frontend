<template>
  <div>
    <h2>恭喜您成为远见元智能科创项目创业顾问！</h2>
    <el-button @click="downloadCertificate">下载证书</el-button>
    <div class="certificate-img">
      <el-image :src="'data:image/png;base64,' + certBase64" :fit="fit">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        certBase64:``,
    };
  },
  created() {
    console.log(
      'sessionStorage.getItem("cert")',
      sessionStorage.getItem("cert")
    );
  },
  mounted() {
    this.getCertificate();
  },
  methods: {
    getCertificate() {
      const user = sessionStorage.getItem("username");
      if (!sessionStorage.getItem("cert")) {
        this.$axios
          .get(`authorization/generate/getCertPic/${user}`)
          .then((response) => {
            console.log('response',response);
            if (response) {
              this.certBase64 = response.data.cert;
            }
          });
      }
    },
    downloadCertificate() {
      const user = sessionStorage.getItem("username");

      this.$axios
        .get(`authorization/generate/getfile/${user}`, { responseType: "blob" })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "certificate.png");
          document.body.appendChild(link);
          link.click();
        });
    },
  },
};
</script>

<style lang='less' scoped>
/deep/ .el-image__inner {
  width: 50%;
  height: 50%;
}
</style>