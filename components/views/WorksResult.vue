<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import handShake from "@/assets/icons/handshake.svg";
import bagsShopping from "@/assets/icons/bags-shopping.svg";
import screenUsers from "@/assets/icons/screen-users.svg";
import fileCheckAlt from "@/assets/icons/file-check-alt.svg";
import phoneCall from "@/assets/icons/phone-call.svg";

interface StatCard {
  id: string;
  title: string;
  rawValue: number | string;
  displayValue: string;
  suffix: string;
  icon: unknown;
  tall?: boolean;
  valueFontSize?: string;
}

const stats: StatCard[] = [
  {
    id: "retention",
    title: "Mijozlar bilan uzoq muddatli hamkorlik",
    rawValue: 98,
    displayValue: "98",
    suffix: "%",
    icon: handShake,
    tall: true
  },
  {
    id: "experience",
    title: "Yillik amaliy tajriba",
    rawValue: 5,
    displayValue: "5",
    suffix: "+",
    icon: bagsShopping
  },
  {
    id: "clients",
    title: "Faol mijoz",
    rawValue: 200,
    displayValue: "200",
    suffix: "+",
    icon: screenUsers
  },
  {
    id: "reports",
    title: "Topshirilgan hisobot",
    rawValue: 10000,
    displayValue: "10 000",
    suffix: "+",
    icon: fileCheckAlt,
    valueFontSize: "50px"
  },
  {
    id: "response",
    title: "Javob berish tizimi",
    rawValue: 24,
    displayValue: "24",
    suffix: " soat",
    icon: phoneCall,
    valueFontSize: "50px"
  }
];

const animatedValues = ref<Record<string, string>>({});
const sectionRef = ref<HTMLElement | null>(null);
const hasAnimated = ref(false);

stats.forEach(s => {
  animatedValues.value[s.id] =
    typeof s.rawValue === "number" ? "0" : s.displayValue;
});

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function formatNumber(val: number, original: string): string {
  if (original.includes(" ")) {
    return val.toLocaleString("ru-RU").replace(/,/g, " ");
  }
  return String(val);
}

function animateStat(stat: StatCard, delay = 0) {
  if (typeof stat.rawValue !== "number") return;
  const duration = 1600;
  const start = performance.now() + delay;

  function tick(now: number) {
    const elapsed = Math.max(0, now - start);
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    const current = Math.round(eased * (stat.rawValue as number));
    animatedValues.value[stat.id] = formatNumber(current, stat.displayValue);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function startAnimations() {
  if (hasAnimated.value) return;
  hasAnimated.value = true;
  stats.forEach((stat, i) => animateStat(stat, i * 120));
}

let observer: IntersectionObserver | null = null;
onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) startAnimations();
    },
    { threshold: 0.2 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section class="works-result py-16" ref="sectionRef">
    <div class="mx-auto w-full max-w-[1220px] px-4">
      <!-- Header -->
      <div class="mb-10 flex flex-col gap-3 text-center">
        <h3
          class="font-syne text-[32px] font-[700] tracking-[1.28px] leading-[1.08] text-[#32B270]"
        >
          UCT Finance Group – natijaga ishlaydi
        </h3>
        <p
          class="font-syne text-[20px] font-[400] tracking-[0.8px] leading-[1.35] text-[#17171C]"
        >
          Siz biznes bilan shug'ullanasiz – moliyani biz boshqaramiz.
        </p>
      </div>

      <!-- Grid -->
      <div class="result-grid">
        <article
          v-for="stat in stats"
          :key="stat.id"
          class="result-card"
          :class="{ 'result-card--tall': stat.tall }"
        >
          <!-- Shimmer overlay on hover -->
          <span class="shimmer" aria-hidden="true" />

          <h4
            class="result-title font-syne z-10"
            :class="stat.tall ? 'max-w-[360px]' : 'max-w-[336px]'"
          >
            {{ stat.title }}
          </h4>

          <p
            class="result-value font-syne z-10"
            :class="stat.tall ? '!mt-[150px]' : 'mt-12'"
            :style="stat.valueFontSize ? { fontSize: stat.valueFontSize } : {}"
          >
            {{ animatedValues[stat.id] }}{{ stat.suffix }}
          </p>

          <!-- Decorative circle -->
          <span
            class="result-circle"
            :class="{ 'result-circle--lg': stat.tall }"
            aria-hidden="true"
          />

          <!-- Icon -->
          <component
            :is="stat.icon"
            class="result-icon"
            :class="{ 'result-icon--lg': stat.tall }"
            aria-hidden="true"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
.works-result {
  background: #f0f1f6;
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

/* ── Card ────────────────────────────────────────────────── */
.result-card {
  position: relative;
  display: flex;
  min-height: 218px;
  flex-direction: column;
  overflow: hidden;
  border-radius: 26px;
  background: #fff;
  padding: 24px 24px 20px;
  cursor: default;

  /* entrance animation */
  animation: cardReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* stagger each card */
.result-card:nth-child(1) {
  animation-delay: 0.05s;
}
.result-card:nth-child(2) {
  animation-delay: 0.12s;
}
.result-card:nth-child(3) {
  animation-delay: 0.19s;
}
.result-card:nth-child(4) {
  animation-delay: 0.26s;
}
.result-card:nth-child(5) {
  animation-delay: 0.33s;
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* hover lift */
.result-card {
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.3s ease;
}
.result-card:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow:
    0 20px 48px rgba(57, 178, 112, 0.14),
    0 4px 12px rgba(0, 0, 0, 0.06);
}

/* tall variant */
.result-card--tall {
  grid-row: span 2;
  min-height: 456px;
}

/* ── Shimmer ─────────────────────────────────────────────── */
.shimmer {
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.55) 50%,
    transparent 70%
  );
  background-size: 250% 100%;
  background-position: 200% 0;
  transition: background-position 0.6s ease;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
}

.result-card:hover .shimmer {
  opacity: 1;
  background-position: -60% 0;
}

/* ── Text ────────────────────────────────────────────────── */
.result-title {
  color: #aeaeb2;
  font-size: 24px;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 0.96px;
}

.result-value {
  color: #39b270;
  text-align: start;
  font-size: 70px;
  font-weight: 800;
  line-height: normal;
  letter-spacing: 2.8px;

  /* subtle pop when value updates */
  transition: color 0.2s ease;
}

.result-circle {
  position: absolute;
  right: -66px;
  bottom: -82px;
  z-index: 1;
  height: 264px;
  width: 264px;
  border-radius: 500px;
  background: #39b270;
  opacity: 0.06;
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.result-circle--lg {
  right: -88px;
  bottom: -96px;
  height: 318px;
  width: 318px;
}

.result-card:hover .result-circle {
  opacity: 0.12;
  transform: scale(1.08);
}

.result-icon {
  color: #fff;
  position: absolute;
  right: 16px;
  bottom: 14px;
  z-index: 2;
  height: 120px;
  width: 120px;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.3s;
  opacity: 0.9;
}

.result-icon--lg {
  right: 20px;
  bottom: 20px;
  height: 110px;
  width: 110px;
}

.result-card:hover .result-icon {
  transform: scale(1.12) rotate(-4deg);
  opacity: 1;
}

@media (max-width: 1200px) {
  .result-grid {
    grid-template-columns: 1fr 1fr;
  }
  .result-card--tall {
    grid-row: auto;
    min-height: 218px;
  }
}

@media (max-width: 768px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
  .result-title {
    font-size: 27px;
  }
  .result-value {
    font-size: 64px;
  }
}
</style>
