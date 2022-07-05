import { useEffect, useState } from 'react';
import { Form, FormControl, ListGroup, Nav, NavDropdown,  } from 'react-bootstrap';
import { Media_api } from '../../common/media-api-service';
import reactStringReplace from 'react-string-replace';

export function SearchBar({on_click}){
  // 搜尋 query
  const [current_query, setQuery] = useState('');
  // 打開搜尋欄下方
  const [isOpen, setIsOpen] = useState(false);
  // 搜尋欄下方清單
  let origin_lists = [];
  const [lists, setLists] = useState([]);
  // 下拉選單項目，【目前項目】
  const [ types, setTypes] = useState('movie');


  // 查詢媒體所有清單
  const fetchMediaResult = async(query) => {
    setQuery(query) ;
    const option = {
      query,
      language: 'zh-TW',
    };
    const movies = await Media_api.searchMedia(types, option);
    if(!movies) origin_lists = []// 查無結果
    else origin_lists = [...movies?.data?.results]
    setLists(JSON.parse(JSON.stringify(origin_lists)));
  }

  const getMediaDetail = (event, item) => {
    event.preventDefault();
    on_click(types, item?.id);
  }

  useEffect(() => {
    fetchMediaResult(current_query);
  }, [types])
  return (<div className='d-flex m-auto'>
    {/* type select */}
    {/* <Nav> */}
      <NavDropdown title={`${types.toUpperCase()}`} >
        <NavDropdown.Item className={types==='movie'?'active':''}
          onClick={() => setTypes('movie')}>
          Movie
        </NavDropdown.Item>
        <NavDropdown.Item className={types==='tv'?'active':''}
          onClick={() => setTypes('tv')}>
          TV
        </NavDropdown.Item>
      </NavDropdown>
    {/* </Nav> */}

     {/* search */}
     <Form className="d-flex position-relative" autoComplete='off'
      onFocus={() => {setIsOpen(true)}}
      onBlur={() =>  {setIsOpen(false)}}>
      <FormControl type="search" placeholder="Search"
        aria-label="Search"
        className=""
        onInput={(e) => fetchMediaResult(e.target.value)}
      />
      <ListGroup defaultActiveKey="" className="position-absolute top-100 w-100">
        {lists.map((item, idx) => {
          if(idx < 5){
            const name = item?.name || item?.title || item?.original_name;
            const renderName = reactStringReplace(name, current_query, (match, i ) => (<span className="list-high-light">{match}</span>))
            return(
            <ListGroup.Item action key={item?.id} 
              className={!isOpen ? 'dont-see-me' : ''}
              onClick={(e) => getMediaDetail(e, item)} >
              {renderName}
            </ListGroup.Item>
            )
          }
        }) }
      </ListGroup>

    </Form>
  </div>);
}