// Compiled using marko@4.13.7 - DO NOT EDIT
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
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

const { Agent } = require('https')
const axios = require('axios');

function render(input, out, __component, component, state) {
  var data = input;

  const PollProvider = axios.get(`https://127.0.0.1:9000/api/v1/poll/${input.hash}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  })

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
            out.w("<div class=\"container\">");

            await_tag({
                clientReorder: true,
                _dataProvider: PollProvider,
                _name: "PollProvider",
                renderPlaceholder: function renderBody(out) {
                  out.w("Loading...");
                },
                renderBody: function renderBody(out, poll) {
                  poll_monitor_section_tag({
                      user: input.user || {},
                      poll: poll.data
                    }, out, __component, "6");
                }
              }, out, __component, "5");

            out.w("</div>");
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
      "marko/src/taglibs/core/include-tag"
    ]
  };
