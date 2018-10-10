// Compiled using marko@4.13.7 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/main/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    base_template = marko_loadTemplate(require.resolve("../../base.marko")),
    main_navigation_template = marko_loadTemplate(require.resolve("../../components/main-navigation")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    main_navigation_tag = marko_loadTag(main_navigation_template),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    _preserve_tag = marko_loadTag(require("marko/src/components/taglib/preserve-tag")),
    create_poll_template = marko_loadTemplate(require.resolve("../../components/create-poll")),
    create_poll_tag = marko_loadTag(create_poll_template),
    poll_preview_template = marko_loadTemplate(require.resolve("../../components/poll-preview")),
    poll_preview_tag = marko_loadTag(poll_preview_template),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  include_tag({
      _target: base_template,
      title: input.title,
      header: {
          renderBody: function renderBody(out) {
            main_navigation_tag({
                user: input.user || {},
                authenticated: input.authenticated
              }, out, __component, "2");
          }
        },
      main: {
          renderBody: function renderBody(out) {
            out.w("<div class=\"container\"> <div class=\"tile is-ancestor\"><div class=\"tile is-parent is-8\"><article class=\"tile is-child box\"><section class=\"section\"><div id=\"form-container\">");

            var __key11 = __component.___nextKey("10");

            out.w("<div class=\"heading\">");

            _preserve_tag({
                bodyOnly: true,
                key: __key11,
                renderBody: function renderBody(out) {
                  out.w("<h1 class=\"title is-uppercase has-text-centered\">Create Polls In A Few Clicks</h1>");
                }
              }, out);

            out.w("</div><div class=\"body\">");

            create_poll_tag({
                token: input.token,
                field: input.field,
                authenticated: input.authenticated,
                error: input.error
              }, out, __component, "14");

            out.w("</div></div></section></article></div><div class=\"tile is-parent\"><div class=\"tile is-vertical\"><article class=\"tile is-child box\"><p class=\"title\">Trending</p>");

            poll_preview_tag({}, out, __component, "19");

            poll_preview_tag({}, out, __component, "20");

            poll_preview_tag({}, out, __component, "21");

            out.w("</article><article class=\"tile is-child box\"><p class=\"title\">Newest</p><p class=\"subtitle\">With some content</p><div class=\"content\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p></div></article></div></div></div></div>");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/main/index.marko",
    tags: [
      "../../base.marko",
      "../../components/main-navigation",
      "marko/src/components/taglib/preserve-tag",
      "../../components/create-poll",
      "../../components/poll-preview",
      "marko/src/taglibs/core/include-tag"
    ]
  };
