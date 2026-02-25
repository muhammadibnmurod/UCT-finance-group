<template>
  <div class="pt-24">
    <div class="mx-auto w-full max-w-[1220px] px-4 py-4">
      <Main />
    </div>
    <WorksResult class="mt-10" />
    <our-direction class="py-4 !bg-white" />
    <our-fields class="py-4 !bg-white" />
    <div class="mx-auto w-full max-w-[1220px] px-4 py-4 mt-10 mb-10">
      <Sohalar class="!bg-white" />
    </div>
    <why-u-c-t class="py-4" />
    <our-work class="mt-20 py-4 !bg-white" />
    <!-- <uctwhy class="mt-20 py-4" /> -->
    <NewPage class="mt-20 py-4" />
    <OurEmployee class="mt-20 py-4 !bg-white" />
  </div>
</template>

<script setup lang="ts">
import OurFields from "@/components/views/ourFields.vue";
import WhyUCT from "@/components/views/whyUCT.vue";
import NewPage from "@/components/views/NewPage.vue";
</script>
