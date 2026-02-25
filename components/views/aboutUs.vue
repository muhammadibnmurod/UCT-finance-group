<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Mail from "@/assets/icons/social-media/mail.svg";
import Map from "@/assets/icons/social-media/map-pin.svg";
import Phone from "@/assets/icons/social-media/phone.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactItem {
  id: string;
  icon: unknown;
  title: string;
  description: string;
  value: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const contacts: ContactItem[] = [
  {
    id: "email",
    icon: Mail,
    title: "Elektron pochta",
    description: "Bizga elektron pochta orqali murojaat qiling.",
    value: "support@uctfinance.uz",
    href: "mailto:support@uctfinance.uz"
  },
  {
    id: "address",
    icon: Map,
    title: "Manzil",
    description: "Biz bu yerda joylashganmiz.",
    value: "Toshkent, O'zbekiston",
    href: "https://maps.google.com/?q=Tashkent"
  },
  {
    id: "phone",
    icon: Phone,
    title: "+998 90 123 45 67",
    description: "Bizning ijtimoiy tarmoqlarimizda kuzating.",
    value: "@uctfinance",
    href: "tel:+998901234567"
  }
];

// ─── Map ──────────────────────────────────────────────────────────────────────
const mapEl = ref<HTMLElement | null>(null);
let mapInstance: any = null;

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    }
  ],
  script: [
    { src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", defer: true }
  ]
});

async function waitForLeaflet(maxAttempts = 50): Promise<any | null> {
  for (let i = 0; i < maxAttempts; i++) {
    const L = (window as any).L;
    if (L) return L;
    await new Promise(r => setTimeout(r, 100));
  }
  return null;
}

onMounted(async () => {
  if (!mapEl.value) return;
  const L = await waitForLeaflet();
  if (!L) return;

  const center: [number, number] = [41.3111, 69.2797];
  mapInstance = L.map(mapEl.value, {
    zoomControl: true,
    scrollWheelZoom: false
  });
  mapInstance.setView(center, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(mapInstance);

  L.circleMarker(center, {
    radius: 8,
    color: "#e04033",
    weight: 2,
    fillColor: "#e04033",
    fillOpacity: 0.92
  }).addTo(mapInstance);
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) visible.value = true;
    },
    { threshold: 0.1 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section
    id="contact"
    class="contact-section"
    ref="sectionRef"
    :class="{ 'is-visible': visible }"
  >
    <!-- Header -->
    <div class="contact-header">
      <h2 class="contact-heading font-syne">Biz bilan bog'laning</h2>
      <p class="contact-subheading font-inter">
        Our friendly team would love to hear from you.
      </p>
    </div>

    <!-- Card -->
    <div class="contact-card">
      <!-- Left: contact items -->
      <div class="contact-column">
        <article
          v-for="(item, i) in contacts"
          :key="item.id"
          class="contact-item"
          :style="{ '--i': i }"
        >
          <!-- Icon circle -->
          <div class="icon-wrap" aria-hidden="true">
            <component :is="item.icon" class="contact-icon" />
          </div>

          <!-- Text -->
          <div class="contact-body">
            <h3 class="contact-title font-inter">{{ item.title }}</h3>
            <p class="contact-desc font-inter max-w-[250px]">
              {{ item.description }}
            </p>
            <a :href="item.href" class="contact-value font-inter">
              {{ item.value }}
            </a>
          </div>
        </article>
      </div>

      <!-- Right: map -->
      <div class="map-column">
        <div ref="mapEl" class="contact-map" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ─────────────────────────────────────────────── */
.contact-section {
  max-width: 1200px;
  margin: 70px auto 0;
  padding: 12px;
  padding-bottom: 100px;
}

/* ── Header ──────────────────────────────────────────────── */
.contact-header {
  text-align: center;
  margin-bottom: 36px;

  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.is-visible .contact-header {
  opacity: 1;
  transform: translateY(0);
}

.contact-heading {
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.02em;
  color: #39b270;
}

.contact-subheading {
  margin: 14px 0 0;
  font-size: 20px;
  line-height: 1.5;
  font-weight: 400;
  color: #535862;
}

/* ── Card ────────────────────────────────────────────────── */
.contact-card {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 38px;
  background: #e8e8ec;
  border-radius: 30px;
  padding: 40px;

  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.55s 0.1s ease,
    transform 0.55s 0.1s ease;
}

.is-visible .contact-card {
  opacity: 1;
  transform: translateY(0);
}

/* ── Contact column ──────────────────────────────────────── */
.contact-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
}

/* ── Contact item ────────────────────────────────────────── */
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;

  opacity: 0;
  transform: translateX(-16px);
  transition:
    opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)
      calc(0.2s + var(--i, 0) * 100ms),
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)
      calc(0.2s + var(--i, 0) * 100ms);
}

.is-visible .contact-item {
  opacity: 1;
  transform: translateX(0);
}

/* ── Icon ────────────────────────────────────────────────── */
.icon-wrap {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #d4d8d6;
  display: grid;
  place-items: center;
  transition:
    background 0.25s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact-item:hover .icon-wrap {
  background: #c2e8d4;
  transform: scale(1.1);
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #2daf69;
}

/* ── Text ────────────────────────────────────────────────── */
.contact-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: #000;
}

.contact-desc {
  margin: 0;
  font-size: 16px;
  text-align: left;
  width: 284px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  color: #aeaeb2;
}

.contact-value {
  display: inline-block;
  margin-top: 6px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #39b270;
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.contact-value:hover {
  color: #24985b;
  transform: translateX(2px);
}

/* ── Map ─────────────────────────────────────────────────── */
.map-column {
  min-height: 480px;
}

.contact-map {
  width: 100%;
  height: 100%;
  min-height: 480px;
  border-radius: 20px;
  overflow: hidden;
}

:deep(.leaflet-control-attribution) {
  font-size: 10px;
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1024px) {
  .contact-card {
    grid-template-columns: 1fr;
  }
  .contact-column {
    gap: 28px;
  }
  .map-column,
  .contact-map {
    min-height: 360px;
  }
}

@media (max-width: 640px) {
  .contact-section {
    margin-top: 40px;
    padding: 0;
  }
  .contact-subheading {
    font-size: 15px;
  }
  .contact-card {
    border-radius: 20px;
    padding: 24px;
    gap: 20px;
  }
  .contact-title {
    font-size: 15px;
  }
  .contact-desc {
    font-size: 13px;
  }
  .contact-value {
    font-size: 14px;
  }
  .map-column,
  .contact-map {
    min-height: 280px;
  }
}

@media (max-width: 400px) {
  .contact-card {
    padding: 18px;
  }
  .icon-wrap {
    width: 38px;
    height: 38px;
  }
  .contact-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
