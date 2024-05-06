import { SidebarLink } from "@/components/SidebarItems"
import { Cog, Globe, Home, FileBox, HardDriveUploadIcon } from "lucide-react"

type AdditionalLinks = {
  title: string
  links: SidebarLink[]
}

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Dashboard", icon: Home },
  { href: "/upload", title: "Permanent Upload", icon: HardDriveUploadIcon },
  { href: "/documentvault", title: "Documentvault", icon: FileBox },
  { href: "/account", title: "Account", icon: Cog },
  { href: "/settings", title: "Settings", icon: Cog },
]

export const additionalLinks: AdditionalLinks[] = []
