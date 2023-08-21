# React JS - Master Class

### React를 더욱 심층적으로 구현합니다.

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>

---

- **23-08-17 : #1.0 ~ #2.2 / Styled Components(1)**
  - 패키지 : 'styled-components'
    - React 애플리케이션에서 컴포넌트 기반 스타일링을 위한 라이브러리
    - JavaScript 코드 안에서 스타일을 정의하고, 컴포넌트와 함께 사용 가능
    - 사용법
      - import구문 : import styled from "styled-components";
      - 기본형 : const 컴포넌트명 = styled.HTML태그명\`CSS코드\`;
      - props 사용
        - CSS : ${(인자명) => 인자명.prop명}
          - 인자명은 아무거나 상관없으나, 주로 'props'로 사용
        - 컴포넌트 : <컴포넌트명 prop명=prop값 />
      - 이미 만들어진 컴포넌트로부터 확장 가능
        - 기본형 : const 컴포넌트명 = styled(기존컴포넌트명)\`...\`;
    - 자동 완성 기능 'vscode-styled-components' 확장프로그램 사용
- **23-08-18 : #2.3 ~ #3.1 / Styled Components(2) & Set up TypeScript**
  - styled-components
    - 컴포넌트의 스타일은 그대로 사용하되, HTML태그만을 바꾸고 싶을 때
      - 컴포넌트에서 'as="HTML태그명"' 속성을 사용
    - 컴포넌트 생성 시 속성값을 설정할 수 있음
      - 기본형 : const 컴포넌트명 = styled.HTML태그명.attrs({속성값들})\`...\`;
      - 'attrs'도 props를 사용해 커스텀마이징 가능
    - 애니메이션
      - import문 : import { keyframes } from "styled-components";
      - 기본형 : const 변수명 = keyframes\`...\`;
      - 애니메이션 적용은 기존 CSS 방식과 동일
    - 선택자(pseudo selector)
      - 하위 선택자가 일반 HTML태그 이더라도 선택 가능 (SCSS와 구문이 비슷함)
      - 하위 선택자가 컴포넌트('as'를 사용하더라도) 사용 가능
        - '${컴포넌트명}'으로 사용
      - '&' 기호는 자기 자신을 가리킴
    - theme : 기본적으로 모든 색상들을 가지고 있는 object
      - 모든 색상들을 하나의 object 안에 넣어놨기 때문에 매우 유용함
      - 추후 색상들을 바꿀 때 해당 object만 바꿔주면 되기 때문
      - 설정법
        1. 'index'파일에서 'import { ThemeProvider } from "styled-components";'
        2. 사용할 컴포넌트를 '&lt;ThemeProvider&gt;'로 감싸주기
        3. '&lt;ThemeProvider&gt;'에 'theme' 속성 부여하기
      - 사용법
        - 'styled-components'에서 'props.theme' 객체를 이용하여 사용
        - 'theme'에서 사용한 프로퍼티명을 사용해야 함
        - 'theme' 교체 시 '&lt;ThemeProvider&gt;'의 'theme' 속성값만 교체하면 됨
  - TypeScript : JavaScript를 기반으로 한 프로그래밍 언어, compile하여 평범한 JavaScript가 됨
    - 설치법
      - 새로운 프로젝트 생성 : 'npx create-react-app 폴더명 --template typescript'
      - 기존 프로젝트에 TS 추가 : 'npm i --save typescript @types/node @types/react @types/react-dom @types/jest'
    - TS가 패키지를 알지 못할 때
      - 몇몇 패키지는 JS로 만들어졌기 때문
      - 'npm i -D @types/패키지명'을 실행해 설치
    - 'index.tsx'에서 root 코드가 error 날 시 아래의 코드로 수정 (+ as HTMLElement)
      - const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
- **23-08-21 : #3.2 ~ #**
  - 3.5 / 2:12

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
