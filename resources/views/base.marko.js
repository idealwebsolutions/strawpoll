// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/base.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    page_header_template = marko_loadTemplate(require.resolve("./components/page-header.marko")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    page_header_tag = marko_loadTag(page_header_template),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    js_disabled_template = marko_loadTemplate(require.resolve("./components/js-disabled")),
    js_disabled_tag = marko_loadTag(js_disabled_template),
    page_footer_template = marko_loadTemplate(require.resolve("./components/page-footer.marko")),
    page_footer_tag = marko_loadTag(page_footer_template),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!DOCTYPE html><html lang=\"en\">");

  page_header_tag({
      title: data.title
    }, out, __component, "1");

  out.w("<body>");

  component_globals_tag({}, out);

  out.w("<div class=\"app\"><header>");

  include_tag({
      _target: input.header
    }, out, __component, "5");

  out.w("</header><main>");

  js_disabled_tag({}, out, __component, "7");

  include_tag({
      _target: input.main
    }, out, __component, "8");

  out.w("</main></div>");

  page_footer_tag({}, out, __component, "9");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "10");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/base.marko",
    tags: [
      "./components/page-header.marko",
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/taglibs/core/include-tag",
      "./components/js-disabled",
      "./components/page-footer.marko",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
