<script setup lang="ts">
import { ref } from "vue";
import MainImage from "@/assets/images/MainImage.png";

const activeTab = ref("model");

const tabs = [
  { name: "model", ariaLabel: "Moliyaviy model" },
  { name: "profit", ariaLabel: "Foyda o'sishi" },
  { name: "manage", ariaLabel: "Biznes boshqaruvi" }
];
</script>

<template>
  <section class="main-hero">
    <el-tabs v-model="activeTab" class="hero-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name">
        <template #label>
          <span class="hero-tab-line" :aria-label="tab.ariaLabel" />
        </template>

        <div class="hero-card !flex">
          <div class="hero-content">
            <h1 class="hero-title font-syne">
              Moliyani tartibga soling.
              <br />
              Foydani oshiring.
              <br />
              Biznesni boshqaring.
            </h1>

            <p class="hero-description font-manrope">
              Biz biznesingizning moliyaviy modelini quramiz, pul oqimini
              nazorat qilamiz va strategik qarorlar uchun aniq raqamlar beramiz.
            </p>

            <div class="hero-actions">
              <el-button class="hero-btn hero-btn-primary">
                Bepul konsultatsiya
              </el-button>
              <el-button class="hero-btn hero-btn-secondary">
                Tijoriy taklif olish
              </el-button>
            </div>
          </div>

          <img :src="MainImage" alt="Biznes maslahatchi" class="hero-image" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<style scoped lang="css">
.main-hero {
  margin-top: 26px;
}

:deep(.hero-tabs .el-tabs__header) {
  margin: 0;
}

:deep(.hero-tabs .el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.hero-tabs .el-tabs__nav-scroll) {
  padding: 0 52px;
}

:deep(.hero-tabs .el-tabs__nav) {
  width: 100%;
  display: flex;
  gap: 6px;
}

:deep(.hero-tabs .el-tabs__item) {
  flex: 1 1 0;
  height: 36px;
  padding: 0;
  padding-top: 30px !important;
}

:deep(.hero-tabs .el-tabs__content) {
  margin-top: -18px;
}

:deep(.hero-tabs .el-tabs__active-bar) {
  display: none;
}

.hero-tab-line {
  display: block;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);
}

:deep(.hero-tabs .el-tabs__item.is-active .hero-tab-line) {
  background: #ffffff;
}

/* ── Card ── */
.hero-card {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  border-radius: 28px;
  padding: 52px 0 0 52px;
  background: linear-gradient(
    96deg,
    #204407 0%,
    #0f6a70 41%,
    #1d8278 67%,
    #6fa83e 100%
  );
}

.hero-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(52% 80% at 12% 50%, rgba(0, 0, 0, 0.5) 0%, transparent 70%),
    radial-gradient(
      42% 68% at 84% 47%,
      rgba(147, 226, 92, 0.32) 0%,
      transparent 74%
    );
  pointer-events: none;
}

/* ── Content ── */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 60%;
  padding-bottom: 48px;
}

/* ── Typography ── */
.hero-title {
  margin: 0;
  color: #f4f6f8;
  font-size: 46px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.hero-description {
  margin-top: 16px;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.55;
}

/* ── Buttons ── */
.hero-actions {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-btn {
  height: 46px;
  border: 0;
  border-radius: 14px;
  padding: 0 26px;
  font-family: "Manrope", sans-serif;
  font-size: 15px;
  font-weight: 600;
}

.hero-btn-primary {
  color: #2cb36c;
  background: #ffffff;
}

.hero-btn-primary:hover {
  color: #24985b;
  background: #f5f5f5;
}

.hero-btn-secondary {
  color: #ffffff;
  background: rgba(42, 129, 102, 0.75);
}

.hero-btn-secondary:hover {
  color: #ffffff;
  background: rgba(35, 113, 89, 0.9);
}

/* ── Image ── */
.hero-image {
  //position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 80%;
  max-width: 680px;
  height: 100%;
  object-fit: contain;
  object-position: right bottom;
  pointer-events: none;
}

/* ── Responsive ── */
@media (max-width: 1200px) {
  .hero-card {
    padding: 40px 0 0 30px;
    min-height: 360px;
  }

  .hero-title {
    font-size: 36px;
  }
  .hero-description {
    font-size: 15px;
  }
  .hero-btn {
    height: 42px;
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  :deep(.hero-tabs .el-tabs__nav-scroll) {
    padding: 0 18px;
  }

  .hero-card {
    border-radius: 20px;
    padding: 32px 20px 0;
    min-height: auto;
  }

  .hero-content {
    max-width: 100%;
    padding-bottom: 24px;
  }

  .hero-title {
    font-size: 28px;
  }
  .hero-description {
    font-size: 14px;
  }

  .hero-image {
    position: static;
    display: block;
    width: min(80%, 360px);
    height: auto;
    margin: 20px auto 0;
  }

  .hero-actions {
    margin-top: 20px;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
    font-size: 15px;
  }
}
</style>
