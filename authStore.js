

import create from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  emaill: '',
  usernamee: '',
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setEmail: (emaill) => set({ emaill }),
  setUsername: (usernamee) => set({ usernamee }),
}));

export default useAuthStore;