import { atom, selector } from "recoil";

export const currentAccountState = atom({
  key: "currentAccount",
  default: null,
});

// export const accountSelector = selector({
//   key: "account",
//   get: async ({ get }) => {
//     console.log("sss", window.ethereum);
//     if (window.ethereum) {
//       window.ethereum
//         .request({ method: "eth_accounts" })
//         .then((accounts) => {
//           if (accounts.length === 0) {
//             window.alert("Please connect to Metamask");
//             return null;
//           } else if (accounts[0] !== get(currentAccountState)) {
//             console.log("ddd");
//             return accounts[0];
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   },
//   set: ({ set }, newValue) => {
//     set(currentAccountState, newValue);
//   },
// });
