import { useEffect, useState } from "react";
import { Media_api } from "../common/media-api-service";
import { NavBar } from "../components/navbar/NavBar";


export function MediaInfo (props) {
  const [mediaType, setType] = useState();
  const [content, setContent] = useState({});
  const [simiContent, setSimilar] = useState({});
  const img_origin_url = 'https://image.tmdb.org/t/p/original';


  /**
   * backdrop_sizes:'w300', 'w780', 'w1280', 'original'
   * logo_sizes:    'w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'
   * poster_sizes:  'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'
   * profile_sizes: 'w45', 'w185', 'h632', 'original'
   * still_sizes:   'w92', 'w185', 'w300', 'original'
   */
  const img_size = (size) => {
    return `https://image.tmdb.org/t/p/w${size}`
  }

  // 找詳情 + 找相似
  const getMediaDetail = async(types, media_id) => {
    setType(types)
    const option = {
      language: 'zh-TW',
    }
    const result = await Media_api.getMediaDetail(types, media_id, option);
    const similars = await Media_api.getSimilarMedia(types, media_id, option);
    console.log(result?.data, similars?.data?.results)
    if(!result?.data) return ;
    else {
      setContent(result?.data);
      setSimilar(similars?.data?.results);
    }
  }

  // 找規格
  const getConfiguration = async() => {
    const result = await Media_api.getConfiguration()
    console.log(result)
  }

  useEffect(() => {
    // getConfiguration()
  }, []);

  return (<div style={{minHeight:'100vh', background:`url(${img_origin_url+(content?.backdrop_path || content?.poster_path)}) no-repeat center / cover, gray` }}
  >
    <div className="sticky-top">
      <NavBar on_click={getMediaDetail}></NavBar>
    </div>
    {
      content?.id?
        (
          <div className="container text-white" style={{backdropFilter:'brightness(0.5) blur(8px)',zIndex:1 }}>
            <div className=" p-3 d-flex flex-wrap flex-md-nowrap position-relative">
              <div className="w-100 w-md-50 d-flex justify-content-center align-items-start">
                { content?.poster_path&&
                  (<img className="img" src={img_size(342)+content?.poster_path} alt={content?.name}/>)
                }
              </div>
              <div className="p-3 w-100 w-md-50">
                <div className="pb-4">
                  <h1 className=" display-1 text-bolder">{content?.name||content?.title||content?.original_title || content?.original_name}</h1>
                  <small>{content?.name||content?.title ? content?.original_title || content?.original_name : ''}</small>
                </div>
                <div className="pb-4">
                  <h2 className="high-light">簡介</h2>
                  <div className="">{content?.overview || '暫無簡介'}</div>
                </div>
                <div className="pb-4">
                  <h2 className="high-light">分類</h2>
                  <div className="">{
                    content?.genres?.map(i => i?.name).join('、') || '暫無分類'
                  }</div>
                </div>
                <div className="pb-4">
                  <h3 className="">首映日 | 發行日</h3>
                  <p className="h4 high-light">{content?.first_air_date || content?.release_date}</p>
                </div>
                <div className="pb-4">
                  <h3 className="">評價</h3>
                  <p className="h4 high-light">
                      <span className="h2 p-1">{content?.vote_average}分</span>
                      <span>/</span>
                      <span className="h6 p-1">{content?.vote_count}人評價</span>
                    </p>
                </div>
                <hr />
              </div>
            </div>

            {/* 相似 */}
            <div>
              <div className="pb-4 ">
                  <h2 className="">也許你會喜歡..</h2>
                  <div className="overflow-auto row flex-nowrap">
                    { simiContent.length
                        ? (simiContent.map((sContent, sIdx) => {  
                          if(sIdx< 6){
                            return (
                              <div key={sIdx?.id} className="col-3 d-flex flex-column">
                                <div className="w-100 d-flex justify-content-center align-items-center"  role="button"
                                  onClick={() => getMediaDetail(mediaType, sContent?.id)}
                                >{sContent?.poster_path&&
                  (<img className="img h-100" src={img_size(185)+sContent?.poster_path} alt={sContent?.name}/>)}</div>
                              </div>
                            )
                          }
                        }))
                        : ''
                    }
                  </div>
                </div>
              </div>
          </div>
        )
        : (
          <div className="container text-center p-5">請搜尋影視</div>
        )
    }
  </div>)
}