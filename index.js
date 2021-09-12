const axios = require("axios").default;
const fs = require("fs");
const instance = axios.create({
    baseURL: "https://random-d.uk/api/v2"
})
module.exports = {
    /**
     * Returns a JSON object containing a link to the random image and an optional attribution message
     * @param {"GIF" | "JPG"} type - `GIF` | `JPG`
     * @returns {Promise<{url: string, message: string}>} 
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.Random("GIF").then(data => {
     * console.log(data);
     * });
     */
     async Random(type) {
         return instance({
             method: "GET",
             url: `/random${(type) ? `?type=${type.toLowerCase()}` : ""}`,
             headers: {
                 "Accept": "application/json"
             }
         }).then(({data}) => {
             return data;
         }).catch((err) => {throw new Error(err)});
    },
    /**
     * Returns an image file
     * @param {"GIF" | "JPG"} type - `GIF` | `JPG`
     * @param {boolean} _download - Download the image?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<fs.WriteStream | any>}
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.RandomImg("GIF", false).then((data) => {
     *  console.log(data);
     * })
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.RandomImg("JPG", true, "duck.jpg");
     */
    async RandomImg(type, _download, _path) {
        return instance({
            method: "GET",
            url: `/randomimg${(type) ? `?type=${type.toLowerCase()}`: ""}`,
            headers: {
                "Accept": "image/*"
            },
            responseType: "stream"
        }).then(({data}) => {
            return (_download) ? data.pipe(fs.createWriteStream(_path)) : data;
        }).catch((err) => {throw new Error(err)});
    },
    /**
     * **Note**: Arrays **are** sorted 
     * @returns {Promise<{gif_count: number, gifs: string[], http: string[], image_count: number, images: string[]}>} Returns a JSON object containing all filenames we have available
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.List().then((data) => {
     *  console.log(data);
     * })
     */
    async List() {
        return instance({
            method: "GET",
            url: "/list",
            headers: {
                "Accept": "application/json"
            }
        }).then(({data}) => {
            return {
                gif_count: data.gif_count,
                gifs: data.gifs.sort((a, b) => {return parseInt(a.split(".gif")[0]) - parseInt(b.split(".gif")[0])}),
                http: data.http.sort((a, b) => {return parseInt(a.split(".jpg")[0]) - parseInt(b.split(".jpg")[0])}),
                image_count: data.image_count,
                images: data.images.sort((a, b) => {return parseInt(a.split(".jpg")[0]) - parseInt(b.split(".jpg")[0])})
            }
        }).catch((err) => {throw new Error(err)});
    },
    /**
     * Returns an image file directly
     * @param {number | string} num 
     * @param {boolean} _download - Download the image?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<fs.WriteStream | any>}
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.GetImage(1, true, "1.jpg");
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.GetImage(1, false).then(console.log);
     */
    async GetImage(num, _download, _path) {
        return instance({
            mehtod: "GET",
            url: `/${num}.jpg`,
            headers: {
                "Accept": "image/jpeg"
            },
            responseType: "stream"
        }).then(({data}) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : data
        }).catch((err) => {throw new Error(err)});
    },
     /**
     * Returns a gif file directly
     * @param {number | string} num 
     * @param {boolean} _download - Download the gif?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<fs.WriteStream | any>}
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.GetGif(1, true, "1.gif");
     * @example
     * const RandomDuck = require("@mattplays/randomduck")
     * const API = new RandomDuck();
     * API.GetGif(1, false).then(console.log);
     */
    async GetGif(num, _download, _path) {
        return instance({
            mehtod: "GET",
            url: `/${num}.gif`,
            headers: {
                "Accept": "image/gif"
            },
            responseType: "stream"
        }).then(({data}) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : data
        }).catch((err) => {throw new Error(err)});
    },
    /**
     * Returns an image file of a duck representing an HTTP status code directly
     * @param {string} httpCode - Example: 500
     * @param {boolean} _download - Download the image?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<fs.WriteStream | any>}
     */
    async GetHttp(httpCode, _download, _path) {
        return instance({
            method: "GET",
            url: `/http/${parseInt(httpCode)}`,
            headers: {
                "Accept": "image/jpeg"
            },
            responseType: "stream"
        }).then(({data}) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : data;
        }).catch((err) => {throw new Error(err)});
    }
}