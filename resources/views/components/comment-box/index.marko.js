// Compiled using marko@4.13.7 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/comment-box/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_str = marko_helpers.s,
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<article class=\"media\"><div class=\"media-content\"><div class=\"field\"><p class=\"control\">");

  if (state.preview) {
    out.w("<div class=\"preview-container\">" +
      marko_str(state.rendered) +
      "</div>");
  } else {
    out.w("<textarea class=\"textarea editor has-background-grey has-text-light\" placeholder=\"Add a comment...\"" +
      marko_attr("value", state.content) +
      marko_attr("data-marko", {
        oninput: __component.d("input", "_onInput", false)
      }, false) +
      "></textarea>");
  }

  out.w("</p></div><div class=\"field\"><p class=\"control\"><div class=\"toolbar has-background-grey-dark\"><a class=\"button is-pulled-right is-warning\"" +
    marko_attr("data-marko", {
      onclick: __component.d("click", "_onRenderPreview", false)
    }, false) +
    ">Preview</a><a class=\"button is-pulled-right is-info\"" +
    marko_attr("disabled", state.ready || state.submitted) +
    ">Comment</a></div></p></div></div></article>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/components/comment-box/index.marko",
    component: "./"
  };
