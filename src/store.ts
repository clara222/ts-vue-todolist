interface IListItem {
  ListName: string
  isComplete?: boolean
  index:number
}
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
  todoList: []
}
const mutations = {
  changeTodoList (state:any, list:Array<IListItem>) {
    state.todoList = list
  },
  addTodoList (state:any, list:IListItem) {
    state.todoList = [...state.todoList, list]
  },
  editTodoList (state:any, obj:IListItem) {
    state.todoList[obj.index].ListName = obj.ListName
  },
  delTodoList (state:any, idx:number) {
    state.todoList.splice(idx,1)
  }
}

const actions = {
  changeList ({commit}:any,list:Array<IListItem>) {
    commit('changeTodoList',list)
  },
  addList ({commit}:any, list:IListItem) {
    commit('addTodoList', list)
  },
  editList ({commit}:any, obj:IListItem) {
    commit('editTodoList', obj)
  },
  deleteList ({commit}:any, idx:number) {
    commit('delTodoList', idx)
  }
}

const getters = {
  todoLists: (state:any) => {
    return state.todoList
  },
  doneTodoList: (state:any) => {
    return state.todoList.filter((todo:IListItem) => todo.isComplete)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
