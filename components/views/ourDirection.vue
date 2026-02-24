<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import fileShield from "@/assets/icons/file-shield-alt.svg";
import chartUserSquare from "@/assets/icons/chart-user-square.svg";
import fileContract from "@/assets/icons/file-contract.svg";
import iconCheck from "@/assets/icons/iconCheack.svg";

interface ServiceCard {
  id: string;
  title: string[];
  points: string[];
  icon: unknown;
  accentColor: string;
}

const cards: ServiceCard[] = [
  {
    id: "accounting",
    title: ["Professional", "buxgalteriya autsorsingi"],
    points: [
      "To'liq buxgalteriya yuritish",
      "1C va boshqa moliyaviy tizimlar",
      "Bank operatsiyalar nazorati",
      "Ish haqi va kadrlar hisobi",
      "Soliq hisobotlarini tayyorlash va topshirish"
    ],
    icon: fileShield,
    accentColor: "#39B270"
  },
  {
    id: "strategy",
    title: ["Moliyaviy strategiya va", "konsalting"],
    points: [
      "Pul oqimi tahlili (Cash Flow)",
      "Xarajatlarni optimallashtirish",
      "Rentabellik tahlili",
      "Investitsiya baholash",
      "CFO xizmati"
    ],
    icon: chartUserSquare,
    accentColor: "#2DA8C8"
  },
  {
    id: "tax",
    title: ["Soliq rejalashtirish"],
    points: [
      "Qonuniy soliq rejalashtirish",
      "Risklarni kamaytirish",
      "Tekshiruvlarga tayyorgarlik",
      "Soliq yukini tahlil qilish"
    ],
    icon: fileContract,
    accentColor: "#8B6FE8"
  }
];

// ─── Intersection Observer for reveal ────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const visibleCards = ref<Set<string>>(new Set());

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = (entry.target as HTMLElement).dataset.cardId;
        if (id && entry.isIntersecting) {
          visibleCards.value = new Set([...visibleCards.value, id]);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  // Observe each card
  const cardEls = sectionRef.value?.querySelectorAll("[data-card-id]");
  cardEls?.forEach(el => observer?.observe(el));
});

onUnmounted(() => observer?.disconnect());

function cardDelay(index: number) {
  return `${index * 110}ms`;
}
</script>

<template>
  <section id="about" class="our-direction py-16" ref="sectionRef">
    <div class="mx-auto w-full max-w-[1220px] px-4">
      <!-- Header -->
      <div class="section-header">
        <h2 class="section-title font-syne">BIZ NIMA QILAMIZ?</h2>
        <p class="section-subtitle font-syne">
          Siz biznes bilan shug'ullanasiz – moliyani biz boshqaramiz.
        </p>
      </div>

      <!-- Grid -->
      <div class="cards-grid mt-10">
        <article
          v-for="(card, i) in cards"
          :key="card.id"
          class="direction-card"
          :class="{ 'is-visible': visibleCards.has(card.id) }"
          :data-card-id="card.id"
          :style="{
            '--accent': card.accentColor,
            '--delay': cardDelay(i)
          }"
        >
          <!-- Hover glow -->
          <span class="card-glow" aria-hidden="true" />

          <!-- Icon -->
          <div class="icon-wrap">
            <component :is="card.icon" class="card-icon" aria-hidden="true" />
            <span class="icon-ring" aria-hidden="true" />
          </div>

          <!-- Title -->
          <h3 class="card-title font-syne">
            <template v-for="(line, li) in card.title" :key="line">
              {{ line }}<br v-if="li < card.title.length - 1" />
            </template>
          </h3>

          <!-- Divider -->
          <span class="card-divider" aria-hidden="true" />

          <!-- Points -->
          <ul class="card-points">
            <li
              v-for="(point, pi) in card.points"
              :key="point"
              class="card-point"
              :style="{ '--point-delay': `${pi * 55}ms` }"
            >
              <span class="check-wrap" aria-hidden="true">
                <component :is="iconCheck" class="check-icon" />
              </span>
              <span class="point-text font-syne">{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="css">
/* ── Section ─────────────────────────────────────────────── */
.our-direction {
  background: #f4f4f5;
}

/* ── Header ──────────────────────────────────────────────── */
.section-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  color: #39b270;
  letter-spacing: 1.28px;
}

.section-subtitle {
  font-size: 20px;
  font-weight: 400;
  color: #000;
}

/* ── Grid ────────────────────────────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

/* ── Card ────────────────────────────────────────────────── */
.direction-card {
  position: relative;
  border-radius: 30px;
  background: #ececf1;
  padding: 28px 26px 28px;
  overflow: hidden;
  cursor: default;

  /* Entrance */
  opacity: 0;
  transform: translateY(32px) scale(0.97);
  transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms),
    box-shadow 0.3s ease;
}

.direction-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Hover lift */
.direction-card:hover {
  box-shadow:
    0 20px 52px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
  transform: translateY(-6px) scale(1.01);
}

/* ── Glow ────────────────────────────────────────────────── */
.card-glow {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: #39b270;
  opacity: 0;
  filter: blur(60px);
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.direction-card:hover .card-glow {
  opacity: 0.12;
}

/* ── Icon ────────────────────────────────────────────────── */
.icon-wrap {
  position: relative;
  margin-bottom: 22px;
  display: flex;
  height: 58px;
  width: 58px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #56b27a;
  z-index: 1;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.direction-card:hover .icon-wrap {
  transform: scale(1.12) rotate(-5deg);
}

.icon-ring {
  position: absolute;
  inset: -4px;
  border-radius: 999px;
  border: 2px solid #56b27a;
  opacity: 0;
  transform: scale(0.85);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.direction-card:hover .icon-ring {
  opacity: 0.35;
  transform: scale(1.1);
}

.card-icon {
  height: 38px;
  width: 38px;
  color: #ffffff;
}

/* ── Title ───────────────────────────────────────────────── */
.card-title {
  position: relative;
  z-index: 1;
  font-size: 23px;
  max-width: 338px;
  font-weight: 700;
  line-height: 1.25;
  color: #000;
}

/* ── Divider ─────────────────────────────────────────────── */
.card-divider {
  display: block;
  margin: 20px 0;
  height: 2px;
  width: 40px;
  border-radius: 999px;
  background: #39b270;
  transition: width 0.4s ease;
}

.direction-card:hover .card-divider {
  width: 72px;
}

/* ── Points ──────────────────────────────────────────────── */
.card-points {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  z-index: 1;
}

.card-point {
  display: flex;
  align-items: flex-start;
  gap: 10px;

  /* Staggered reveal when card becomes visible */
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 0.38s ease calc(var(--delay, 0ms) + 200ms + var(--point-delay, 0ms)),
    transform 0.38s ease
      calc(var(--delay, 0ms) + 200ms + var(--point-delay, 0ms));
}

.direction-card.is-visible .card-point {
  opacity: 1;
  transform: translateX(0);
}

/* ── Check ───────────────────────────────────────────────── */
.check-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(89, 181, 126, 0.15);
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.card-point:hover .check-wrap {
  background: rgba(89, 181, 126, 0.28);
  transform: scale(1.1);
}

.check-icon {
  height: 14px;
  width: 14px;
  color: #59b57e;
}

.point-text {
  font-size: 20px;
  font-weight: 400;
  color: #000;
  line-height: 1.35;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1200px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .point-text {
    font-size: 18px;
  }
}
</style>
