import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      toDoInput: null,
      list: [],
      doneList: [],
    };
  },
  computed: {
    hardWorking() {
      return this.doneList.length > 0;
    },
    lazyGuy() {
      return this.list.length > 0;
    },
  },
  methods: {
    deleteDone() {
      this.doneList = [];
    },
    deleteNotDone() {
      this.list = [];
    },
    newInput() {
      this.list.push({ text: this.toDoInput, checked: false });
      this.toDoInput = null;
    },
    taskNotDone(doneItem, index) {
      const completedTask = this.doneList[index];
      completedTask.checked = false;
      this.list.push(doneItem);
      this.doneList.splice(index, 1);
    },
    taskDone(item, index) {
      const completedTask = this.list[index];
      completedTask.checked = true;
      this.doneList.push(item);
      this.list.splice(index, 1);
    },
    saveTasks() {
      localStorage.setItem("list", JSON.stringify(this.list));
    },
    getTasks() {
      const save = localStorage.getItem("list");
      if (save) {
        this.list = JSON.parse(save);
      }
    },
  },
}).mount("#app");
