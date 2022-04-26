<template>
  <main class="main">
    <aside class="sidebar-left">
      <FormAdding />
    </aside>
    <section class="content-wrapper">
      <DropDownSelect 
        :options="['По умолчанию','Цена (По возрастанию)', 'Цена (По убыванию)','Название (По возрастанию)', 'Название (По убыванию)']" 
        default="По умолчанию"/>
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
    max-width: 1380px;
    width: 100%;

    @include smallScreen{
      flex-direction: column;
    }

    .sidebar-left {
      margin-right: auto;
      @include smallScreen{

      }
    }
  }
</style>

<style lang="scss">
.content-wrapper {
  width: 100%;
  .cards-list {
    margin-top: 20px;
  }

  .dropdown {
    margin-left: auto;
  }
}
</style>