import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, DELETE_BOARD } from "./BoardList.queries";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IQuery,
} from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export default function BoardList() {
  const router = useRouter();
  const { data } = useQuery<Pick<IQuery, "fetchBoards">>(FETCH_BOARDS);
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);
  //   console.log(data);

  //presenter에서 el._id로 받아왔더라도 여기서는 event를 써주는거다. 왜냐면 onClick '이벤트'를 사용하는 함수이니까
  const moveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    // 여기서는 HTMLDivElement이고 아래는 HTMLButtonElement를 쓰는 이유는 presenter에서 쓰는 태그가 각각 div, button이기 때문!
    if (event.target instanceof HTMLDivElement)
      // 위의 if문은 event.target이 div태그의 instance즉 자식이고 따라서 event.target이 '태그'라는걸 명시해주는 것. 이걸 해주면 id부분에 빨간불이 안들어온다
      try {
        router.push(`/boards/${event.target.id}`);
      } catch (error) {
        alert(error.message);
      }
  };
  // 매개변수를 안쓰고 싶으면 DeleteBtn할때 id={el._id} onClick={props.onClickDelete} 이 코드처럼 id연동해주는 것과 똑같이 해주면됨
  //
  // <TitleWrapper onClick={() => props.moveToDetail(el._id)}>{el.title} </TitleWrapper> 이렇게 el._id를 매개변수로 주는게 아니라
  // <TitleWrapper id = el._id onClick={props.moveToDetail}>{el.title} </TitleWrapper> 이렇게 id를 넘겨주고 moveToDetail함수에서는 event.target.id만 받아주면 된다
  // //const moveToDetail = (event) => {
  //     router.push(`/boards/${event.target.id}`);
  // };
  // ** id={el._id}  이 코드를 통해 id를 container쪽에 넘겨주는거임!

  const moveToWrite = () => {
    try {
      router.push(`/boards/new`);
      // 도착하는 페이지에서 불러오기를 할게 없다면 따로 뭔가 설정을 할 필요는 없다!
    } catch (error) {
      alert(error.message);
    }
  };

  // Delete를 하면서 겪은 문제
  // 1. 버튼에 id를 연동을 안해줌
  // 2. console을 어떻게 찍어야 하는지 몰랐는데, 버튼 누르는거 안쪽 중 맨 위쪽에 만들어주면 됨 -> console을 통해서 target에 _id가 아니라 id 형태로 들어간다는걸 알아내고 문제 해결
  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.target);
    if (event.target instanceof HTMLButtonElement)
      deleteBoard({
        variables: {
          boardId: event.target.id,
          // 언더바 없이 id만 써준다!!!!
        },

        refetchQueries: [{ query: FETCH_BOARDS }],
      });
  };

  // 아래의 함수는 utils.js로 옮겨서 재사용가능하게 만들기
  // // 날짜 바꿀때는 밖에서 함수를 따로 만들어서 해준다
  // // dateString라는 매개변수를 통해서 presenter의 el.createAt을 받아온거임
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   // getMonth만 0부터 시작한다
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  return (
    <BoardListUI
      data={data}
      moveToDetail={moveToDetail}
      moveToWrite={moveToWrite}
      onClickDelete={onClickDelete}
    />
  );
}
