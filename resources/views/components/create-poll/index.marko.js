// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/create-poll/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_classAttr = marko_helpers.ca,
    marko_attr = marko_helpers.a,
    marko_forEachWithStatusVar = require("marko/src/runtime/helper-forEachWithStatusVar"),
    marko_loadTag = marko_helpers.t,
    _preserve_tag = marko_loadTag(require("marko/src/components/taglib/preserve-tag")),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    datepicker_template = marko_loadTemplate(require.resolve("../datepicker")),
    datepicker_tag = marko_loadTag(datepicker_template),
    marko_escapeXmlAttr = marko_helpers.xa;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<form id=\"poll\" name=\"poll\" class=\"poll narrow has-background-white-bis\" action=\"/\" enctype=\"application/x-www-form-urlencoded\" method=\"post\" novalidate" +
    marko_attr("data-marko", {
      onsubmit: __component.d("submit", "submit", false)
    }, false) +
    "><div class=\"field\"><div class=\"control\"><input type=\"text\" name=\"question\"" +
    marko_classAttr({
      input: true,
      "is-large": true,
      "is-success": component.validateQuestion(),
      disabled: state.submitted
    }) +
    marko_attr("value", state.question) +
    " placeholder=\"Enter Question (ex: What is your name?)\"" +
    marko_attr("data-marko", {
      oninput: __component.d("input", "setQuestion", false)
    }, false) +
    "></div></div>");

  var for__4 = 0;

  marko_forEachWithStatusVar(state.choices, function(choice, loop) {
    var keyscope__5 = "[" + ((for__4++) + "]");

    out.w("<div class=\"field\"><div class=\"control\"><input type=\"text\" name=\"choices\"" +
      marko_classAttr({
        input: true,
        animated: true,
        slideInUp: true,
        "is-normal": true,
        "is-success": component.validateChoice(loop.getIndex())
      }) +
      " placeholder=\"Enter Answer\"" +
      marko_attr("value", choice) +
      marko_attr("data-marko", {
        oninput: __component.d("input", "setOrAppendChoice", false, [
            loop.isLast(),
            loop.getIndex()
          ])
      }, false) +
      "></div></div>");
  });

  out.w("<div id=\"options\" class=\"poll-section\"><div class=\"field\"><div class=\"control\"><input type=\"checkbox\" id=\"multiple\" name=\"multiple\" class=\"is-checkradio is-black\"" +
    marko_attr("checked", state.multiple) +
    marko_attr("data-marko", {
      onchange: __component.d("change", "toggleMultiple", false)
    }, false) +
    "> <label for=\"multiple\">Allow Multiple Options</label></div></div>");

  if (input.authenticated) {
    out.w("<div class=\"field\"><div class=\"control\"><input type=\"checkbox\" id=\"private\" name=\"private\" class=\"is-checkradio is-black\"" +
      marko_attr("checked", state.private) +
      marko_attr("data-marko", {
        onchange: __component.d("change", "togglePrivate", false)
      }, false) +
      "><label for=\"private\">Go Private</label><span class=\"icon tooltip is-tooltip-right\" data-tooltip=\"Allow only those who have a link to view the poll\"><i class=\"fa fa-info-circle\"></i></span></div></div>");
  }

  if (input.authenticated) {
    out.w("<div class=\"field\"><input type=\"checkbox\" id=\"comments\" name=\"comments\" class=\"is-checkradio is-black\"" +
      marko_attr("checked", state.comments) +
      marko_attr("data-marko", {
        onchange: __component.d("change", "toggleComments", false)
      }, false) +
      "><label for=\"comments\">Disable Comments</label><span class=\"icon tooltip is-tooltip-right\" data-tooltip=\"Disallow comments to be made/shown on the poll\"><i class=\"fa fa-info-circle\"></i></span></div>");
  }

  out.w("<div class=\"field\"><div class=\"control\"><input type=\"checkbox\" id=\"protect\" name=\"protect\" class=\"is-checkradio is-black\"" +
    marko_attr("checked", state.protect) +
    marko_attr("data-marko", {
      onchange: __component.d("change", "toggleProtect", false)
    }, false) +
    "><label for=\"protect\">Require Captcha</label></div></div></div><div class=\"poll-section\"><label class=\"label\" for=\"tags\">Tags (up to 5)</label><input id=\"tags\" class=\"input\" type=\"tags\" name=\"tags\" placeholder=\"Enter or comma to add a tag\"></div><div class=\"poll-section field\"><div class=\"control\"><label class=\"label\" for=\"permissions\">Voting Permissions</label><span class=\"select\">");

  var __key37 = __component.___nextKey("36");

  _preserve_tag({
      key: __key37,
      renderBody: function renderBody(out) {
        out.w("<select name=\"permissions\"><option value=\"moderate\" selected=\"selected\">Moderate - Allow a single vote per unique IP (default)</option><option value=\"low\">Low - Allow multiple votes per unique IP</option>");

        if (input.authenticated) {
          out.w("<option value=\"high\">High - Registered users only</option>");
        }

        out.w("</select>");
      }
    }, out);

  out.w("</span></div></div><div class=\"poll-section\">");

  datepicker_tag({
      date: state.expiry
    }, out, __component, "datepicker", [
    [
      "dateSelected",
      "onDateSelected",
      false
    ]
  ]);

  out.w("</div><div class=\"poll-section field is-grouped\"><div class=\"control\"><input type=\"hidden\" name=\"_csrf\"" +
    marko_attr("value", input.token) +
    "><button class=\"button is-medium " +
    marko_escapeXmlAttr(state.submitted ? "is-primary is-loading" : "is-primary") +
    "\"" +
    marko_attr("disabled", state.disabled || state.submitted) +
    " type=\"submit\">Create</button></div><div class=\"control\"><button class=\"button is-medium is-danger\"" +
    marko_attr("disabled", state.disabled || state.submitted) +
    " type=\"reset\"" +
    marko_attr("data-marko", {
      onclick: __component.d("click", "reset", false)
    }, false) +
    ">Reset</button> </div></div></form>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.sass"
    ],
    id: "/strawpoll$1.0.0/resources/views/components/create-poll/index.marko",
    component: "./",
    tags: [
      "marko/src/components/taglib/preserve-tag",
      "../datepicker"
    ]
  };
