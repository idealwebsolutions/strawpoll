// Compiled using marko@4.13.7 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/poll-cast/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_forEachWithStatusVar = require("marko/src/runtime/helper-forEachWithStatusVar"),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_attr = marko_helpers.a,
    marko_escapeXml = marko_helpers.x,
    marko_loadTag = marko_helpers.t,
    _preserve_tag = marko_loadTag(require("marko/src/components/taglib/preserve-tag")),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    recaptcha_button_template = marko_loadTemplate(require.resolve("../recaptcha-button")),
    recaptcha_button_tag = marko_loadTag(recaptcha_button_template);

const spacetime = require('spacetime')
const { convertToLocaltime } = require('../../../../lib/util');

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<form name=\"poll\" action=\"\" enctype=\"application/json\" method=\"post\" novalidate" +
    marko_attr("data-marko", {
      onsubmit: __component.d("submit", "_onSubmit", false)
    }, false) +
    ">");

  var for__1 = 0;

  marko_forEachWithStatusVar(input.poll.choices, function(choice, loop) {
    var keyscope__2 = "[" + ((for__1++) + "]");

    var __key4 = __component.___nextKey("3" + keyscope__2);

    out.w("<div class=\"field\">");

    _preserve_tag({
        bodyOnly: true,
        key: __key4,
        renderBody: function renderBody(out) {
          out.w("<input type=\"radio\" id=\"choice" +
            marko_escapeXmlAttr(loop.getIndex()) +
            "\" class=\"is-checkradio is-black\" name=\"choice\"" +
            marko_attr("value", choice) +
            marko_attr("data-marko", {
              onchange: __component.d("change", "_onChange", false)
            }, false) +
            "><label for=\"choice" +
            marko_escapeXmlAttr(loop.getIndex()) +
            "\">" +
            marko_escapeXml(choice) +
            "</label>");
        }
      }, out);

    out.w("</div>");
  });

  out.w("<div class=\"field\">");

  var __key9 = __component.___nextKey("8");

  _preserve_tag({
      key: __key9,
      renderBody: function renderBody(out) {
        out.w("<label class=\"label\">Created " +
          marko_escapeXml(input.poll.created ? spacetime(Date.parse(convertToLocaltime(input.poll.created))).fromNow().qualified : "sometime ago") +
          " - " +
          marko_escapeXml(input.poll.views) +
          " views</label>");
      }
    }, out);

  out.w("</div><div class=\"field\"><div class=\"control\"><input type=\"hidden\" name=\"_csrf\"" +
    marko_attr("value", state.token) +
    ">");

  if (input.poll.captcha) {
    recaptcha_button_tag({
        text: "Vote",
        disabled: state.disabled
      }, out, __component, "13", [
      [
        "captcharesponse",
        "_onCaptchaResponse",
        false
      ]
    ]);
  } else {
    out.w("<button class=\"button is-medium is-outlined is-primary\" type=\"submit\"" +
      marko_attr("disabled", state.disabled) +
      ">Vote</button>");
  }

  out.w("</div></div></form>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/components/poll-cast/index.marko",
    component: "./",
    tags: [
      "marko/src/components/taglib/preserve-tag",
      "../recaptcha-button"
    ]
  };
