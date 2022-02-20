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

<style>
.reply {
    padding-left: 4px;
    border-left: 1px solid #eee;
}

ul {
    padding-left: 20px;
    list-style: none;
}

.root { display: none; }

.myfooter{
    position:absolute;
    bottom:0;
    width:100%;
}
</style>
