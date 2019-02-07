// Compiled using marko@4.13.8 - DO NOT EDIT
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

  out.w("<a class=\"panel-block content\"" +
    marko_attr("href", `/${input.poll.hash}`) +
    "><article class=\"media\"><figure class=\"media-left\"><span class=\"icon is-large\"><i class=\"fas fa-2x fa-chart-pie\"></i></span></figure><div class=\"media-content\"><div class=\"content\"><p class=\"is-5 title has-text-left\">" +
    marko_escapeXml(input.poll.question) +
    "</p></div></div></article></a>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/poll-preview/index.marko",
    component: "./"
  };
