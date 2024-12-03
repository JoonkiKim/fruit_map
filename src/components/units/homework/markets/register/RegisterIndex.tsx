import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import _ from "lodash";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { v4 as uuidv4 } from "uuid";

import * as yup from "yup";
// import { useRouter } from "next/router";
import {
  AdressCaption,
  AdressInput,
  AdressInputWrapper,
  AdressWrapper,
  ErMes,
  FirstLineWrapper,
  ImageWrapper,
  InputNumberInput,
  InputTxtCaption,
  InputTxtInput,
  InputTxtWrapper,
  LocationWrapper,
  MainSettingCaption,
  MainSettingInput,
  MainSettingWrapper,
  MapWrapper,
  MarketWrapper,
  ModalAlert,
  MsButtonWrapper,
  MsWrapper,
  PictureCaption,
  PictureInputWrapper,
  PostCodeInput,
  PostSearchButton,
  RegisterButton,
  Title,
} from "./Register.style";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemArgs,
  IMutationUpdateUseditemArgs,
  IQuery,
  IUpdateUseditemInput,
} from "../../../../../commons/types/generated/types";
import { CREATE_USEDITEM, UPDATE_USEDITEM } from "./Register.queries";
import { useRouter } from "next/router";
import Uploads01 from "../../../../commons/imageUpload/Upload01.container";
import { wrapFormAsync } from "../../../../../commons/libraries/asyncFunc";
import dynamic from "next/dynamic";
import { Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

declare const window: typeof globalThis & {
  kakao: any;
};

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const schema = yup.object({
  name: yup.string().required("상품명은 필수입력입니다."),

  remarks: yup
    .string()
    .min(1, "최소 1글자 이상 입력해주세요")
    .max(100, "최대 100글자로 입력해주세요")
    .required("한줄요약은 필수 입력입니다. "),

  contents: yup
    .string()
    .min(1, "최소 1글자 이상 입력해주세요")
    .max(500, "최대 100글자로 입력해주세요")
    .required("상품설명은 필수 입력입니다. "),

  price: yup
    .number()
    .min(1, "1원 이상 입력해주세요")
    .required("가격은 필수 입력입니다. "),

  tags: yup
    .string()
    .test(
      "includes-hash",
      "해시태그에는 #이 포함되어야 합니다.",
      (value) => value && value.includes("#"),
    )
    .required("이 필드는 필수입니다."),

  useditemAddress: yup.string(),

  useditemAddressDetail: yup.string().required("상세 주소 입력은 필수입니다"),

  fileUrls: yup
    .array()
    .test(
      "isImageUploaded",
      "이미지는 필수 업로드 항목입니다.",
      (value) => value && value.some((url) => url),
    ),
});

type IFormData = yup.InferType<typeof schema>;

interface IRegisterProps {
  isEdit?: boolean;
  isActive?: boolean;
  dataDefault?: Pick<IQuery, "fetchUseditem">;
}

export default function MarketItemRegisterIndexPage(props: IRegisterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

  const [lat, setLat] = useState<number | null>(37.564214);
  const [lng, setLng] = useState<number | null>(127.001699);
  const [addressData, setAddressData] = useState<Address | undefined>();

  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [, setTags] = useState([]);
  const [modalMessage, setModalMessage] = useState("");

  const [creatUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USEDITEM);

  const [updateUseditem] = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USEDITEM);

  const router = useRouter();

  const { register, handleSubmit, formState, setValue, trigger } =
    useForm<IFormData>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });
  // 수정하기 페이지에서 변경 사항을 확인하기 위한 초기값 상태 관리
  const [initialValues, setInitialValues] = useState({
    name: "",
    remarks: "",
    contents: "",
    price: 0,
    tags: [],
    fileUrls: [],
    useditemAddress: "",
    useditemAddressDetail: "",
    lat: 0,
    lng: 0,
  });

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data);
    setAddressData(data);
    onToggleModal();

    // 카카오 지도 스크립트 추가
    const script = document.createElement("script");
    script.src = script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 위도, 경도 검색
        geocoder.addressSearch(data.address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const latresult = result[0].y; // 위도
            const lngresult = result[0].x; // 경도

            setLat(latresult);
            setLng(lngresult);

            // 지도에 마커 표시
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(latresult, lngresult), // 위도, 경도 중심 설정
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            // 마커 설정
            const markerPosition = new window.kakao.maps.LatLng(
              latresult,
              lngresult,
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map); // 마커 지도에 표시

            console.log("지도와 마커가 표시되었습니다.");
          } else {
            console.error("주소 검색 결과를 찾을 수 없습니다.");
          }
        });
      });
    };
  };

  useEffect(() => {
    if (props.dataDefault) {
      setValue("name", props.dataDefault?.fetchUseditem.name || "");
      setValue("remarks", props.dataDefault?.fetchUseditem.remarks || "");
      setValue("contents", props.dataDefault?.fetchUseditem.contents || "");
      setValue("price", props.dataDefault?.fetchUseditem.price || 0);

      const tagsString = props.dataDefault?.fetchUseditem.tags?.join(" ") || "";
      setValue("fileUrls", props.dataDefault?.fetchUseditem.images || []);
      setValue("tags", tagsString);
      setValue(
        "useditemAddress",
        props.dataDefault?.fetchUseditem.useditemAddress.address || "",
      );
      setValue(
        "useditemAddressDetail",
        props.dataDefault?.fetchUseditem.useditemAddress.addressDetail || "",
      );

      setLat(props.dataDefault?.fetchUseditem.useditemAddress.lat);

      setLng(props.dataDefault?.fetchUseditem.useditemAddress.lng);

      if (props.isEdit) {
        setInitialValues({
          name: props.dataDefault?.fetchUseditem.name || "",
          remarks: props.dataDefault?.fetchUseditem.remarks || "",
          contents: props.dataDefault?.fetchUseditem.contents || "",
          price: props.dataDefault?.fetchUseditem.price || 0,
          tags: props.dataDefault?.fetchUseditem.tags || [], // 태그를 배열로 설정
          fileUrls: props.dataDefault?.fetchUseditem.images || [],
          useditemAddress:
            props.dataDefault?.fetchUseditem.useditemAddress.address?.trim() ||
            "",
          useditemAddressDetail:
            props.dataDefault?.fetchUseditem.useditemAddress.addressDetail?.trim() ||
            "",

          lat: props.dataDefault?.fetchUseditem.useditemAddress.lat, // 초기값 추가
          lng: props.dataDefault?.fetchUseditem.useditemAddress.lng,
        });

        console.log(props.dataDefault?.fetchUseditem.useditemAddress);
      }
    }
  }, [props.dataDefault, setValue]);

  const handleTagsChange = (event) => {
    const input = event.target.value;
    const parsedTags = input
      .split("#")
      .filter((tag) => tag.trim() !== "") // 빈 문자열 제거
      .map((tag) => `#${tag.trim()}`); // 각 태그 앞에 # 추가

    setTags(parsedTags);
    setValue("tags", parsedTags); // 이제 배열을 사용하여 저장
  };

  const onChangeEditor = (value: string) => {
    setValue("contents", value);
    // trigger로 검증하는거임
    trigger("contents");
  };

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    console.log("폼이 제출되었습니다!");

    // if (!fileUrls) {
    //   setImgErr("이미지는 필수업로드입니다");
    // }
    try {
      const tagsArray = data.tags // data.tags는 string
        .split("#")
        .filter((tag) => tag.trim() !== "")
        .map((tag) => `#${tag.trim()}`);

      const result = await creatUseditem({
        variables: {
          createUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: tagsArray, // 배열로 변환된 tags 사용
            images: [...fileUrls],
            useditemAddress: {
              zipcode: addressData?.zonecode,
              address: addressData?.address,
              addressDetail: data.useditemAddressDetail,
              lat: Number(lat),
              lng: Number(lng),
            },
          },
        },
      });

      console.log(result);
      alert("상품등록이 완료되었습니다!");
      router.push(`/mypage`);
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message); // 에러 메시지만 모달로 표시
        setIsModalAlertOpen(true); // 에러가 발생한 경우에만 모달을 연다
      }
    }
  };

  const onClickUpdate = async (data: IFormData): Promise<void> => {
    const tagsArray = data.tags // data.tags는 string
      .split("#")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => `#${tag.trim()}`);

    const isNameChanged = data.name !== initialValues.name;
    const isRemarksChanged = data.remarks !== initialValues.remarks;
    const isContentsChanged = data.contents !== initialValues.contents;
    const isPriceChanged = data.price !== initialValues.price;

    // 태그 비교: 공백 제거 후 정렬하여 비교
    const sortedTagsArray = tagsArray.map((tag) => tag.trim()).sort();
    const sortedInitialTags = initialValues.tags
      .map((tag) => tag.trim())
      .sort();
    const isTagsChanged = !_.isEqual(sortedTagsArray, sortedInitialTags);

    // 파일 URL 비교: _.isEqual 사용
    const isFileUrlsChanged = !_.isEqual(fileUrls, initialValues.fileUrls);

    // 주소 변경 여부 비교: 초기값이 올바르게 설정되었는지 확인

    const isAdressChanged =
      addressData?.address && // addressData가 존재할 때만 비교
      addressData?.address?.trim() !== initialValues.useditemAddress.trim();

    const isAdressDetailChanged =
      data.useditemAddressDetail !== initialValues.useditemAddressDetail;

    console.log(isAdressChanged);
    const isLatChanged =
      lat !== props.dataDefault?.fetchUseditem.useditemAddress.lat;
    const isLngChanged =
      lng !== props.dataDefault?.fetchUseditem.useditemAddress.lng;
    // 수정 사항이 없으면 경고 메시지 출력
    if (
      !isNameChanged &&
      !isRemarksChanged &&
      !isContentsChanged &&
      !isPriceChanged &&
      !isTagsChanged &&
      !isFileUrlsChanged &&
      !isAdressChanged &&
      !isAdressDetailChanged &&
      !isLatChanged &&
      !isLngChanged
    ) {
      alert("수정된 사항이 없습니다.");
      return;
    }

    const updateUseditemInput: IUpdateUseditemInput = {};

    if (isAdressChanged || isAdressDetailChanged) {
      updateUseditemInput.useditemAddress = {};
      if (isAdressChanged) {
        updateUseditemInput.useditemAddress.zipcode = addressData?.zonecode;
        updateUseditemInput.useditemAddress.address = addressData?.address;

        updateUseditemInput.useditemAddress.lat = Number(lat);

        updateUseditemInput.useditemAddress.lng = Number(lng);
      }
      if (isAdressDetailChanged) {
        updateUseditemInput.useditemAddress.addressDetail =
          data.useditemAddressDetail;
      }
    }

    if (isNameChanged) updateUseditemInput.name = data.name;
    if (isRemarksChanged) updateUseditemInput.remarks = data.remarks;
    if (isContentsChanged) updateUseditemInput.contents = data.contents;
    if (isPriceChanged) updateUseditemInput.price = data.price;
    if (isTagsChanged) updateUseditemInput.tags = tagsArray;
    if (isFileUrlsChanged) {
      updateUseditemInput.images = fileUrls;
    }

    try {
      const result = await updateUseditem({
        variables: {
          updateUseditemInput,
          useditemId: String(router.query.useditemId),
        },
      });

      console.log(result.data.updateUseditem);
      alert("수정이 완료되었습니다!");
      router.push(`/boards/market`);
    } catch (error) {
      if (error instanceof Error) {
        setModalMessage(error.message); // 에러 메시지만 모달로 표시
        setIsModalAlertOpen(true); // 에러가 발생한 경우에만 모달을 연다
      }
    }
  };

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
    setValue("fileUrls", newFileUrls);
  };

  // ** 수정하기 페이지에서 이미지 defaultValue하는 법
  // 이렇게 다시 나아중에 그려주기만 하면 된다...! 겁나 편하다
  // 이미 담겨있는 이미지가 있는 상태에서 그게 있는지 확인하고, 있으면 기존 이미지를 그려주고 없으면 멈추고 다른 데이터를 기다린다
  useEffect(() => {
    const images = props.dataDefault?.fetchUseditem.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.dataDefault]);

  useEffect(() => {
    // loadMapdata();
    // 페이지 로드 시 기본 지도를 표시하는 로직
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1959f4231719c25f68b4c5b5443d7c37&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const storedData = localStorage.getItem("useditem");
        const parsedStoredData = storedData ? JSON.parse(storedData) : null;

        const latitude = props.dataDefault?.fetchUseditem
          ? props.dataDefault.fetchUseditem.useditemAddress.lat
          : parsedStoredData?.useditemAddress?.lat || lat;

        const longitude = props.dataDefault?.fetchUseditem
          ? props.dataDefault.fetchUseditem.useditemAddress.lng
          : parsedStoredData?.useditemAddress?.lng || lng;

        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude), // 기본 좌표
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 기본 마커 설정
        const markerPosition = new window.kakao.maps.LatLng(
          props.dataDefault?.fetchUseditem
            ? props.dataDefault?.fetchUseditem.useditemAddress.lat
            : lat,
          props.dataDefault?.fetchUseditem
            ? props.dataDefault?.fetchUseditem.useditemAddress.lng
            : lng,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map); // 마커를 지도에 표시
      });
    };
  }, [props.dataDefault]);

  // 다른 페이지로 이동 시 useditemData로컬스토리지 무조건 삭제
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem("useditemData");
  //   };

  return (
    <>
      <form
        onSubmit={wrapFormAsync(
          handleSubmit(props.isEdit ? onClickUpdate : onClickSubmit),
        )}
      >
        <MarketWrapper>
          <Title>상품 {props.isEdit ? "수정" : "등록"}하기</Title>

          <InputTxtWrapper>
            <InputTxtCaption>상품명</InputTxtCaption>
            <InputTxtInput
              type="text"
              placeholder="상품명을 적어주세요."
              {...register("name")}
            ></InputTxtInput>
            <ErMes>{formState.errors.name?.message}</ErMes>
          </InputTxtWrapper>

          <InputTxtWrapper>
            <InputTxtCaption>한줄 요약</InputTxtCaption>
            <InputTxtInput
              type="text"
              placeholder="한줄 요약을 적어주세요."
              {...register("remarks")}
            ></InputTxtInput>
            <ErMes>{formState.errors.remarks?.message}</ErMes>
          </InputTxtWrapper>

          <InputTxtWrapper>
            <InputTxtCaption>상품 설명</InputTxtCaption>

            <ReactQuill
              defaultValue={props.dataDefault?.fetchUseditem.contents}
              onChange={onChangeEditor}
              placeholder="상품 설명을 입력하세요."
            />

            <ErMes>{formState.errors.contents?.message}</ErMes>
          </InputTxtWrapper>

          <InputTxtWrapper>
            <InputTxtCaption>판매 가격</InputTxtCaption>
            <InputNumberInput
              type="number"
              placeholder="상품 가격을 적어주세요.(숫자만 적어주세요)"
              {...register("price")}
            ></InputNumberInput>
            <ErMes>{formState.errors.price?.message}</ErMes>
          </InputTxtWrapper>

          <PictureInputWrapper>
            <PictureCaption>사진 첨부</PictureCaption>
            <ImageWrapper>
              {/* 이미지 업로드 컴포넌트 3개 */}
              {fileUrls.map((el, index) => (
                <Uploads01
                  key={uuidv4()}
                  index={index}
                  fileUrl={el}
                  onChangeFileUrls={onChangeFileUrls}
                />
              ))}
            </ImageWrapper>

            <ErMes>{formState.errors.fileUrls?.message}</ErMes>
          </PictureInputWrapper>

          <MainSettingWrapper>
            <MainSettingCaption>메인 사진 설정</MainSettingCaption>
            <MsButtonWrapper>
              <MsWrapper>
                <MainSettingInput
                  // 라디오 버튼도 onChange로 제어한다!!
                  type="radio"
                  name="media"
                  value="image1"
                ></MainSettingInput>
                사진 1
              </MsWrapper>
              <MsWrapper>
                <MainSettingInput
                  type="radio"
                  name="media"
                  value="image2"
                ></MainSettingInput>
                사진 2
              </MsWrapper>
              <MsWrapper>
                <MainSettingInput
                  type="radio"
                  name="media"
                  value="image3"
                ></MainSettingInput>
                사진 3
              </MsWrapper>
            </MsButtonWrapper>
          </MainSettingWrapper>

          <InputTxtWrapper>
            <InputTxtCaption>태그입력</InputTxtCaption>
            <InputTxtInput
              type="text"
              placeholder="#태그를 입력해주세요."
              onChange={handleTagsChange} // 입력값이 변경될 때마다 handleChange 호출
              {...register("tags")}

              // react-hook-form에 의한 태그 등록
            ></InputTxtInput>

            <ErMes>{formState.errors.tags?.message}</ErMes>
          </InputTxtWrapper>

          <LocationWrapper>
            <MapWrapper>
              <div id="map" style={{ width: 500, height: 300 }}></div>;
            </MapWrapper>

            <AdressWrapper>
              <AdressCaption>주소</AdressCaption>
              <FirstLineWrapper>
                <PostCodeInput
                  type="text"
                  placeholder="07250"
                  readOnly
                  value={
                    addressData?.zonecode ||
                    props.dataDefault?.fetchUseditem.useditemAddress?.zipcode ||
                    ""
                  }
                ></PostCodeInput>

                <PostSearchButton onClick={onToggleModal} type="button">
                  주소 검색
                </PostSearchButton>
                {isOpen && (
                  <Modal
                    open={true}
                    onOk={onToggleModal}
                    onCancel={onToggleModal}
                  >
                    <DaumPostcodeEmbed onComplete={handleComplete} />
                  </Modal>
                )}
              </FirstLineWrapper>
              <AdressInputWrapper>
                <AdressInput
                  type="text"
                  readOnly
                  value={
                    addressData?.address ||
                    props.dataDefault?.fetchUseditem.useditemAddress?.address ||
                    ""
                  }
                  {...register("useditemAddress")}
                ></AdressInput>
              </AdressInputWrapper>
              <AdressInputWrapper>
                <AdressInput
                  type="text"
                  {...register("useditemAddressDetail")}
                ></AdressInput>
              </AdressInputWrapper>

              <ErMes>{formState.errors.useditemAddressDetail?.message}</ErMes>
            </AdressWrapper>
          </LocationWrapper>

          <RegisterButton
            isActive={
              props.isEdit ? true : formState.isValid && fileUrls.length > 0
            }
            style={{
              backgroundColor:
                props.isEdit || (formState.isValid && fileUrls.length > 0)
                  ? "yellow"
                  : "gray",
            }}
            type="submit"
          >
            {props.isEdit ? "수정" : "등록"}하기
          </RegisterButton>
          <ModalAlert
            open={isModalAlertOpen}
            onClose={onToggleAlertModal}
            onOk={onToggleAlertModal}
            onCancel={onToggleAlertModal}
          >
            <span>{modalMessage}</span>
          </ModalAlert>
        </MarketWrapper>
      </form>
    </>
  );
}
