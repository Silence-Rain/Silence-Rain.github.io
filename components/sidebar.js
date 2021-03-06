Vue.component('sidebar', {
  template: `
    <div class='sidebar' :data-route='route'>
      <div class='header'>
        <p class='intro'>{{ info.intro }}</p>
        <p class='nick'>{{ info.nick }}</p>
        <p class='sign'>{{ info.sign }}</p>
        <div class='socialmedia'>
          <a class='follow-button' href='https://github.com/Silence-Rain'><i class="fa fa-github fa-lg"></i> Follow</a>
          <a class='follow-button' href='https://linkedin.com/in/shaohuang-daniel-mo/'><i class="fa fa-linkedin "></i> Follow</a>
        </div>
      </div>
      <div class='nav'>
        <div class='category' v-for='category in info.nav'>
          <p class='title'>{{ category.title }}</p>
          <div class='tags'>
            <div class='tag' :class='{ selected: tag.link === route, disabled: tag.disabled }' v-for='tag in category.links' @click='navigate(tag.link)'>{{ tag.name }}</div>
          </div>
        </div>
      </div>
    </div>`,
  props: ['route'],
  data() {
    return { info: {} };
  },
  created() {
    getFile('data/sidebar.yml').then((res) => {
      this.info = jsyaml.load(res);
      document.title = this.info.title;
    });
  },
  methods: {
    navigate(dest) {
      if (/\/\//.test(dest)) {
        location.href = dest;
      } else {
        this.$emit('routeChange', dest);
      }
    }
  }
});

stylr(`
  .sidebar
    width 188px
    overflow hidden
    display flex
    flex-shrink 0
    flex-direction column
    align-items flex-end
    position sticky
    position -webkit-sticky
    margin 60px 0
    padding 21px 0
    top 60px
    z-index 9999
    padding-right 40px
    border-right 2px solid var(--theme-color)

    @media screen and (max-width: 600px)
      width 100%
      align-items stretch
      margin 0
      top 0
      padding-right 0
      border-right 0 none
      background #fff
      overflow visible
      position static

    *
      cursor default

    .header
      display flex
      flex-shrink 0
      flex-direction column
      align-items flex-end

      @media screen and (max-width: 600px)
        height 72px
        flex-direction row
        align-items center
        padding 0 10px

        * + *
          margin-left 10px

      .intro
        color var(--theme-color)
        line-height 1.5em
        margin-top -1.5em

      .nick
        font-size 32px
        background var(--theme-color)
        line-height 1.2em
        margin-bottom 20px
        color #fff

        @media screen and (max-width: 600px)
          font-size 20px

      .sign
        color #aaa

        @media screen and (max-width: 600px)
          display none

      .socialmedia
        display flex
        flex-direction row
        margin-top 20px
        margin-bottom 10px
        filter contrast(1.4) hue-rotate(-45deg)

      .follow-button
        padding 3px 6px  
        margin-left 4px
        border 1px solid #c5c9cc
        border-radius 0.25em

    @media screen and (max-width: 600px)
      &:not([data-route="home"]) .nav
        border-bottom-color transparent
        padding 0

        *
          display none

    .nav
      box-sizing border-box
      border-top 1px solid var(--divider-color)
      margin-top 10px

      @media screen and (max-width: 600px)
        width auto
        margin-top 0
        pointer-events none
        padding 10px 12px
        border-bottom 1px solid var(--theme-color)

      .title
        margin 25px 0 5px
        color #aaa
        text-align right

        @media screen and (max-width: 600px)
          display inline-block
          vertical-align middle
          margin 0

          &::after
            content '/'
            margin 0 10px

      .tags
        width 100%
        display flex
        flex-direction column
        align-items flex-end
        white-space pre-wrap

        @media screen and (max-width: 600px)
          width auto
          display inline-flex
          vertical-align middle
          flex-direction row
          flex-wrap wrap

        .tag
          font-size 13px
          margin 3px 0
          color #000
          transition .2s
          cursor pointer
          border-bottom 1px solid var(--theme-color)

          @media screen and (max-width: 600px)
            background rgba(#fff, 0.9)
            pointer-events all
            margin-right 10px

          &:hover, &.selected
            color var(--theme-color)

        .disabled
          color #c5c9cc
          border-bottom 1px solid #c5c9cc

          &:hover
            color #c5c9cc
`);
