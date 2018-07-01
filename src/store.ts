interface IListItem {
  ListName: string
  isComplete?: boolean
  index:number
}
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const getList = function() {
  var lists = localStorage.getItem('todoList');
  if (lists) {
    return JSON.parse(JSON.stringify(localStorage.getItem('todoList')))
  } else {
    return [];
  }
};
const state = {
  todoList: getList()
}
const mutations = {
  changeTodoList (state:any, list:Array<IListItem>) {
    state.todoList = list
    localStorage.setItem('todoList',JSON.stringify(state.todoList))
  },
  addTodoList (state:any, list:IListItem) {
    state.todoList = [...state.todoList, list]
    localStorage.setItem('todoList',JSON.stringify(state.todoList))
  },
  editTodoList (state:any, obj:IListItem) {
    state.todoList[obj.index].ListName = obj.ListName
    localStorage.setItem('todoList',JSON.stringify(state.todoList))
  },
  delTodoList (state:any, idx:number) {
    state.todoList.splice(idx,1)
    localStorage.setItem('todoList',JSON.stringify(state.todoList))
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
    if (Array.isArray(state.todoList)) {
      localStorage.setItem('todoList',JSON.stringify(state.todoList))
      return state.todoList.filter((todo:IListItem) => todo.isComplete)
    }
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
