export class ZettelstoreApiClient {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api`;
    }

    /**
     * Retrieves all zettels containing the specified words.
     * If only one word is provided, it will also attempt to match a zettel ID.
     *
     * @param {string[]} words - An array of words to search for in the title.
     * @param {number} [limit=100] - The maximum number of results to return.
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples,
     * where each tuple contains a zettel ID and its title.
     */
    async searchZettels(words, limit = 100) {
        const zettelId = words.length === 1 ? `+OR+id~${words[0]}` : '';
        const titleWords = words.map((word) => `title:${word}`).join('+');
        try {
            const route = encodeURI(
                this.baseUrl + `/z?q=${titleWords}${zettelId}+LIMIT+${limit}+ORDER+REVERSE+created`,
            );
            const response = await fetch(route);
            if (!response.ok) {
                console.error(response);
            }
            return this._convertResponseList(response);
        } catch (e) {
            console.error('Network error or other issue:', e);
            return null;
        }
    }

    async _convertResponseList(response) {
        let data = await response.text();
        data = data.split('\n');
        if (data[data.length - 1].length === 0) data.pop();
        for (const element of data) {
            const index = data.indexOf(element);
            data[index] = [element.substring(0, 14), element.substring(15)];
        }
        return data;
    }

    async getZettel(zettelId) {
        return [await this.getZettelMeta(zettelId), await this.getZettelContent(zettelId)];
    }

    async getZettelContent(zettelId) {
        try {
            const route = encodeURI(this.baseUrl + `/z/${zettelId}?part=content&enc=html`);
            const response = await fetch(route);
            if (!response.ok) {
                console.error(response);
            }
            return response.text();
        } catch (e) {
            console.error('Network error or other issue:', e);
            return null;
        }
    }

    async getZettelMeta(zettelId) {
        try {
            const route = encodeURI(this.baseUrl + `/z/${zettelId}?part=meta`);
            const response = await fetch(route);
            if (!response.ok) {
                console.error(response);
            }
            let metaArr = (await response.text()).split('\n');

            if (metaArr[metaArr.length - 1] === '') {
                metaArr.pop();
            }

            return Object.fromEntries(
                metaArr.map((part) =>
                    part
                        .trim()
                        .split(':')
                        .map((item) => item.trim()),
                ),
            );
        } catch (e) {
            console.error('Network error or other issue:', e);
            return null;
        }
    }

    /**
     * Checks if a zettel with the specified ID exists.
     *
     * @param {string} id - The ID of the zettel to check.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the zettel exists (status 200), `false` otherwise.
     */
    async doesZettelExists(id) {
        try {
            const route = encodeURI(this.baseUrl + `/z/${id}`);
            const response = await fetch(route);
            return response.status === 200 || response.status === 204;
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Retrieves a list of zettels containing image files.
     *
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples,
     * where each tuple contains a zettel ID and its title.
     * */
    async listAllImages() {
        const route = encodeURI(
            this.baseUrl +
                `/z?q=syntax=png+OR+syntax=jpg+OR+syntax=jpeg+OR+syntax=gif+OR+syntax=svg+OR+syntax=webp+ORDER+REVERSE+created`,
        );
        const response = await fetch(route);

        if (!response.ok) {
            throw new Error(response.statusText + ' ' + response.status);
        }

        return this._convertResponseList(response);
    }
}
