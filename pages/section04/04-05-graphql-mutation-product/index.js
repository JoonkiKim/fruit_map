import { useMutation, gql } from "@apollo/client";

// 실무용 적용해보기
// 기존 애들과 가장 큰 차이점은 데이터를 그룹으로 묶어서 보낸다는 것! ex.아래의 createProductInput처럼 객체로 하나 묶고 위에서 seller는 하나로 보내는 것

const CreateProduct = gql`
  mutation createProduct(
    $seller: String
    $createProductInput: CreateProductInput! #변수의 타입을 적는 곳
  ) {
    createProduct(
      seller: $seller
      createProductInput: $createProductInput #실제 우리가 전달할 변수를 적는 곳
    ) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [createProduct] = useMutation(CreateProduct);
  const onClickSubmit = async () => {
    const result = await createProduct({
      variables: {
        seller: "훈이",
        createProductInput: {
          name: "마우스",
          detail: "정말 좋은 마우스",
          price: 3000,
        },
      },
    });
    console.log(result);
    // 아래의 버튼을 클릭하면 onClickSubmit이 실행되고, 그러면 나의함수() 이게 실행되면서 mutation에서 등록할 값이 디비에 전송되고 그에따라 서버가 우리한테 보내주는 데이터(게시물이 정상적으로 등록되었습니다 등)가 콘솔에 찍힌다
  };
  //html이 한줄일때는 괄호 안해도 됨
  return <button onClick={onClickSubmit}>GRAPHGQL-API 요청하기</button>;
}

// <디버깅 방법>
// 앞으로 검색으로 바로 가는게 아니라 여기서 해결을 해보고 안되면 검색을 하자
// html이나 css에서 문제가 생기면 콘솔창에 elements를 봐야된다
// js는 console을 봐야된다
// api관련 에러는 network에서 봐야된다
// **html, css 바꾸는 디버깅을 하고 싶을때는 element창에서 한다
// 앞으로는 코드를 직접 수정하는게 아니라 f12눌러서 거기서 해결한다!
// 좌상단에 사각형+마우스 아이콘 있는데, 그걸 누르고 내가 바꾸고 싶은 부분을 클릭하면 그에 해당하는 코드가 나온다
// css를 바꾸고 싶으면 밑에 styles에 들어가서 element.style에서 바꿔서 시도해본다. 다만 저장은 안됨 -> 해보고 괜찮으면 소스코드로 가서 직접 바꾼다

// js에서 에러 잡으려면 console찍어보는걸 습관화하자
// f12의 콘솔 메뉴를 잘 활용하자

//api문제는 network로 가자
//거기로 가면 빨간색으로 떠있는게 있는데 그걸 눌러서 확인해보기
// Header는 헤더이고, payload는 요청하는 내용, **response가 응답결과이고 여기에 있는 에러메시지를 잘 읽어보기!!!!
// preview는 response를 보기좋게 만들어준것

// 더하여
// 버튼을 한번 클릭하는데 요청은 두개가 감
// preflight, fetch가 있음
// preflight는 먼저 서버한테 뭔가 보낼거라고 미리 얘기하고, fetch가 진짜 보낸거임
