const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
const startTagOpen = new RegExp(("^<" + qnameCapture));
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
const doctype = /^<!DOCTYPE [^>]+>/i;
const comment = /^<!\--/;
const conditionalComment = /^<!\[/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function start(tagName, attrs) {
    console.log(`開始標籤: ${tagName}, 屬性是: ${JSON.stringify(attrs)}`);
}
function chars(text) {
    console.log(`文本: ${text}`);
}
function end(tagName) { // 結束標籤不會有attrs
    console.log(`結束標籤: ${tagName}`);
}

function parseHTML(html) {

    while (html) // 不停解析html字符串
    {
        let textEnd = html.indexOf('<');

        if (textEnd == 0) {//慢慢把html吃光， 所以<在0的位置，就是一個標籤，但可能是開始標籤，也可能是結束標籤

            // 可能是開始標籤
            let startTagMatch = parseStartTag();
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }

            // 也可能是結束標籤   </div>
            let endTagMatch = html.match(endTag);
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1]);
            }

        }

        let text;
        if (textEnd >= 0) {
            text = html.substring(0, textEnd);
        }
        if (text) {
            advance(text.length)
            chars(text);
        }
    }

    function advance(n) {
        html = html.substring(n);
    }

    function parseStartTag() {

        let start = html.match(startTagOpen);
        if (start) {
            advance(start[0].length)

            const match = {
                tagName: start[1]
                , attrs: []
            }

            let end, attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {

                //console.log(end);
                //console.log(attr)
                advance(attr[0].length)
                match.attrs.push({
                    name: attr[1]
                    , value: attr[3] || attr[4] || attr[5]
                })
            }
            if (end) {
                advance(end[0].length)
                return match
            }
        }
    }
}

export function compileToFunction(template) {

    let tree = parseHTML(template);

    return function render(h) {   // h是什麼呢??



    }
}

/*
    <div id="app">
        <p>hello</p>
    </div>

    const astRoot = {
        tag: 'div'
        , attrs: [{ name: 'id', value: 'app' }]
        , parent: null
        , type: 1  // nodeType
        , children: [
            {
                tag: 'p'
                , attrs: []
                , parent: astRoot
                , type: 1  // nodeType
                , children: [
                    { type: 3, text: 'hello' }
                ]
            }

        ]
    }
*/
