import { BlueButton, RedInput } from "../07-write/BoardWrite.styles";
// style은 presenter에서 받아온다

export default function BoardWriteUI(props) {
  return (
    <div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
      <div>
        작성자: <RedInput type="text" onChange={props.onChangeWriter} />
        제목 : <input type="text" onChange={props.onChangeTitle} />
        내용 : <input type="text" onChange={props.onChangeContents} />
        <BlueButton onClick={props.onClickSubmit} isActive={props.isActive}>
          {/*  props를 통해서 isActive라는 state가 넘어왔고 그안에는 일단 false가 담겨있음 */}
          GRAPHGQL-API 요청하기
        </BlueButton>
        ;
      </div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
    </div>
  );
}
