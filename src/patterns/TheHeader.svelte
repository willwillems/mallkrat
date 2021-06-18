<script>
  
</script>

<header id="header">
  <img src="https://i.imgur.com/KHkyfqS.png" alt="" class="header-logo">
  <div class="header-title">

  </div>
</header>

<style lang="postcss">
@import '../style/mixins.pcss';

#header {
  @include box-w-2;
  grid-area: header;

  display: grid;
  grid-gap: var(--border-width);
  grid-template-rows: 160px 1fr;
  grid-template-columns: 36px 1fr;
  grid-template-areas:
    "logo   logo  "
    "bar    title ";
}

.header-logo {
  @include box-w-2;
  @include full-contain;
  grid-area: logo;

  padding: 1.5rem;
}

.header-title {
  @include box-w-2;
  grid-area: title;

}
</style>