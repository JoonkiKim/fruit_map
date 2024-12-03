import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import BoardDetailUI from "./BoardDetail.presenter";
import { useState } from "react";
import { FETCH_BOARD } from "./BoardDetail.queries";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";

// 애를 상세 페이지(boardId)가 아니라 접속페이지(new)의 컴포넌트로 쓰면, boardId가 정의가 안되니까 사용할 수 없다
// => 컴포넌트를 만들때 어디에 import될지를 생각하고 만들자!!
// 주소창에 주소 입력하고 실행할때 코드들이 따로따로 실행되는게 아니라 한방에 실행된다는걸 생각하면 당연한 소리이지만 의식의 차원으로 끌어올리자

export default function BoardDetail() {
  const router = useRouter();

  const [modalMessage, setModalMessage] = useState("");
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  // 이부분이 주소를 만들어주는 부분
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      // variables는 $니까 바로 뒤에있는 boardId의 앞에 $가 붙어서 저 위로 올라가는거고, 거기에 담겨있는 값은 data에 담긴 실제 boardId임
      variables: {
        boardId: String(router.query.boardId),
      },
      //
    },
  );

  const onClickMove = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  // const onLoadMore = (): void => {
  //   if (data === undefined) return;

  //   fetchMore({
  //     variables: { page: Math.ceil((data.fetchBoards.length ?? 10) / 10) + 1 },
  //     // 위의 수식은 기존 페이지 + 1을 만드는 코드
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (fetchMoreResult.fetchBoards === undefined) {
  //         // fetchMoreResult.fetchBoards가 없으면 기존 댓글을 불러오고, 있으면 뒤에거 더해서 fetchMore를 해줘라
  //         return {
  //           fetchBoards: [...prev.fetchBoards],
  //         };
  //       }

  //       return {
  //         fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
  //         // ... 스프레드 연산자 써주는거 까먹지 말기!
  //         // fetchBoards에 배열로 되어있는 댓글 목록들을 복사해주기 위해 스프레드 연산자가 필요한거임
  //       };
  //     },
  //   });
  // };

  const moveToList = () => {
    try {
      router.push(`/boards`);
      // 도착하는 페이지에서 불러오기를 할게 없다면 따로 뭔가 설정을 할 필요는 없다!
    } catch (error) {
      if (error instanceof Error) setModalMessage(error.message);
      onToggleAlertModal();
    }
  };

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  return (
    <BoardDetailUI
      data={data}
      liked={liked}
      handleLike={handleLike}
      onClickMove={onClickMove}
      isModalAlertOpen={isModalAlertOpen}
      onToggleAlertModal={onToggleAlertModal}
      modalMessage={modalMessage}
      moveToList={moveToList}
    />
  );
}
