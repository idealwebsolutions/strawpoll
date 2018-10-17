// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/comment-list/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    comment_template = marko_loadTemplate(require.resolve("../comment")),
    marko_loadTag = marko_helpers.t,
    comment_tag = marko_loadTag(comment_template);

function render(input, out, __component, component, state) {
  var data = input;

  var for__0 = 0;

  marko_forEach(input.comments, function(comment) {
    var keyscope__1 = "[" + ((for__0++) + "]");

    comment_tag({
        data: comment
      }, out, __component, "2" + keyscope__1);
  });
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/comment-list/index.marko",
    tags: [
      "../comment"
    ]
  };
