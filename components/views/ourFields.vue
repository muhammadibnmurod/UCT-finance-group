<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Image1 from "@/assets/images/ourFields/image1.png";
import Image2 from "@/assets/images/ourFields/image2.png";
import Image3 from "@/assets/images/ourFields/image3.png";
import Image4 from "@/assets/images/ourFields/image4.png";
import Image5 from "@/assets/images/ourFields/image5.png";
import Image6 from "@/assets/images/ourFields/image6.png";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FieldCard {
  id: string;
  title: string;
  /** tall = col-1 spans 2 rows | top = full col | bottom-wide = col2 full | bottom = half col3 */
  span: "tall" | "top" | "bottom-wide" | "bottom";
  image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const fields: FieldCard[] = [
  {
    id: "services",
    title: "Xizmat ko'rsatish sohasi",
    span: "tall",
    image: Image1
  },
  {
    id: "it",
    title: "IT va texnologiyalar",
    span: "top",
    image: Image2
  },
  {
    id: "horeca",
    title: "HoReCa (restoran va mehmonxona)",
    span: "top",
    image: Image3
  },
  {
    id: "logistics",
    title: "Logistika va transport",
    span: "bottom-wide",
    image: Image4
  },
  {
    id: "retail",
    title: "Savdo va retail",
    span: "bottom",
    image: Image5
  },
  {
    id: "construction",
    title: "Qurilish va ishlab chiqarish",
    span: "bottom",
    image: Image6
  }
];

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const hoveredId = ref<string | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) visible.value = true;
    },
    { threshold: 0.1 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());

const revealOrder: Record<string, number> = {
  services: 0,
  it: 1,
  horeca: 2,
  logistics: 3,
  retail: 4,
  construction: 5
};
</script>

<template>
  <section
    class="our-fields"
    ref="sectionRef"
    :class="{ 'is-visible': visible }"
  >
    <div class="mx-auto w-full max-w-[1160px] px-[30px]">
      <!-- Header -->
      <div class="fields-header">
        <p class="fields-eyebrow font-syne">QAYSI SOHALAR BILAN ISHLAYMIZ?</p>
        <h2 class="fields-title font-syne">
          Har bir soha uchun individual<br />moliyaviy yondashuv
        </h2>
      </div>

      <!-- CTAs -->
      <div class="fields-actions">
        <button type="button" class="field-btn field-btn--primary font-manrope">
          Bepul konsultatsiya
        </button>
        <button
          type="button"
          class="field-btn field-btn--secondary font-manrope"
        >
          Tijoriy taklif olish
        </button>
      </div>

      <!-- Grid -->
      <div class="fields-grid">
        <article
          v-for="card in fields"
          :key="card.id"
          class="field-card"
          :class="[`field-card--${card.span}`]"
          :style="{ '--order': revealOrder[card.id] }"
          @mouseenter="hoveredId = card.id"
          @mouseleave="hoveredId = null"
        >
          <!-- Subtle glow on hover -->
          <span class="card-glow" aria-hidden="true" />

          <!-- Title top-left -->
          <h3 class="field-title font-syne">{{ card.title }}</h3>

          <!-- 3D illustration image bottom-right -->
          <img
            :src="card.image"
            :alt="card.title"
            class="card-image"
            draggable="false"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.our-fields {
  border-radius: 28px;
  background: #f4f4f6;
  padding: 52px 40px 60px;
}

/* ── Header ──────────────────────────────────────────────── */
.fields-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fields-eyebrow {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1.6px;
  color: #9a9aa3;
}

.fields-title {
  margin: 0;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.2;
  color: #39b270;
}

/* ── CTAs ────────────────────────────────────────────────── */
.fields-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.field-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  min-width: 210px;
  border-radius: 999px;
  border: none;
  padding: 0 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.field-btn:active {
  transform: scale(0.96) !important;
}

.field-btn--primary {
  background: #39b270;
  color: #fff;
}
.field-btn--primary:hover {
  background: #2f9b5f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(57, 178, 112, 0.3);
}

.field-btn--secondary {
  background: #e4e4ea;
  color: #39b270;
}
.field-btn--secondary:hover {
  background: #d8d8df;
  transform: translateY(-2px);
}

/* ── Grid ────────────────────────────────────────────────── */
.fields-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 14px;
  margin-top: 40px;
}

/* ── Card base ───────────────────────────────────────────── */
.field-card {
  position: relative;
  border-radius: 22px;
  background: #ffffff;
  padding: 22px 20px 0;
  overflow: hidden;
  cursor: default;
  display: flex;
  flex-direction: column;

  /* Entrance */
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition:
    opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--order, 0) * 85ms),
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--order, 0) * 85ms),
    box-shadow 0.3s ease;
}

.is-visible .field-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.field-card:hover {
  box-shadow:
    0 16px 44px rgba(0, 0, 0, 0.09),
    0 2px 8px rgba(0, 0, 0, 0.05);
  transform: translateY(-5px);
}

/* ── Span variants ───────────────────────────────────────── */
.field-card--tall {
  grid-column: span 2;
  grid-row: span 2;
  min-height: 420px;
}
.field-card--top {
  grid-column: span 2;
  min-height: 210px;
}
.field-card--bottom-wide {
  grid-column: span 2;
  min-height: 200px;
}
.field-card--bottom {
  grid-column: span 1;
  min-height: 200px;
}

/* ── Glow ────────────────────────────────────────────────── */
.card-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: #39b270;
  opacity: 0;
  filter: blur(50px);
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.field-card:hover .card-glow {
  opacity: 0.08;
}

/* ── Title ───────────────────────────────────────────────── */
.field-title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
  max-width: 200px;
  transition: color 0.22s ease;
}

.field-card--tall .field-title {
  font-size: 19px;
  max-width: 240px;
}

.field-card:hover .field-title {
  color: #237a48;
}

/* ── 3D Image ────────────────────────────────────────────── */
.card-image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 92%;
  height: 68%;
  object-fit: contain;
  object-position: right bottom;
  pointer-events: none;
  user-select: none;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.field-card--tall .card-image {
  width: 100%;
  height: 100%;
}

.field-card:hover .card-image {
  transform: scale(1.05) translateY(-4px);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 980px) {
  .fields-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .field-card--tall,
  .field-card--top,
  .field-card--bottom-wide,
  .field-card--bottom {
    grid-column: span 1;
    grid-row: auto;
    min-height: 180px;
  }
}

@media (max-width: 640px) {
  .our-fields {
    padding: 32px 16px 40px;
  }
  .fields-title {
    font-size: 26px;
  }
  .fields-grid {
    grid-template-columns: 1fr;
  }
  .field-card--tall,
  .field-card--top,
  .field-card--bottom-wide,
  .field-card--bottom {
    grid-column: span 1;
    min-height: 160px;
  }
  .field-btn {
    min-width: 0;
    width: 100%;
  }
  .fields-actions {
    flex-direction: column;
  }
}
</style>
