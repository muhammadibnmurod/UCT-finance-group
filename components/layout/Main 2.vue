<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("solution");

const heroTabs = [
  {
    name: "solution",
    title: "Moliyaviy model",
    heading: [
      "Moliyani tartibga soling.",
      "Foydani oshiring.",
      "Biznesni boshqaring."
    ],
    description:
      "Biz biznesingizning moliyaviy modelini quramiz, pul oqimini nazorat qilamiz va strategik qarorlar uchun aniq raqamlar beramiz."
  },
  {
    name: "efficiency",
    title: "Foyda o'sishi",
    heading: [
      "Xarajatlarni qisqartiring.",
      "Daromadni kengaytiring.",
      "Samaradorlikni oshiring."
    ],
    description:
      "Tahliliy yondashuv bilan yo'qotishlarni kamaytiramiz, foyda marjasini yaxshilaymiz va o'sish uchun aniq yo'nalish beramiz."
  },
  {
    name: "management",
    title: "Biznes boshqaruvi",
    heading: [
      "Qarorlarni tezlashtiring.",
      "Jarayonlarni boshqaring.",
      "Natijani nazorat qiling."
    ],
    description:
      "Boshqaruv uchun kerakli KPI, hisobotlar va real vaqtda kuzatuv tizimini yo'lga qo'yib, biznesni to'liq nazoratga olasiz."
  }
];
</script>

<template>
  <section class="pt-5">
    <el-tabs v-model="activeTab" class="hero-tabs">
      <el-tab-pane v-for="tab in heroTabs" :key="tab.name" :name="tab.name">
        <template #label>
          <span class="hero-tab-line" :aria-label="tab.title" />
        </template>

        <div
          class="hero-card relative overflow-hidden rounded-[28px] px-10 pb-0 pt-8"
        >
          <!-- Content -->
          <div class="hero-content relative z-10 max-w-[60%] pb-10">
            <h1
              class="hero-heading font-syn font-extrabold text-white leading-[1.05] tracking-[-0.02em]"
            >
              {{ tab.heading[0] }}<br />
              {{ tab.heading[1] }}<br />
              {{ tab.heading[2] }}
            </h1>

            <p
              class="hero-description mt-4 font-manrope text-white/90 leading-[1.4]"
            >
              {{ tab.description }}
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <el-button class="hero-btn hero-btn--light"
                >Bepul konsultatsiya</el-button
              >
              <el-button class="hero-btn hero-btn--dark"
                >Tijoriy taklif olish</el-button
              >
            </div>
          </div>

          <!-- Person image -->
          <img
            src="@/assets/images/MainImage.png"
            alt="Biznes maslahatchi"
            class="hero-image pointer-events-none absolute bottom-0 right-0 z-10 w-20 h-12"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<style scoped lang="css">
/* ── Card ── */
.hero-card {
  background: linear-gradient(
    100deg,
    #183f03 0%,
    #0f6a70 42%,
    #1b8077 67%,
    #6ca83b 100%
  );
  min-height: 400px;
}

.hero-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 48%, rgba(0, 0, 0, 0.5) 0%, transparent 34%),
    radial-gradient(
      circle at 80% 50%,
      rgba(126, 210, 88, 0.28) 0%,
      transparent 36%
    );
  pointer-events: none;
}

/* ── Typography ── */
.hero-heading {
  font-size: 52px;
}

.hero-description {
  font-size: 17px;
  max-width: 580px;
}

/* ── Image ── */
.hero-image {
  width: 76%;
  max-width: 760px;
  right: 10px;
  height: 100%;
  object-fit: contain;
  object-position: bottom right;
}

/* ── Tabs ── */
:deep(.hero-tabs .el-tabs__header) {
  margin: 0;
  padding: 0 14px;
}

:deep(.hero-tabs .el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.hero-tabs .el-tabs__item) {
  width: calc((100vw - 16rem) / 3);
  max-width: 390px;
  height: 26px;
  padding: 0;
}

.hero-tab-line {
  display: block;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.38);
}

:deep(.hero-tabs .el-tabs__active-bar) {
  display: none;
}

:deep(.hero-tabs .el-tabs__item.is-active .hero-tab-line) {
  background: #ffffff;
}

/* ── Buttons ── */
.hero-btn {
  height: 48px;
  border-radius: 14px;
  border: none;
  padding: 0 28px;
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.hero-btn--light {
  color: #2cb36c;
  background: #ffffff;
}

.hero-btn--light:hover {
  color: #23985b;
  background: #f0f0f0;
}

.hero-btn--dark {
  color: #ffffff;
  background: rgba(46, 130, 106, 0.75);
}

.hero-btn--dark:hover {
  color: #ffffff;
  background: rgba(41, 116, 95, 0.9);
}

/* ── Responsive ── */
@media (max-width: 1280px) {
  .hero-heading {
    font-size: 42px;
  }
  .hero-description {
    font-size: 15px;
  }
}

@media (max-width: 992px) {
  :deep(.hero-tabs .el-tabs__item) {
    width: calc((100vw - 5rem) / 3);
    max-width: none;
  }

  .hero-card {
    border-radius: 20px;
    padding: 24px 20px 0;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-image {
    position: static;
    width: 70%;
    max-width: 360px;
    display: block;
    margin: 16px auto 0;
    height: auto;
  }

  .hero-heading {
    font-size: 34px;
  }
}

@media (max-width: 640px) {
  .hero-heading {
    font-size: 26px;
  }
  .hero-description {
    font-size: 14px;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
    font-size: 15px;
  }
}
</style>
