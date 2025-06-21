import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../lib/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface NoteListProps {
    notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();
    const { mutate, isError, isPending } = useMutation({
        mutationFn: async (id: number) => deleteNote(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }
    });
    const handleButton = (id: number) => {
        mutate(id);
    };
    return (
        <>
            <ul className={css.list}>
                {notes.map(({ id, title, content, tag }) => (
                    <li className={css.listItem} key={id}>
                        <h2 className={css.title}>{title}</h2>
                        <p className={css.content}>{content}</p>
                        {isError && <ErrorMessage text="There was an error, please try again..." />}
                        <div className={css.footer}>
                            <span className={css.tag}>{tag}</span>
                            <button className={css.button} onClick={() => handleButton(id)} disabled={isPending}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};