"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesClient.module.css";

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import type { NoteResponse } from "@/lib/api";
import type { Tag } from "@/types/note";
import Error from "../../error";
import Loading from "../../../loading";

interface NotesFilterProps {
  filter?: string[] | undefined;
}

export default function NotesFilterClient({ filter }: NotesFilterProps) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const tag: Tag | undefined =
    !filter || filter[0] === "All" ? undefined : (filter[0] as Tag);

  const perPage = 12;

  const handleSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const query = filter?.includes("All")
    ? { search, page, perPage }
    : { search, page, perPage, tag: tag };

  const { data, isLoading, error } = useQuery<NoteResponse>({
    queryKey: ["notes", search, page, perPage, tag],
    queryFn: () => fetchNotes(query),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    staleTime: 60_000, // кешуємо на 1 хв
    retry: false,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data?.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            onPageChange={(selected) => setPage(selected + 1)}
            currentPage={page}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
}
