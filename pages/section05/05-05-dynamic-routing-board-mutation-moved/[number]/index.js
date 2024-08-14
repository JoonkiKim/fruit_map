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

  console.log(data);
  return (
    <div>
      <div>{router.query.number}번 게시글로 이동이 완료되었습니다</div>
      {/* 위에도 변수처럼 넣어주기 */}
      {/* <div>작성자: {data && data.fetchBoard.writer}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data && data.fetchBoard.contents}</div> */}
      {/* data&& 를 쓰는 이유 : 데이터를 불러오는데에 시간이 많이 걸리기 때문에 html만 먼저 그리고(한번 그리고), 데이터가 불러와지면 또 한번 그려라(두번그리기). data&&를 통해 데이터가 있으면 그리고 없으면 일단 그리지 말라고 얘기해주는 것 
      => "조건부 렌더링" 이라고 부르고, 비동기로 받아오는 방식! 대부분의 사이트에서 이렇게 작동하니까 꼭 넣어주기*/}
      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목: {data?.fetchBoard?.title}</div>
      <div>내용: {data?.fetchBoard?.contents}</div>
      {/* ?. 으로 하면 간단하게 쓸 수 있따 => "옵셔널 체이닝!"*/}
      {/* fetchBoard? 이렇게 하면 데이터가 없으면 html만 표시해주고 데이터를 불러오지는 않는다 */}
      {/* 삼항 연산자를 사용하면 로딩중입니다 같은 메시지를 넣을 수 있음  
      <div>내용: {data? data.fetchBoard.contents: "로딩중입니다!"}</div>*/}
      {/* html안에서 js변수를 사용하고 싶으면 중괄호로 감싸주기! */}
    </div>
  );
}
