import {createStore} from "vuex";

const store = createStore({
    state () {
        return {
            username: '',
            date: '',
            isValid: false
        }
    },
    getters: {
        getUsername: (state) => {
            return state.username;
        },
        getDate: (state) => {
            return state.date;
        },
        getIsValid: (state) => {
            return state.username.length >= 4 && state.username.length <= 13
        }
    },
    mutations: {
        setUsername: (state, name) => {
            state.username = name
        },
        setDate: (state, date) => {
            state.date = date
        }
    }
});

export default store;