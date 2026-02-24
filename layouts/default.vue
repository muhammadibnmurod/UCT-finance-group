<template>
  <div>
    <div class="mx-auto w-full max-w-[1600px] px-28 py-4">
      <Header />
      <Main />
    </div>
    <WorksResult class="mt-10 w-screen" />
    <our-direction class="px-28 py-4 !bg-white" />
    <our-fields class="mx-auto w-full px-28 py-4 !bg-white" />
    <Sohalar class="px-28 py-4 mt-10 mb-10 !bg-white" />
    <why-u-c-t class="px-28 py-4" />
    <our-work class="mt-20 px-28 py-4 !bg-white" />
    <uctwhy class="mt-20 px-28 py-4" />
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import OurFields from "@/components/views/ourFields.vue";
import WhyUCT from "@/components/views/whyUCT.vue";
</script>
