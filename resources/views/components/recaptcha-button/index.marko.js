// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/recaptcha-button/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_loadTag = marko_helpers.t,
    _preserve_tag = marko_loadTag(require("marko/src/components/taglib/preserve-tag")),
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_attr = marko_helpers.a;

const { RECAPTCHA_SITE_KEY } = require('../../../../lib/constants');

function render(input, out, __component, component, state) {
  var data = input;

  var __key1 = __component.___nextKey("0");

  out.w("<button type=\"submit\" class=\"button is-medium is-outlined is-primary g-recaptcha\" data-size=\"invisible\" data-callback=\"onCaptchaResponse\" data-sitekey=\"" +
    marko_escapeXmlAttr(RECAPTCHA_SITE_KEY) +
    "\"" +
    marko_attr("disabled", input.disabled) +
    ">");

  _preserve_tag({
      bodyOnly: true,
      key: __key1,
      renderBody: function renderBody(out) {
        out.w(marko_escapeXml(input.text));
      }
    }, out);

  out.w("</button>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/recaptcha-button/index.marko",
    component: "./",
    tags: [
      "marko/src/components/taglib/preserve-tag"
    ]
  };
