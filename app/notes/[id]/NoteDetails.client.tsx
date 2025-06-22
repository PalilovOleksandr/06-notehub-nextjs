'use client';

import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(Number(id)),
        refetchOnMount: false,
    });
    if (isLoading) return <p>Loading, please wait...</p>;
    if (error || !note) return <p>Something went wrong.</p>;

    const formatteDate = note.updatedAt ? `Updated at: ${note.updatedAt}` : `Created at: ${note.createdAt}`;
    return (
        <>
            {note && <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                        <button className={css.editBtn}>Edit note</button>
                    </div>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formatteDate}</p>
                </div>
            </div>}
        </>
    )
};

export default NoteDetailsClient;