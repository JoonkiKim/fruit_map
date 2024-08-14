export default function BoardComponent(props) {
  return (
    <div>
      <h1>{props.isEdit ? "수정" : "등록"}페이지</h1>
      제목: <input type="text" /> <br />
      내용: <input type="text" /> <br />
      <button>{props.isEdit ? "수정" : "등록"}하기</button>
    </div>

    // fragment가 아닌 div를 하는 이유는 다른 곳으로 import했을때 div로 css를 적용할 벽을 쳐줘야 하기 때문, 안쳐주면 그 주변까지 css가 확장되어서 적용되기 때문에 통제가 힘들다
  );
}
