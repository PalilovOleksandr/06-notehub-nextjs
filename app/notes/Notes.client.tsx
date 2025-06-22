"use client";

import NoteList from "@/components/NoteList/NoteList";
import NoteModal from "@/components/NoteModal/NoteModal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";
import { Note } from "@/types/note";

type NoteClientProps = {
    query: string;
    page: number;
    initialData: { notes: Note[], totalPages: number };
}

const NotesClient = ({ query, page, initialData }: NoteClientProps) => {
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>(query);
    const [debouncedQuery] = useDebounce(searchQuery, 300);

    const { data, isSuccess, error, isError } = useQuery({
        queryKey: ["notes", debouncedQuery, currentPage],
        queryFn: () => fetchNotes(debouncedQuery, currentPage),
        placeholderData: keepPreviousData,
        initialData: () => {
            if (debouncedQuery === query && currentPage === page) {
                return initialData;
            }
            return undefined;
        },
        refetchOnMount: false,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedQuery]);

    if (isError) throw error;

    function handleSearchChange(query: string) {
        setSearchQuery(query)
    };

    function handlePageChange(page: number) {
        setCurrentPage(page);
    };
    function openModal() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchQuery} onSearch={handleSearchChange} />
                {isSuccess && data.totalPages > 1 && (
                    <Pagination totalPages={data.totalPages} currentPage={currentPage} onChange={handlePageChange} />
                )}
                <button className={css.button} onClick={openModal}>Create note +</button>
            </header>
            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
            {isModalOpen && <NoteModal onClose={closeModal} />}
        </div>
    );
};

export default NotesClient;