// Compiled using marko@4.13.5 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/page-footer.marko",
    components_helpers = require("marko/dist/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div id=\"external-scripts\"><script async src=\"//www.google.com/recaptcha/api.js\"></script><script defer src=\"//www.gstatic.com/charts/loader.js\"></script><script async src=\"//cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js\" integrity=\"sha256-EPrkNjGEmCWyazb3A/Epj+W7Qm2pB9vnfXw+X6LImPM=\" crossorigin=\"anonymous\"></script><script defer src=\"/static/app-395afd8065cc3ab15150.js\"></script></div>");
}

marko_template._ = marko_renderer(render, {
    ak_: true,
    _l_: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/page-footer.marko"
  };
