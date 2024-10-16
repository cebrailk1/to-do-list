import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      toDoInput: null,
      list: this.loadList(),
      doneList: [],
      draggedItemIndex: null,
    };
  },
  methods: {
    // Load list from localStorage
    loadList() {
      const storedList = localStorage.getItem("toDoList");
      return storedList ? JSON.parse(storedList) : [];
    },
    // Save list to localStorage
    saveList() {
      localStorage.setItem("toDoList", JSON.stringify(this.list));
    },
    // Add new task
    newInput() {
      if (this.toDoInput) {
        this.list.push({ text: this.toDoInput, checked: false });
        this.toDoInput = null;
        this.saveList();
      }
    },
    // Mark task as done
    taskDone(item, index) {
      const completedTask = this.list[index];
      completedTask.checked = true;
      this.doneList.push(item);
      this.list.splice(index, 1);
      this.saveList();
    },
    // Delete all tasks
    deleteAll() {
      this.doneList = [];
      this.saveList();
    },
    // Drag and drop functionality
    dragStart(index) {
      this.draggedItemIndex = index;
    },
    drop(index) {
      const draggedItem = this.list[this.draggedItemIndex];
      this.list.splice(this.draggedItemIndex, 1);
      this.list.splice(index, 0, draggedItem);
      this.saveList();
    },
    // Delete individual task
    deleteTask(index) {
      this.list.splice(index, 1);
      this.saveList();
    },
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      this.saveList();
    });
  },
}).mount("#app");
