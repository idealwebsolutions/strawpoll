// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/login/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a,
    marko_classAttr = marko_helpers.ca;

function render(input, out, __component, component, state) {
  var data = input;

  console.log(input.user)

  out.w("<div>");

  if (input.authenticated) {
    out.w("<div class=\"navbar-item has-dropdown is-hoverable\"><div class=\"navbar-link\"><div class=\"media\"><div class=\"media-left\"><figure class=\"image is-32x32\"><img src=\"https://bulma.io/images/placeholders/96x96.png\" alt=\"avatar\"></figure></div><div class=\"media-content\"><p class=\"content\"><strong>" +
      marko_escapeXml(input.user.screen_name) +
      "</strong></p> </div></div></div><div class=\"navbar-dropdown\"><a class=\"navbar-item is-danger\">Sign out</a></div></div>");
  } else {
    out.w("<div class=\"navbar-item\"><a href=\"#\" class=\"button is-outlined is-primary\"" +
      marko_attr("data-marko", {
        onclick: __component.d("click", "_onActivate", false)
      }, false) +
      ">Sign in</a></div>");
  }

  out.w("<div" +
    marko_classAttr({
      modal: true,
      "is-active": state.active
    }) +
    "><div class=\"modal-background\"></div><div class=\"modal-content\"><p class=\"buttons\"><a href=\"/login/twitter\" class=\"button is-large is-info is-outlined\"><span class=\"icon\"><i class=\"fa fa-twitter\" aria-hidden></i></span><span>Sign in with Twitter</span></a><a href=\"/login/google\" class=\"button is-large is-danger is-outlined\"><span class=\"icon\"><i class=\"fa fa-google\" aria-hidden></i></span><span>Sign in with Google</span></a><a href=\"/login/reddit\" class=\"button is-large is-warning is-outlined\"><span class=\"icon\"><i class=\"fa fa-reddit\" aria-hidden></i></span><span>Sign in with Reddit</span></a><a href=\"/login/twitchtv\" class=\"button is-large is-purple is-outlined\"><span class=\"icon\"><i class=\"fa fa-twitch\" aria-hidden></i></span><span>Sign in with Twitch</span></a></p> </div><button class=\"modal-close is-large\" aria-label=\"close\"" +
    marko_attr("data-marko", {
      onclick: __component.d("click", "_onClose", false)
    }, false) +
    "></button></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/components/login/index.marko",
    component: "./"
  };
