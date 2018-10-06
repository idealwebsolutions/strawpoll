// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/vote/index.marko",
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/dist/runtime/helper-loadTemplate"),
    base_template = marko_loadTemplate(require.resolve("../../base.marko")),
    main_navigation_template = marko_loadTemplate(require.resolve("../../components/main-navigation")),
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    main_navigation_tag = marko_loadTag(main_navigation_template),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    poll_section_template = marko_loadTemplate(require.resolve("./components/poll-section")),
    poll_section_tag = marko_loadTag(poll_section_template),
    await_tag = marko_loadTag(require("marko/dist/taglibs/async/await-tag")),
    include_tag = marko_loadTag(require("marko/dist/taglibs/core/include-tag"));

const { Agent } = require('https')
const axios = require('axios');

function render(input, out, __component, component, state) {
  var data = input;

  const PollProvider = axios.get(`https://127.0.0.1:9000/api/v1/poll/${input.hash}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  })

  const CommentProvider = axios.get(`https://127.0.0.1:9000/api/v1/comments/${input.hash}`)

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
            await_tag({
                _dataProvider: PollProvider,
                _name: "PollProvider",
                renderBody: function renderBody(out, poll) {
                  poll_section_tag({
                      poll: poll.data
                    }, out, __component, "5");
                }
              }, out, __component, "4");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ak_: true,
    _l_: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/vote/index.marko",
    tags: [
      "../../base.marko",
      "../../components/main-navigation",
      "./components/poll-section",
      "marko/dist/taglibs/async/await-tag",
      "marko/dist/taglibs/core/include-tag"
    ]
  };
