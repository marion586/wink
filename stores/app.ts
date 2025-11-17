

export const useAppStore = defineStore('app', {
  state: () => ({
    isFirstLoading: true
  }),
  
  actions: {
    setFirstLoadingComplete() {
      this.isFirstLoading = false
    }
  }
})