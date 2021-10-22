import { firestore } from '../firebase';
import { useEffect } from 'react';


function userinfo() {

  useEffect(() => {
    // bucket이라는 변수로 firestore의 collection인 bucket에 접근
    const bucket = firestore.collection("bucket");

    // bucket 콜렉션의 bucket_item 문서의 name 필드 duck2로 바꾸기
    bucket.doc("bucket_item").update({ text: '수정3' });
  });

  return (
    <div className="userinfo">
      firebase 확인해보기!
    </div>
  );
}
