export const slugMixin = {
    methods: {
        convertToSlugDash(sourceString) {
            if(sourceString) {
                if(sourceString.startsWith('-')) {
                    sourceString = sourceString.replace('-', '');
                }
                sourceString = sourceString.replace(/[`~!@#$%№€§^&*()_|+=?;:'",.<>{}[\]\\/]/gi, '').replace( /[\s]+/gi, '-').replace(/[-]+/gi, '-').toLowerCase();
                return sourceString;
            }
        },
        transliterate(text) {
            if(text) {
                text = text
                    .replace(/\u0430/g, 'a')
                    .replace(/\u0431/g, 'b')
                    .replace(/\u0432/g, 'v')
                    .replace(/\u0433/g, 'g')
                    .replace(/\u0434/g, 'd')
                    .replace(/\u0435/g, 'e')
                    .replace(/\u0436/g, 'j')
                    .replace(/\u0437/g, 'z')
                    .replace(/\u0438/g, 'i')
                    .replace(/\u0439/g, 'y')
                    .replace(/\u043A/g, 'k')
                    .replace(/\u043B/g, 'l')
                    .replace(/\u043C/g, 'm')
                    .replace(/\u043D/g, 'n')
                    .replace(/\u043E/g, 'o')
                    .replace(/\u043F/g, 'p')
                    .replace(/\u0440/g, 'r')
                    .replace(/\u0441/g, 's')
                    .replace(/\u0442/g, 't')
                    .replace(/\u0443/g, 'u')
                    .replace(/\u0444/g, 'f')
                    .replace(/\u0445/g, 'h')
                    .replace(/\u0446/g, 'c')
                    .replace(/\u0447/g, 'ch')
                    .replace(/\u0448/g, 'sh')
                    .replace(/\u0449/g, 'sht')
                    .replace(/\u044A/g, 'a')
                    .replace(/\u044C/g, 'y')
                    .replace(/\u044E/g, 'yu')
                    .replace(/\u044F/g, 'ya');


                return text;
            }

        }
    }
};
