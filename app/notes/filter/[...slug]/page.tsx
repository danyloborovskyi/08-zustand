import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import type { Tag } from "@/types/note";

import NotesFilterClient from "./NotesFilter.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  console.log(slug);

  const perPage = 12;

  const query =
    slug[0] === "All"
      ? { search: "", page: 1, perPage }
      : { search: "", page: 1, perPage, tag: slug[0] as Tag };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      "notes",
      "",
      1,
      12,
      slug[0] === "All" ? undefined : (slug[0] as Tag),
    ],
    queryFn: () => fetchNotes(query),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesFilterClient filter={slug} />
      </HydrationBoundary>
    </>
  );
};

export default NotesByCategory;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `Notehub list: ${slug}`,
    description: `Notehub list filtered by: ${slug}`,
    openGraph: {
      title: `Notehub list: ${slug}`,
      description: `Notehub list filtered by: ${slug}`,
      url: `https://notehub.com/notes/filter${slug}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notehub list: ${slug}`,
        },
      ],
      type: "article",
    },
  };
}
