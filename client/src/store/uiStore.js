import { create } from "zustand";
import { persist } from "zustand/middleware";
const useUIStore = create(
  persist(
    (set) => ({
      authModalOpen: false,
      authType: "",
      isLogedin: false,
      uname: "",
      uid: "",
      userRole: "",
      isStoreCreated: false,
      stroeSlug: "",
      numberOfCarts: 0,

      openLogin: () => set({ authModalOpen: true, authType: "login" }),

      openSignup: () => set({ authModalOpen: true, authType: "signup" }),

      closeAuth: () => set({ authModalOpen: false }),

      logedIn: () => set({ isLogedin: true }),

      // ✅ FULL LOGOUT RESET
      logout: () =>
        set({
          isLogedin: false,
          uname: "",
          uid: "",
          userRole: "",
          isStoreCreated: false,
          authModalOpen: false,
          authType: "",
          isStoreCreated: false,
          stroeSlug: "",
          numberOfCarts: 0,
        }),

      setUname: (name) => set({ uname: name }),
      setUid: (id) => set({ uid: id }),
      setuserRole: (role) => set({ userRole: role }),
      setisStoreCreated: () => set({ isStoreCreated: true }),
      setStoreSlug: (slug) => set({ stroeSlug: slug }),
      setAddNumberOfCarts: () =>
        set((state) => ({
          numberOfCarts: state.numberOfCarts + 1,
        })),
      setRemoveNumberOfCarts: (n) => set({ numberOfCarts: n }),
    }),
    {
      name: "ui-store",
    },
  ),
);

export default useUIStore;
