import { firestore } from '../firebase';
import React from 'react';


class userinfo extends React.Component{
    render(){
      const bucket = firestore.collection("bucket");

      // bucket 콜렉션의 bucket_item 문서의 name 필드 duck2로 바꾸기
      bucket.doc("bucket_item").update({ text: '수정3' });

      return (
          <div className="userinfo">
          firebase 확인해보기!
          </div>
      )
    }
}


export default userinfo;
