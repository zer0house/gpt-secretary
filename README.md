
### 'src\pages\index.tsx'
기본 구조

### 'src\components\Body\Body.tsx'
바디는 
```
import { useChattingActions, useChattingStore } from '@/core/store';
  const { pushAssistantMessage } = useChattingActions();
```
될 때 업데이트

### 'src\core\store\useChattingStore.tsx'
이건 'src\components\Input\Input.tsx'에서

'useChattingActions'이 발동되면 


'src\components\Input\Input.tsx'

  const { pushUserMessage, pushAssistantMessage, setError } = useChattingActions();


'src\components\Body\Message\Message.tsx'



# Open AI를 이용한 [저에 대해 무엇이든 물어보세요!](https://gpt-secretary.vercel.app/)

## 소개

### Open AI를 이용하여 `정재욱`에 대해 질문할 수 있는 공간입니다.
### Open AI를 stream으로 Next.js의 edge와 함께 처리하였습니다.
### 모바일화면을 기준으로 제작하였으면 `PWA`로 처리하여 다운로드하여 사용할 수 있습니다.
### 백엔드 서버 없이 next.js의 edge api를 활용해 요청을 보냅니다.
### zustand를 이용해 간단한 상태관리를 처리합니다.

<br />

## 사용한 라이브러리

### Next.js
```
npm install next

```
### Zustand
```
npm install zustand

```
### next-PWA
```
npm install next-pwa
```

<br />

## 실행
```
  yarn dev
```

<br />

### 버그나 문제가 발생한다면 [이슈](https://github.com/jaewook-jeong/gpt-secretary/issues)에 올려주세요💪🏼