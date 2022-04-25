export default {
    state: {
        cards: [],
        message: {
            text: '',
            state: '',
            show: false
        }
    },
    getters: {
        cards(state) {
            return state.cards
        },
        message(state) {
            return state.message
        }
    },
    actions: {
        async fetchCards(ctx) {
            let cards = JSON.parse(localStorage.getItem('cards'))
            if(cards !== null) {
                cards = await JSON.parse(localStorage.getItem('cards'))
                ctx.commit('updateCards', cards)
            } else {
                cards = [
                    {
                        urlImg: 'https://placepic.ru/wp-content/uploads/2021/01/FF3mH8WjNnC2WlfFnSX34PFQycxOoEx0ViBmDS867A1Qs4DKSXt3TF2MYn0vLX7GiqgYZDBv9IU7JAx6FA3wqAAb7QWJ9yUh8QwVhux99aPsSJ7HTqAEaFt0IRIuOqsSG7CN9hQ.jpg',
                        name: 'Наименование товара',
                        description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                        price: '10 000'
                    },
                    {
                        urlImg: 'https://placepic.ru/wp-content/uploads/2021/01/FF3mH8WjNnC2WlfFnSX34PFQycxOoEx0ViBmDS867A1Qs4DKSXt3TF2MYn0vLX7GiqgYZDBv9IU7JAx6FA3wqAAb7QWJ9yUh8QwVhux99aPsSJ7HTqAEaFt0IRIuOqsSG7CN9hQ.jpg',
                        name: 'Наименование товара',
                        description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                        price: '10 000',
                        id: 1
                    },
                    {
                        urlImg: 'https://placepic.ru/wp-content/uploads/2021/01/FF3mH8WjNnC2WlfFnSX34PFQycxOoEx0ViBmDS867A1Qs4DKSXt3TF2MYn0vLX7GiqgYZDBv9IU7JAx6FA3wqAAb7QWJ9yUh8QwVhux99aPsSJ7HTqAEaFt0IRIuOqsSG7CN9hQ.jpg',
                        name: 'Наименование товара',
                        description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                        price: '10 000',
                        id: 2
                    },
                    {
                        urlImg: 'https://placepic.ru/wp-content/uploads/2021/01/FF3mH8WjNnC2WlfFnSX34PFQycxOoEx0ViBmDS867A1Qs4DKSXt3TF2MYn0vLX7GiqgYZDBv9IU7JAx6FA3wqAAb7QWJ9yUh8QwVhux99aPsSJ7HTqAEaFt0IRIuOqsSG7CN9hQ.jpg',
                        name: 'Наименование товара',
                        description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                        price: '10 000',
                        id: 3
                    },
                    {
                        urlImg: 'https://placepic.ru/wp-content/uploads/2021/01/FF3mH8WjNnC2WlfFnSX34PFQycxOoEx0ViBmDS867A1Qs4DKSXt3TF2MYn0vLX7GiqgYZDBv9IU7JAx6FA3wqAAb7QWJ9yUh8QwVhux99aPsSJ7HTqAEaFt0IRIuOqsSG7CN9hQ.jpg',
                        name: 'Наименование товара',
                        description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
                        price: '10 000',
                        id: 4
                    }
                ]
                ctx.commit('updateCards', cards) 
            }
        },
        async postCard(ctx, card) {
            try {
                const newCard = {...card}
                ctx.commit('addCard', newCard)
                ctx.commit('showMessage', {message :'Карточка успешно добавлена', status: 'ok'})
            } catch (err) {
                console.log('ERROR')
                ctx.commit('showMessage', {message: 'Что-то пошло не так...', status: 'error'})
            }
        }
    },
    mutations: {
        updateCards(state, cards) {
            localStorage.setItem('cards', JSON.stringify(cards))
            state.cards = cards
        },
        addCard(state, card) {
            localStorage.setItem('cards', JSON.stringify([...state.cards, card]))
            state.cards = [...state.cards, card]
        },
        showMessage(state, {message, status}) {
            state.message = {
                show: true, 
                text: message,
                status
            }
        },
        hideMessage(state) {
            state.message = {
                show: false, 
                text: ''
            }
        }
    }
}