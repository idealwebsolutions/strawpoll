// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/components/comment-section/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    comment_box_template = marko_loadTemplate(require.resolve("../../../../components/comment-box")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    comment_box_tag = marko_loadTag(comment_box_template),
    comment_list_template = marko_loadTemplate(require.resolve("../../../../components/comment-list")),
    comment_list_tag = marko_loadTag(comment_list_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<section class=\"section\"><h3 class=\"title is-3 has-text-centered\">Comments</h3>");

  comment_box_tag({
      user: input.user,
      hash: input.hash
    }, out, __component, "2");

  comment_list_tag({
      authenticated: input.authenticated,
      comments: input.comments
    }, out, __component, "3");

  out.w("</section>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/vote/components/comment-section/index.marko",
    tags: [
      "../../../../components/comment-box",
      "../../../../components/comment-list"
    ]
  };
