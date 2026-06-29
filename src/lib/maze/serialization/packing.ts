import { Cell } from "../types";


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



/**
 * ---------------------------------------
 * DECODE
 * -----------------------------------------
*/
export const base64UrlToBytes = (base64Url: string): Uint8Array => {
    // Restore base64 padding
    let base64 = base64Url;
    while (base64.length % 4 !== 0) {
        base64 += "=";
    }

    // Replace URL-safe characters back to standard base64
    base64 = base64.replace(/-/g, "+").replace(/_/g, "/");

    // Convert binary string to byte array
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
};

export const unpackBytesToBitmasks = (bytes: Uint8Array, totalCells: number): number[] => {
    const bitmasks: number[] = [];

    for (let i = 0; i < bytes.length; i++) {
        const byte = bytes[i];
        
        // Extract lower nibble (first cell) using a mask (0x0F is 00001111 in binary)
        // This isolates the 4 lowest bits and clears the 4 highest bits
        const first = byte & 0x0F; 
        bitmasks.push(first);
        
        // Guard to prevent adding a trailing padding cell if totalCells is odd
        if (bitmasks.length === totalCells) break;

        // Extract upper nibble (second cell) by shifting 4 bits to the right
        // This moves the 4 highest bits into the lowest position
        const second = byte >> 4;
        bitmasks.push(second);
        
        // Guard to prevent adding a trailing padding cell if totalCells is odd
        if (bitmasks.length === totalCells) break;
    }

    return bitmasks;
};

export const bitmaskToCellWalls = (bitmask: number): Cell => {
    // Reconstruct canonical cell structure with decoded walls
    return {
        visited: false,
        walls: {
            north: (bitmask & 1) !== 0,
            east:  (bitmask & 2) !== 0,
            south: (bitmask & 4) !== 0,
            west:  (bitmask & 8) !== 0,
        }
    };
};