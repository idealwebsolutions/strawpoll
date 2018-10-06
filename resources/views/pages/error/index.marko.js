// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/error/index.marko",
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/dist/runtime/helper-loadTemplate"),
    base_template = marko_loadTemplate(require.resolve("../../base.marko")),
    main_navigation_template = marko_loadTemplate(require.resolve("../../components/main-navigation")),
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    main_navigation_tag = marko_loadTag(main_navigation_template),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    marko_escapeXml = marko_helpers.x,
    include_tag = marko_loadTag(require("marko/dist/taglibs/core/include-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  include_tag({
      _target: base_template,
      header: {
          renderBody: function renderBody(out) {
            main_navigation_tag({
                user: input.user || {}
              }, out, __component, "2");
          }
        },
      main: {
          renderBody: function renderBody(out) {
            out.w("<section class=\"section\"><div class=\"container\"><div class=\"heading\"><h1 class=\"title has-text-centered\">" +
              marko_escapeXml(input.error ? "An error occured" : "Page not found") +
              "</h1> </div><div class=\"body\"><div class=\"container\">Looks like something went wrong. Please try again later.</div></div></div> </section>");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ak_: true,
    _l_: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/error/index.marko",
    tags: [
      "../../base.marko",
      "../../components/main-navigation",
      "marko/dist/taglibs/core/include-tag"
    ]
  };
