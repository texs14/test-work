<template>
<!-- Шрифт прям оооочень мелкий, но оставляю всё как в макете -->
    <h2>Добавление товара</h2>
    <form action="#" method="post" class="form" @submit.prevent="e => submit(e)">
        <div class="form__fields-wrapper">
            <span class="form__field">
                <label class="form__label form__label_required" for="name">Наименование товара</label>
                <input class="form__input" type="text" id="name" placeholder="Введите наименование товара" v-model="formValue.name" @input="(e) => this.check(e)">
            </span>
            <span class="form__field">
                <label class="form__label" for="description">Описание товара</label>
                <textarea class="form__textarea" id="description" placeholder="Введите описание товара"  v-model="formValue.description"></textarea>
            </span>
            <span class="form__field">
                <label class="form__label form__label_required" for="url">Ссылка на изображение товара</label>
                <input class="form__input" type="text" id="url" placeholder="Введите ссылку"  v-model="formValue.urlImg" @input="(e) => this.check(e)">
            </span>
            <span class="form__field">
                <label class="form__label form__label_required" for="price">Цена товара</label>
                <input class="form__input" type="number" min="0" id="price" placeholder="Введите цену" v-model="formValue.price" @input="(e) => this.check(e)">
            </span>
        </div>
        <button class="form__button" :class="{'form__button_state_disable': !formValid.buttonActive, 'form__button_state_active': formValid.buttonActive}" :disabled="!formValid.buttonActive">Добавить товар</button>
        <transition appear name="fade">
            <span class="form__message" :class="[`form__message_status_${message.status}`]" v-if="message.show">{{message.text}}</span>
        </transition>
    </form>
</template>

<script>
import {mapMutations, mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            priceTriple: '',
            formValue: {
                name: '',
                description: '',
                price: 0,
                urlImg: ''
            },
            formValid: {
                required: {
                    name: false,
                    price: false,
                    urlImg: false
                },
                errors: {
                    required: 'Поле является обязательным',
                    length: 'Имя должно быть не короче 2-х символов',
                    url: 'не корректный адресс, должен быть в формате https://exampel.com/url-to-image',
                    price: 'нельзя приплачивать и продавать бесплатно'
                },
                buttonActive: false
            }
        }
    },
    computed: mapGetters(['message']),
    methods: {
        ...mapMutations(['hideMessage']),
        ...mapActions(['postCard']),
        check(e) {
            const {target} = e
            const {name, price, urlImg} = this.formValue
            const {errors} = this.formValid
            const inputName = target.id
            const regExp = /https?:\/\/[\w.]+[\w\-]+\.[\w]+\/[\S]+$/g
            const spanError = document.createElement('span')
            spanError.classList.add('error')

            if(inputName === 'name') {
                switch (true) {
                    case name.length === 0:
                        spanError.innerText = errors.required
                        target.nextSibling === null ? target.after(spanError) : target.nextSibling.innerText = errors.required
                        this.formValid.required.name = false
                        target.classList.add('form__input_error')
                        break
                    case name.length < 2:
                        spanError.innerText = errors.length
                        target.nextSibling === null ? target.after(spanError) : target.nextSibling.innerText = errors.length
                        this.formValid.required.name = false
                        target.classList.add('form__input_error')
                        break
                    default:
                        target.nextSibling && target.nextSibling.remove()
                        this.formValid.required.name = true
                        target.classList.remove('form__input_error')
                }
            } else if (inputName === 'price') {
                switch (true) {
                    case price <= 0:
                        spanError.innerText = errors.price
                        target.nextSibling === null ? target.after(spanError) : target.nextSibling.innerText = errors.price
                        this.formValid.required.price = false
                        target.classList.add('form__input_error')
                        break
                    default:
                        target.nextSibling && target.nextSibling.remove()
                        this.formValid.required.price = true
                        target.classList.remove('form__input_error')
                        this.priceTriple = new Intl.NumberFormat('ru-RU').format(price)
                }
            } else if (inputName === 'url') {
                switch (true) {
                    case urlImg.length === 0:
                        spanError.innerText = errors.required
                        target.nextSibling === null ? target.after(spanError) : target.nextSibling.innerText = errors.required
                        this.formValid.required.urlImg = false
                        target.classList.add('form__input_error')
                        break
                    case !regExp.test(urlImg):
                        spanError.innerText = errors.url
                        target.nextSibling === null ? target.after(spanError) : target.nextSibling.innerText = errors.url
                        this.formValid.required.urlImg = false
                        target.classList.add('form__input_error')
                        break
                    default:
                        target.nextSibling && target.nextSibling.remove()
                        this.formValid.required.urlImg = true
                        target.classList.remove('form__input_error')
                }
            }

            this.formValid.buttonActive = this.isFormValid()
        },
        isFormValid() {
            const arr = []
            for(let item in this.formValid.required) {
                arr.push(this.formValid.required[item])
            }
            return arr.indexOf(false) === -1
        },
        submit(e) {
            const {target} = e
            this.formValue.price = this.priceTriple
            this.formValue.id = Math.floor(Math.random() * 10000000)
            this.postCard(this.formValue)
            this.resetForm(target)
            setTimeout(this.hideMessage , 3500)
        },
        resetForm(form) {
            form.reset()
            this.formValid.buttonActive = false
            for(let key in this.formValue) {
                this.formValue[key] = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    h2 {
        font-weight: 600;
        font-size: 28px;
        line-height: 35px;

        color: #3F3F3F;

        margin-bottom: 16px;
        margin-top: 0;

        @include extraSmallScreen{
            width: 320px;
            max-width: 320px;
            margin-left: 12px;
        }
    }

    .form {
        display: flex;
        flex-direction: column;
        position: relative;
        @include borderShadow;

        width: 332px;
        padding: 24px;
        box-sizing: border-box;

        @include smallScreen{
            width: 100%;
            padding: 12px;
        }

        &__message {
            position: absolute;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 60px;
            
            transform: translateY(120%);
            color: #fff;
            font-size: 14px;
            text-transform: uppercase;

            &_status {
                &_ok {
                    background: #1bc11b;
                }

                &_error {
                    background: #ef3c3c;
                }
            }
        }

        &__fields-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;

            @include smallScreen{
                flex-direction: row;
                flex-wrap: wrap;
                column-gap: 16px;
                justify-content: space-between;
                width: 100%;
            }
        }

        &__label {
            display: flex;
            flex-direction: column;
            position: relative;
            width: fit-content;

            font-weight: 400;
            font-size: 10px;
            line-height: 13px;
            letter-spacing: -0.02em;
            color: #49485E;

            &_required {
                &::after {
                    content: '';
                    position: absolute;
                    right: -5px;

                    height: 4px;
                    width: 4px;
                    background: #FF8484;
                    border-radius: 4px;
                }
            }
        }

        &__input, &__textarea {
            @include borderShadow;
            margin-top: 4px;
            min-height: 36px;
            width: 300px;

            border: none;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

            box-sizing: border-box;
            padding: 16px 10px;
            margin-bottom: 16px;

            outline-color: #B4B4B4;
            border: 1px solid transparent;

            &::placeholder {
                font-size: 12px;
                line-height: 15px;
                color: $placeholderColor;
            }

            &_error {
                outline-color: #FF8484;
                border: 1px solid #FF8484;
            }
        }

        &__textarea {
            height: 125px;
            resize: none;
        }

        &__button {
            height: 36px;

            transition: all .35s ease;
            
            border: none;
            border-radius: 10px;

            font-family: 'Inter';
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            letter-spacing: -0.02em;


            &_state {
                &_disable {
                    color: #B4B4B4;
                    background: #EEEEEE;
                    outline-color: #B4B4B4;
                    cursor: not-allowed;
                }

                &_active {
                    color: #FFFFFF;
                    background: #7BAE73;
                    cursor: pointer;
                }
            }
        }

        &__field {
            position: relative;
        }
    }
</style>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
    transition: opacity .35s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.error {
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.02em;

    color: #FF8484;

    position: absolute;
    bottom: 4px;
    left: 0;
}
</style>