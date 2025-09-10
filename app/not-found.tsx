import type { Metadata } from "next";
import NotFoundClient from "./not-found.client";

export const metadata: Metadata = {
  title: `Notehub page is not found`,
  description: `This page doesn't exist or it has been deleted`,
  openGraph: {
    title: `Notehub page is not found`,
    description: `This page doesn't exist or it has been deleted`,
    url: `https://notehub.com/not-found`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: `Notehub`,
      },
    ],
    type: "website",
  },
};

const NotFound = () => {
  return <NotFoundClient />;
};

export default NotFound;
