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
    newInput() {
      if (!this.toDoInput) {
        return; // Keine Eingabe vorhanden, also nichts tun
      }

      const quantityRegex = /^(\d+)\s*/i; // Muster für "4x" oder "2x"
      const match = this.toDoInput.match(quantityRegex);

      let quantity = 1;
      let itemText = this.toDoInput;

      if (match) {
        quantity = parseInt(match[1], 10); // Menge extrahieren
        itemText = this.toDoInput.replace(quantityRegex, "").trim(); // Menge entfernen
      }

      const emoji = this.getEmoji(itemText); // Hole das passende Emoji

      this.list.push({
        text: itemText,
        quantity: quantity,
        emoji: emoji.repeat(quantity), // Emoji entsprechend der Menge wiederholen
        checked: false,
      });

      this.toDoInput = null; // Eingabefeld zurücksetzen
    },
    getEmoji(itemText) {
      const lowerCaseText = itemText.toLowerCase();
      return emojiMap[lowerCaseText] || ""; // Standard-Emoji, falls kein Treffer
    },
  },
}).mount("#app");
