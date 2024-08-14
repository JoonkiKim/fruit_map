import { useState } from "react";

export default function SignupStatePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("아직은 에러가 없습니다");
  // 아예 텍스트가 없다가 에러메시지가 튀어나오게 하려면 초기값을 비우면 됨

  function onChangeEmail(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    // event에는 나의 행동이 들어옴 -> 밑에서 onChange, onClick한 것처럼 체인지나 클릭 같은 행동이 들어오는 것
    // event.target에는 행동의 대상이된 태그가 들어옴
    // event.target.value에는 태그에 입력된 값이 들어옴
    // 그래서 이런 함수들을 '이벤트 핸들러 함수'라고 부른다

    setEmail(event.target.value);
    // 이메일 텍스트 뒤에있는 인풋에 값을 넣을때마다 setEmail을 통해 email 변수안에 그 값이 들어가게 되는 것
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onClickSignup(event) {
    console.log(email); // setEmail을 통해 email이라는 state에 값이 잘 들어가서 포장이 잘 되었는지 확인
    console.log(password);

    //1. 이메일 검증하기
    if (email.includes("@") === false) {
      // alert("이메일이 올바르지 않습니다!! @가 없음!");
      // 요즘은 알러트를 잘 안쓰고 입력창 밑에 작은 텍스트로 보여주기 때문에 div태그를 이용해 텍스트로 보여주자
      // @가 없는 에러가 발생했을때만 id가 myerror인 div태그에 아래의 텍스트를 넣어준다!
      // document.getElementById("myerror").innerText =
      //   "이메일이 올바르지 않습니다!! @가 없음!";
      // 그 런 데 앞으로 document.을 안쓰고 state를 쓰기로 했으니까 위의 코드도 state로 바꿀 수 있겠다!
      setEmailError("이메일이 올바르지 않습니다!! @가 없음!");
    } else {
      //2. 백엔드 컴퓨터에 보내주기(백엔드개발자가 만든 함수 즉, API) => 요건 나중에!
      //3. 성공 알람 보여주기
      alert("회원가입을 축하합니다");
    }
  }

  return (
    <div>
      이메일: <input type="text" onChange={onChangeEmail} />
      {/* <div id="myerror"></div> */}
      {/* state사용하면 id도 필요없으니까 id없는 div를 사용하기 */}
      {/* 프리캠프때 만든 경고 문구를 위의 코드처럼 만드는 거였음 */}
      <div>{emailError}</div>
      {/* div태그 안에 emailError state값을 넣어줘야 하니까 중괄호로 감싸서 넣어준다 */}
      비밀번호: <input type="password" onChange={onChangePassword} />
      <button onClick={onClickSignup}>회원가입</button>
    </div>
  );
}
