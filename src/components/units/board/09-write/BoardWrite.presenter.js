import { BlueButton, RedInput } from "./BoardWrite.styles";
// style은 presenter에서 받아온다

export default function BoardWriteUI(props) {
  return (
    <div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
      <div>
        작성자: <RedInput type="text" onChange={props.onChageWriter} />
        제목 : <input type="text" onChange={props.onChageTitle} />
        내용 : <input type="text" onChange={props.onChageContents} />
        <BlueButton
          onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
        >
          {/* 함수에도 삼항 연산자를 적용해서 true이면 props.onClickUpdate를 적용하고 false이면 props.onClickSubmit을 적용한다 */}
          {/* 이렇게 태그에 입력을 해놓으면 자동으로 아래의 수정,등록과 바인딩이 된다 */}
          {props.isEdit ? "수정" : "등록"}
          {/* true일땐 수정 , false일땐 등록 이 표시된다 */}
        </BlueButton>
        ;
      </div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
    </div>
  );
}
