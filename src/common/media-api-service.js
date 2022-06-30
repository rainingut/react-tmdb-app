import  axios  from "./axios-environment";

const API_KEY = process.env.REACT_APP_API_KEY;
const optionHandler = (option = {}) => {
  const queryItems = Object.keys(option);
  let questResult = '';
  if(queryItems.length) {
    questResult = queryItems.map(item => {
      return `&${item}=${option[item]}`
    }).join('')
  }
  return questResult;
}

export const Media_api = {
  // 電影
  /** 搜尋
   * @param {string}  query
   * @param {string}  language
   * @param {number}  page
   * @param {boolean} include_adult
   * @param {string}  region
   * @param {number}  year
   * @param {number}  primary_release_year
   */
  searchMedia:      async (media, option = {}) => {
    if(!option?.query) return false;
    const questResult = optionHandler(option)
    return await axios.get(`/search/${media}?api_key=${API_KEY}${questResult}`);
  },
  
  /** 影視類別有什麼
   * @param {string} language
  */
  searchGenreMedia: async (media, option = {}) => {
    const questResult = optionHandler(option)
    return await axios.get(`/genre/${media}/list?api_key=${API_KEY}${questResult}`)
  },
  /** 詳情
   * @path {number} movie_id
   * @param {string} language
   * @param {string} append_to_response
   */
  getMediaDetail:    async (media, id, option = {}) => {
    const questResult = optionHandler(option)
    return await axios.get(`/${media}/${id}?api_key=${API_KEY}${questResult}`)
  },
  /** 發現(ㄊㄋㄋㄉ參數太多了！)
   * @param {string} language
   * @param {string} region
   * @param {string} region
   * @param {string} sort_by
   popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, original_title.asc, original_title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc , default: popularity.desc
   * @param {string} certification_country
   * @param {string} certification
   * @param {string} certification.lte
   * @param {string} certification.gte
   * @param {boolean} include_adult
   * @param {boolean} include_video
   * @param {number} page
   * @param {number} primary_release_year
   * @param {number} primary_release_year
   * @param {string} primary_release_date.gte
   * @param {string} primary_release_date.lte
   * @param {string} release_date.gte
   * @param {string} release_date.lte
   * @param {number} with_release_type
   * @param {number} year
   * @param {number} vote_count.gte
   * @param {number} vote_count.lte
   * @param {number} vote_average.gte
   * @param {number} vote_average.lte
   * @param {string} with_cast
   * @param {string} with_crew
   * @param {string} with_people
   * @param {string} with_companies
   * @param {string} with_genres
   * @param {string} without_genres
   * @param {string} with_keywords
   * @param {string} without_keywords
   * @param {string} without_keywords
   * @param {number} with_runtime.gte
   * @param {number} with_runtime.lte
   * @param {string} with_original_language
   * @param {string} with_watch_providers
   * @param {string} watch_region
   * @param {string} with_watch_monetization_types
   * @param {string} without_companies
   */
  discoverMedia:    async (media, option = {}) => { 
    const questResult = optionHandler(option)
    return await axios.get(`/discover/${media}?api_key=${API_KEY}${questResult}`)
  },
  /** 找相似
   * @param {string} language
   * @param {number} page
   */
  getSimilarMedia:  async (media, id, option = {}) => {
    const questResult = optionHandler(option)
    return await axios.get(`/${media}/${id}/similar?api_key=${API_KEY}${questResult}`)
  },
  

  // 規格(如圖片尺寸) 無參數
  getConfiguration: async() => {
    return await axios.get(`/configuration?api_key=${API_KEY}`)
  },

};