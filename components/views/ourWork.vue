<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import iconCheck from "@/assets/icons/iconCheack.svg";
import chartUserSquare from "@/assets/icons/chart-user-square.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  items: string[];
  theme: "start" | "corporate" | "pro";
  badge?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const plans: Plan[] = [
  {
    id: "start",
    name: "Start",
    subtitle: "Kichik biznes uchun",
    price: "2 100",
    period: "ming so'm / oy",
    items: [
      "Asosiy buxgalteriya",
      "Oylik hisobotlar",
      "Soliq topshirish",
      "Online maslahat"
    ],
    theme: "start"
  },
  {
    id: "corporate",
    name: "Corporate",
    subtitle: "Yirik kompaniyalar uchun",
    price: "4 100",
    period: "ming so'm / oy",
    items: [
      "Individual moliyaviy model",
      "CFO xizmat",
      "Audit va risk nazorati",
      "Investitsion tahlil"
    ],
    theme: "corporate",
    badge: "Mashhur"
  },
  {
    id: "pro",
    name: "Professional",
    subtitle: "O'rta biznes uchun",
    price: "3 100",
    period: "ming so'm / oy",
    items: [
      "To'liq buxgalteriya",
      "Moliyaviy tahlil",
      "Xarajat optimizatsiyasi",
      "Kvartal strategik hisobot"
    ],
    theme: "pro"
  }
];

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const themeTokens = {
  start: {
    bg: "#f2ece4",
    iconBg: "#ea963f",
    nameColor: "#ea963f",
    subtitleColor: "#b9b9bc",
    priceColor: "#ea963f",
    checkColor: "#ea963f",
    itemColor: "#000",
    glow: "rgba(234,150,63,0.18)"
  },
  corporate: {
    bg: "linear-gradient(108deg,#6054e6 0%,#5852de 100%)",
    iconBg: "rgba(255,255,255,0.18)",
    nameColor: "#fff",
    subtitleColor: "#d8d9f8",
    priceColor: "#fff",
    checkColor: "#a9b8ff",
    itemColor: "#fff",
    glow: "rgba(96,84,230,0.35)"
  },
  pro: {
    bg: "#e7efe2",
    iconBg: "#57b57c",
    nameColor: "#57b57c",
    subtitleColor: "#b9b9bc",
    priceColor: "#57b57c",
    checkColor: "#57b57c",
    itemColor: "#000",
    glow: "rgba(87,181,124,0.18)"
  }
};

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const hoveredId = ref<string | null>(null);

let observer: IntersectionObserver | null = null;
onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true;
    },
    { threshold: 0.12 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section class="our-work" ref="sectionRef" :class="{ 'is-visible': visible }">
    <div class="mx-auto w-full max-w-[1260px]">
      <!-- Header -->
      <div class="pricing-header">
        <h2 class="pricing-title font-syne">TARIF REJALARI</h2>
        <p class="pricing-subtitle font-syne">
          Siz biznes bilan shug'ullanasiz – moliyani biz boshqaramiz.
        </p>
      </div>

      <!-- Grid -->
      <div class="plans-grid">
        <!-- Plan cards -->
        <article
          v-for="(plan, i) in plans"
          :key="plan.id"
          class="plan-card"
          :class="{ 'is-hovered': hoveredId === plan.id }"
          :style="{
            '--bg': themeTokens[plan.theme].bg,
            '--icon-bg': themeTokens[plan.theme].iconBg,
            '--name-color': themeTokens[plan.theme].nameColor,
            '--subtitle-color': themeTokens[plan.theme].subtitleColor,
            '--price-color': themeTokens[plan.theme].priceColor,
            '--check-color': themeTokens[plan.theme].checkColor,
            '--item-color': themeTokens[plan.theme].itemColor,
            '--glow': themeTokens[plan.theme].glow,
            '--i': i
          }"
          @mouseenter="hoveredId = plan.id"
          @mouseleave="hoveredId = null"
        >
          <!-- Glow -->
          <span class="plan-glow" aria-hidden="true" />

          <!-- Popular badge -->
          <span v-if="plan.badge" class="plan-badge font-manrope">
            {{ plan.badge }}
          </span>

          <!-- Head -->
          <div class="plan-head">
            <span class="plan-icon-wrap">
              <component
                :is="chartUserSquare"
                class="plan-icon"
                aria-hidden="true"
              />
              <span class="icon-ring" aria-hidden="true" />
            </span>
            <div>
              <h3 class="plan-name font-syne">{{ plan.name }}</h3>
              <p class="plan-subtitle font-syne">{{ plan.subtitle }}</p>
            </div>
          </div>

          <!-- Price -->
          <div class="plan-price-wrap">
            <p class="plan-price font-syne">{{ plan.price }}</p>
            <span class="plan-period font-manrope">{{ plan.period }}</span>
          </div>

          <!-- Divider -->
          <span class="plan-divider" aria-hidden="true" />

          <!-- Items -->
          <ul class="plan-items">
            <li
              v-for="(item, pi) in plan.items"
              :key="item"
              class="plan-item font-syne"
              :style="{ '--pi': pi }"
            >
              <span class="check-wrap" aria-hidden="true">
                <component :is="iconCheck" class="check-icon" />
              </span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <!--          <button type="button" class="plan-btn font-manrope">-->
          <!--            Tanlash-->
          <!--            <svg-->
          <!--              viewBox="0 0 16 16"-->
          <!--              fill="none"-->
          <!--              class="btn-arrow"-->
          <!--              aria-hidden="true"-->
          <!--            >-->
          <!--              <path-->
          <!--                d="M3 8h10M9 4l4 4-4 4"-->
          <!--                stroke="currentColor"-->
          <!--                stroke-width="1.6"-->
          <!--                stroke-linecap="round"-->
          <!--                stroke-linejoin="round"-->
          <!--              />-->
          <!--            </svg>-->
          <!--          </button>-->
        </article>

        <!-- CTA card -->
        <article
          class="cta-card"
          :class="{ 'is-visible': visible }"
          style="--i: 3"
        >
          <span class="cta-glow" aria-hidden="true" />
          <div class="cta-dots" aria-hidden="true">
            <span v-for="n in 5" :key="n" class="cta-dot" :class="`dot-${n}`" />
          </div>
          <h3 class="cta-title font-syne">Xoziroq bog'laning</h3>
          <p class="cta-text font-manrope">
            Biz bilan ishlash – bu oddiy xizmat emas, bu uzoq muddatli moliyaviy
            hamkorlik.
          </p>
          <button type="button" class="cta-btn font-manrope">
            <span>Bepul konsultatsiya</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              class="btn-arrow"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.our-work {
  border-radius: 28px;
  background: #f1f1f3;
  padding: 48px 20px;
}

/* ── Header ──────────────────────────────────────────────── */
.pricing-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.pricing-title {
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.08;
  color: #4aaf74;
  letter-spacing: 0.5px;
}

.pricing-subtitle {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.35;
  color: #000;
}

/* ── Grid ────────────────────────────────────────────────── */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

/* ── Plan card ───────────────────────────────────────────── */
.plan-card {
  position: relative;
  border-radius: 30px;
  background: var(--bg, #f2ece4);
  padding: 26px 24px 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
  cursor: default;

  opacity: 0;
  transform: translateY(28px) scale(0.97);
  transition:
    opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 90ms),
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 90ms),
    box-shadow 0.3s ease;
}

.is-visible .plan-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.plan-card:hover {
  box-shadow:
    0 20px 52px var(--glow, rgba(0, 0, 0, 0.1)),
    0 4px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-6px) scale(1.012);
}

/* ── Glow ────────────────────────────────────────────────── */
.plan-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--glow, transparent);
  opacity: 0;
  filter: blur(55px);
  pointer-events: none;
  transition: opacity 0.4s ease;
  z-index: 0;
}

.plan-card:hover .plan-glow {
  opacity: 1;
}

/* ── Badge ───────────────────────────────────────────────── */
.plan-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  letter-spacing: 0.3px;
  z-index: 2;
  backdrop-filter: blur(6px);
}

/* ── Head ────────────────────────────────────────────────── */
.plan-head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.plan-icon-wrap {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--icon-bg, #ea963f);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
}

.plan-card:hover .plan-icon-wrap {
  transform: scale(1.12) rotate(-6deg);
}

.icon-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--icon-bg, #ea963f);
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.plan-card:hover .icon-ring {
  opacity: 0.4;
  transform: scale(1.1);
}

.plan-icon {
  height: 24px;
  width: 24px;
  color: #fff;
}

.plan-name {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.05;
  color: var(--name-color, #000);
}

.plan-subtitle {
  margin: 2px 0 0;
  font-size: 16px;
  font-weight: 400;
  color: var(--subtitle-color, #b9b9bc);
}

/* ── Price ───────────────────────────────────────────────── */
.plan-price-wrap {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.plan-price {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
  color: var(--price-color, #000);
}

.plan-period {
  font-size: 13px;
  font-weight: 500;
  color: var(--subtitle-color, #b9b9bc);
  opacity: 0.85;
}

/* ── Divider ─────────────────────────────────────────────── */
.plan-divider {
  display: block;
  height: 1px;
  margin: 16px 0;
  background: var(--check-color, #ea963f);
  opacity: 0.18;
  border-radius: 99px;
  transition: opacity 0.3s ease;
  position: relative;
  z-index: 1;
}

.plan-card:hover .plan-divider {
  opacity: 0.35;
}

/* ── Items ───────────────────────────────────────────────── */
.plan-items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 1;
  flex: 1;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 400;
  color: var(--item-color, #000);

  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 0.36s ease calc(var(--i, 0) * 90ms + var(--pi, 0) * 55ms + 180ms),
    transform 0.36s ease calc(var(--i, 0) * 90ms + var(--pi, 0) * 55ms + 180ms);
}

.is-visible .plan-item {
  opacity: 1;
  transform: translateX(0);
}

.check-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: transform 0.25s ease;
}

.plan-item:hover .check-wrap {
  transform: scale(1.15);
}

.check-icon {
  height: 14px;
  width: 14px;
  color: var(--check-color, #ea963f);
}

/* ── Plan CTA button ─────────────────────────────────────── */
.plan-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 22px;
  width: 100%;
  height: 48px;
  border-radius: 14px;
  border: 2px solid var(--check-color, #ea963f);
  background: transparent;
  color: var(--name-color, #ea963f);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.plan-btn:hover {
  background: var(--check-color, #ea963f);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--glow, rgba(0, 0, 0, 0.15));
}

.plan-btn:active {
  transform: scale(0.96);
}

.btn-arrow {
  width: 14px;
  height: 14px;
  transition: transform 0.22s ease;
}
.plan-btn:hover .btn-arrow,
.cta-btn:hover .btn-arrow {
  transform: translateX(3px);
}

/* ── CTA card ────────────────────────────────────────────── */
.cta-card {
  position: relative;
  border-radius: 30px;
  padding: 32px 28px;
  background: linear-gradient(100deg, #224608 0%, #2a6b69 50%, #73a744 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  opacity: 0;
  transform: translateY(28px) scale(0.97);
  transition:
    opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 90ms),
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i, 0) * 90ms),
    box-shadow 0.3s ease;
}

.cta-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.cta-card:hover {
  box-shadow: 0 24px 56px rgba(34, 70, 8, 0.35);
  transform: translateY(-5px);
}

/* Floating dots */
.cta-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.cta-dot {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  animation: floatDot 9s ease-in-out infinite;
}
.dot-1 {
  width: 100px;
  height: 100px;
  top: -20px;
  left: -20px;
  animation-delay: 0s;
}
.dot-2 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 60%;
  animation-delay: 1.5s;
}
.dot-3 {
  width: 140px;
  height: 140px;
  top: 40%;
  right: -40px;
  animation-delay: 3s;
  animation-duration: 11s;
}
.dot-4 {
  width: 40px;
  height: 40px;
  bottom: 20px;
  left: 30%;
  animation-delay: 0.8s;
}
.dot-5 {
  width: 80px;
  height: 80px;
  bottom: -20px;
  left: 10%;
  animation-delay: 2.2s;
}

@keyframes floatDot {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-16px) scale(1.06);
  }
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    60% 60% at 80% 20%,
    rgba(115, 167, 68, 0.35) 0%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.cta-card:hover .cta-glow {
  opacity: 1;
}

.cta-title {
  position: relative;
  z-index: 1;
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
}

.cta-text {
  position: relative;
  z-index: 1;
  margin: 0 0 28px;
  font-size: 18px;
  line-height: 1.4;
  color: #e7f1ef;
}

.cta-btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  height: 54px;
  border: none;
  border-radius: 16px;
  padding: 0 30px;
  background: #63c48a;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.25s ease;
}

.cta-btn:hover {
  background: #56b27b;
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(99, 196, 138, 0.4);
}
.cta-btn:active {
  transform: scale(0.96);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 900px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }
  .cta-btn {
    align-self: stretch;
    justify-content: center;
  }
}
</style>
