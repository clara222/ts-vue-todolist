<template>
  <v-app>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-toolbar color="teal" dark>
            <v-toolbar-title>{{todoList.length}}个任务，{{doneListNum}}个已完成</v-toolbar-title>
          </v-toolbar>
          <!--list-->
          <v-list subheader>
            <v-list-tile avatar v-for="(item,index) in todoList" :key="index">
              <v-list-tile-action>
                 <v-checkbox v-model="item.isComplete"  color="grey darken-1"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title :style="{'textDecoration': item.isComplete?'line-through':'none'}">{{item.ListName}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click.native.stop="onEditBtnIsClicked(item.ListName,index)">
                  <v-icon color="grey lighten-1">more_vert</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-btn fab dark color="indigo" @click.native.stop="onAddBtnIsClicked()">
            <v-icon dark>add</v-icon>
          </v-btn>
          <!--dialog-->
          <v-dialog v-model="dialog" max-width="460">
            <v-card>
              <v-card-title class="headline">任务编辑</v-card-title>
                <v-text-field
                  v-model="userInput"
                  style="padding: 20px;"
                  placeholder="这里是任务内容的编辑区，请注意字数的限制."
                ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat="flat" @click.native="onDelBtnIsClicked()" v-if="del">删除</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="onSaveBtnIsClicked()">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script lang='ts'>
  interface IListItem {
    ListName: string
    isComplete?: boolean
    index?:number
  }
  import { Component, Prop, Vue, Watch } from "vue-property-decorator"
  import { State, Action, Getter } from "vuex-class";
  import axios from 'axios'
  @Component({
    components: {}
  })
  export default class TodoList extends Vue {
    @Getter todoLists !: Array<IListItem>;
    @Getter doneTodoList !: Array<IListItem>;
    @Action addList !: (val: IListItem) => void;
    @Action editList !: (val: IListItem) => void;
    @Action deleteList !: (val: number) => void;
    @Action changeList !: (val: Array<IListItem>) => void;


    private todoList: Array<IListItem> = [] 
    private dialog: boolean = false
    private userInput: string = ''
    private del: boolean = false
    private doneListNum: number = 0
    private idx: number = 0

    private created() {
      this.getListData()
    }

    @Watch('todoLists') 
    private onTodoListsChanged(n:Array<IListItem>, o:Array<IListItem>) {
      this.todoList = n
    }

    @Watch('doneTodoList')
    private onDoneTodoListChanged(n:Array<IListItem>, o:Array<IListItem>) {
      this.doneListNum = n.length
    }

    @Watch('dialog')
    private onDialogChanged(n:boolean, o:boolean) {
      if (!n) {
        this.userInput = ''
      }
    }

    onAddBtnIsClicked () {
      this.del = false
      this.dialog = true
    }

    onEditBtnIsClicked (v:string, index:number) {
        this.del = true
        this.dialog = true
        this.userInput = v
        this.idx = index
    }

    onSaveBtnIsClicked () {
      this.dialog = false
      if (this.userInput !== '') {
        if (!this.del) {
          var list:IListItem = {
            "ListName": this.userInput,
            "isComplete": false
          }
          // this.$store.dispatch('addList', list)
          this.addList(list)
        } else {
          var editItem:IListItem = {
            "ListName": this.userInput,
            "index": this.idx
          }
          // this.$store.dispatch('editList', editItem)
          this.editList(editItem)
        }
      } else {
        alert('输入不能为空！')
      }
    }

    onDelBtnIsClicked () {
      this.dialog = false
      // this.$store.dispatch('deleteList', this.idx)
      this.deleteList(this.idx)
    }

    async getListData () {
      try {
        var res = await axios.get('/json/list.json')
        var flag = localStorage.getItem('todoList')
        console.log(flag)
        if (flag) {
          this.changeList(JSON.parse(flag))
        } else {
          this.changeList(res.data.result)
        }
        
      }catch (err) {
        console.log(err)
      }
    }
  }

</script>

