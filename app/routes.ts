import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("information", "routes/information.tsx"),
  route("next-steps", "routes/next-steps.tsx"),

  route("connect", "routes/connect.tsx"),
  route("connect/find-your-tribe", "routes/find-your-tribe.tsx"),
  route("connect/prayer-wall", "routes/prayer-wall.tsx"),
  route("connect/talk-to-someone", "routes/talk-to-someone.tsx"),

  route("resources", "routes/resources.tsx"),
  route("resources/prayer-points", "routes/prayer-points.tsx"),
  route("resources/prayer-points/:slug", "routes/prayer-guide.tsx"),
  route("resources/support", "routes/support.tsx"),
  route("resources/teaching", "routes/teaching.tsx"),
  route("resources/teaching/:topic", "routes/teaching-topic.tsx"),
  route("resources/devotional", "routes/devotional-today.tsx"),
  route("resources/devotional/:day", "routes/devotional.tsx"),
  route("resources/affirmations", "routes/affirmations-today.tsx"),
  route("resources/affirmations/:day", "routes/affirmation.tsx"),
  route("resources/archive", "routes/archive.tsx"),
  route("resources/downloads", "routes/downloads.tsx"),

  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
