import AdminLayout from "./AdminLayout";
import SiteLayout from "./SiteLayout";

const isAdmin = window.location.pathname.startsWith("/admin");

export const Layout = isAdmin ? AdminLayout : SiteLayout