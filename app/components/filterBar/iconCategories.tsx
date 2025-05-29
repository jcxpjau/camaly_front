//import libraries
import type { JSX } from "react";
//import icons

const iconClass = "w-5 h-5";
import {
  Image,
  Zap,
  CalendarCheck,
  Bot,
  Smile,
  User,
  Settings,
  Bell,
  MessageCircle,
  Folder,
  FileText,
  BarChart2,
  Globe,
  Heart,
  Star,
  Shield,
  Lock,
  Key,
  Cpu,
  CheckCircle,
} from "lucide-react";

export const ICONS: Record<string, JSX.Element> = {
  posts: <Image className={iconClass} />,
  insight: <Zap className={iconClass} />,
  schedule: <CalendarCheck className={iconClass} />,
  bot: <Bot className={iconClass} />,
  personalization: <Smile className={iconClass} />,
  user: <User className={iconClass} />,
  settings: <Settings className={iconClass} />,
  notifications: <Bell className={iconClass} />,
  messages: <MessageCircle className={iconClass} />,
  files: <Folder className={iconClass} />,
  documents: <FileText className={iconClass} />,
  analytics: <BarChart2 className={iconClass} />,
  global: <Globe className={iconClass} />,
  favorites: <Star className={iconClass} />,
  likes: <Heart className={iconClass} />,
  security: <Shield className={iconClass} />,
  privacy: <Lock className={iconClass} />,
  access: <Key className={iconClass} />,
  ai: <Cpu className={iconClass} />,
  success: <CheckCircle className={iconClass} />,
};
