<template>
    <transition-group name="list" tag="ul" class="cards-list">
        <h2 v-if="cards.length === 0" key="h2">Список пока пуст. Добавьте товар</h2>
                <CardItem 
                    v-for="card  in sort.type !== 'default' || sortCards.length ? sortCards : cards"
                    class="cards-list__card"
                    :key="card.id"
                    :card="card"
                />
    </transition-group>
</template>

<script>
import CardItem from './CardItem.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    components: {
        CardItem
    },
    mounted() {
        this.fetchCards()
    },
    computed: mapGetters(['cards', 'sortCards', 'sort']),
    methods: mapActions(['fetchCards'])
}
</script>

<style lang="scss" scoped>
    h2 {
        position: absolute;
        left: 50%;
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .cards-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;

        list-style: none;

        margin: 0;
        padding: 0;

        @include smallScreen{
            margin: auto;
            max-width: 100%;
        }

        @include extraSmallScreen {
            grid-template-columns: repeat(2, 1fr);
        }

        @include extraSmallScreen {
            grid-template-columns: repeat(1, 1fr);
        }
    }   
</style>