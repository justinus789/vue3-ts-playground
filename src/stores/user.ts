import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as any
  }),
  getters: {
    fullName: (state) => state.userInfo.firstName + ' ' + state.userInfo.lastName
  }
})

// interface UserInfo {
//   id: string
//   username: string
//   email: string
//   firstName: string
//   lastName: string
//   gender: string
//   image: string
// }
