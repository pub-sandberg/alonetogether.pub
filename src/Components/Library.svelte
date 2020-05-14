<script>
  // import axios from 'axios'
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
        console.log(child)
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
            getChannel(item.slug)
          }
        })
      })
    .catch(err => console.log(err))
  }

  getLibrary()

  function returnLink(block) {
    return block.attachment !== null ? block.attachment.url : block.source.url
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
              <div class = "library-entry-contents_item_meta">Added by {item.user.first_name} on {item.connected_at}</div>
            </div>
          {/each}
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
    padding: .5rem;
  }

  .library-entry {
    display: flex;
    flex-flow: column;
    margin-bottom: 2rem;
    width: 100%;
    // title + description will need to be wrapped
    &_title {
      @include type-serif-lg;
      color: white;
    }
    &_description {
      margin-bottom: $padding;
      color: white;
    }
    &-contents {
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
        &_title {
          // @include type-serif-lg;
          overflow: hidden;
        }
        &_meta {
          @include type-sans-sm;
        }
        & img {
          opacity: .8;
          height: 150px;
          transition: opacity .25s linear;
          &:hover {
            opacity: 1;
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