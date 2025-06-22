import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

type NoteDetailsProps = {
    params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const { id } = await params;
    const queryClient = new QueryClient();
    queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(Number(id)),
    });

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteDetailsClient />
            </HydrationBoundary>
        </>
    )
};

export default NoteDetails;