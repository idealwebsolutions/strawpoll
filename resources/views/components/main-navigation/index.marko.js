// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/main-navigation/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    login_portal_template = marko_loadTemplate(require.resolve("../login-portal")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    login_portal_tag = marko_loadTag(login_portal_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"navbar has-background-link has-text-white\"><div class=\"container\"><div class=\"navbar-start\"><div class=\"navbar-brand\"><a class=\"navbar-item\" href=\"/\"><h4 id=\"site-title\" class=\"title is-4\">Strawpoll</h4></a></div></div><div class=\"navbar-end\">");

  if (input.authenticated) {
    out.w("<a href=\"/create\" class=\"navbar-item\"><span class=\"icon\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></span><span>Create Poll</span></a>");
  }

  if (input.authenticated) {
    out.w("<a href=\"/user/dashboard\" class=\"navbar-item\"><span class=\"icon\"><i class=\"fa fa-chart-bar\"></i></span><span>Dashboard</span></a>");
  }

  login_portal_tag({
      user: input.user,
      authenticated: input.authenticated
    }, out, __component, "15");

  out.w("</div></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/components/main-navigation/index.marko",
    tags: [
      "../login-portal"
    ]
  };
