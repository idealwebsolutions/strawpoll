// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/index.marko",
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
    poll_monitor_section_template = marko_loadTemplate(require.resolve("./components/poll-monitor-section")),
    poll_monitor_section_tag = marko_loadTag(poll_monitor_section_template),
    await_tag = marko_loadTag(require("marko/src/taglibs/async/await-tag")),
    comment_section_template = marko_loadTemplate(require.resolve("./components/comment-section")),
    comment_section_tag = marko_loadTag(comment_section_template),
    similar_polls_section_template = marko_loadTemplate(require.resolve("./components/similar-polls-section")),
    similar_polls_section_tag = marko_loadTag(similar_polls_section_template),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

const { Agent } = require('https')
const { get } = require('axios');

function render(input, out, __component, component, state) {
  var data = input;

  const PollProvider = get(`https://127.0.0.1:9000/api/v1/poll/${input.hash}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  })

  const CommentProvider = get(`https://127.0.0.1:9000/api/v1/comments/${input.hash}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  })

  include_tag({
      _target: base_template,
      title: input.title,
      token: input.token,
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
            out.w("<div class=\"container\">");

            await_tag({
                clientReorder: true,
                _dataProvider: PollProvider,
                _name: "PollProvider",
                renderPlaceholder: function renderBody(out) {
                  out.w("<h5 class=\"is-5 has-text-centered\">Loading poll...</h5>");
                },
                renderError: function renderBody(out) {
                  out.w("Failed to load.");
                },
                renderBody: function renderBody(out, poll) {
                  poll_monitor_section_tag({
                      user: input.user || {},
                      poll: poll.data
                    }, out, __component, "7");
                }
              }, out, __component, "5");

            out.w("<div class=\"tile is-ancestor\"><div class=\"tile is-5 is-parent\"><div class=\"tile is-child box\">");

            await_tag({
                clientReorder: true,
                _dataProvider: CommentProvider,
                _name: "CommentProvider",
                renderPlaceholder: function renderBody(out) {
                  out.w("<h5 class=\"is-5 has-text-centered\">Loading comments...</h5>");
                },
                renderBody: function renderBody(out, comments) {
                  comment_section_tag({
                      authenticated: input.authenticated,
                      user: input.user || {},
                      comments: comments.data
                    }, out, __component, "13");
                }
              }, out, __component, "11");

            out.w("</div></div><div class=\"tile is-parent\"><div class=\"tile is-child box\">");

            similar_polls_section_tag({}, out, __component, "16");

            out.w("</div></div></div></div>");
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
    id: "/strawpoll$1.0.0/resources/views/pages/vote/index.marko",
    tags: [
      "../../base.marko",
      "../../components/main-navigation",
      "./components/poll-monitor-section",
      "marko/src/taglibs/async/await-tag",
      "./components/comment-section",
      "./components/similar-polls-section",
      "marko/src/taglibs/core/include-tag"
    ]
  };
