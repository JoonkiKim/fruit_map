export default function TypescriptPage() {
  let aaa = "안녕하세요";
  // aaa = 3 => 이렇게 넣으면 에러 남
  // "타입 추론" 을 통해서!

  // 아래는 "타입 명시"
  let bbb: string = "반갑습니다";

  // 타입명시가 필요한 상황
  // 아래처럼 넘버, 스트링 둘다 가능하게 하려면 명시를 해줘야 된다
  let ccc: number | string = 1000;
  ccc = "1000원";

  //
  // 숫자타입
  let ddd: number = 10;
  //   ddd= "철수" => 이렇게 안됨!

  // Boolean 타입
  let eee: Boolean = true;
  eee = false;
  //   eee = "false" -> 이건 당연히 안되겠지!, 또 문제는 얘가 빈문자열이 아니기 때문에 true로 작동함

  // 배열 타입
  //   let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"]; -> 에러발생
  //   let ggg: string[] = ["철수", "영희", "훈이", 10]; -> 에러발생
  let hhh = ["철수", "영희", "훈이", 10]; // 이렇게 섞여있으면 타입을 추론해서 어떤 타입을 사용하는지 알아보기, hhh에 마우스 갖다대면 확인할 수 있음

  // 객체 타입
  // 객체는 interface로 타입 명시해야됨

  interface IProfile {
    name: string;
    age: number | string;
    school: string;
    hobby?: string; // 있어도 되고 없어도 되는 애들은 ?를 붙여준다
  }
  const profile: IProfile = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
  };

  profile.name = "훈이";
  profile.age = "8살";
  profile.hobby = "수영";

  // 함수타입
  // 함수는 받는쪽에서 타입을 결정해준다
  function add(num1: number, num2: number, unit: string): string {
    // 뒤쪽에 : string 써주는건 return의 타입
    return num1 + num2 + unit;
  }
  const result = add(1000, 2000, "원");
  // result의 타입을 알 수 있음, 왜냐면 return이 string이니까. string은 문자이니까 계산을 못하므로 이걸로 계산을 할때 발생하는 에러를 막을 수 있음

  const add2 = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit;
  };
  const result2 = add2(1000, 2000, "원");

  // any타입
  // 무슨 타입인지 모를때 사용, 자바스크립트와 동일함, 사용 자제하기
  let qqq: any = "철수";
  qqq = 123;
  qqq = true;

  return <></>;
}
