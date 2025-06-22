import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";


const Notes = async () => {
    const queryClient = new QueryClient();
    const initialQuery: string = "";
    const initialPage: number = 1;

    await queryClient.prefetchQuery({
        queryKey: ["notes", initialQuery, initialPage],
        queryFn: () => fetchNotes(initialQuery, initialPage),
    });

    const initialData = queryClient.getQueryData(["notes", initialQuery, initialPage]) as {
        notes: Note[];
        totalPages: number;
    };
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient query={initialQuery} page={initialPage} initialData={initialData} />
        </HydrationBoundary>
    )
};

export default Notes;

export const dynamic = 'force-dynamic';