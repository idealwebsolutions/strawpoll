// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-share-section/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<section class=\"section\"><div class=\"content has-text-centered\"><h3 class=\"title is-3\">Share</h3><div class=\"field has-addons\"><div class=\"control copy-control\"><input id=\"link\" class=\"input has-text-centered has-background-grey-lighter\" type=\"text\"" +
    marko_attr("value", state.path) +
    " readonly></div><div class=\"control\"><button class=\"button\" data-clipboard-target=\"#link\"><span class=\"icon\"><i class=\"fa fa-copy\"></i></span></button></div></div><nav class=\"level\"><div class=\"level-item has-text-centered\"><button class=\"button is-outlined\">Share with Twitter</button></div><div class=\"level-item has-text-centered\"><button class=\"button is-outlined\">Share with Reddit</button></div><div class=\"level-item has-text-centered\"><button class=\"button is-outlined\">Share with Twitch</button></div></nav></div></section>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/pages/vote/components/poll-share-section/index.marko",
    component: "./"
  };
