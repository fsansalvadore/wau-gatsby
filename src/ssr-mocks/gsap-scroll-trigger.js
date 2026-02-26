/**
 * Mock GSAP ScrollTrigger for Gatsby SSR (build-html).
 */
const ScrollTrigger = {
  defaults: () => {},
  create: () => ({}),
  refresh: () => {},
  clearScrollMemory: () => {},
};

module.exports = { ScrollTrigger };
module.exports.ScrollTrigger = ScrollTrigger;
module.exports.default = ScrollTrigger;
