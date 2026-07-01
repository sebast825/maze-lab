import { ActionButton } from "@/components/actionButton";
import { themeColors } from "@/components/themes";
import { useNavigation } from "@/hooks/useNavigation";



export function MazeSharedError() {
    const { goToHome } = useNavigation()
    return (
        <div className={`flex flex-col items-center justify-center flex-1 text-center px-6 text-white ${themeColors.slate.text}  bg-slate-950`}>
            <h1 className="text-2xl font-semibold e mb-4">
                Unable to load maze
            </h1>


            <p className="text-slate-400 max-w-md">
                The maze could not be rendered. The shared URL may be invalid,
                incomplete, or corrupted.
            </p>

            <p className="text-slate-400 text-sm mt-3">
                Verify the link and try again.
            </p>
            <div className="m-4">
                <ActionButton onClick={() => { goToHome() }} variant="solid" color="slate">Generate a new Maze</ActionButton>
            </div>
        </div>

    );
}
