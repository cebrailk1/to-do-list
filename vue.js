import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      toDoInput: null,
      list: [],
      doneList: [],
    };
  },
  computed: {},
  methods: {
    newInput() {
      this.list.push({ text: this.toDoInput, checked: false });
      this.toDoInput = null;
    },
    taskDone(item, index) {
      const completedTask = this.list[index];
      completedTask.checked = true;
      this.doneList.push(item);
      this.list.splice(index, 1);
    },
  },
}).mount("#app");
