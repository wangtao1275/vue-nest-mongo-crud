<template>
  <el-container>
    <el-aside width="240px">
      <el-menu mode="vertical" style="height:100vh; font-weight: bold;" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}}`"
        >
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :key="`menu-item-${index}-${subIndex}`"
            :index="subItem.path"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h3>Background management platform</h3>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "Operation Management",
        items: [
          { title: "Home Page", path: "/" },
          { title: "Employees Management", path: "/employees/list" },
          { title: "Cars Management", path: "/cars/list" }
        ]
      }
    ]
  };
}
</script>

<style>
.el-header {
  text-align: center;
}
</style>