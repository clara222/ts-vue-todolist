import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
  todoList: []
}
const mutations = {
  changeTodoList (state, list) {
    state.todoList = list
  },
  addTodoList (state, list) {
    state.todoList = [...state.todoList, list]
  },
  editTodoList (state, obj) {
    state.todoList[obj.index].ListName = obj.ListName
  },
  delTodoList (state, idx) {
    state.todoList.splice(idx,1)
  }
}

const actions = {
  changeList ({commit},list) {
    commit('changeTodoList',list)
  },
  addList ({commit}, list) {
    commit('addTodoList', list)
  },
  editList ({commit}, obj) {
    commit('editTodoList', obj)
  },
  deleteList ({commit}, idx) {
    commit('delTodoList', idx)
  }
}

const getters = {
  todoLists: (state) => {
    return state.todoList
  },
  doneTodoList: (state) => {
    return state.todoList.filter(todo => todo.isComplete)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
