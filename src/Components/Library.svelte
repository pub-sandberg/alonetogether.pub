<script>
  import moment from 'moment'
  import Arena from 'are.na'
  const arena = new Arena()
  const channel = 'library-2uw05wda6ro'
  let data = []

  function getChannel(slug) {
    let channelData
    arena.channel(slug)
      .get()
      .then(child => {
        data.map(x => x.id).indexOf(child.id) > -1 ? false : data.push(child)
        data = data
      })
  }

  async function getLibrary() {
    arena
      .channel(channel)
      .get()
      .then(chan => {
        chan.contents.map(item => {
          if (item.base_class === 'Channel') {
            console.log('item', item)
            getChannel(item.slug)
          }
        })
      })
    .catch(err => console.log(err))
  }

  // init
  getLibrary()

  function returnLink(block) {
    return block.attachment !== null ? block.attachment.url : block.source.url
  }

  function returnTime(time) {
    // return moment(time).format('DD/MM/YYYY') + ' ' + 'at' + ' ' + moment(time).format('HH:ss')
    return moment(time).format('DD.MM.YYYY')
  }

  function returnChannelLink(channel) {
    return 'https://www.are.na/pub/' + channel.slug
  }

</script>

<div class = "library-container">
  {#if data.length === 0}
    Loading
  {:else}
    {#each data as entry}
      <section class = "library-entry">
        <div class = "library-entry_title">{entry.title}</div>
        <div class = "library-entry_description">{entry.metadata.description}</div>
        <div class = "library-entry-contents">
          {#each entry.contents as item}
            <div class = "library-entry-contents_item">
              <a href="{returnLink(item)}" target='_blank'>
                <img src={item.image.display.url} />
              </a>
              <div class = "library-entry-contents_item_title">{item.title}</div>
              <div class = "library-entry-contents_item_meta">Added by {item.user.first_name} on {returnTime(item.connected_at)}</div>
            </div>
          {/each}
          <a href="{returnChannelLink(entry)}" target="_blank" class = "library-entry-contents_item arena-link">ADD TO LIST ↗</a>
        </div>
      </section>
    {/each}
  {/if}
</div>

<style lang="scss" global>
  @import "./style/global.scss";
  @import "./style/helpers.scss";
  
  .library-container {
    width: 100%;
    display: flex;
    flex-flow: column;
    padding: .25rem;
  }

  .library-entry {
    display: flex;
    flex-flow: column;
    margin-bottom: $padding;
    width: 100%;
    // title + description will need to be wrapped
    border: solid white 1px;
    // border-radius: 25px 25px;
    padding: calc(#{$padding} / 2);
    &_title {
      @include type-serif-lg;
      color: white;
      border: solid white 1px;
      padding: .35rem;
      border-radius: 15px 15px;
      // text-align: center;
      margin-bottom: .25rem;
      word-break: break-all;
    }
    &_description {
      margin-bottom: .5rem;
      color: white;
      // color: $lime;
      @include type-serif-md;
      width: 50%;
      padding-left: .5rem;
    }
    &-contents {
      padding-left: .5rem;
      color: $lime;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      &_item {
        margin-bottom: 1rem;
        width: auto;
        overflow: hidden;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        width: min-content;
        // margin-right: $padding;
        margin-right: .5rem;
        &.arena-link {
          width: 180px;
          // will always be same height as img
          height: 150px;
          border: solid white 1px;
          border-radius: 25px 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: $lime;
          &:hover {
            background: white;
            color: black;
          }
        }
        &_title {
          // @include type-serif-lg;
          overflow: hidden;
          word-break: break-all;
          // border: solid $lime 1px;
          // padding: .5rem;
          // border-radius: 10px 10px;
        }
        &_meta {
          @include type-sans-sm;
        }
        & img {
          opacity: .8;
          height: 150px;
          // transition: opacity .25s linear;
          &:hover {
            // opacity: 1;
          }
        }
      }
    }
    // & img {
    //   height: 200px;
    //   object-fit: contain;
    //   width: auto;
    // }
  }

</style>