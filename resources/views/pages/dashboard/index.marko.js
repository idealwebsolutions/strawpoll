// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/dashboard/index.marko",
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
    sidenav_section_template = marko_loadTemplate(require.resolve("./components/sidenav-section")),
    sidenav_section_tag = marko_loadTag(sidenav_section_template),
    _preserve_tag = marko_loadTag(require("marko/dist/components/taglib/preserve-tag")),
    summary_section_template = marko_loadTemplate(require.resolve("./components/summary-section")),
    summary_section_tag = marko_loadTag(summary_section_template),
    include_tag = marko_loadTag(require("marko/dist/taglibs/core/include-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  include_tag({
      _target: base_template,
      title: input.title,
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
            out.w("<section class=\"section\"><div class=\"container\"><div class=\"columns is-multiline\"><div class=\"column is-one-quarter\">");

            var __key9 = __component._h_("8");

            _preserve_tag({
                cid: __key9,
                renderBody: function renderBody(out) {
                  sidenav_section_tag({
                      user: input.user || {}
                    }, out, __component, "#" + __key9);
                }
              }, out, __component, "12");

            out.w("</div><div class=\"column is-three-quarters\">");

            summary_section_tag({}, out, __component, "11");

            out.w("</div></div></div></section>");
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
    id: "/strawpoll$1.0.0/resources/views/pages/dashboard/index.marko",
    tags: [
      "../../base.marko",
      "../../components/main-navigation",
      "./components/sidenav-section",
      "marko/dist/components/taglib/preserve-tag",
      "./components/summary-section",
      "marko/dist/taglibs/core/include-tag"
    ]
  };
