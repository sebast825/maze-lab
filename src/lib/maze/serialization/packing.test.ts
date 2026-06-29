import "jest";
import { Cell } from "../types";
import { bitmaskToCellWalls, cellWallsToBitmask, packBitmasksIntoBytes, unpackBytesToBitmasks } from "./packing";

describe("cellWallsToBitmask", () => {
  const createCell = (
    north: boolean,
    east: boolean,
    south: boolean,
    west: boolean,
  ): Cell => ({
    visited: false,
    walls: {
      north,
      east,
      south,
      west,
    },
  });

  it("returns 0 when all walls are open", () => {
    expect(
      cellWallsToBitmask(createCell(false, false, false, false)),
    ).toBe(0);
  });

  it("returns 15 when all walls are closed", () => {
    expect(
      cellWallsToBitmask(createCell(true, true, true, true)),
    ).toBe(15);
  });

  it("encodes north wall", () => {
    expect(
      cellWallsToBitmask(createCell(true, false, false, false)),
    ).toBe(1);
  });

  it("encodes east wall", () => {
    expect(
      cellWallsToBitmask(createCell(false, true, false, false)),
    ).toBe(2);
  });

  it("encodes south wall", () => {
    expect(
      cellWallsToBitmask(createCell(false, false, true, false)),
    ).toBe(4);
  });

  it("encodes west wall", () => {
    expect(
      cellWallsToBitmask(createCell(false, false, false, true)),
    ).toBe(8);
  });

  it("encodes multiple walls", () => {
    expect(
      cellWallsToBitmask(createCell(true, true, false, true)),
    ).toBe(11); // 1 + 2 + 8
  });
});

describe("packBitmasksIntoBytes", () => {
  it("packs two bitmasks into one byte", () => {
    const result = packBitmasksIntoBytes([3, 12]);

    expect(Array.from(result)).toEqual([195]);
    // 12 << 4 | 3 = 11000011 = 195
  });

  it("packs multiple pairs", () => {
    const result = packBitmasksIntoBytes([1, 2, 4, 8]);

    expect(Array.from(result)).toEqual([
      33,  // 2 << 4 | 1
      132, // 8 << 4 | 4
    ]);
  });

  it("pads the last nibble when the array length is odd", () => {
    const result = packBitmasksIntoBytes([15]);

    expect(Array.from(result)).toEqual([15]);
  });

  it("returns an empty Uint8Array for an empty input", () => {
    const result = packBitmasksIntoBytes([]);

    expect(result).toEqual(new Uint8Array());
  });

  it("handles max values correctly", () => {
    const result = packBitmasksIntoBytes([15, 15]);

    expect(Array.from(result)).toEqual([255]);
  });
});



describe("Serialization - Packing Utilities", () => {
    describe("unpackBytesToBitmasks", () => {
        test("should unpack an even number of cells correctly", () => {
            // First byte: second = 11 (1011), first = 5 (0101) -> (11 << 4) | 5 = 176 | 5 = 181
            const bytes = new Uint8Array([181]);
            const result = unpackBytesToBitmasks(bytes, 2);
            expect(result).toEqual([5, 11]);
        });

        test("should unpack an odd number of cells and ignore padding", () => {
            // First byte: second = 0 (padding), first = 14 -> (0 << 4) | 14 = 14
            const bytes = new Uint8Array([14]);
            const result = unpackBytesToBitmasks(bytes, 1);
            expect(result).toEqual([14]);
        });

        test("should unpack multiple bytes correctly", () => {
            // Byte 1: (2 << 4) | 1 = 33
            // Byte 2: (4 << 4) | 3 = 67
            const bytes = new Uint8Array([33, 67]);
            const result = unpackBytesToBitmasks(bytes, 4);
            expect(result).toEqual([1, 2, 3, 4]);
        });
    });

    describe("bitmaskToCellWalls", () => {
        test("should decode empty cell (no walls)", () => {
            const expected: Cell = {
                visited: false,
                walls: { north: false, east: false, south: false, west: false }
            };
            expect(bitmaskToCellWalls(0)).toEqual(expected);
        });

        test("should decode fully enclosed cell (all walls)", () => {
            const expected: Cell = {
                visited: false,
                walls: { north: true, east: true, south: true, west: true }
            };
            expect(bitmaskToCellWalls(15)).toEqual(expected);
        });

        test("should decode mixed walls correctly", () => {
            // 11 = 1 (north) + 2 (east) + 8 (west)
            const expected: Cell = {
                visited: false,
                walls: { north: true, east: true, south: false, west: true }
            };
            expect(bitmaskToCellWalls(11)).toEqual(expected);
        });
    });
});