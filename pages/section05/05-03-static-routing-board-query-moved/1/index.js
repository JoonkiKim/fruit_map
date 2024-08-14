import { useQuery, gql } from "@apollo/client";

const FETCH_BOARD = gql`
  query {
    fetchBoard(number: 24290) {
      number
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARD);
  // 대괄호 쓰는 다른애들은 안에 있는 이름을 맘대로 할 수 있었는데, 중괄호 쓰는 얘는 무조건 data로 해야됨

  console.log(data);
  return (
    <div>
      <div>1번 게시글로 이동이 완료되었습니다</div>;
      {/* <div>작성자: {data && data.fetchBoard.writer}</div>
      <div>제목: {data && data.fetchBoard.title}</div>
      <div>내용: {data && data.fetchBoard.contents}</div> */}
      {/* data&& 를 쓰는 이유 : 데이터를 불러오는데에 시간이 많이 걸리기 때문에 html만 먼저 그리고(한번 그리고), 데이터가 불러와지면 또 한번 그려라(두번그리기). data&&를 통해 데이터가 있으면 그리고 없으면 일단 그리지 말라고 얘기해주는 것 
      => "조건부 렌더링" 이라고 부르고, 비동기로 받아오는 방식! 대부분의 사이트에서 이렇게 작동하니까 꼭 넣어주기*/}
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
      {/* ?. 으로 하면 간단하게 쓸 수 있따 => "옵셔널 체이닝!"*/}
      {/* 삼항 연산자를 사용하면 로딩중입니다 같은 메시지를 넣을 수 있음  
      <div>내용: {data? data.fetchBoard.contents: "로딩중입니다!"}</div>*/}
      {/* html안에서 js변수를 사용하고 싶으면 중괄호로 감싸주기! */}
    </div>
  );
}
