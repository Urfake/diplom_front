import store from "@/store/index.js";
import router from "@/router/index.js";

export const routeGuardFunc = (valueRole) => {
  const role = store.getters.getRole;
  if (role == valueRole) {
    return true;
  } else {
    router.push("/");
    return { name: "error" };
  }
};
