import { useQuery, gql } from "@apollo/client";

const FETCH_BOARD = gql`
  query {
    fetchBoard(number: 24291) {
      number
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARD);

  console.log(data);
  return (
    <div>
      <div>3번 게시글로 이동이 완료되었습니다</div>;
      <div>작성자: {data?.fetchBoard?.writer}</div>;
      <div>제목: {data?.fetchBoard?.title}</div>;
      <div>내용: {data?.fetchBoard?.contents}</div>;
      {/* 특정 내용이 삭제되었을때는 그 앞에도 또 ?를 달아주면 된다
      ex. fetchBoard?.writer처럼 */}
    </div>
  );
}
