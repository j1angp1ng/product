import { createApp } from "vue";
import App from "./App.vue";
// 引入element-plus组件库与样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 引入SVG需要用到的插件
import "virtual:svg-icons-register";
// 引入模板全局样式
import '@/styles/index.scss';
// 引入路由器
import router from '@/router/index.ts';
// 引入pinia
import pinia from '@/store/index.ts';
// 路由鉴权
import '@/permssion.ts';
// 暗黑样式
import 'element-plus/theme-chalk/dark/css-vars.css';

const app = createApp(App);
// 使用elementplus
app.use(ElementPlus, {
  locale: zhCn,
});

// 使用自定义插件注册全局组件，引入插件
import gobalComponent from "@/components";
// 自定义指令
import isHas from '@/directive/has';
isHas(app);
// 使用插件
app.use(gobalComponent);
// 使用路由器
app.use(router);
// 使用Pinia
app.use(pinia);


app.mount("#app");
