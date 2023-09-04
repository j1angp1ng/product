// 引入需要注册成全局的组件
import SvgIcon from "@/components/SvgIcon/index.vue";
import { Component, App } from "vue";
// 把所有插件封装成对象
const components: { [name: string]: Component } = { SvgIcon };
// 引入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  // 自定义插件
  install(app: App) {
    // 注册全局组件
    Object.keys(components).forEach((item) => {
      app.component(item, components[item]);
    });

    // 注册图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
};
