// 컴포넌트 위에 객체를 만든이유: 밑에 있는 컴포넌트가 리렌더링되어도 객체는 다시 안 만들기 위해서 -> 효율적이다!
const FRUITS = [
  { number: 1, title: "레드향" }, // <div> 1 레드향 <div> 이런식으로 매핑을 할거다
  { number: 2, title: "샤인머스캣" },
  { number: 3, title: "산청딸기" },
  { number: 4, title: "한라봉" },
  { number: 5, title: "사과" },
  { number: 6, title: "애플망고" },
  { number: 7, title: "딸기" },
  { number: 8, title: "천혜향" },
  { number: 9, title: "과일선물세트" },
  { number: 10, title: "귤" },
];

export default function MapFruitsPage() {
  //1. 가장 기본 예제
  const aaa = [
    <div>1 레드향</div>,
    <div>2 샤인머스켓</div>,
    <div>3 산청딸기</div>,
  ];
  // 밑에 html부분으로 넘어가면 중간에 있는 콤마(,)는 사라진다

  //
  //2. 실무 백엔드 데이터 예제 (보통 배열 안에있는 객체 형태로 받아온다!)
  // map을 사용하면 된다!
  const bbb = FRUITS.map((el) => (
    <div>
      {el.number} {el.title}
    </div>
  ));

  return (
    <div>
      <div>{aaa}</div>
      ============================
      <div>{bbb}</div>
      ============================
      {/* 3. 실무 효율적인 렌더링 예제
      실제로는 컨테이너 프리젠터 나누면 변수에 뭐가 담겨있는지 찾기 힘들기 때문에 html부분에서 한번에 그려버린다 */}
      <div>
        {FRUITS.map((el) => (
          <div>
            {el.number} {el.title}
          </div>
        ))}
      </div>
    </div>
  );
}
