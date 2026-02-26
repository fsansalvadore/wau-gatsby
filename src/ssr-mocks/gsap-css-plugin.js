/**
 * Mock GSAP CSSPlugin for Gatsby SSR (build-html).
 */
function CSSPlugin() {}
CSSPlugin.prototype = {};

module.exports = { CSSPlugin };
module.exports.CSSPlugin = CSSPlugin;
module.exports.default = CSSPlugin;
