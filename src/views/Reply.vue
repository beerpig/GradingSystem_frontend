<template>
  <div>
      <div v-if="data.childlist">
            <!--输出当前data.name -->
            <el-collapse-item :title="data.name">
            <!--如果当前data.childlist 存在-->
                <div v-if="data.childlist && data.childlist.length>0">
                    <Reply v-for="child in data.childlist" :key="child.id" :data="child"/>
                </div>
                <div v-else>
                    <div>{{data.data}}</div>
                </div>
            </el-collapse-item>
      </div>
      <div v-else>
          <div v-if="data.length>1">
              <Reply v-for="child in data" :key="child.id" :data="child"/>
          </div>
          <div v-else>{{data.name}}  {{data.data}}</div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Reply', // 递归组件需要设置 name 属性，才能在模板中调用自己
    props:['data'], // 接受参数为 data
 }
</script>

<style lang='less'scoped>

/deep/ .el-collapse-item__content{
    text-align: left;
    margin-left: 100px;
}
</style>
