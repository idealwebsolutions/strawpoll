// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/comment/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_str = marko_helpers.s;

const {
  convertToLocaltime,
  calculateSince
} = require('../../../../lib/util')
const md = require('markdown-it')()
const emoji = require('markdown-it-emoji')

md.use(emoji);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<article class=\"media\"><figure class=\"media-left\"><p class=\"image is-32x32\"><img src=\"https://bulma.io/images/placeholders/64x64.png\"></p></figure><div class=\"media-content\"><div class=\"content\"><p><strong>" +
    marko_escapeXml(input.data.screen_name) +
    "</strong> <small>" +
    marko_escapeXml(input.data.created ? calculateSince(convertToLocaltime(input.data.created)) : "sometime ago") +
    "</small><br>" +
    marko_str(md.render(input.data.content)) +
    "</p></div>");

  if (input.authenticated) {
    out.w("<nav class=\"level is-mobile\"><div class=\"level-left\"><a class=\"level-item\"><span class=\"icon is-small\"><i class=\"fa fa-reply\"></i></span></a><a class=\"level-item\"><span class=\"icon is-small\"><i class=\"fa fa-thumbs-up\"></i></span></a><a class=\"level-item\"><span class=\"icon is-small\"><i class=\"fa fa-flag\"></i></span></a></div></nav>");
  }

  out.w("</div><div class=\"media-right\"><button class=\"delete\"></button></div></article>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/comment/index.marko",
    component: "./"
  };
