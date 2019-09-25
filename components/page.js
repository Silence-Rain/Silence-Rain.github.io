marked.setOptions({
  gfm: true,
  tables: true,
});

Vue.component('page', {
  template: `
    <div class='page'>
      <audio class='player' controls='controls' loop autoplay>
        <source src='data/qilixiang.mp3' type='audio/mp3'>
      </audio>
      <div class='item' :class='"item-" + item.type' v-if='page' v-for='item in page'>
        <div v-if='item.type === "markdown"' v-html='item.content'></div>
        <div class='list' v-if='item.type === "catalog"' v-for='article in item.content' @click='navigate(article.link)'>
          <div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.intro }}</p>
            <p>{{ article.date }}</p>
          </div>
          <!--<div class='img' v-if='article.img'><img :src='article.img'></div>-->
          <hr/>
        </div>
      </div>
      <div class='item end'>
        {{ page ? page.length ? 'EOF' : '404' : 'CONNECTING..' }}
      </div>
    </div>`,
  props: ['route'],
  data() {
    return {
      page: null
    };
  },
  created() {
    this.load();
  },
  watch: {
    route() {
      this.load();
    },
    page() {
      window.scrollTo(0, 0);
    }
  },
  methods: {
    load() {
      if (/^\d{4}\/catalog$/.test(this.route)) {
        getFile(`data/${this.route.slice(0,4)}/index.json`)
          .then((res) => {
            this.page = [{
              type: 'catalog',
              content: res.content
            }]
          })
          .catch((e) => (this.page = []));
      } else {
        getFile(`data/${this.route}.md`)
          .then((res) => {
            this.page = [{
              type: 'markdown',
              content: marked(res) 
            }]
          })
          .catch((e) => (this.page = []));
      }
    },
    navigate(dest) {
      this.$emit('routeChange', dest);
    }
  }
});

stylr(`
  .page
    flex 1 1 auto
    margin 30px 0 25px 30px
    overflow hidden

    @media screen and (max-width: 600px)
      margin 0 0 25px

    *
      font-size 16px

    .player
      margin-top 25px

    audio
      outline none

    .item
      padding 10px 0
      margin 0 15px
      transition .3s
      color #000
      text-align justify

      @media screen and (max-width: 600px)
        margin 0 10px

      img
        display block
        max-width 100%
        max-height 600px
        margin 10px auto
        position relative

      p
        margin 1.5em 0

      pre, code
        font-family 'Fira Code', 'Source Code Pro', monospace
        font-size 95%
        letter-spacing -0.015em
        line-height 1.5em

        *
          font-family inherit
          font-size inherit
          line-height inherit

      h1 code, h2 code, h3 code, h4 code, h5 code, h6 code
        font-family inherit

      hr
        border 2px solid #c5c9cc

      ul
        padding-left 1.5em

      code
        background #fafafa
        margin 0

      pre
        padding 10px 15px
        background #fafafa
        margin 1em 0

      blockquote
        padding 10px 15px
        background #fafafa
        margin 1em 0

      blockquote p
        text-indent 0
        margin 2px 0

      h1, h2, h3, h4, h5, h6
        font-weight normal
        color #000
        text-align left

      h1
        font-size 32px

      h2
        font-size 28px

      h3
        font-size 26px

      h4
        font-size 24px

      h5
        font-size 22px

      h6
        font-size 20px

      del
        background #555
        color #555
        transition .3s
        text-decoration-color #333
        -webkit-text-decoration-color #333

        &:active, &:hover
          background #ccc

      table
        text-align justify
        word-wrap break-word
        word-break break-all
        width 100%
        overflow auto
        border-collapse collapse

      table th, table td
        padding 5px 10px
        border 1px solid var(--divider-color)
        border-collapse collapse

      table tr
        border-top 1px solid var(--divider-color)
        border-collapse collapse

      .list
        cursor pointer
        white-space pre-line
    /* .item-catalog
       .list
         display flex
         flex-direction row*/

    .end
      padding 5px 10px
      background #fafafa
      display inline-block
      margin 20px 15px
      color #888

      &:first-child
        margin-top 45px
`);
