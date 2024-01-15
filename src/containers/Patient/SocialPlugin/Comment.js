import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils/constant";
import { useEffect } from "react";

function Comment({ dataHref, width, numPost }) {
  const language = useSelector((state) => state.app.language);
  // useEffect(() => {
  //   const initFacebookSDK = () => {
  //     if (window.FB) {
  //       window.FB.XFBML.parse();
  //     }
  //     let locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";
  //     window.fbAsyncInit = {
  //       appId: process.env.REACT_APP_FACABOOK_APP_ID,
  //       cookie: true,
  //       version: "v2.5",
  //     }(
  //       (function (d, s, id) {
  //         let js,
  //           fjs = d.getElementsByTagName(s)[0];
  //         if (d.getElementById) return;
  //         js = d.createElement(s);
  //         js.id = id;
  //         js.src = `//connect.facebook.net/${locale}/sdk.js`; //all.js
  //         fjs.parentNode.insertBefore(js, fjs);
  //       })(document, "script", "facebook-jssdk")
  //     );
  //   };

  //   initFacebookSDK();
  // }, [language]);
  useEffect(() => {
    const initFacebookSDK = () => {
      if (!window.FB) {
        console.error("Facebook SDK not loaded");
        return;
      }

      window.FB.XFBML.parse();

      const locale = language === LANGUAGES.VI ? "vi_VN" : "en_US";

      window.fbAsyncInit = {
        appId: process.env.REACT_APP_FACEBOOK_APP_ID, // Đã sửa tên biến
        cookie: true,
        version: "v2.5",
      };

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
        className="fb-comment"
        data-href={dataHref}
        data-width={width ? width : ""}
        data-numposts={numPost ? numPost : 5}
      ></div>
    </>
  );
}
export default Comment;
