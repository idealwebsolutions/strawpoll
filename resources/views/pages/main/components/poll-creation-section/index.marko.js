// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/main/components/poll-creation-section/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    _preserve_tag = marko_loadTag(require("marko/src/components/taglib/preserve-tag")),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    create_poll_template = marko_loadTemplate(require.resolve("../../../../components/create-poll")),
    create_poll_tag = marko_loadTag(create_poll_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<section class=\"section\"><div id=\"form-container\">");

  var __key3 = __component.___nextKey("2");

  out.w("<div class=\"heading\">");

  _preserve_tag({
      bodyOnly: true,
      key: __key3,
      renderBody: function renderBody(out) {
        out.w("<h1 class=\"title is-uppercase has-text-centered\">Create Polls In A Few Clicks</h1>");
      }
    }, out);

  out.w("</div><div class=\"body\">");

  create_poll_tag({
      token: input.token,
      field: input.field,
      authenticated: input.authenticated,
      error: input.error
    }, out, __component, "6");

  out.w("</div></div></section>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/main/components/poll-creation-section/index.marko",
    tags: [
      "marko/src/components/taglib/preserve-tag",
      "../../../../components/create-poll"
    ]
  };
