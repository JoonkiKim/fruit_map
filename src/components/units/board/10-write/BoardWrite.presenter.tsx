import { BlueButton, RedInput } from "./BoardWrite.styles";
import { IBoardWriteUIProps } from "./BoardWrite.types";
// style은 presenter에서 받아온다

// interface IBoardWriteUIProps {
//   // *** container에서 함수들을 받아와야되는데, 하나씩 하려니까 화딱지남
//   // 단축키 : alt ctrl 방향키 아래 -> shift alt 방향키 오른쪽 하면 원하는 끝맺음 부분까지 선택됨
//   // shift ctrl 방향키 오른쪽 하면 완전 끝까지 선택
//   // alt 마우스클릭 하면 원하는 줄만 선택가능
//   // 한페이지 안에 동일한 요소를 한번에 다 선택하고 싶으면 shift ctrl L
//   // 삭제를 한번에 하고 싶으면, ctrl shift K
//   // 커서를 옮기고 싶으면 ctrl 방향키

//   // return이 없는 함수들은 void라고 부름
//   // onClick은 MouseEvent를 쓴다
//   onClickSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
//   onClickUpdate: (event: MouseEvent<HTMLButtonElement>) => void;
//   onChageWriter: (event: ChangeEvent<HTMLInputElement>) => void;
//   onChageTitle: (event: ChangeEvent<HTMLInputElement>) => void;
//   onChageContents: (event: ChangeEvent<HTMLInputElement>) => void;
//   isEdit: Boolean;
//   data?: any;
// }

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <div>
      <div>@@@@@@@여기는 프리젠터 입니다</div>
      <div>
        작성자:{" "}
        <RedInput
          type="text"
          onChange={props.onChageWriter}
          defaultValue={props.data?.fetchBoard.writer}
          // 옵셔널 체이닝 넣어주면 등록하기 페이지 일때는 자동으로 아무것도 안보여주고, 수정하기 페이지 일때는 writer를 보여준다
        />
        {/* 기존의 value를 표시해주고 싶다면 defaultValue에 해당 게시글의 값을 넣어주면 됨 */}
        제목 :
        <input
          type="text"
          onChange={props.onChageTitle}
          defaultValue={props.data?.fetchBoard.title}
        />
        내용 :
        <input
          type="text"
          onChange={props.onChageContents}
          defaultValue={props.data?.fetchBoard.contents}
        />
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
