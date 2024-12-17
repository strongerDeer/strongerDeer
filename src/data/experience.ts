import { BookMarked, LeafyGreen, Mic2, Tent } from "lucide-react";

export const EXPERIENCES = [
  {
    id: 1,
    thumb: "/thumb_camp.jpg",
    icon: Tent,
    title: "부트캠프 강사",

    contents: [
      {
        text: "<strong>멋쟁이 사자처럼 프론트엔드 스쿨</strong> HTML/CSS 강의",
        lists: [
          "5, 7기 HTML/CSS 메인 강의(2023.02~11)",
          "3, 4기 HTML/CSS 특강(2022.10.07, 12.26)",
          "3기 멘토(2022.08-2023-01)",
          "2, 4기 선배 특강 (2022.04.08)", //<라떼는 말이야>, 부트캠프 빠르게 망하는 10가지 방법>
        ],
      },
      {
        text: "<strong>이스트소프트 오르미 백엔드 스쿨</strong> 1, 3기 HTML/CSS 강의",
      },
    ],
  },

  {
    id: 2,
    thumb: "/thumb_inflearn.jpg",
    icon: LeafyGreen,
    title: "인프런 온라인 강의",

    contents: [
      {
        text: "<strong>아는 만큼 보이는 크롬 개발자 도구</strong>(2023.06)",
        lists: [
          "프론트엔드 개발자가 알아야 할 크롬 개발자 도구의 기본적인 기능과 실무에 활용할 수 있는 팁을 담은 강의",
          "<strong>수강생 2,449명</strong> / <strong>평점 4.9</strong> (2024년 12월 기준)",
        ],
      },
    ],

    link: { url: "https://inf.run/FQsL", text: "강의 링크" },
  },

  {
    id: 3,
    thumb: "/thumb_book.jpg",
    icon: BookMarked,
    title: "전자책 출판",

    contents: [
      {
        text: "<strong>알아서 잘 딱 깔끔하고 센스있게 정리하는 GitHub 핵심 개념</strong>(2022.03)",
        lists: [
          "멋쟁이사자처럼 프론트엔드 스쿨 강사, 멘토, 수강생 16명이 함께한 프로젝트",
        ],
      },
    ],

    link: {
      url: "https://ridibooks.com/books/2773000054",
      text: "전자책 링크",
    },
  },
  {
    id: 4,
    thumb: "/img.jpg",
    icon: Mic2,
    title: "특강",

    contents: [
      {
        text: "<strong>제주 패스파인더</strong> 전지적 주니어 시점 <디자이너에서 개발자로>(2024.07.26)",
      },
      {
        text: "<strong>제주대학교</strong> 계절학기 수업 <취업 멘토링>(2023.06.26)",
      },
      {
        text: "<strong>제주 오현고등학교</strong> HTML/CSS <나의 좌우명 꾸미기>(2022.06.10)",
      },
      {
        text: "<strong>멋쟁이사자처럼</strong> 앱스쿨 특강 <2022 최강 부트캠프 그 전설의 시작: 그걸 내가 써본다>(2022.09.27)",
      },
    ],
  },
];
