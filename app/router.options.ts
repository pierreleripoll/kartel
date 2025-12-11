import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If the user is navigating with back/forward buttons, restore saved position
    if (savedPosition) {
      return savedPosition;
    }

    // Don't scroll when navigating between pages - maintain current scroll position
    return false;
  },
};
