import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBox from '../Component/Common/search/searchBox'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    if(searchKeyword.length > 20) {
      return;
    }
    setSearchKeyword(value);
  }
  const onSearchKewordSubmit = (e) => {
    e.preventDefault();
    if(!searchKeyword || searchKeyword.length < 1) {
      return;
    }
    router.push({
      pathname :'/product/search',
      query : {
        keyword: encodeURIComponent(searchKeyword)
      },
    }
    );
    setSearchKeyword("");
  }
  return (
    <div style={{textAlign:'center'}}>
      <div style={{height:400, marginTop:200}}>

       <h2>좋아하는 영화를 검색해보세요.</h2>
       
       <SearchBox 
          onChangeHandler={onChangeHandler}
          searchKeyword={searchKeyword}
          onSubmitHandler={onSearchKewordSubmit} />
      </div>
    </div>
  )
}
