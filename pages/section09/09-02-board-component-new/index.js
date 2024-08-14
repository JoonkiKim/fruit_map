import BoardComponent from "../../../src/components/units/board/09-board-component";

export default function BoardNewPage() {
  return <BoardComponent isEdit={false} />;
  //   <BoardComponent name="등록" />;
  // 이렇게 name을 지정해주면 컴포넌트 코드 안에서 props.name을 했을때 지정한 내용이 표시된다
}

// 보통은 true false를 이용해서 어떤 페이지를 표시할지 결정한다
