// Compiled using marko@4.13.7 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-vote-section/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    poll_cast_template = marko_loadTemplate(require.resolve("../../../../components/poll-cast")),
    marko_loadTag = marko_helpers.t,
    poll_cast_tag = marko_loadTag(poll_cast_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<section class=\"section\"><div class=\"narrow\"><div class=\"heading\"><h1 class=\"title has-text-centered\">" +
    marko_escapeXml(input.poll.question) +
    "</h1></div><div class=\"body\">");

  if (state.editing) {
    out.w("<div>Can edit</div>");
  } else {
    poll_cast_tag({
        poll: input.poll,
        token: input.token,
        editable: input.user.hasOwnProperty("id") && (input.poll.owned === input.user.id)
      }, out, __component, "6");
  }

  out.w("</div></div></section>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-vote-section/index.marko",
    component: "./",
    tags: [
      "../../../../components/poll-cast"
    ]
  };
