import MazeEditor from "@/features/maze/mazeEditor/mazeEditor";

interface PageProps {
    searchParams: Promise<{
        data: string;
    }>;
}
export default async function Page({ searchParams }: PageProps) {
    const { data } = await searchParams;

    const mazeDataString =
        typeof data === "string" ? data : undefined;
    return (<>
        {mazeDataString && <MazeEditor encodedData={mazeDataString} />}
    </>

    )
}
