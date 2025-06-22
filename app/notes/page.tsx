import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { NotesHttpResponse } from "@/types/note";


const Notes = async () => {
    const queryClient = new QueryClient();
    const initialQuery: string = "";
    const initialPage: number = 1;

    await queryClient.prefetchQuery({
        queryKey: ["notes", initialQuery, initialPage],
        queryFn: () => fetchNotes(initialQuery, initialPage),
    });

    const initalData = queryClient.getQueryData(['notes', initialQuery, initialQuery]) as NotesHttpResponse;
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient query={initialQuery} page={initialPage} initialData={initalData} />
        </HydrationBoundary>
    )
};

export default Notes;
export const dynamic = 'force-dynamic';