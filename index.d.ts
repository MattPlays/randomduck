import fs from "fs";
export async function Random(type: "GIF" | "JPG"): Promise<{url: string, message: string}>;
export async function RandomImg(type: "GIF" | "JPG", _download: boolean, _path: string): Promise<fs.WriteStream | any>;
export async function List(): Promise<{gif_count: number, gifs: string[], http: string[], image_count: number, images: string[]}>;
export async function GetImage(num: number | string, _download: boolean, _path: string): Promise<fs.WriteStream | any>;
export async function GetGif(num: number | string, _download: boolean, _path: string): Promise<fs.WriteStream | any>;
export async function GetHttp(httpCode: string, _download: boolean, _path: string): Promise<fs.WriteStream | any>;