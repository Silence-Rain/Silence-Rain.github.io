let app = new Vue({
  el: '#app',
  template: `
    <div id='app'>
      <sidebar @routeChange='routeChange' :route='route || "home"'></sidebar>
      <page @routeChange='routeChange' :route='route || "home"'></page>
    </div>`,
  data() {
    return {
      route: ''
    };
  },
  methods: {
    routeChange(route) {
      this.route = route;
    }
  }
});

stylr(`
  :root
    --theme-color #191970
    --divider-color #edebf0

  *
    font-family "Montserrat", "Open Sans", "Helvetica", "Arial", "source-han-sans-tc", sans-serif
    line-height 1.75em
    font-size 14px
    -webkit-text-size-adjust 100%
    transition .3s

  html, body
    margin 0
    padding 0
    background #fff
    color #000

  ::selection
    background rgba(#000, 0.1)

  a, a:hover, a:active, a:visited
    color var(--theme-color)
    text-decoration none
    cursor pointer

    &:hover
      color #000

  p
    margin-top 0
    margin-bottom 0

  #app
    max-width 1200px
    margin 0 auto
    padding 0 25px
    display flex
    flex-direction row
    align-items flex-start

    @media screen and (max-width: 600px)
      flex-direction column
      align-items stretch
`);
