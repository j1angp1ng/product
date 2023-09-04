<template>
  <div>
    <!-- 使用svg矢量图  svg和use标签结合使用-->
    <!-- xlink:href表示你需要使用哪个图标 -->
    <!-- 可以为图标指定大小颜色等 -->
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
// 图标需要动态绑定，动态接收属性定制图标
defineProps({
  // 前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  // 名称
  name: {
    type: String,
  },
  // 颜色
  color: {
    type: String,
    default: "",
  },
  // 宽度
  width: {
    type: String,
    default: "",
  },
  // 高度
  height: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
