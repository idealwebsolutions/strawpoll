// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/dashboard/components/sidenav-section/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<aside class=\"menu\"><p class=\"menu-label\">Polls</p><ul class=\"menu-list\"><li><a href=\"#\" class=\"is-active\">Summary</a></li><li><a href=\"#\">Drafts</a></li></ul><p class=\"menu-label\">Administration</p><ul class=\"menu-list\"><li><a>Profile</a></li><li><a>Invitations</a></li>");

  if (input.user.role === 2) {
    out.w("<li><a>Users</a></li>");
  }

  out.w("</ul></aside>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/dashboard/components/sidenav-section/index.marko",
    component: "./"
  };
