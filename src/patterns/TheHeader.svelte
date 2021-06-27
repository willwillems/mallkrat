<script>
  
</script>

<header id="header">
  <img src="https://i.imgur.com/KHkyfqS.png" alt="" class="header-logo">
  <div class="header-title">
    <div class="header-title__body">
      <h1>Herres Haus</h1>
      <p>Mutually Enjoyed Destruction</p>
    </div>
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

  display: flex;
  align-items: center;
  justify-content: center;

  &__body {
    transform: rotate(-0.25turn);
    text-align: center;
    white-space: nowrap;

    h1 {
      font-size: 2.5rem;
      margin: -0.1em;
      text-transform: uppercase;
    }

    p {
      font-size: .8rem;
      margin: 0.6em;
    }
  }
}
</style>