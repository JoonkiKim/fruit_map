import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
  CREAT_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardComment.queries";
import { useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationDeleteBoardCommentArgs,
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";

import { ChangeEvent, MouseEvent } from "react";
import { BoardCommentUI } from "./BoardComment.presenter";

export default function BoardComment() {
  const [writer, setWriter] = useState("");
  const [password, setPw] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const router = useRouter();

  if (!router || typeof router.query.boardId !== "string") return <></>;

  const { data: list } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: router.query.boardId },
  });
  console.log(list);

  // id를 연결하는 query를 할때는 useQuery안에 id를 같이 넣어줘야 한다

  function onChangeWriter(event: ChangeEvent<HTMLInputElement>) {
    setWriter(event.target.value);
  }

  function onChangePw(event: ChangeEvent<HTMLInputElement>) {
    setPw(event.target.value);
  }

  function onChangeContent(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function onChangeRating(event: ChangeEvent<HTMLInputElement>) {
    setRating(event.target.value);
  }

  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREAT_BOARD_COMMENT);
  const [deleteBoardComment] = useMutation<
    Pick<IMutation, "deleteBoardComment">,
    IMutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  const onSubmit = async () => {
    // <거짓에 대하여>
    // 대부분은 참이고, 아래의 것들만 외우면 된다
    // 숫자 0, 빈문자열 "", false, null, undefined, NaN
    // 참<>거짓 바꾸는 기호는 느낌표 !

    if (writer && password && content && rating) {
      try {
        const result = await createBoardComment({
          //
          variables: {
            createBoardCommentInput: {
              writer: writer,
              contents: content,
              password: password,
              rating: Number(rating),

              // 왼쪽에 써있는 이름들은 서버에서 정의한대로 써야된다.
              // 그 내용은 플레이그라운드 docs에서 볼 수 있다
              // + 객체에서 키와 값이 동일하게 생겼으면 값이름을 생략할 수 있다 -> short-handproperty
            },
            boardId: String(router.query.boardId),
          },

          refetchQueries: [
            {
              query: FETCH_BOARD_COMMENTS,
              variables: { boardId: router.query.boardId },
            },
          ],
          // 등록하기에서 리패치를 적용하려면 boardId를 같이 적어줘야 한다!
        });

        setWriter("");
        setPw("");
        setContent("");
        setRating("");
        // 등록 후 입력칸을 빈문자열로 바꾸고 싶으면 setState로 일단 빈문자열을 만든다음에 해당 state를 아래의 태그에 연결해주면 됨 **
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const qqq = prompt("암호를 입력하세요");
    try {
      if (!(event.target instanceof HTMLButtonElement)) {
        alert("시스템에 문제가 있습니다");
        return;
      }
      // 아래에서 event.target.id 에 빨간줄 뜨는 문제는 event.target이 태그임을 선언해주는 코드로 해결할 수 있다
      deleteBoardComment({
        variables: {
          boardCommentId: event.target.id,

          password: qqq,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
            // 얘도 boardId링크를 해줘야 되는 거였음
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  //   console.log(list);
  return (
    <div>
      <BoardCommentUI
        list={list}
        onChangeWriter={onChangeWriter}
        onChangePw={onChangePw}
        onChangeContent={onChangeContent}
        onChangeRating={onChangeRating}
        onSubmit={onSubmit}
        onClickDelete={onClickDelete}
        writer={writer} // 추가된 부분
        password={password} // 추가된 부분
        content={content} // 추가된 부분
        rating={rating} // 추가된 부분
      />
    </div>
  );
}
