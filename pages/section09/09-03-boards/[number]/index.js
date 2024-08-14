import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      #위에 number가 하드코딩되는게 아니라 변수로 받아줘야 하기 떄문에 $를 넣어준다!
      number
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const router = useRouter();
  console.log(router);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.number),
      // 위에서처럼 해줘야 우리가 number자리에 입력하는 숫자를 제대로 출력할 수 있다
    },
    // 여기서 넘버를 요청해주면 저 위에 fetchBoard(number: $number)로 가서 넘버를 요청해준다.
  });
  // 대괄호 쓰는 다른애들은 안에 있는 이름을 맘대로 할 수 있었는데, 중괄호 쓰는 얘는 무조건 data로 해야됨

  const onClickMove = () => {
    router.push(`/section09/09-03-boards/${router.query.number}/edit`);
    // 여기는 고정되어있는 페이지가 아니라 router타고 넘어와서 number에 따라 달라지는 페이지 이니까 result.data.createBoard.number가 아니라 router.query.number를 사용한다
    // create가 아니라 query이기 때문에라도 result.data.createBoard.number는 사용하지 않음

    // 주소창에 [number]가 있다는건, router.query.number를 할 수 있다는 것
  };

  console.log(data);
  return (
    <div>
      <div>{router.query.number}번 게시글로 이동이 완료되었습니다</div>

      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목: {data?.fetchBoard?.title}</div>
      <div>내용: {data?.fetchBoard?.contents}</div>
      <button onClick={onClickMove}>수정하러가기</button>
    </div>
  );
}
