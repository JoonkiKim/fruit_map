// 수정하기 페이지에서는 기존에 있던 값들을 노출시켜줄거고, 그러기 위해서 query를 활용해서 그 값들을 불러와주는거임 -> presenter 코드에 props로 그 값을을 넘겨준다

import BoardWrite from "../../../../../src/components/units/board/10-write/BoardWrite.container";

import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      number
      writer
      title
      contents
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();
  // 얘는 페이지 이동을 위해 필요한게 아니라, 주소에 있는 number로 해당 게시글을 링크해주기 위해 router가 필요해서 있는거임
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.number),
    },
  });
  // 1) FETCH_BOARD를 통해서 number,writer, title, contents 같은 구체적인 값들을 넘겨주고, 2) variables를 통해서 주소에 있는 넘버값을 넘겨줘서 해당 게시글을 링크할 수 있도록 해준다
  // 이 값들이 'data'에 담겨있으니까 아래에서 props로 보내준다

  return (
    <div>
      <div>############### 여기는 페이지 입니다</div>
      <BoardWrite isEdit={true} data={data} />
      <div>############### 여기는 페이지 입니다</div>
    </div>
  );
}
