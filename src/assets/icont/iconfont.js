! function (d) {
    var e, n = '<svg><symbol id="icon-f11-copy1" viewBox="0 0 1024 1024"><path d="M328.20792302595464 346.0621569396352l368.4938888522427 0c20.393071563698495 0 36.887279252459585 16.366076012119944 36.887279252459585 36.757317123294996 0 9.4835745239675-3.6371091640848143 18.055583691259486-9.4835745239675 24.550029244441628l-182.23253142407032 243.15182185683665c-12.210948783900248 16.104321301267337-35.199602025843475 19.483336659546435-51.43754636132228 7.274218328169629-2.859166841620776-2.0793940666332906-5.324786390700918-4.546844068236879-7.274218328169629-7.274218328169629L298.85295590747035 404.7720911766037c-12.079156202212225-16.10615175379078-8.830102973097707-39.22476712489858 7.404180457334207-51.305753779634244C312.8833744996749 348.39964481207426 320.5456487628147 346.0621569396352 328.20792302595464 346.0621569396352L328.20792302595464 346.0621569396352z" fill="#212121" ></path></symbol><symbol id="icon-iconfontyoujiantou-copy-copy-copy-copy" viewBox="0 0 1024 1024"><path d="M356.28301783 231.94345637c-8.60283496 8.15536792-8.60283496 21.38854485-1e-8 29.54456391l264.07733751 250.51393378-264.07733751 250.50481527c-8.60283496 8.16057831-8.60283495 21.38919599 0 29.54977493 8.59827571 8.15992717 22.54401335 8.15992717 31.14228906 0l275.06992161-260.97112016c0 0 11.67257762-10.81542049 11.67257762-19.08346941 0-7.6199702-11.67257761-19.08802865-11.67257762-19.08802865L387.42595802 231.94345637C378.82703117 223.78287807 364.88129353 223.78287806 356.28301783 231.94345637z"  ></path></symbol><symbol id="icon-cha" viewBox="0 0 1024 1024"><path d="M476.19 756.825c160 0 285.715-125.714 285.715-285.714S636.19 185.397 476.19 185.397 190.476 311.11 190.476 471.11 316.19 756.825 476.19 756.825z m320-45.714l148.572 148.572c22.857 22.857 22.857 57.142 0 80-22.857 22.857-57.143 22.857-80 0L716.19 791.11c-68.571 51.429-148.571 80-240 80-222.857 0-400-177.143-400-400s177.143-400 400-400 400 177.143 400 400c0 91.429-28.571 171.429-80 240z"  ></path></symbol></svg>',
        t = (e = document.getElementsByTagName("script"))[e.length - 1].getAttribute("data-injectcss");
    if (t && !d.__iconfont__svg__cssinject__) {
        d.__iconfont__svg__cssinject__ = !0;
        try {
            document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
        } catch (e) {
            console && console.log(e)
        }
    }! function (e) {
        if (document.addEventListener)
            if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) setTimeout(e, 0);
            else {
                var t = function () {
                    document.removeEventListener("DOMContentLoaded", t, !1), e()
                };
                document.addEventListener("DOMContentLoaded", t, !1)
            }
        else document.attachEvent && (o = e, i = d.document, c = !1, (l = function () {
            try {
                i.documentElement.doScroll("left")
            } catch (e) {
                return void setTimeout(l, 50)
            }
            n()
        })(), i.onreadystatechange = function () {
            "complete" == i.readyState && (i.onreadystatechange = null, n())
        });

        function n() {
            c || (c = !0, o())
        }
        var o, i, c, l
    }(function () {
        var e, t;
        (e = document.createElement("div")).innerHTML = n, n = null, (t = e.getElementsByTagName("svg")[0]) && (t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.width = 0, t.style.height = 0, t.style.overflow = "hidden", function (e, t) {
            t.firstChild ? function (e, t) {
                t.parentNode.insertBefore(e, t)
            }(e, t.firstChild) : t.appendChild(e)
        }(t, document.body))
    })
}(window);