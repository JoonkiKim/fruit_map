import { BlueButton, RedInput } from "./BoardWrite.styles";
// style은 presenter에서 받아온다

export default function BoardWriteUI(props) {
  return (
    <div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
      <div>
        {/* aaa={onClickSubmit}
    bbb={onChageWriter}
    ccc={onChageTitle}
    ddd={onChageContents} */}
        작성자: <RedInput type="text" onChange={props.bbb} />
        제목 : <input type="text" onChange={props.ccc} />
        내용 : <input type="text" onChange={props.ddd} />
        <BlueButton onClick={props.aaa}>GRAPHGQL-API 요청하기</BlueButton>;
      </div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
    </div>
  );
}
