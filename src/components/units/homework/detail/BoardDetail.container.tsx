import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import BoardDetailUI from "./BoardDetail.presenter";

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

  // 이부분이 주소를 만들어주는 부분
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      // variables는 $니까 바로 뒤에있는 boardId의 앞에 $가 붙어서 저 위로 올라가는거고, 거기에 담겨있는 값은 data에 담긴 실제 boardId임
      variables: {
        boardId: String(router.query.boardId),
      },
      //
    }
  );

  const onClickMove = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  return <BoardDetailUI data={data} onClickMove={onClickMove} />;
}
