// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/dashboard/components/summary-section/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

const { Agent } = require('https');
const axios = require('axios');

function render(input, out, __component, component, state) {
  var data = input;

  console.log(input.user)

  out.w("<! -- Filter for active/expired polls --><div id=\"summary\"><nav class=\"level\"><div class=\"level-item has-text-centered\"><div><p class=\"heading\">Polls</p><p class=\"animated pulse title\">3,456</p></div></div><div class=\"level-item has-text-centered\"><div><p class=\"heading\">Following</p><p class=\"animated pulse title\">123</p></div></div><div class=\"level-item has-text-centered\"><div><p class=\"heading\">Followers</p><p class=\"animated pulse title\">456K</p></div></div></nav></div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/dashboard/components/summary-section/index.marko",
    component: "./"
  };
