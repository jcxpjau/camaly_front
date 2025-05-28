//import libraries
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
//import icons
import { Zap, Image, CalendarCheck, Bot, Smile } from "lucide-react";

const iconClass = "w-5 h-5";

export const ICONS: Record<string, JSX.Element> = {
  posts: <Image className={iconClass} />,
  insight: <Zap className={iconClass} />,
  schedule: <CalendarCheck className={iconClass} />,
  bot: <Bot className={iconClass} />,
  personalization: <Smile className={iconClass} />,
};
