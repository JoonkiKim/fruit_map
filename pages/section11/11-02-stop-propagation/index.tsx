import { useQuery, gql } from "@apollo/client";
import { MouseEvent } from "react";
import CheckBox from "./checkBox";

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

const qqq1 = () => {
  alert("1번클릭");
};

const qqq4 = (event) => {
  event.stopPropagation();
  // event.stopPropagation()을 해주면 이벤트 전파가 일어나지 않고 qqq4가 연결되어있는 태그만 클릭된다!
  alert("4번클릭");
};

// 아래의 상태에서 체크박스를 누르면 qqq4번은 실행이 안됨. 이벤트 전파의 대상이 아니기때문(이 태그는 뚫려서 눌리지 않기 때문)

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  return (
    <div>
      {data?.fetchBoards.map((el: any) => (
        <div id={el.writer} onClick={qqq1}>
          <CheckBox />
          {/* 이렇게 컴포넌트로 파일이 분리되어있을때도 이벤트 버블링이 발생한다. 따라서 컴포넌트 파일에서 qqq3에 stopPropagation을 해줘야된다 */}
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }} onClick={qqq4}>
            {el.title}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
