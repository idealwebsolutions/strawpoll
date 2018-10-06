// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/datepicker/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_forEachWithStatusVar = require("marko/dist/runtime/helper-forEachWithStatusVar"),
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"field\"><label class=\"label\" for=\"expiry\">Expiration Date</label><div class=\"field has-addons\"><div class=\"control\"><div><input type=\"text\" name=\"flatpickr\" class=\"input is-normal\" placeholder=\"Select Expiration Date\" data-input></div></div><div class=\"control\"><div class=\"select\"><select name=\"timezone\">");

  var for__8 = 0;

  marko_forEachWithStatusVar(component.timezones, function(timezone, loop) {
    var keyscope__9 = "[" + ((for__8++) + "]");

    out.w("<option" +
      marko_attr("value", timezone.abbr) +
      marko_attr("selected", loop.isFirst()) +
      ">" +
      marko_escapeXml(timezone.abbr) +
      "</option>");
  });

  out.w("</select></div></div></div></div>");
}

marko_template._ = marko_renderer(render, {
    _l_: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/datepicker/index.marko",
    component: "./"
  };
