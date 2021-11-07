import React, { useState } from 'react'
import SearchMap from './SearchMap'


function Home() {


  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  
  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} size="150" />
        <button type="submit">SEARCH</button>
      </form>
      <SearchMap searchPlace={Place} />
    </>
  )
}

export default Home;
