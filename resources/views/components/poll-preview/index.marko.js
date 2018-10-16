// Compiled using marko@4.13.7 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/poll-preview/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<a class=\"content box\"" +
    marko_attr("href", `/${input.poll.hash}`) +
    "><h5 class=\"is-5 title has-text-centered\">" +
    marko_escapeXml(input.poll.question) +
    "</h5><div class=\"level\"><div class=\"level-item has-text-centered\"><div><p class=\"heading\">Views</p><p class=\"title\">" +
    marko_escapeXml(input.poll.views) +
    "</p></div></div><div class=\"level-item has-text-centered\"><div><p class=\"heading\">Votes</p><p class=\"title\">" +
    marko_escapeXml(input.poll.votes) +
    "</p></div></div><div class=\"level-item has-text-centered\"><div><p class=\"heading\">Likes</p><p class=\"title\">" +
    marko_escapeXml(input.poll.likes) +
    "</p></div></div></div></a>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/poll-preview/index.marko",
    component: "./"
  };
