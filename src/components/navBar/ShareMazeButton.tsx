import { useState } from "react";
import { ActionButton, ButtonVariant } from "../actionButton";
import { encodeMaze } from "@/lib/maze/serialization/encode";

interface ShareButtonProps {
    mazeData: any;
    className?: string;
    variant? :ButtonVariant
}

export const ShareMazeButton = ({ mazeData, className , variant = "text" }: ShareButtonProps) => {
    const [copied, setCopied] = useState(false);

    const shareMaze = async () => {
        if (typeof window === "undefined") return;

        const encodedMaze = encodeMaze(mazeData?.maze!, mazeData?.start!, mazeData?.end!);
        const shareUrl = `${window.location.origin}/shared?data=${encodedMaze}`;

        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

    };
    return (
        <ActionButton
            color={copied ? "green" : "slate"}
            variant={variant}
            disabled={!mazeData}
            onClick={shareMaze}
            className={className}
        >
            {copied ? "Copied!" : "Share"}
        </ActionButton>
    );
};