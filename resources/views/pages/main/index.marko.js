// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/main/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    base_template = marko_loadTemplate(require.resolve("../../base.marko")),
    main_navigation_template = marko_loadTemplate(require.resolve("../../components/main-navigation")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    main_navigation_tag = marko_loadTag(main_navigation_template),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    poll_creation_section_template = marko_loadTemplate(require.resolve("./components/poll-creation-section")),
    poll_creation_section_tag = marko_loadTag(poll_creation_section_template),
    trending_section_template = marko_loadTemplate(require.resolve("./components/trending-section")),
    trending_section_tag = marko_loadTag(trending_section_template),
    newest_section_template = marko_loadTemplate(require.resolve("./components/newest-section")),
    newest_section_tag = marko_loadTag(newest_section_template),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  include_tag({
      _target: base_template,
      title: input.title,
      token: input.token,
      header: {
          renderBody: function renderBody(out) {
            main_navigation_tag({
                user: input.user || {},
                authenticated: input.authenticated
              }, out, __component, "2");
          }
        },
      main: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"container\"> <div class=\"tile is-ancestor\"><div class=\"tile is-parent is-8\"><article class=\"tile is-child box\">");

            poll_creation_section_tag({
                authenticated: input.authenticated
              }, out, __component, "8");

            out.w("</article></div><div class=\"tile is-parent\"><div class=\"tile is-vertical\"><article class=\"tile is-child box\">");

            trending_section_tag({}, out, __component, "12");

            out.w("</article><article class=\"tile is-child box\">");

            newest_section_tag({}, out, __component, "14");

            out.w("</article></div></div></div></div>");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/main/index.marko",
    tags: [
      "../../base.marko",
      "../../components/main-navigation",
      "./components/poll-creation-section",
      "./components/trending-section",
      "./components/newest-section",
      "marko/src/taglibs/core/include-tag"
    ]
  };
