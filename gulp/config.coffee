paths = require './paths'

config =
  ext: [
    "#{paths.static.ext}/jquery/dist/jquery.js"
    "#{paths.static.ext}/moment/moment.js"
    "#{paths.static.ext}/bootstrap/js/alert.js"
    "#{paths.static.ext}/bootstrap/js/button.js"
    "#{paths.static.ext}/bootstrap/js/transition.js"
    "#{paths.static.ext}/bootstrap/js/collapse.js"
    "#{paths.static.ext}/bootstrap/js/dropdown.js"
    "#{paths.static.ext}/bootstrap/js/tooltip.js"
    "#{paths.static.ext}/datatable/jquery.dataTables.min.js"
    "#{paths.static.ext}/vue/vue.min.js"
  ]
  style: [
    "#{paths.src.style}/style.less"
    "#{paths.src.style}/jquery.dataTables.min.css"
  ]
  script: [
    "#{paths.src.script}/**/*.coffee"
    "#{paths.src.script}/**/*.js"
  ]


module.exports = config
