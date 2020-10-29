<template>
  <section class="home">
    <div class="epics">
      <div v-for="epic in epics" :key="epic.title" class="epic">
        <h2 class="epic-title">{{ epic.title }}</h2>
        <p class="epic-desc">{{ epic.desc }}</p>
        <ul class="epic-bullets">
          <li v-for="(bullet, i) in epic.bullets" :key="i" class="epic-bullet">
            <span class="epic-bullet-index">0{{ i + 1 }}</span>
            <span class="epic-buttet-text">{{ bullet }}</span>
          </li>
        </ul>
        <app-button :to="epic.buttonTo" :text="epic.buttonText" />
      </div>
    </div>
  </section>
</template>

<script>
import AppButton from "@/components/AppButton";
export default {
  components: {
    AppButton
  },
  computed: {
    epics() {
      return [
        {
          title: "Diagnóstico de inversión",
          desc: "Compara tus fondos contratados frente a una cartera personalizada para ti.",
          bullets: ["Selecciona tus fondos", "Indica tu inversión", "Compara con nuestra propuesta"],
          buttonText: "Análisis de cartera disponible",
          buttonTo: { name: "assessment" }
        },
        {
          title: "Propuesta de inversión",
          desc: "Contrata un producto a tu medida en sólo unos minutos.",
          bullets: ["Escoge tus preferencias", "Indica tu inversión", "Compara con nuestra propuesta"],
          buttonText: "Nueva propuesta de cartera",
          buttonTo: { name: "proposal" }
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  align-items: center;
  width: 55%;
  margin-left: 10%;
}
.epics {
  display: flex;
}
.epic {
  width: 50%;
  &:first-child {
    margin-right: 50px;
  }
  &:last-child {
    margin-left: 50px;
  }
}
.epic-title {
  @include font-heading-l;
}
.epic-desc {
  @include font-paragraph-m;
}
.epic-bullets {
  margin: 48px 0;
}
.epic-bullet {
  display: flex;
  margin: 10px 0;
  align-items: center;
}
.epic-bullet-index {
  @include font-content-table-m;
  color: $ocean;
  width: 35px;
  flex-shrink: 0;
  display: inline-block;
}
.epic-bullet-text {
  @include font-paragraph-s;
}
</style>
