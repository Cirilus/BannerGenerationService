import api from "../http";

export default class ImageCreateService {
    static async createBanner(content, extra_content, law_text, width, height,photo_style) {
        return api.post('/ml/create_banner', {
            content: content,
            extra_content: extra_content,
            law_text: law_text,
            width: width,
            height: height,
            photo_style:photo_style,
        }, {headers: {'Content-Type': 'application/json'}});
    }

    static async bannerList(offset = 0, limit = 9) {
        return api.get('/image', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                offset: offset,
                limit: limit
            }
        });
    }
}