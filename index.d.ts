export class RandomDuck {
    constructor() {};
    async Random(type: "GIF" | "JPG"): Promise<{url: string, message: string}>;
    async RandomImg(type: "GIF" | "JPG", _download: boolean, _path: string): Promise<void | Blob>;
    async List(): Promise<{gif_count: number, gifs: string[], http: string[], image_count: number, images: string[]}>;
    async GetImage(num: number | string, _download: boolean, _path: string): Promise<void | Blob>;
    async GetGif(num: number | string, _download: boolean, _path: string): Promise<void | Blob>;
    async GetHttp(httpCode: string, _download: boolean, _path: string): Promise<void | Blob>;
}