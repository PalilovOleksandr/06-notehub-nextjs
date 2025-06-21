import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";


const Notes = async () => {
    const queryClient = new QueryClient();
    const initialQuery: string = "";
    const initialPage: number = 1;

    await queryClient.prefetchQuery({
        queryKey: ["notes", initialQuery, initialPage],
        queryFn: () => fetchNotes(initialQuery, initialPage),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient />
        </HydrationBoundary>
    )
};

export default Notes;