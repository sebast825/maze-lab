import MazeShared from "@/features/maze/mazeShared/mazeShared";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function Page({ searchParams }: PageProps) {
    const params = await searchParams;

    const mazeDataString = typeof params.data === "string" ? params.data : undefined;

    return (<>   
      {mazeDataString && <MazeShared encodedData={mazeDataString} />}
    </>

    )
}
