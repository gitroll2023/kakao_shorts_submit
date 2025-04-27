# 카톡쇼츠 사연제보 웹앱

신앙 사연 제보를 받기 위한 모바일 최적화 웹앱입니다. 성도님들이 느끼셨던 황당했던, 재밌었던, 웃픈, 킹받는 다양한 사연들을 제보받을 수 있습니다.

## 주요 기능

- 모바일 최적화된 UI/UX
- 사연 제보 버튼 및 모달 시스템
- 동영상 미리보기 기능 (마우스 오버 시 재생)
- 반응형 디자인

## 기술 스택

- [Next.js](https://nextjs.org) - React 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전성을 위한 JavaScript 확장
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크

## 시작하기

먼저, 개발 서버를 실행하세요:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

`src/app/page.tsx`를 수정하여 페이지 편집을 시작할 수 있습니다. 파일을 편집하면 페이지가 자동으로 업데이트됩니다.

## 프로젝트 구조

```
katalk-shorts-stories/
├── public/              # 정적 파일
│   └── videos/          # 동영상 파일
├── src/
│   ├── app/             # Next.js 앱 라우터
│   │   ├── components/  # 컴포넌트
│   │   ├── globals.css  # 전역 스타일
│   │   ├── layout.tsx   # 레이아웃 컴포넌트
│   │   └── page.tsx     # 메인 페이지
│   └── ...
└── ...
```

## Vercel에 배포하기

Next.js 앱을 배포하는 가장 쉬운 방법은 Next.js의 제작자가 만든 [Vercel 플랫폼](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 사용하는 것입니다.

자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 확인하세요.
