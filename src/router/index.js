import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateArea from "../views/super-admin/CreateArea.vue";
import { routeGuardFunc } from "../utils/checkRoleRoute";
import { CLIENT, ADMIN, SUPER_ADMIN } from "../utils/constants";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/services",
    name: "services",
    component: () => import("../views/ServicesView.vue"),
  },
  {
    path: "/entry",
    name: "entry",
    component: () => import("../views/AutoView.vue"),
  },
  {
    path: "/fauna",
    name: "fauna",
    component: () => import("../views/FaunaView.vue"),
  },
  {
    path: "/flora",
    name: "flora",
    component: () => import("../views/FloraView.vue"),
  },
  {
    path: "/hotel/:id",
    name: "hotel",
    component: () => import("../views/HotelView.vue"),
  },
  {
    path: "/object/:id",
    name: "object",
    component: () => import("../views/ObjectView.vue"),
  },
  {
    path: "/about-us",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
    beforeEnter: () => routeGuardFunc(CLIENT),
  },
  {
    path: "/super-admin/create-area",
    name: "create-area",
    component: CreateArea,
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-hotel",
    name: "create-hotel",
    component: () => import("../views/super-admin/CreateHotel.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-menu",
    name: "create-menu",
    component: () => import("../views/super-admin/CreateMenu.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-object-type",
    name: "create-object-type",
    component: () => import("../views/super-admin/CreateObjectType.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-object",
    name: "create-object",
    component: () => import("../views/super-admin/CreateObject.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-flora-fauna",
    name: "create-flora-fauna",
    component: () => import("../views/super-admin/CreateFloraFauna.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-room-type",
    name: "create-room-type",
    component: () => import("../views/super-admin/CreateRoomType.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-room",
    name: "create-room",
    component: () => import("../views/super-admin/CreateRoom.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-menu-section",
    name: "create-menu-section",
    component: () => import("../views/super-admin/CreateMenuSection.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/create-hotel-halls",
    name: "create-hotel-halls",
    component: () => import("../views/super-admin/CreateHotelHalls.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-area/:id",
    name: "redact-area",
    component: () => import("../views/super-admin/RedactArea.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-hotel/:id",
    name: "redact-hotel",
    component: () => import("../views/super-admin/RedactHotel.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-menu/:id",
    name: "redact-menu",
    component: () => import("../views/super-admin/RedactMenu.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-object-type/:id",
    name: "redact-object-type",
    component: () => import("../views/super-admin/RedactObjectType.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-object/:id",
    name: "redact-object",
    component: () => import("../views/super-admin/RedactObject.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-flora-fauna/:id",
    name: "redact-flora-fauna",
    component: () => import("../views/super-admin/RedactFloraFauna.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-room-type/:id",
    name: "redact-room-type",
    component: () => import("../views/super-admin/RedactRoomType.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-room/:id",
    name: "redact-room",
    component: () => import("../views/super-admin/RedactRoom.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-menu-section/:id",
    name: "redact-menu-section",
    component: () => import("../views/super-admin/RedactMenuSection.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/redact-hotel-halls/:id",
    name: "redact-hotel-halls",
    component: () => import("../views/super-admin/RedactHotelHalls.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-superadmin-menu",
    name: "show-superadmin-menu",
    component: () => import("../views/super-admin/ShowSuperadminMenu.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-zones",
    name: "show-zones",
    component: () => import("../views/super-admin/ShowZones.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-flora-fauna",
    name: "show-flora-fauna",
    component: () => import("../views/super-admin/ShowFloraFauna.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-hotels",
    name: "show-hotels",
    component: () => import("../views/super-admin/ShowHotels.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-menu",
    name: "show-menu",
    component: () => import("../views/super-admin/ShowMenu.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-menu-sections",
    name: "show-menu-sections",
    component: () => import("../views/super-admin/ShowMenuSections.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-room-types",
    name: "show-room-types",
    component: () => import("../views/super-admin/ShowRoomTypes.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-rooms",
    name: "show-rooms",
    component: () => import("../views/super-admin/ShowRooms.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-hotel-halls",
    name: "show-hotel-halls",
    component: () => import("../views/super-admin/ShowHotelHalls.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-object-types",
    name: "show-object-types",
    component: () => import("../views/super-admin/ShowObjectTypes.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-objects",
    name: "show-objects",
    component: () => import("../views/super-admin/ShowObjects.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/super-admin/show-feedback-messages",
    name: "show-feedback-messages",
    component: () => import("../views/super-admin/ShowFeedbackMessages.vue"),
    beforeEnter: () => routeGuardFunc(SUPER_ADMIN),
  },
  {
    path: "/admin/show-admin-menu",
    name: "show-admin-menu",
    component: () => import("../views/admin/ShowAdminMenu.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/book-room",
    name: "book-room",
    component: () => import("../views/admin/BookRoom.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/book-hall",
    name: "book-hall",
    component: () => import("../views/admin/BookHall.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/book-object",
    name: "book-object",
    component: () => import("../views/admin/BookObject.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/show-history-book-room",
    name: "show-history-book-room",
    component: () => import("../views/admin/ShowHistoryBookRoom.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/show-history-book-hall",
    name: "show-history-book-hall",
    component: () => import("../views/admin/ShowHistoryBookHall.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/show-history-book-object",
    name: "show-history-book-object",
    component: () => import("../views/admin/ShowHistoryBookObject.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/show-paid-room",
    name: "show-paid-room",
    component: () => import("../views/admin/ShowPaidRoom.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/show-paid-object",
    name: "show-paid-object",
    component: () => import("../views/admin/ShowPaidObject.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/admin/show-paid-hotel-hall",
    name: "show-paid-hotel-hall",
    component: () => import("../views/admin/ShowPaidHotelHall.vue"),
    beforeEnter: () => routeGuardFunc(ADMIN),
  },
  {
    path: "/404",
    name: "page-not-found",
    component: () => import("../views/errors/page404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/errors/error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
