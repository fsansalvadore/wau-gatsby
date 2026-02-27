/**
 * Mock GSAP for Gatsby SSR (build-html). Prevents GSAP's browser-only code
 * (e.g. CSSPlugin) from running in Node during static HTML generation.
 */
const noop = () => {};
const timelineStub = () => ({
  fromTo: noop,
  from: noop,
  to: noop,
  add: () => timelineStub(),
});
const contextStub = () => ({ revert: noop });

const gsap = {
  registerPlugin: noop,
  context: contextStub,
  timeline: timelineStub,
  to: noop,
  from: noop,
  fromTo: noop,
  set: noop,
  Power1: { inOut: 'power1.inOut', easeOut: 'power1.easeOut' },
  Power2: {},
  Power3: {},
  Power4: {},
};

module.exports = gsap;
module.exports.gsap = gsap;
module.exports.default = gsap;
