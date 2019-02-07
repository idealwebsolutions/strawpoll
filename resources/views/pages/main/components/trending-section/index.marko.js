// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/pages/main/components/trending-section/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    poll_preview_template = marko_loadTemplate(require.resolve("../../../../components/poll-preview")),
    marko_loadTag = marko_helpers.t,
    poll_preview_tag = marko_loadTag(poll_preview_template),
    await_tag = marko_loadTag(require("marko/src/taglibs/async/await-tag"));

const { Agent } = require('https');
const { get } = require('axios');

function render(input, out, __component, component, state) {
  var data = input;

  const TrendingProvider = get('https://127.0.0.1:9000/api/v1/polls/trending', {
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  });

  out.w("<section class=\"section\"><p class=\"title\">Trending</p>");

  await_tag({
      _dataProvider: TrendingProvider,
      _name: "TrendingProvider",
      renderBody: function renderBody(out, trending) {
        var for__3 = 0;

        marko_forEach(trending.data, function(poll) {
          var keyscope__4 = "[" + ((for__3++) + "]");

          poll_preview_tag({
              poll: poll
            }, out, __component, "5" + keyscope__4);
        });
      }
    }, out, __component, "2");

  out.w("</section>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/pages/main/components/trending-section/index.marko",
    tags: [
      "../../../../components/poll-preview",
      "marko/src/taglibs/async/await-tag"
    ]
  };
