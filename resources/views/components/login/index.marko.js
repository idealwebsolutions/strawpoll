// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/login/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_classAttr = marko_helpers.ca;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div>");

  if (input.authenticated) {
    out.w("<a href=\"#\" class=\"button is-outlined is-danger\">Sign out</a>");
  } else {
    out.w("<a href=\"#\" class=\"button is-outlined is-primary\"" +
      marko_attr("data-marko", {
        onclick: __component.d("click", "_onActivate", false)
      }, false) +
      ">Sign in</a>");
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
    _l_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/login/index.marko",
    component: "./"
  };
