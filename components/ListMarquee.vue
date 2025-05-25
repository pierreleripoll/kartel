<template>
  <div
    class="marquee-container"
    @mouseenter="pauseAnimation"
    @mouseleave="resumeAnimationOnLeave"
    @mousedown="startDrag"
    ref="scrollContainer"
  >
    <div class="marquee-content" ref="marqueeContent">
      <!-- First set of links -->
      <div class="marquee-item-group">
        <a href="https://www.visarte-valais.ch/" target="_blank"
          >Visarte Valais</a
        >
        <a href="https://www.musees-vs.ch/" target="_blank"
          >Association Valaisanne des Musées (AVM)</a
        >
        <a href="https://theatres-vs.ch/" target="_blank"
          >Les Théâtre de création valaisans</a
        >
        <a href="https://www.avpsh.ch/" target="_blank"
          >Association valaisanne des professionnels des sciences humaines
          (AVPSH)</a
        >
        <a href="https://facebook.com/tanznetzwerk.vs" target="_blank"
          >Tanznetzwerk VS</a
        >
        <a href="http://www.valaisfilms.ch" target="_blank">Valais Film</a>
        <a href="https://musikvalais.ch" target="_blank">MusikValais</a>
        <a href="https://www.bibliovalais.ch" target="_blank"
          >BiblioValais Wallis</a
        >
        <a href="https://lasev.ch" target="_blank"
          >Société des Ecrivain.e.s Valaisan.ne.s</a
        >
        <a href="https://www.forcesvives-vs.ch/" target="_blank"
          >FORCES VIVES, Faîtière des arts vivants Valais</a
        >
      </div>

      <!-- Duplicate set for seamless loop -->
      <div class="marquee-item-group">
        <a href="https://www.visarte-valais.ch/" target="_blank"
          >Visarte Valais</a
        >
        <a href="https://www.musees-vs.ch/" target="_blank"
          >Association Valaisanne des Musées (AVM)</a
        >
        <a href="https://theatres-vs.ch/" target="_blank"
          >Les Théâtre de création valaisans</a
        >
        <a href="https://www.avpsh.ch/" target="_blank"
          >Association valaisanne des professionnels des sciences humaines
          (AVPSH)</a
        >
        <a href="https://facebook.com/tanznetzwerk.vs" target="_blank"
          >Tanznetzwerk VS</a
        >
        <a href="http://www.valaisfilms.ch" target="_blank">Valais Film</a>
        <a href="https://musikvalais.ch" target="_blank">MusikValais</a>
        <a href="https://www.bibliovalais.ch" target="_blank"
          >BiblioValais Wallis</a
        >
        <a href="https://lasev.ch" target="_blank"
          >Société des Ecrivain.e.s Valaisan.ne.s</a
        >
        <a href="https://www.forcesvives-vs.ch/" target="_blank"
          >FORCES VIVES, Faîtière des arts vivants Valais</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const marqueeContent = ref(null);
const scrollContainer = ref(null);
let isUserScrolling = false;
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let scrollTimeout = null;

const pauseAnimation = () => {
  if (marqueeContent.value) {
    marqueeContent.value.style.animationPlayState = "paused";
  }
};

const resumeAnimation = () => {
  if (marqueeContent.value && !isUserScrolling && !isDragging) {
    marqueeContent.value.style.animationPlayState = "running";
  }
};

const resumeAnimationOnLeave = () => {
  if (!isDragging) {
    resumeAnimation();
  }
};

const startDrag = (e) => {
  // Don't drag if clicking on a link
  if (e.target.tagName === "A") return;

  isDragging = true;
  isUserScrolling = true;
  pauseAnimation();

  startX = e.pageX;
  scrollLeft = scrollContainer.value.scrollLeft;

  // Prevent text selection while dragging
  e.preventDefault();

  // Add global event listeners
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
};

const drag = (e) => {
  if (!isDragging) return;

  e.preventDefault();
  const x = e.pageX;
  const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling

  const newScrollLeft = scrollLeft - walk;
  scrollContainer.value.scrollLeft = newScrollLeft;

  // Handle infinite scroll during drag
  handleInfiniteScroll();
};

const endDrag = () => {
  isDragging = false;

  // Remove global event listeners
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", endDrag);

  // Reset user scrolling state after a delay
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isUserScrolling = false;
    resumeAnimation();
  }, 150);
};

const handleInfiniteScroll = () => {
  if (!scrollContainer.value || !marqueeContent.value) return;

  const container = scrollContainer.value;
  const content = marqueeContent.value;
  const groupWidth = content.children[0].offsetWidth;

  // Handle infinite scroll
  if (container.scrollLeft >= groupWidth) {
    container.scrollLeft = 0;
  } else if (container.scrollLeft <= 0 && container.scrollLeft < 0) {
    container.scrollLeft = groupWidth;
  }
};

const handleScroll = () => {
  if (!scrollContainer.value || !marqueeContent.value) return;

  isUserScrolling = true;
  pauseAnimation();

  handleInfiniteScroll();

  // Reset user scrolling state after scroll stops
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isUserScrolling = false;
    resumeAnimation();
  }, 150);
};

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  // Clean up global event listeners
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", endDrag);
});
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  cursor: grab;
  padding: 2rem 0;
  /* Hide scrollbar but keep functionality */
  -ms-overflow-style: none;
  scrollbar-width: none;
  user-select: none; /* Prevent text selection during drag */
}

.marquee-container::-webkit-scrollbar {
  display: none;
}

.marquee-container:active {
  cursor: grabbing;
}

.marquee-content {
  display: flex;
  animation: marquee 60s linear infinite;
  white-space: nowrap;
  /* Make content wider than container for scrolling */
  width: max-content;
}

.marquee-item-group {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.marquee-item-group a {
  flex-shrink: 0;
  padding: 0.5rem 0.5rem;
  transition: opacity 0.2s ease;
  pointer-events: auto; /* Ensure links are clickable */
}

.marquee-item-group a:hover {
  border-color: currentColor;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .marquee-item-group {
    gap: 1rem;
  }

  .marquee-content {
    animation-duration: 80s;
  }
}
</style>
