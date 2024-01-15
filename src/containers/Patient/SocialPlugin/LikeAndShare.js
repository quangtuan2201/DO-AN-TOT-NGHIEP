import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import { useEffect } from "react";

function LikeAndShare({ dataHref }) {
  console.log("dataHref: ", dataHref);
  const language = useSelector((state) => state.app.language);
  //   useEffect(() => {
  //     const initFacebookSDK = () => {
  //       if (window.FB) {
  //         window.FB.XFBML.parse();
  //       }
  //       let locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";
  //       window.fbAsyncInit = {
  //         appId: process.env.REACT_APP_FACABOOK_APP_ID,
  //         cookie: true,
  //         version: "v2.5",
  //       }(
  //         (function (d, s, id) {
  //           let js,
  //             fjs = d.getElementsByTagName(s)[0];
  //           if (d.getElementById) return;
  //           js = d.createElement(s);
  //           js.id = id;
  //           js.src = `//connect.facebook.net/${locale}/sdk.js`; //all.js
  //           fjs.parentNode.insertBefore(js, fjs);
  //         })(document, "script", "facebook-jssdk")
  //       );
  //     };

  //     initFacebookSDK();
  //   }, [language]);
  //   useEffect(() => {
  //     const initFacebookSDK = () => {
  //       console.log("check .env : ", process.env.REACT_APP_FACABOOK_APP_ID);
  //       if (!window.FB) {
  //         console.error("Facebook SDK not loaded");
  //         return;
  //       }

  //       window.FB.XFBML.parse();

  //       const locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";

  //       window.fbAsyncInit = {
  //         appId: process.env.REACT_APP_FACABOOK_APP_ID, // Đã sửa tên biến
  //         cookie: true,
  //         version: "v2.5",
  //       };

  //       (function (d, s, id) {
  //         let js,
  //           fjs = d.getElementsByTagName(s)[0];
  //         if (d.getElementById(id)) return;
  //         js = d.createElement(s);
  //         js.id = id;
  //         js.src = `https://connect.facebook.net/${locale}/sdk.js`;
  //         fjs.parentNode.insertBefore(js, fjs);
  //       })(document, "script", "facebook-jssdk");
  //     };

  //     initFacebookSDK();
  //   }, [language]);
  useEffect(() => {
    const initFacebookSDK = () => {
      const locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";

      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          cookie: true,
          version: "v2.5",
        });

        window.FB.XFBML.parse();
      };

      if (!window.FB) {
        loadFacebookSDK(locale);
      } else {
        window.FB.XFBML.parse();
      }
    };

    const loadFacebookSDK = (locale) => {
      (function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `https://connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    initFacebookSDK();
  }, [language]);

  return (
    <>
      <div
        className="fb-like"
        data-href={dataHref}
        data-width=""
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-share="true"
      ></div>
    </>
  );
}
export default LikeAndShare;
