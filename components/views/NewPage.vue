<script setup lang="ts">
import { ref, computed } from "vue";

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "UCT Finance Group bilan ishlashni boshlaganimizdan so‘ng moliyaviy tartib va nazorat kuchaydi. Qarorlar endi taxmin asosida emas, aniq raqamlar asosida qabul qilinadi.",
    author: "Habibxonov Hikmatullo"
  },
  {
    id: 2,
    text: "Ular bilan hamkorlik qilish biznesimizda aniqlik va barqarorlik olib keldi. Hisobotlar tushunarli va o‘z vaqtida taqdim etiladi.",
    author: "Azizbek Karimov"
  },
  {
    id: 3,
    text: "Moliyaviy masalalarda ishonchli va professional yondashuv. Jamoa har doim aloqada.",
    author: "Dilshod Raximov"
  }
];

const activeIndex = ref(0);

const activeTestimonial = computed(
  () => testimonials[activeIndex.value]
);

function goTo(index: number) {
  activeIndex.value = index;
}
</script>

<template><section class="testimonials">
  <div class="container">
    <!-- Header -->
    <h2 class="title font-syne font-bold ">Mijozlar biz xaqimizda</h2>
    <p class="subtitle font-syne">
      Biz bilan ishlash — bu oddiy xizmat emas, bu uzoq muddatli moliyaviy hamkorlik.
    </p>

    <!-- Quote -->
    <blockquote class="quote font-syne">
      “{{ activeTestimonial.text }}”
    </blockquote>

    <!-- Author -->
    <p class="author">
      {{ activeTestimonial.author }}
    </p>

    <!-- Dots -->
    <div class="dots">
      <button
        v-for="(_, i) in testimonials"
        :key="i"
        class="dot"
        :class="{ active: i === activeIndex }"
        @click="goTo(i)"
        aria-label="Testimonial navigation"
      />
    </div>
  </div>
</section>
</template>

<style scoped lang="css">
 .testimonials {
  background: #f7f8f9;
  border-radius: 28px;
  padding: 72px 16px;
}

.container {
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

/* Title */
.title {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
  color: #39b270;
}

/* Subtitle */
.subtitle {
  margin: 0 0 48px;
  font-size: 20px;
  font-weight: 400;
  color: #000;
}

/* Quote */
.quote {
  margin: 0 auto 32px;
  max-width: 760px;
  font-size: 22px;
  line-height: 1.5;
  color: #000;
  font-weight: 400;
}

/* Author */
.author {
  margin-bottom: 40px;
  font-size: 16px;
  color: #9aa0a6;
}

/* Dots */
.dots {
  display: flex;
  justify-content: center;
  gap: 14px;
}

.dot {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #39b270;
  opacity: 0.35;
  border: none;
  cursor: pointer;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dot:hover {
  opacity: 0.6;
  transform: scale(1.05);
}

.dot.active {
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 28px;
  }

  .quote {
    font-size: 18px;
  }

  .dot {
    width: 34px;
    height: 34px;
  }
}
</style>