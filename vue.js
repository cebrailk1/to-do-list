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
    };
  },
  computed: {
    hardWorking() {
      return this.doneList.length > 0;
    },
    lazyGuy() {
      return this.list.length > 0;
    },
    showListComp() {
      return !this.storageItem < 0;
    },
  },
  watch: {
    toDoInput() {
      this.updateEmoji();
    },
  },
  methods: {
    deleteDone() {
      this.doneList = [];
    },
    deleteNotDone() {
      this.list = [];
    },
    deleteToDoLists() {
      this.storageList = [];
    },
    newInput() {
      const emoji = emojiMap[this.toDoInput.toLowerCase()] || "";
      this.list.push({ text: this.toDoInput, checked: false, emoji: emoji });
      this.toDoInput = null;
      this.emoji = "";
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
    newListInputMeth() {
      const key = this.storageListInput; // Der Schlüssel wird hier der Input
      this.storageList.push({ anotherToDoList: key });
      this.saveList(key); // Speichere nur den Input
      this.storageListInput = null;
    },

    handleClick(storageItem) {
      console.log("Item geklickt:", storageItem);
      this.getLists(storageItem);
    },

    saveList(storageItem) {
      // Speichert das entsprechende Item mit dem Key als Namen in localStorage
      localStorage.setItem(storageItem, JSON.stringify(storageItem));
    },

    getLists(storageItem) {
      // Holt nur den spezifischen Eintrag mit dem Key aus dem localStorage
      const savedList = localStorage.getItem(storageItem);
      if (savedList) {
        this.storageList = JSON.parse(savedList);
      }
    },
    updateEmoji() {
      const key = this.toDoInput?.toLowerCase();
      this.emoji = this.emojiMap[key] || "";
    },
  },
}).mount("#app");
