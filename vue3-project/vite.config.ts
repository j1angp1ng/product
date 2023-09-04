import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取环境对象
  let env = loadEnv(mode, process.cwd()); //mode为当前环境，第二个参数为当前环境文件位置
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      // command获取当前开发环境
      viteMockServe({
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // 配置scss的全局变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 配置代理服务器
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }

  }
});
