// 게시글 '목록'을 받아서 map으로 화면에 나타내주기 + 그 옆에 삭제버튼도 만들기

import { useMutation } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
// import { Fragment } from "react/cjs/react.production.min";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(number: $number) {
      message
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  console.log(data?.fetchBoards);

  const onClickDelete = (event) => {
    deleteBoard({
      variables: {
        number: Number(event.target.id),
        // 위의 넘버는 저 위로 가서 $number로 활용되는거임
        // 목록을 식별하기 위해 id를 사용하고 그안에 있는 number를 활용한다 -> 이 number에 해당하는게 없어진다
      },
      // 아래의 코드가 없으면, DB에서만 삭제를 하고 사용자가 보는 화면에서는 삭제한 내용이 없어지지 않음
      //그래서 리페치를 해서 목록을 다시 불러옴으로써 사용자의 화면에 삭제한 목록이 없어지도록 해줌
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        // 아래의 코드처럼 key를 줘야 각각의 요소가 다르다는걸 인지시킬 수 있다
        // key를 안주면 체크박스를 클릭하고 삭제하면, 체크한게 남아있는 상태가 된다
        // key는 다 다른거로 해야되니까 number로 준다
        // map을 사용하면 각 요소들에 index가 부여되는데, 얘를 key로 사용하면 안되는 이유 : 매번 화면을 렌더링 할때마다 index가 부여되기 때문에 삭제하고 다시그리면 그 자리에 똑같은 인덱스로 다른애가 들어온다. 결과적으로 체크한게 안 없어짐 -> index는 유일한 값이 아니므로 키로 사용하면 안된다.

        // 특별한 이유가 없으면 Fragment로 감싸자! div는 1개 더 그려야 해서 조금 느려지기 때문
        // 1. Fragment란? <></>, <Fragment></Fragment>
        // 2. 프레그먼트에 key 입력하는 방법? <Fragment key={1}><Fragment>
        <div key={el.number}>
          {/* Fragment에는 따로 키를 줄 수 없음 -> <Fragment> 이렇게 직접 태그를 써줘야 된다. 따로 import도 해줘야 된다 */}
          {/* 인라인 요소여야 한줄에 쭉 나오니까 span으로 감싼다 */}
          <span>
            <input type="checkbox" />
          </span>
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span>
            <button id={el.number} onClick={onClickDelete}>
              {/* 이 버튼을 누르면 deletBoard라는게 실행되면서 mutaion중 delete하는 기능이 실행된다 */}
              삭제
            </button>
          </span>
        </div>
        // 프래그먼트라는게 있는데, <></> 모양임
        // div로 감싸면 요소들이 줄바꿈이 되는데, 프래그먼트로 감싸면 인라인요소들처럼 옆으로 쭉 붙음 -> div로 감싸야 할때만 감싼다
      ))}
    </div>
  );
}
