/// <reference types="node" />
declare type SharpInput = Buffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string;
declare type OutputSuccess = {
    fullPath: string;
    shortPath: string;
};
declare type OutputType = null | OutputSuccess;
declare type BuildThumbnailReturn = {
    error: null | string;
    output: OutputType;
};
declare const buildThumbnail: (articleTitle: string, backgroundImage: SharpInput) => Promise<BuildThumbnailReturn>;
export { buildThumbnail, OutputSuccess, OutputType, BuildThumbnailReturn };
