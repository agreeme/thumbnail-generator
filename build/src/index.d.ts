/// <reference types="node" />
declare type SharpInput = Buffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string;
declare const buildThumbnail: (articleTitle: string, backgroundImage: SharpInput) => Promise<void>;
export { buildThumbnail };
