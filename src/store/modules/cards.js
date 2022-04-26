export default {
    state: {
        cards: [],
        sortCards: [],
        sort: {
            type: 'default',
            direction: ''
        },
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
        },
        sortCards(state) {
            return state.sortCards
        },
        sort(state) {
            return state.sort
        }
    },
    actions: {
        fetchCards(ctx) {
            let cards = JSON.parse(localStorage.getItem('cards'))
            if(cards !== null) {
                cards = JSON.parse(localStorage.getItem('cards'))
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
        postCard(ctx, card) {
            try {
                const newCard = {...card}
                ctx.commit('addCard', newCard)
                ctx.commit('sort')
                ctx.commit('showMessage', {message :'Карточка успешно добавлена', status: 'ok'})
            } catch (err) {
                console.log('ERROR: ', err)
                ctx.commit('showMessage', {message: 'Что-то пошло не так...', status: 'error'})
            }
        },
        sortCards(ctx, options) {
            ctx.commit('updateSort', options)
            ctx.commit('sort')
        }
    },
    mutations: {
        updateCards(state, cards) {
            const newArr = cards
            localStorage.setItem('cards', JSON.stringify(cards))
            state.cards = newArr
        },
        addCard(state, card) {
            const newArr = [...state.cards, card]
            localStorage.setItem('cards', JSON.stringify(newArr))
            state.cards = newArr
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
        },
        removeCard(state, id) {
            const newArr = state.cards.filter(card => card.id !== id)
            const newSortArr = state.sortCards.filter(card => card.id !== id)
            state.cards = newArr
            state.sortCards = newSortArr
            localStorage.setItem('cards', JSON.stringify(state.cards))
        },
        updateSort(state, options) {
            state.sort = {...options}
        },
        sort(state) {
            const sortArr = [...state.cards]
            if(state.sort.type !== 'default') {
                sortArr.sort((a, b) => {
                    let elA = state.sort.type === 'price' ? parseInt(String(a.price).replace(/\s+/g, '')) : String(a.name).toLowerCase()
                    let elB = state.sort.type === 'price' ? parseInt(String(b.price).replace(/\s+/g, '')) : String(b.name).toLowerCase()
    
                    if(state.sort.direction === 'asc') {
                        switch (true) {
                            case elA < elB:
                                return -1
                            case elA > elB:
                                return 1
                            default:
                                return 0
                        }
                    }
    
                    if(state.sort.direction === 'desc') {
                        switch (true) {
                            case elA < elB:
                                return 1
                            case elA > elB:
                                return -1
                            default:
                                return 0
                        }
                    }
                })
            }
            
            state.sortCards = sortArr
        }
    }
}