// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-section/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_loadTemplate = require("marko/dist/runtime/helper-loadTemplate"),
    poll_cast_template = marko_loadTemplate(require.resolve("../../../../components/poll-cast")),
    marko_loadTag = marko_helpers.t,
    poll_cast_tag = marko_loadTag(poll_cast_template),
    poll_results_template = marko_loadTemplate(require.resolve("../../../../components/poll-results")),
    poll_results_tag = marko_loadTag(poll_results_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<section class=\"section\"><div><div class=\"container\"><div class=\"heading\"><h1 class=\"title has-text-centered\">" +
    marko_escapeXml(input.poll.question) +
    "</h1></div><div class=\"body\"><div class=\"container\"><div class=\"narrow\">");

  if (state.editing) {
    out.w("<div></div>");
  } else {
    poll_cast_tag({
        poll: input.poll,
        token: input.token
      }, out, __component, "viewer");

    poll_results_tag({
        choices: input.poll.choices
      }, out, __component, "results");
  }

  out.w("</div> </div></div></div></div></section>");
}

marko_template._ = marko_renderer(render, {
    _l_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-section/index.marko",
    component: "./",
    tags: [
      "../../../../components/poll-cast",
      "../../../../components/poll-results"
    ]
  };
