import { HeartOutlined, HeartFilled } from "@ant-design/icons";

import {
  Wrapper,
  SecWrapper,
  BtnWrapper,
  HeaderWrapper,
  ContentWrapper,
  PicWrapper,
  ProfWrapper,
  Avatar,
  WriterName,
  CreatedTime,
  ContentTitle,
  ContentReal,
  ToList,
  ToFix,
  TTWrapper,
  PinTip,
  LikeButton,
  MapWrapper,
  ToBuy,
  Img3Wrapper,
  LikeButtonWrapper,
} from "./UseditemDetail.style";
import React, { memo, useEffect, useState } from "react";
import { formatDate } from "../../../../../commons/libraries/utils";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
  IQueryFetchUseditemsIPickedArgs,
} from "../../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";
import Head from "next/head";

import { Button } from "antd";
import { useMoveToPage } from "../../../../commons/hooks/useMoveToPage";

import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";

declare const window: typeof globalThis & {
  kakao: any;
  IMP: any;
};

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      createdAt
      useditemAddress {
        _id
        lat
        lng
        createdAt
        updatedAt
      }
      seller {
        _id
        email
        name
        createdAt
        updatedAt
      }
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount

        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_BUY_AND_SELL = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;

// ModalBuy를 다이내믹 임포트
const ModalBuy = dynamic(
  () => import("./UseditemDetail.style").then((mod) => mod.ModalBuy),
  {
    ssr: false,
  }
);

const ModalAlert = dynamic(
  () => import("./UseditemDetail.style").then((mod) => mod.ModalAlert),
  {
    ssr: false, // 서버 사이드 렌더링에서 제외
  }
);

const TOGGLE_USEDITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

const FETCH_IPICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
    }
  }
`;

function UseditemDetail(props: any) {
  // console.log("위쪽 리렌더");

  const router = useRouter();

  const { data: pickData } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_IPICKED, {
    variables: { page: 1, search: "" },
    fetchPolicy: "cache-and-network",
  });

  // console.log(
  //   "내가 찜한건 아래와 같음" + JSON.stringify(pickData?.fetchUseditemsIPicked),
  // );

  const { data: creditData } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const [useditemData, setUseditemData] = useState(() => {
    // 클라이언트 환경일 때만 localStorage에 접근
    if (typeof window !== "undefined") {
      // 로컬스토리지에서 데이터 가져오기
      const savedData = localStorage.getItem("useditemData");
      return savedData ? JSON.parse(savedData) : []; // 수정된 부분: 배열 형태로 초기화
    }
    return [];
  });

  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USEDITEM, {
    variables: {
      useditemId: String(router.query.useditemId),
    },
    fetchPolicy: "cache-first",
    onCompleted: (fetchedData) => {
      if (fetchedData && creditData?.fetchUserLoggedIn) {
        setUseditemData((prevData) => {
          const isItemAlreadySaved = prevData.some(
            (item) => item._id === fetchedData.fetchUseditem._id
          );

          if (!isItemAlreadySaved) {
            const updatedData = [
              ...prevData,
              {
                ...fetchedData.fetchUseditem,
                // user칸에 _id와 email을 저장
                user: {
                  _id: creditData.fetchUserLoggedIn._id,
                  email: creditData.fetchUserLoggedIn.email,
                },
              },
            ];
            localStorage.setItem("useditemData", JSON.stringify(updatedData));
            return updatedData;
          }

          return prevData;
        });
      }
    },
  });

  const [toggleUseditemPick] = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USEDITEM_PICK);

  const sellerId = data?.fetchUseditem.seller._id;
  const userId = creditData?.fetchUserLoggedIn._id;

  const myUseditem = sellerId === userId;

  const [modalMessage, setModalMessage] = useState("");
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  const [isModalBuyOpen, setIsModalBuyOpen] = useState(false);
  const useditemId = String(router.query.useditemId);
  const [liked, setLiked] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const { onClickMoveToPage } = useMoveToPage();
  const [createBuyAndSell] =
    useMutation<Pick<IMutation, "createPointTransactionOfBuyingAndSelling">>(
      CREATE_BUY_AND_SELL
    );

  // const handleLike = () => {

  // };

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  useEffect(() => {
    // Check if any of the picked items' _id matches the current useditemId
    const isLiked = pickData?.fetchUseditemsIPicked.some(
      (item) => item._id === useditemId
    );
    if (isLiked) {
      setLiked(true);
    }
  }, [pickData]);

  //   // <dynamic import 활용>
  //   // Modal같은건 버튼을 클릭할때만 사용하게 되는데, 버튼을 안 클릭하는 유저가 있을 수도 있음, 이럴때도 모달을 import해오면 비용 낭비임 -> dynamic import를 통해 Modal을 다운로드하면 좋겠지?
  //   const { Modal } = await import("antd"); // 이런걸 code-spiliting 이라고 부름
  //   Modal.success({ content: "게시글 등록에 성공했습니다" });

  const onToggleBuyModal = async () => {
    setIsModalBuyOpen((prev) => !prev);
  };

  // console.log(ModalBuy + "코드 스플리팅");

  const moveToEdit = () => {
    router.push(`/boards/market/${router.query.useditemId}/edit`);
  };

  const moveToList = () => {
    try {
      router.push(`/boards/market`);
      // 도착하는 페이지에서 불러오기를 할게 없다면 따로 뭔가 설정을 할 필요는 없다!
    } catch (error) {
      if (error instanceof Error) setModalMessage(error.message);
      onToggleAlertModal();
    }
  };

  const onClickBuyAndSell = async () => {
    try {
      const result = await createBuyAndSell({
        variables: {
          useritemId: data?.fetchUseditem._id,
        },
      });
      console.log(result.data);

      alert("구매 성공");
      onToggleBuyModal();
      router.push("/mypage/");
    } catch {
      alert("구매 실패");
    }
  };

  // 원본코드

  useEffect(() => {
    const backupstorageData = useditemData.find(
      (item) => item._id === router.query.useditemId
    );

    // Link태그로 연결되었을때 지도를 받아오는 방법
    const script = document.createElement("script"); // 이렇게 하면 <script></script> 이게 생김
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";
    // 요청할때 쓰는 ? 는 쿼리 스트링이라고 부르고, 두개를 연결해줄때는 & 를 쓴다
    // https:// 도 꼭 써주기
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        setIsScriptLoaded(true);
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(
            data?.fetchUseditem.useditemAddress?.lat ||
              backupstorageData?.useditemAddress?.lat ||
              "",
            data?.fetchUseditem.useditemAddress?.lng ||
              backupstorageData?.useditemAddress?.lng ||
              ""
          ),
          level: 3,
        };

        // 마커 등을 추가하기 위해 map변수에 담아준다
        const map = new window.kakao.maps.Map(container, options);

        // 마커 포지션 코드
        const markerPosition = new window.kakao.maps.LatLng(
          data?.fetchUseditem.useditemAddress?.lat ||
            backupstorageData?.useditemAddress?.lat ||
            "",
          data?.fetchUseditem.useditemAddress?.lng ||
            backupstorageData?.useditemAddress?.lng ||
            ""
        );

        // console.log(data?.fetchUseditem.pickedCount);
        // 마커 생성 코드
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
        // console.log(map);
      });
    };

    // // 3) 다른 페이지로 이동할 때 로컬스토리지 데이터 삭제
    // const handleRouteChange = (url) => {
    //   // 이동하려는 페이지의 useditemId 추출
    //   const currentUseditemId = router.query.useditemId; // 현재 페이지의 useditemId
    //   const newUrlUseditemId = url.split("/")[3]; // 이동하려는 URL의 useditemId (3번째 부분이 해당 ID)

    //   // 현재 페이지의 useditemId와 이동하려는 페이지의 useditemId가 다르면 로컬 스토리지 삭제
    //   if (currentUseditemId !== newUrlUseditemId) {
    //     localStorage.removeItem("useditemData");
    //   }
    // };

    // // 페이지 이동을 감지하고 handleRouteChange 호출
    // router.events.on("routeChangeStart", handleRouteChange);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {};
  }, [data, useditemData]);

  // 좋아요 토클 코드
  const onToggelPick = () => {
    const updatedPickedCount =
      liked === true
        ? data?.fetchUseditem.pickedCount - 1
        : data?.fetchUseditem.pickedCount + 1;

    toggleUseditemPick({
      variables: {
        useditemId: String(router.query.useditemId),
      },

      optimisticResponse: {
        // 여기 왼쪽에는 위의 toggleUseditemPick같은 함수이름을 넣어주는거다
        toggleUseditemPick: updatedPickedCount,
      },

      // 좋아요 요청이 들어갔을때 1) 리페치를 할수도 있고, 2) 캐시 직접수정을 할 수도 있다. 여기서는 캐시 수정방식을 해보자
      // 1) 리페치 방법
      // refetchQueries:[{}]
      // 2) 캐시 수정 방법
      update: (cache, { data }) => {
        // 기존 fetchUseditem값을 불러오기 + 타입 정의해주기
        const existingData: Pick<IQuery, "fetchUseditem"> | null =
          cache.readQuery({
            query: FETCH_USEDITEM,
            variables: { useditemId: String(router.query.useditemId) },
          });

        // 기존 fetchUseditem데이터는 스프레드 연산자로 그냥 보내주고, pickCount만 수정해주기
        if (existingData) {
          cache.writeQuery({
            query: FETCH_USEDITEM,
            variables: { useditemId: String(router.query.useditemId) },
            data: {
              fetchUseditem: {
                ...existingData?.fetchUseditem,
                _id: String(router.query.useditemId),
                __typename: "Useditem",
                pickedCount: data?.toggleUseditemPick,
                // isLiked: !liked,
              },
            },
          });
        }
      },
    });

    setLiked((prev) => !prev);
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services"
          as="script"
        />
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>
        {/* 
        <meta property="og:title" content={props.qqq?.name} />
        <meta property="og:description" content={props?.qqq?.remarks} />
        <meta property="og:image" content={props?.qqq?.images?.[0]} /> */}
      </Head>

      <Wrapper>
        <SecWrapper>
          <HeaderWrapper>
            <PicWrapper>
              <Avatar src="/images/avatar.png" />
            </PicWrapper>
            <ProfWrapper>
              <WriterName>{data?.fetchUseditem?.name}</WriterName>
              {/* 밖에서 query로 되어있는 data 받아올때는 props만 붙여주면됨! */}
              <CreatedTime>
                {" "}
                {formatDate(data?.fetchUseditem?.createdAt)}{" "}
              </CreatedTime>
            </ProfWrapper>
            <TTWrapper>
              <PinTip src="/images/pin.png"></PinTip>
            </TTWrapper>
          </HeaderWrapper>

          <ContentWrapper>
            <ContentTitle>{data?.fetchUseditem?.remarks}</ContentTitle>

            <Img3Wrapper>
              {data?.fetchUseditem?.images.map((el) =>
                el !== "" ? (
                  <img
                    key={uuidv4()}
                    style={{
                      width: "200px",
                      height: "200px",
                      // backgroundColor: "red",
                      objectFit: "cover",
                    }}
                    src={`https://storage.googleapis.com/${el}`}
                  />
                ) : (
                  <div
                    key={uuidv4()}
                    style={{
                      width: "200px",
                      height: "200px",
                      // backgroundColor: "red",
                      objectFit: "cover",
                    }}
                  ></div>
                )
              )}
            </Img3Wrapper>
            <ContentReal>
              {typeof window !== "undefined" ? (
                <div
                  style={{ color: "gray" }}
                  dangerouslySetInnerHTML={{
                    // DOMPurify로 해킹 방지해준다!
                    __html: DOMPurify.sanitize(data?.fetchUseditem?.contents),
                  }}
                ></div>
              ) : (
                // 프리렌더링으로 인한 hydration 불가능 문제는 이렇게 색깔 넣기용 div로 해결해준다
                <div style={{ color: "gray" }} />
              )}
            </ContentReal>

            <MapWrapper>
              {isScriptLoaded ? (
                <div id="map" style={{ width: 500, height: 400 }}></div>
              ) : (
                <div style={{ width: 500, height: 400 }}></div>
              )}
            </MapWrapper>

            <LikeButtonWrapper>
              <LikeButton
                type="text"
                icon={
                  liked === true ? (
                    <HeartFilled
                      style={{
                        color: "#ffd600",
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "#ffd600",
                      }}
                    />
                  )
                }
                onClick={onToggelPick}
              ></LikeButton>
            </LikeButtonWrapper>
          </ContentWrapper>
        </SecWrapper>
        <BtnWrapper>
          <ToList onClick={moveToList}>목록으로</ToList>

          {myUseditem ? (
            <ToFix onClick={moveToEdit}>수정하기</ToFix>
          ) : (
            <ToBuy onClick={onToggleBuyModal}>구매하기</ToBuy>
          )}
        </BtnWrapper>
        {isModalBuyOpen && (
          <ModalBuy
            open={isModalBuyOpen}
            onClose={onToggleBuyModal}
            onOk={onToggleBuyModal}
            onCancel={onToggleBuyModal}
            footer={[
              <Button key="back" onClick={onToggleBuyModal}>
                취소
              </Button>,
              <Button key="submit" type="primary" onClick={onClickBuyAndSell}>
                구매하기
                {console.log("ModalBuy loaded")}
              </Button>,
              <Button
                key="link"
                type="primary"
                onClick={onClickMoveToPage("/mypage/pointCharge")}
              >
                포인트 충전하기
              </Button>,
            ]}
          >
            <span>
              {data?.fetchUseditem?.name} ({data?.fetchUseditem.price} 크레딧)
              을 구매하시겠습니까?
            </span>
            <div>
              현재 크레딧 : {creditData?.fetchUserLoggedIn.userPoint.amount}{" "}
              크레딧
            </div>
          </ModalBuy>
        )}
        {isModalAlertOpen && (
          <ModalAlert
            open={isModalAlertOpen}
            onClose={onToggleAlertModal}
            onOk={onToggleAlertModal}
            onCancel={onToggleAlertModal}
          >
            <span>{modalMessage}</span>
          </ModalAlert>
        )}
      </Wrapper>
    </>
  );
}

export default memo(UseditemDetail);

// 자식 컴포넌트는 ssr:false를 해놨기 때문에 안되는거였음!!
// 따라서 부모컴포넌트에 메타태그 og 설정했더니 잘된다!!
