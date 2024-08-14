import { ChangeEvent, MouseEvent } from "react";

export interface IBoardWriteProps {
  isEdit: Boolean;
  data?: any;
  // edit에서는 data가 필요하고, new에서는 안필요하니까 data에 ?를 넣어준다
}
// false값이 넘어가는게 아니라, isEdit라는게 넘어가기 때문에 객체로 넘겨줘야 한다

export interface IMyvariables {
  number: number;
  writer?: string;
  title?: string;
  contents?: string;
  // 처음에는 number만 들어가니까 나머지 세개는 ?를 넣어줘야됨
}

export interface IBoardWriteUIProps {
  onClickSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdate: (event: MouseEvent<HTMLButtonElement>) => void;
  onChageWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChageTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChageContents: (event: ChangeEvent<HTMLInputElement>) => void;
  isEdit: Boolean;
  data?: any;
}
