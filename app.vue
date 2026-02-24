<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import "element-plus/theme-chalk/dark/css-vars.css";
//
// const { elLocale } = useElementLocale();
</script>

<template>
  <ElConfigProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
