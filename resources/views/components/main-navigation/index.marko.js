// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/main-navigation/index.marko",
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/dist/runtime/helper-loadTemplate"),
    login_template = marko_loadTemplate(require.resolve("../login")),
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    login_tag = marko_loadTag(login_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"navbar has-background-white-ter\"><div class=\"container\"><div class=\"navbar-start\"><div class=\"navbar-brand\"><a class=\"navbar-item\" href=\"/\"><h4 id=\"site-title\" class=\"title is-4\">Strawpoll</h4></a></div></div><div class=\"navbar-end\">");

  if (input.authenticated) {
    out.w("<div class=\"navbar-item\"><p class=\"buttons\"><a href=\"/create\" class=\"button is-success\"><span class=\"icon\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span><span>Create Poll</span></a></p></div>");
  }

  out.w("<div class=\"navbar-item\"><input type=\"text\" class=\"input\" placeholder=\"\"></div><div class=\"navbar-item\">");

  login_tag({
      authenticated: input.authenticated
    }, out, __component, "16");

  out.w("</div></div></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ak_: true,
    _l_: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/components/main-navigation/index.marko",
    tags: [
      "../login"
    ]
  };
