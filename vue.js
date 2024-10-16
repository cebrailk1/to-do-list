import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { emojiMap } from "./emojiMap.js";

createApp({
  data() {
    return {
      toDoInput: null,
      list: [],
      doneList: [],
      storageListInput: null,
      storageList: [],
      emoji: "",
      state: {
        darkmode: false,
      },
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
  watch: {
    toDoInput() {
      this.updateEmoji();
    },
  },
  mounted() {
    this.$refs.newTaskEl.focus();
    document.body.dataset.bsTheme = this.state.darkmode ? "dark" : "light";
  },

  methods: {
    darkmodeSwitch() {
      this.state.darkmode = !this.state.darkmode;
      document.body.dataset.bsTheme = this.state.darkmode ? "dark" : "light";
    },
    deleteDone() {
      this.doneList = [];
    },
    deleteNotDone() {
      this.list = [];
    },
    deleteToDoLists() {
      this.storageList = [];
    },
    taskNotDone(doneItem, index) {
      const completedTask = this.doneList[index];
      completedTask.checked = !completedTask;
      this.list.push(completedTask);
      this.doneList.splice(index, 1);
    },
    taskDone(item, index) {
      const completedTask = this.list[index];
      completedTask.checked = !completedTask.checked;
      this.doneList.push(completedTask);
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
    newListInputMeth() {
      const key = this.storageListInput;
      this.storageList.push({ anotherToDoList: key });
      this.saveList(key);
      this.storageListInput = null;
    },
    dragStart(index) {
      this.draggedItemIndex = index;
    },
    drop(index) {
      const draggedItem = this.list[this.draggedItemIndex];
      this.list.splice(this.draggedItemIndex, 1);
      this.list.splice(index, 0, draggedItem);
      this.saveList();
    },
    deleteTask(index) {
      this.list.splice(index, 1);
      this.saveList();
    },

    handleClick(storageItem) {
      console.log("Item geklickt:", storageItem);
      this.getLists(storageItem);
    },

    saveList(storageItem) {
      localStorage.setItem(storageItem, JSON.stringify(storageItem));
    },

    getLists(storageItem) {
      const savedList = localStorage.getItem(storageItem);
      if (savedList) {
        this.storageList = JSON.parse(savedList);
      }
    },
    newInput() {
      if (!this.toDoInput) {
        return;
      }

      const quantityRegex = /^(\d+)\s*/i;
      const match = this.toDoInput.match(quantityRegex);

      let quantity = 1;
      let itemText = this.toDoInput;

      if (match) {
        quantity = parseInt(match[1], 10);
        itemText = this.toDoInput.replace(quantityRegex, "").trim();
      }

      const emoji = this.getEmoji(itemText);
      this.list.push({
        text: itemText,
        quantity: quantity,
        emoji: emoji.repeat(quantity),
        checked: false,
      });

      this.toDoInput = null;
    },
    getEmoji(itemText) {
      const lowerCaseText = itemText.toLowerCase();
      return emojiMap[lowerCaseText] || "";
    },
  },
}).mount("#app");
