import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import {
  CREAT_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
  DELETE_BOARD_COMMENT,
} from "./BoardComment.queries";

import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationDeleteBoardCommentArgs,
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";

import { useState, ChangeEvent } from "react";
import { BoardCommentUI } from "./BoardComment.presenter";

export default function BoardComment() {
  // <입력값 리팩토링>
  const [inputs, setInputs] = useState({
    writer: "",
    password: "",
    contents: "",
  });
  // const [writer, setWriter] = useState("");
  // const [password, setPw] = useState("");
  // const [content, setContent] = useState("");
  const [rating, setRating] = useState<number>(0);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [deletePw, setDeletePw] = useState<string>();
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // if (!router || typeof router.query.boardId !== "string") {
  //   return <></>; // 훅 호출을 막기 위해 빈 상태를 반환합니다.
  // }

  const { data: list, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });
  console.log(list);

  // id를 연결하는 query를 할때는 useQuery안에 id를 같이 넣어줘야 한다

  const onChageInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };
  const onChageInputsTxt = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };
  // function onChangeWriter(event: ChangeEvent<HTMLInputElement>) {
  //   setWriter(event.target.value);
  // }

  // function onChangePw(event: ChangeEvent<HTMLInputElement>) {
  //   setPw(event.target.value);
  // }

  // function onChangeContent(event: ChangeEvent<HTMLInputElement>) {
  //   setContent(event.target.value);
  // }

  function onChangeRating(value: number) {
    setRating(value);
  }
  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const onChangeDeletePw = (event: ChangeEvent<HTMLInputElement>) => {
    setDeletePw(event.target.value);
  };

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

    if (inputs.writer && inputs.password && inputs.contents && rating) {
      try {
        const result = await createBoardComment({
          //
          variables: {
            createBoardCommentInput: {
              ...inputs,
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
        console.log(result);
        setInputs({ writer: "", password: "", contents: "" });
        setRating(0);
      } catch (error) {
        if (error instanceof Error) setModalMessage(error.message);
        onToggleAlertModal();
      }
    }
  };

  const onClickDelete = async (id: string) => {
    try {
      // 아래에서 event.target.id 에 빨간줄 뜨는 문제는 event.target이 태그임을 선언해주는 코드로 해결할 수 있다

      await deleteBoardComment({
        variables: {
          boardCommentId: id,

          password: deletePw,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: String(router.query.boardId) },
            // 얘도 boardId링크를 해줘야 되는 거였음
          },
        ],
      });
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) setModalMessage(error.message);
      onToggleAlertModal();
    }
  };

  const onLoadMore = (): void => {
    if (list === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((list.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      // 위의 수식은 기존 페이지 + 1을 만드는 코드
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments === undefined) {
          // fetchMoreResult.fetchBoards가 없으면 기존 댓글을 불러오고, 있으면 뒤에거 더해서 fetchMore를 해줘라
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
        }

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
          // ... 스프레드 연산자 써주는거 까먹지 말기!
          // fetchBoards에 배열로 되어있는 댓글 목록들을 복사해주기 위해 스프레드 연산자가 필요한거임
        };
      },
    });
  };

  //   console.log(list);
  return (
    <div>
      <BoardCommentUI
        list={list}
        onChageInputs={onChageInputs}
        onChageInputsTxt={onChageInputsTxt}
        onChangeRating={onChangeRating}
        onSubmit={onSubmit}
        onClickDelete={onClickDelete}
        onChangeDeletePw={onChangeDeletePw}
        isOpen={isOpen}
        onToggleModal={onToggleModal}
        inputs={inputs}
        rating={rating}
        isModalAlertOpen={isModalAlertOpen}
        onToggleAlertModal={onToggleAlertModal}
        modalMessage={modalMessage}
        onLoadMore={onLoadMore}
      />
    </div>
  );
}
