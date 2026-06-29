

export const cellWallsToBitmask = (cell: Cell): number => {
    return (
        (cell.walls.north ? 1 : 0) |
        (cell.walls.east ? 2 : 0) |
        (cell.walls.south ? 4 : 0) |
        (cell.walls.west ? 8 : 0)
    );
}

export const packBitmasksIntoBytes = (bitmask: number[]): Uint8Array => {
    const bytes: number[] = [];

    for (let i = 0; i < bitmask.length; i += 2) {
        const first = bitmask[i];
        const second = bitmask[i + 1] ?? 0;

        bytes.push((second << 4) | first);
    }

    return new Uint8Array(bytes);
}

export const bytesToBase64Url = (bytes: Uint8Array): string => {
    const binary = Array.from(bytes, byte =>
        String.fromCharCode(byte),
    ).join("");

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}