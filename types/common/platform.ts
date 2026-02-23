interface PlatformRoute {
  title: string;
  route: string;
  icon: string;
  key: "scales" | "camera" | "helmet" | "app" | "chat";
}

export type { PlatformRoute };
