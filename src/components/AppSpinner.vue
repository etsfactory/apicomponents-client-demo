<template>
  <svg
    class="svg"
    viewBox="0 0 280 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"
  >
    <g id="whole">
      <g v-for="(pair, i) in 10" :key="i">
        <circle class="left" cy="10" :cx="i * 30 + 4" r="4" />
        <circle class="right" cy="90" :cx="i * 30 + 4" r="4" />
      </g>
    </g>
  </svg>
</template>

<script>
import gsap from "gsap";
export default {
  mounted() {
    const duration = 0.5;
    const tl = gsap.timeline();
    const ease = "power1.inOut";
    const each = 0.2;
    const leftDots = document.querySelectorAll(".left");
    const rightDots = document.querySelectorAll(".right");
    tl.to(
      leftDots,
      {
        ease: ease,
        duration: duration * 2,
        y: 90 - 10,
        stagger: {
          each: each,
          yoyo: true,
          repeat: -1
        }
      },
      0
    )
      .to(
        rightDots,
        {
          ease: ease,
          duration: duration * 2,
          y: -(90 - 10),
          stagger: {
            each: each,
            yoyo: true,
            repeat: -1
          }
        },
        0
      )
      .seek(50);
  }
};
</script>

<style lang="scss" scoped>
.left {
  fill: $ocean;
}
.right {
  fill: white;
}
</style>
