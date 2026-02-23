import { IconBarChart, IconList, IconMap, IconMessage, IconWagon } from "#components";
import type { VueI18nTranslation } from "vue-i18n";

type NavigationKey = "scales" | "camera" | "helmet" | "app" | "chat";

interface NavigationRoute {
  title: string;
  pageTitle?: string;
  icon: any;
  route: string;
}

interface NavigationSection {
  name: string;
  route: string;
  isActive: boolean;
  routes: NavigationRoute[];
}

type NavigationReturn = Record<NavigationKey, NavigationSection[]>;

export const navigation = (t: VueI18nTranslation): NavigationReturn => {
  return {
    scales: [
      {
        name: "scales",
        route: "/scales",
        isActive: true,
        routes: [
          {
            title: t("statistic.title"),
            pageTitle: t("wagon.statistics"),
            icon: IconBarChart,
            route: "/statistics"
          },
          {
            title: t("station.plural"),
            icon: IconMap,
            route: "/stations"
          },
          {
            title: t("wagon.plural"),
            icon: IconWagon,
            route: "/wagons"
          },
          {
            title: t("wagon.listAll"),
            icon: IconList,
            route: "/all-wagons"
          }
        ]
      }
    ],
    camera: [
      {
        name: "camera",
        route: "/camera",
        isActive: true,
        routes: [
          {
            title: t("statistic.title"),
            pageTitle: t("camera.statistics"),
            icon: IconBarChart,
            route: "/statistics"
          },
          {
            title: t("wagons.title"),
            icon: IconMap,
            route: "/wagons"
          }
        ]
      }
    ],
    helmet: [
      {
        name: "helmet",
        route: "/helmet",
        isActive: true,
        routes: [
          {
            title: t("statistic.title"),
            pageTitle: t("camera.statistics"),
            icon: IconBarChart,
            route: "/statistics"
          },
          {
            title: t("camera.list"),
            icon: IconMap,
            route: "/cameras"
          },
          {
            title: t("camera.companies"),
            icon: IconWagon,
            route: "/companies"
          }
        ]
      }
    ],
    app: [
      {
        name: "app",
        route: "/app",
        isActive: true,
        routes: [
          {
            title: t("app.users"),
            pageTitle: t("app.users"),
            icon: IconBarChart,
            route: "/users"
          },
          {
            title: t("app.roles"),
            pageTitle: t("app.roles"),
            icon: IconMap,
            route: "/roles"
          }
        ]
      }
    ],
    chat: [
      {
        name: "chat",
        route: "/chat",
        isActive: true,
        routes: [
          {
            title: t("chat.title"),
            pageTitle: t("chat.title"),
            icon: IconMessage,
            route: "/new-chat"
          },
        ]
      }
    ],
  };
};
