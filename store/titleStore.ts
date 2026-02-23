import { defineStore } from "pinia";

export const useHeadTitleStore = defineStore("headTitle", {
  state: () => ({
    headTitle: "" as string,
  }),

  actions: {
    setHeadTitle(title: string) {
      this.headTitle = title;
    },
  }
});