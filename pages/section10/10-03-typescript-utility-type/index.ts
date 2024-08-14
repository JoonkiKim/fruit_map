// <유틸리티 타입>

export interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입
// 기존의 타입에 모두 ?를 붙여준다 (모두다 있어도되고 없어도되는 타입으로 바꿔준다)
type aaa = Partial<IProfile>;

// 2. Required 타입
// 기존의 타입을 모두 필수로 만들어준다 (모든 ?를 삭제해준다)
type bbb = Required<IProfile>;

// 3. Pick 타입
// 쓸거만 골라서 쓰게 해준다
type ccc = Pick<IProfile, "name" | "age">;

// 4. omit 타입
// 필요없는거 빼준다
type ddd = Omit<IProfile, "school">;

// 5. Record
type eee = "철수" | "영희" | "훈이"; // 이건 Union타입 , 이 안에 들어갈 수 있는건 철수 영희 훈이 밖에 없음!
let child1: eee = "철수";
let child2: string = "사과"; // 철수 영희 훈이 사과 바나나 등등 문자는 다됨

type fff = Record<eee, IProfile>; // 이게 Record 타입인데, eee타입의 철수영희훈이가 키값이 되고 그것의 밸류가 IProfile이 되고 그안에서  name age school 지정이 가능해진다

// 6. 객체의 Key들로 Union 타입 만들기
// Union타입 응용
type ggg = keyof IProfile; // keyof 는 키값만 뽑아내는것 // "name" | "age" | "school" | "hobby"가 추출됨
let myprofile: ggg = "hobby"; // ggg타입으로 설정했으니까 myprofile에는 "name" | "age" | "school" | "hobby" 값만 입력 가능!

// 7. type과 interface의 차이 => 선언 병합 여부
export interface IProfile {
  candy: number;
  // 이렇게 하면 선언병합으로 기존의 타입들에 candy가 추가됨
}
// interface는 선언병합 가능, type은 선언병합 불가능

// 8. 배운거 응용
// Partial을 해주면 전부다 ?가 붙으니까 내가 넣고 싶은것만 넣어줄 수 있다
let profile: Partial<IProfile> = {
  candy: 10,
};
