import axios from "axios";
import 나만의페이지 from "../../section01/01-01-example";

export default function RestGetPage() {
  function onClickAsync() {
    const result = axios.get("https://koreanjson.com/posts/1");

    console.log(result); // Promise
  }

  //  ** 함수 중복 선언 문제로 const 함수로 만들기
  //   async function onClickSync() {
  //     const result = await axios.get("https://koreanjson.com/posts/1");
  //     // await를 통해 기다렸다가 결과를 받아오니까 하나씩 실행하는 동기!
  //     console.log(result); // 제대로 된 결과
  //     console.log(result.data.title);
  //   }

  // const함수로 만들면 함수를 중복 선언할 일이 없다!
  const onClickSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1");
    // await를 통해 기다렸다가 결과를 받아오니까 하나씩 실행하는 동기!
    console.log(result); // 제대로 된 결과
    console.log(result.data.title);
  };

  return (
    <div>
      <button onClick={onClickAsync}>REST-API(비동기) 요청하기</button>
      <button onClick={onClickSync}>REST-API(동기) 요청하기</button>
      <나만의페이지 />
    </div>
  );
}
