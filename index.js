const fetch = require("node-fetch");
const fs = require("fs");
var _baseURL = "https://random-d.uk/api/v2"
module.exports = class RandomDuck {
    constructor(){};
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
        const url = `${_baseURL}/random?type=${type.toLowerCase()}`
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "application/json"
            }
        }
        return fetch(url, options).then(data => data.json()).then((data) => {
            return data;
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * Returns an image file
     * @param {"GIF" | "JPG"} type - `GIF` | `JPG`
     * @param {boolean} _download - Download the image?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<void | Blob>}
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
        const url = `${_baseURL}/randomimg?type=${type.toLowerCase()}`
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "image/*"
            }
        }
        return fetch(url, options).then(async(data) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : await data.blob();
        }).catch((err) => {throw new Error(err)});
    }
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
        const url = `${_baseURL}/list`
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "application/json"
            }
        }
        return fetch(url, options).then(data => data.json()).then((data) => {
            return {
                gif_count: data.gif_count,
                gifs: data.gifs.sort((a, b) => {return parseInt(a.split(".gif")[0]) - parseInt(b.split(".gif")[0])}),
                http: data.http.sort((a, b) => {return parseInt(a.split(".jpg")[0]) - parseInt(b.split(".jpg")[0])}),
                image_count: data.image_count,
                images: data.images.sort((a, b) => {return parseInt(a.split(".jpg")[0]) - parseInt(b.split(".jpg")[0])})
            }
        }).catch((err) => {throw new Error(err)})
    }
    /**
     * Returns an image file directly
     * @param {number | string} num 
     * @param {boolean} _download - Download the image?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<void | Blob>}
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
        const url = `${_baseURL}/${num}.jpg`
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "image/jpeg"
            }
        }
        return fetch(url, options).then(async(data) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : await data.blob()
        }).catch((err) => {throw new Error(err)});
    }
     /**
     * Returns a gif file directly
     * @param {number | string} num 
     * @param {boolean} _download - Download the gif?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<void | Blob>}
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
        const url = `${_baseURL}/${num}.gif`
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "image/gif"
            }
        }
        return fetch(url, options).then(async(data) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : await data.blob()
        }).catch((err) => {throw new Error(err)});
    }
    /**
     * Returns an image file of a duck representing an HTTP status code directly
     * @param {string} httpCode - Example: 500
     * @param {boolean} _download - Download the image?
     * @param {string} _path - Supply a path if `_download` is true
     * @returns {Promise<void | Blob>}
     */
    async GetHttp(httpCode, _download, _path) {
        const url = `${_baseURL}/http/${parseInt(httpCode)}`
        const options = {
            "method": "GET",
            "headers": {
                "Accept": "image/jpeg"
            }
        }
        return fetch(url, options).then(async(data) => {
            return (_download) ? data.body.pipe(fs.createWriteStream(_path)) : await data.blob()
        }).catch((err) => {throw new Error(err)});
    }
}