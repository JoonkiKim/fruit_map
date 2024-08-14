import { useState } from "react";

export default function counterLetDocumentPage() {
  // let은 리액트 전용 html에서 변경을 감지하지 못하므로 state를 사용해야됨

  const [count, setCount] = useState(0);

  function onClickCountUp() {
    setCount(count + 1);
  }

  function onClickCountDown() {
    setCount(count - 1);
  }

  return (
    <div>
      {/* 리액트에서는 html에 변수값(count)을 넣을 수 있다. 대신에 중괄호를 쳐줘야됨  */}

      <div>{count}</div>

      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
      <button onClick={onClickCountDown}>카운트 내리기!!!</button>
    </div>
  );
}
