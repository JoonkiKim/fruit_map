import BoardWrite from "../../../../src/components/units/homework/write/BoardWrite.container";
import { useQuery } from "@apollo/client";

import { useRouter } from "next/router";

import { FETCH_BOARD } from "../../../../src/components/units/homework/detail/BoardDetail.queries";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types";
// "../detail/BoardDetail.queries";

export default function EditPage() {
  const router = useRouter();

  // 라우터가 없거나 boardId가 스트링이 아니면 아무화면도 보여주지 말라는 뜻
  // 별로 어려운 코드는 아니었지만 그런 상황이 발생할 수 있다는걸 염두에 두자는 의미의 코드!
  if (!router || typeof router.query.boardId !== "string") return <></>;

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: router.query.boardId,
      },
    }
  );

  return <BoardWrite isEdit={true} data={data} />;
}
