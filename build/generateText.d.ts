/// <reference types="node" />
import sharp from 'sharp';
declare const generateText: (articleTitle: string) => Promise<{
    data: Buffer;
    info: sharp.OutputInfo;
}>;
declare const textWithBackground: (articleTitle: string) => Promise<{
    data: Buffer;
    info: sharp.OutputInfo;
}[]>;
declare const createLines: (articleTitle: string, thumbnailOptions: any) => Promise<{
    input: Buffer;
    top: number;
    left: number;
}[]>;
export { generateText, textWithBackground, createLines };
