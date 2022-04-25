<template>
  <main class="main">
    <aside class="sidebar-left">
      <FormAdding />
    </aside>
    <section class="content-wrapper">
      <DropDownSelect :options="['По умолчанию','По возрастанию', 'По убыванию']" default="По умолчанию"/>
      <CardList />
    </section>
  </main>
</template>

<script>
import CardList from './components/CardsList.vue'
import FormAdding from './components/FormAdding.vue'
import DropDownSelect from './components/DropDownSelect.vue'


export default {
  components: {
    CardList,
    FormAdding,
    DropDownSelect
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
  * {
    font-family: 'Source Sans Pro', sans-serif;
  }

  body {
    background: $mainBackground;
    padding: 32px;
    margin: 0;

    @include mediumScreen {
      padding: 16px;
    }

    @include smallScreen{
      padding: 8px;
    }

    @include extraSmallScreen{
      padding: 10px 0;
    }
  }

  .main {
    margin: auto;
    display: flex;
    max-width: fit-content;
    column-gap: 16px;

    @include smallScreen{
      flex-direction: column;
    }

    .sidebar-left {
      @include smallScreen{

      }
    }
  }
</style>

<style lang="scss">
.content-wrapper {
  .cards-list {
    margin-top: 20px;
  }

  .dropdown {
    margin-left: auto;
  }
}
</style>