// Compiled using marko@4.13.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/strawpoll$1.0.0/resources/views/components/page-header.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<head><title>Strawpoll - Create and manage live polls instantly " +
    marko_escapeXml(input.title ? `| ${input.title}`: '') +
    "</title><meta charset=\"utf8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"session\"" +
    marko_attr("content", `${input.token || ''}`) +
    "><link rel=\"dns-prefetch\" href=\"https://cdnjs.cloudflare.com\"><link rel=\"dns-prefetch\" href=\"https://fonts.googleapis.com\"><link rel=\"dns-prefetch\" href=\"https://use.fontawesome.com\"><link rel=\"stylesheet\" href=\"//fonts.googleapis.com/css?family=Coming+Soon|Permanent+Marker|IBM+Plex+Mono\"><link rel=\"stylesheet\" href=\"//use.fontawesome.com/releases/v5.4.1/css/all.css\" integrity=\"sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css\" integrity=\"sha384-OHBBOqpYHNsIqQy8hL1U+8OXf9hH6QRxi0+EODezv82DfnZoV7qoHAZDwMwEJvSw\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/flatpickr/4.5.1/flatpickr.css\" integrity=\"sha256-tUFg4y6qj4WTN1LzL83dCuIJwr/+Vhph/nf82gD/X2w=\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css\" integrity=\"sha256-ebN46PPB/s45oUcqLn2SCrgOtYgVJaFiLZ26qVSqI8M=\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"//cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/blue/pace-theme-minimal.min.css\" integrity=\"sha256-DNn0Y4C4mm62z/egeR6gp2SHN2vSM737qvWjDDuO0y0=\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" media=\"all\" href=\"/static/app-264a5441500e7a710c2a.css\"></head>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/strawpoll$1.0.0/resources/views/components/page-header.marko"
  };
