import { useQuery, gql } from "@apollo/client";
import { MouseEvent } from "react";

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

const onClickAlert = (event: MouseEvent<HTMLDivElement>) => {
  // <event.target활용법>
  // event.target하면 span태그가 나오고 그 span태그의 id를 가져와라 하면 el.writer가 나올거라고 생각해볼 수 있음
  alert(event.currentTarget.id + "님이 작성한 글입니다.");
  //   alert("클릭div");
};

// const qqq = () => {
//   alert("클릭타이틀");
// };

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);

  return (
    // 게시글을 클릭하면 {작성자}님이 작성한 글입니다 의 형태로 알러트가 뜨게 만들고 싶은데, 각각의 게시글 미리보기를 감싸고 있는 맨위의 div에 id={el.writer} onClick={onClickAlert} 를 넣으면 언제는되고 언제는 안됨 => 이벤트 버블링 떄문에 앞쪽에 있는 span태그를 클릭하면 event.target은 span태그가 선택이되는데 onClick이벤트는 부모요소인 div가 실행된것. span태그에 id가 비어있으니까 event.target.id는 없는 상태로 alert가 실행되는것
    // onClick={onClickAlert}는 div에 주고, id는 span태그 각각에 주면 문제 해결됨!
    // <event.currentTarget>
    // 근데 모든 태그에 주면 비효율적이니까, event.currentTarget.id를 사용하고 id={el.writer}를 부모요소에 넣어주면, 어떤 태그를 누르더라도 onClick은 버블링 통해서 부모요소까지 되고, event.currentTarget 트래킹은 지금 누른 그 태그, span을 누른 경우에는 span태그로 가게 되고, 그게 눌렸을때 onClick이 실행되면서 부모 div에서 id를 불러온다
    // "currentTarget은 부모든 자식이든 뭘 눌러도 태그를 모두 뚫고 맨 밑에까지 들어가서 실행되게 해준다"
    // stopPropagation을 해주지 않는이상 이벤트 버블링은 무조건 발생한다
    //currentTarget은 무조건 태그밖에 안되기 때문에 타입스크립트할때도 별다른 처리가 필요하지 않다

    // title이 담긴 span태그를 클릭하면 클릭div 알러트와 클릭타이틀 알러트가 모두 실행됨
    <div>
      {data?.fetchBoards.map((el: any) => (
        <div id={el.writer} onClick={onClickAlert}>
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

// <이벤트 버블링>
// 위의 코드에서 자식요소인 span태그를 클릭하면 그것만 클릭되는게 아니라 부모요소인 div태그도 클릭이 됨 -> '이벤트 전파' 라고 부름 (event propagation)
// 이밴트 전파가 위로 계속 올라가는걸 "이벤트 버블링"이라고 부른다!(자식에서 부모로)
// 반대는 "이벤트 캡쳐링" 이라고 부른다 (부모에서 자식으로)/
