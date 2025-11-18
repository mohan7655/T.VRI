import { getNavigationTree } from "@/lib/autoNav";
import ClientLayout from "./client-layout";
import { Geist, Geist_Mono, Montserrat, Roboto_Slab } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Lora, Roboto } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});
export const metadata = {
  title: {
    template: "%s | Vipassana Research Institute",
    default: "Vipassana Research Institute",
  },
  description: "Vipassana Research Institute",
  // favicon:  "\vecel.svg"
};

const montserrat = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});
export default function RootLayout({ children }) {
  const menuData = getNavigationTree();

  return (
    <html lang="en" className={`${montserrat.variable} ${robotoSlab.variable}`}>
      <body>
        <AuthProvider>
          <ClientLayout menuData={menuData}>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
