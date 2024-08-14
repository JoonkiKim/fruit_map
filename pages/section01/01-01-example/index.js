export default // 이 페이지를 보여줘라고 요청하기 위해서는 export default를 앞쪽에 써줘야 된다
function 나만의페이지() {
  // 리액트에서는 return을 기준으로 아래가 html, 위에가 js
  return (
    <div>
      <div>철수</div>
      <button>클릭하세요!</button>
    </div>
  );
}
