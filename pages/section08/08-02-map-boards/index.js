// 게시글 '목록'을 받아서 map으로 화면에 나타내주기

import { useQuery, gql } from "@apollo/client";

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

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  // console.log(data?.fetchBoards);
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div>
          {/* 인라인 요소여야 한줄에 쭉 나오니까 span으로 감싼다 */}
          <span>
            <input type="checkbox" />
          </span>
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
