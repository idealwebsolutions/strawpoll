// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-monitor-section/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    poll_vote_section_template = marko_loadTemplate(require.resolve("../poll-vote-section")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    poll_vote_section_tag = marko_loadTag(poll_vote_section_template),
    poll_results_template = marko_loadTemplate(require.resolve("../../../../components/poll-results")),
    poll_results_tag = marko_loadTag(poll_results_template),
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"container\"><div class=\"tile is-ancestor\"><div class=\"tile is-parent\"><div class=\"tile is-child box\">");

  poll_vote_section_tag({
      user: input.user,
      poll: input.poll
    }, out, __component, "vote");

  out.w("</div></div></div><div class=\"tile is-ancestor\"><div class=\"tile is-4 is-parent\"><div class=\"tile is-child box\">");

  poll_results_tag({
      choices: input.poll.choices
    }, out, __component, "results");

  out.w("</div></div><div class=\"tile is-parent\"><div class=\"tile is-child box\"><div class=\"content\"><h3 class=\"title is-3 has-text-centered\">Share</h3><div class=\"control\"><input class=\"input has-text-centered has-background-grey-lighter\" type=\"text\"" +
    marko_attr("value", `${state.path}`) +
    " readonly></div></div></div></div></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-monitor-section/index.marko",
    component: "./",
    tags: [
      "../poll-vote-section",
      "../../../../components/poll-results"
    ]
  };
