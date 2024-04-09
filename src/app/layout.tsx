import type { Metadata } from "next";
import { Mulish, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import clsx from 'clsx';
import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PrismicPreview } from "@prismicio/next";



const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap'
})

const mPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-mPlusRounded1c',
  weight: '700',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
const client = createClient();

const settings = await client.getSingle("settings");
 
  return {
    title: settings.data.site_title || "beyondtipping",
    description: settings.data.meta_description || "find restaurants in pdx with fair wages",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(mulish.variable, mPlusRounded1c.variable)}>
      <body>
        <Header/>
        {children}
       <Footer/>
       <div className="fixed bg-gradient-to-tr from-slate-900 to-gray-900 z-[-1] inset-0"/>
       <PrismicPreview repositoryName={repositoryName}/>
       </body>
    </html>
  );
}
