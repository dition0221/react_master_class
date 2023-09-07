# React - Master Class

### React를 더욱 심층적으로 구현합니다.

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Styled&dash;Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Hook&dash;Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/>  
<img src="https://img.shields.io/badge/ApexCharts-00e396?style=flat-square"/> <img src="https://img.shields.io/badge/Recoil&dash;Persist-3578E5?style=flat-square&logoColor=white"/> <img src="https://img.shields.io/badge/@hello&dash;pangea/dnd-0BAF7C?style=flat-square&logoColor=white"/>

---

- **23-08-17 : #1.0 ~ #2.2 / Styled-Components(1)**
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
- **23-08-18 : #2.3 ~ #3.1 / Styled-Components(2) & Set up TypeScript**
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
- **23-08-21 : #3.2 ~ #4.2 / TypeScript + React-Router-V6(1)**
  - TypeScript
    - React Component
      - Component가 필요로 하는 prop을 TS에게 설명해야 함
      - interface : 객체 모양(object shape)을 TS에게 설명해주는 TS의 개념
        - 선언 기본형 : interface 인터페이스명 { ... }
        - 사용 기본형 : ':타입명'
        - 'styled-components'에서 prop을 받으려면, 타입을 선언해 주어야 함
          - 기본형 : const 컴포넌트명 = styled.HTML태그명<타입명>\`...\`;
    - 선택적(optional) props
      - '?'기호를 사용해 선택적 prop 설정 가능
      - 병합연산자 '??' : 'null' 또는 'undefined'일 때 기본값 지정 가능
    - React State
      - TS가 'useState'의 초깃값을 보고, 자동적으로 타입을 추론함
      - 가끔 2개 이상의 타입을 사용하는 경우, 직접 타입을 선언해 주어야 함
        - 기본형 : const [변수명, 함수명] = useState<타입명>(초깃값);
    - React Event
      - 'addEventListener'에 인자로 사용하는 'event'에 타입을 설명해야 함
- **23-08-22 : #5.0 ~ #5.3 / React-Router + createGlobalStyle + fetchAPI**
  - React-Router v6
    - 설정법
      1. '/src/routes' 폴더에 화면에 보여줄 컴포넌트 파일들을 생성하기
      2. '/src/Router.tsx' 라우터 파일 생성 및 설정하기
         - { BrowserRouter, Routes, Route } 등
      3. 라우터 파일을 렌더링하기
         - 'App.tsx'에서 &lt;Router /&gt;를 return하여 렌더링
    - 'useParams()' : URL 파라미터 값(object)을 받을 수 있음
    - &lt;Link&gt; : React-Router 내에서 페이지를 이동하는 태그
      - 기본형 : &lt;Link to="이동할URL"&gt;내용&lt;/Link&gt;
      - CSS에서는 'Link' 대신 'a'태그로 사용 가능
  - 'styled-components'에서의 전역 스타일링
    - 'createGlobalStyle' 프로퍼티를 사용해 렌더링 시 전역 스코프에 스타일 사용
      - 기본형 : const 컴포넌트명 = createGlobalStyle\` ... \`;
    - '&lt;컴포넌트명 /&gt;'을 사용해 return
      - 폰트 사용 시 '@import'문이 제대로 적용되지 않으므로, 'index.html'의 &lt;head&gt;에 넣은 후 사용
  - &lt;Fragment&gt; : 일종의 유령 컴포넌트
    - 부모 element 없이 서로 붙어있는 많은 컴포넌트들을 return할 수 있게 해줌
      - &lt;div&gt; element 사용 없이 렌더링
      - 무수한 &lt;div&gt;가 사용되는 것을 방지함
    - 주로 빈 태그(<></>)로 사용함
  - fetch API
    - API를 통해 데이터를 가져올 때 TS에게 데이터의 타입을 알려주어야 함 (interface)
    - 'axios'패키지 사용 시 json 형식으로 바로 가져옴
      - 기본형 : const 변수명 = await axios("URL주소");
  - 즉시 실행 함수 표현 (IIFE; Immediately Invoked Function Expression)
    - 정의되자마자 즉시 실행되는 함수 (선언 후 실행할 필요 없음)
    - 기본형 : (함수선언)();
- **23-08-23 : #5.4 ~ #5.8 / Link state + Nested Routes + useMatch**
  - &lt;Link&gt; state : 화면에 보이지 않는 방식으로 다른 페이지에 데이터를 보내는 방법
    - 'state' 속성을 사용해 object 형식으로 데이터 전송 가능
    - 'useLocation()'을 사용해 데이터를 수신
      - 받은 데이터의 타입을 TS에게 설명해주어야 함
      - react-router-dom v6부터 'useLocation()'의 제네릭을 지원하지 않음
        - 'as 인터페이스명' 방식으로 사용
  - '?.' 옵셔널체이닝
    - 객체의 프로퍼티에 접근 시 해당 프로퍼티가 존재하지 않는 경우, Error를 발생시키지 않고 'undefined'를 반환함
  - Nested Routes : route 안에 존재하는 또 다른 route
    - 웹사이트에서 탭을 사용할 때 유용함 (스크린 안에 섹션이 많을 때 등)
    - 생성법 (자식 route를 라우터 파일에 작성하는 방법)
      1. 라우터 파일에서 부모 &lt;Route&gt;에 감싸서 사용하기
         - 상대경로 URL을 지원하므로, 자식 route의 path는 상대경로를 사용
      2. 자식 route가 어디에 render가 될지 부모 route 컴포넌트에서 '&lt;Outlet /&gt;'으로 표시하기
  - useMatch() : 현재 URL 위치를 기준으로 지정된 경로에 대한 일치 데이터를 반환
    - 기본형 : const 변수명 = useMatch("URL주소");
      - import { useMatch } from "react-router-dom";
      - 상대경로 URL 사용 불가능
    - 사용자가 선택한 URL에 위치하면 object를 반환, 그렇지않으면 null을 반환
- **23-08-26 : #5.9 ~ #5.11 / React-Query**
  - React-Query
    - 편리한 방식으로 데이터를 fetch 할 수 있는 패키지
      - 기존 방식인 useEffect와 useState를 활용한 fetch API를 하지 않아도 됨
    - 설치법 : 'npm i @tanstack/react-query'
    - 설정법
      1. 'index.tsx'에서 'queryClient' 객체 생성하기
      2. '&lt;QueryClientProvider&gt;' 생성 후 감싸주기
    - 사용법
      1. fetcher 함수 생성하기
         - 무조건 fetch promise(json)를 return 해주어야 함
      2. 'useQuery' Hook을 사용해 API 데이터 가져오기
         - 기본형 : const { isLoading, data } = useQuery&lt;제네릭&gt;([쿼리키명], fetcher함수, ?옵션);
           - queryKey : (string[]) query의 고유식별자
           - fetcher함수 : 매개변수 필요 시 익명화살표함수로 작성
           - 옵션 : (object)
             - refetchInterval : (number) 자동으로 refetch하는 시간 주기를 설정
           - isLoading : 로딩에 대한 boolean값을 return
           - data : fetch가 끝난 후 데이터를 넣어줌
    - [핵심] 다른 페이지에 갔다가 다시 돌아와도 API를 재요청하지 않음
      - React-Query가 데이터를 캐시에 저장해두기 때문
  - React-Query-Devtools
    - 캐시에 존재하는 Query를 볼 수 있음
      - React-Query의 모든 내부 동작을 시각화하는 데 도움
      - 문제 발생시 디버깅 시간을 절약할 수 있음
    - 기본적으로 React-Query-Devtools는 process.env.NODE_ENV === 'development'인 경우에만 번들에 포함되므로, production build 중에 제외하는 것에 대해 걱정할 필요 없음
    - 설치법 : 'npm i @tanstack/react-query-devtools'
    - 설정 및 사용법 : 'App.tsx'에서 'ReactQueryDevtools'를 import한 후 컴포넌트를 사용
      - 'initialIsOpen={true}' 속성 필수
- **23-08-28 : #5.12 ~ #5.16 / ApexCharts + React-Helmet**
  - useOutletContext()
    - 중첩된 라우트(Nested Routes)에서 부모에서 자식 컴포넌트에게 상태(state)를 공유하기 위한 목적으로 사용하는 Hook
    - &lt;Outlet /&gt; 사용 시 하위 Route에게 변수를 넘겨줄 수 있는 기능
      - 송신 기본형 : &lt;Outlet context={{ ... }}&gt; (object 형식으로 사용)
      - 수신 기본형
        - import { useOutletContext } from "react-router-dom";
        - const 변수명 = useOutletContext<제네릭>();
  - ApexCharts.js
    - API로 받아온 데이터 등을 시각화 할 수 있는 패키지
    - 설치법 : 'npm i react-apexcharts apexcharts'
    - 사용법
      - import ApexChart from "react-apexcharts";
      - &lt;ApexChart 속성들 /&gt;
        - type : 그래프 타입 (string)
        - series : 보여줄 데이터 (object[]) { name: string, data: [] }
        - options : 공식문서를 참고하여 사용 (object)
  - React-Helmet
    - 문서의 &lt;head&gt;로 렌더링하는 컴포넌트형 패키지
    - 설치법 : 'npm i react-helmet'
    - 사용법
      - import { Helmet } from "react-helmet";
      - &lt;Helmet&gt; ... &lt;/Helmet&gt;
    - 'Using UNSAFE_componentWillMount in strict mode is not recommended
      and may indicate bugs in your code.'의 Error 시 'react-helmet-async' 패키지를 사용
      - 'App.tsx'에서 &lt;Router /&gt;를 &lt;HelmetProvider&gt;로 감싸준 후 사용
      - 'react-helmet' 패키지도 다운 받아야 함
- **23-08-29 : [Code Challenge] use ApexChart**
  - **<a href="https://github.com/dition0221/react-crypto_coin_tracker">[GitHub] 암호화폐 코인 트래커</a>**
  - **<a href="https://dition0221.github.io/react-crypto_coin_tracker/">[결과물] 암호화폐 코인 트래커</a>**
- **23-08-30 : #6.0 ~ #6.4 / Recoil Atom**
  - Recoil
    - React에서 사용할 수 있는 상태 관리(state management) 라이브러리
    - 설치법 : 'npm i recoil'
    - 설정법 : 'index.tsx'에서 &lt;RecoilRoot&gt;로 앱을 감싸주기
  - atom : 특정 컴포넌트에 종속되지 않으며, global state를 저장하는 기본 단위
    - Recoil에서는 state값을 'atom'이라는 버블에 담아서 사용
    - atom이 변경되면 컴포넌트도 변경된 값으로 re-rendering 됨
    - 사용법
      1. 'atom'을 관리하는 파일 생성하기
         - '/src/atoms.ts'
      2. 'atom' 생성하기
         - import { atom } from "recoil";
         - 기본형 : export const 변수명 = atom({ key: 키값, default: 초기값});
      3. [Read] 다른 컴포넌트에서 'atom' 연결하기
         - 기본형 : const 변수명 = useRecoilValue(아톰명);
      4. [Write] 다른 컴포넌트에서 'atom' 수정하기
         - 기본형 : const Setter함수 = useRecoilState(아톰명);
         - 'useState()'처럼 사용하면 됨
- **23-08-31 : #6.5 ~ #6.7 / React-Hook-Form(1)**
  - React Hook Form
    - React에서 &lt;form&gt;을 간단하게 제작할 수 있게 도와주며, 검증까지 할 수 있는 패키지
      - 기존 React에서 &lt;form&gt; 제작 시 setState(), value, onChange, onSubmit 등을 사용해야 했음
    - 설치법 : 'npm i react-hook-form'
    - 기본형
      - import { useForm} from "react-hook-form";
      - const { register, watch, handleSubmit, formState 등 } = useForm&lt;제네릭&gt;();
    - register : &lt;input&gt;의 value와 onChange를 대체하는 속성
      - name, onBlur, onChange, ref 등을 가지는 object를 return하는 함수
      - 사용법 : &lt;input {...register(이름, {검증 속성})} /&gt;
        - ES6 문법을 사용해 register 함수가 반환하는 객체를 가져다가 props로 사용
        - HTML 뿐만아니라 JS에서도 검증을 할 수 있도록 함
          - 유효하지 않을 시 자동으로 해당 element로 focus 해줌
      - ex. &lt;input {...register("email", { required: true, minLength: 10 })} placeholder="Email" /&gt;
    - handleSubmit : &lt;form&gt;의 'onSubmit'을 대체하고, validation을 담당함
      - 기존 onSubmit의 'event.preventDefault()와 setModifier함수'를 대체
      - 사용법 : &lt;form onSubmit={handleSubmit(데이터 유효 시 호출함수, ?데이터 무효 시 호출 함수)}&gt;
    - watch : &lt;form&gt;의 입력값들의 변화를 관찰할 수 있게 해주는 함수
      - register함수를 사용하는 모든 element들의 값을 object로 반환
      - ex. console.log(watch());
    - formState : 데이터 검증이 유효하지 않을 시 'formState.errors'를 참조해 error 내용 확인 가능
      - 어떤 종류의 error가 발생했는지 알 수 있음
      - error 발생 시 message를 보낼 수 있음
      - ex. &lt;input {...register("pw", {
        required: "PW is Required",
        minLength: { value: 5, message: "Your PW is too short" }})} /&gt;
- **23-09-02 : #6.8 ~ #6.10 / React-Hook-Form(2)**
  - React-Hook-Form
    - React-Hook-Form에서는 register 사용 시 문자열을 return 하면, error 메시지를 return한다는 뜻
    - setValue : 필드 값을 업데이트하는 함수
      - 기본형 : const { setValue } = useForm();
      - 사용법 : setValue(이름, 필드값);
    - reset : &lt;form&gt;의 모든 필드값을 초기화하는 함수
      - 기본형 : const { reset } = useForm();
      - 사용법 : reset();
  - React-Hook-Form - 검증
    - 검증 시 정규식(Regular Expression)을 사용할 수 있음 : 'pattern' 프로퍼티 사용
    - 검증 조건마다 message를 적어놨다면, error 문구를 화면에 출력 가능
      - 사용자가 제출한 이후에는 message가 실시간으로 변함
      - 'useForm()'에 제네릭을 명시하지 않았을시 string으로 타입을 명시해주어야 함 (as string)
  - React-Hook-Form - 커스텀 검증
    - 'handleSubmit()'의 인자로 사용하는 콜백함수에 커스텀 검증이 가능함
    - 검증 콜백함수의 매개변수는 자동으로 &lt;form&gt;의 element들을 받음
      - 해당 매개변수의 프로퍼티를 사용
    - useForm()의 'setError' 프로퍼티는 특정한 error를 발생시켜 줌
      - 기본형 : setError(레지스터명, { message: 에러메시지 });
      - interface에 옵션 항목을 넣어서, 추가적인 error를 표기할 수 있음
      - &lt;form&gt;에서 자동으로 error 항목으로 focus되게 할 수 있음
        - setError()의 3번째 매개변수로 '{ shouldFocus: true }'를 부여하여 작동
    - register의 검증 속성들 중 'validate' 옵션을 사용해 커스텀 규칙을 검사할 수 있음
      - validate : 현재 value값을 인자로 받는 콜백함수를 값으로 가지며, boolean값을 반환함 (검증을 통과/불통과)
      - 삼항조건연산자(또는 ||)를 사용해 error 메시지를 return 하도록 함
      - 여러 함수(검증)가 있는 object 형태가 될 수 있음
      - async 비동기로 만들어서 서버에다가 확인하고 응답을 받을 수 있음
- **23-09-04 : #6.11 ~ #6.15 / To-Do List**
  - Recoil - useRecoilState()
    - atom을 'useState()'처럼 사용하는 메서드
      - 'useRecoilValue()'와 'useSetRecoilState()'를 따로 사용할 필요가 없음
    - 기본형 : const [값, 세터함수] = useRecoilState(아톰명);
  - 매개변수를 가지는 Event Listener 사용법
    1. element에서 event를 익명함수를 사용해 매개변수를 전달하는 방법
       - ex.
         const onClick = (newCategory: IToDo["category"]) => {
         &nbsp;&nbsp;console.log("I wanna to", newCategory);
         };
         &lt;button onClick={() => onClick("DOING")}&gt;Doing&lt;/button&gt;
    2. element의 name 속성을 활용하는 방법
    - 'name' 속성에 직접 타입을 줄 수 없기 때문에, 1번 방법을 선호
    - ex.
      const onClick = (event: React.MouseEvent&lt;HTMLButtonElement&gt;) => {
      &nbsp;&nbsp;console.log("I wanna to", <span>event.currentTarget.name</span>);
      };
      &lt;button name="DOING" onClick={onClick}&gt;Doing&lt;/button&gt;
  - To-Do List에서 하나의 to-do를 수정하는 방법
    - 배열을 mutate하지 않으면서, 'useSetRecoilState()'로 원하는 하나의 값을 수정해야 함
    1. 'id' 등의 속성을 사용하여, 배열 속 원하는 element의 index 찾기
       - 값 자체를 찾을 필요는 없고, 배열 index값만 알면 됨
       - 배열의 '.findIndex(콜백함수)' 메서드를 사용해 조건에 맞는 index를 알아냄
    2. element를 업데이트하기
       - 찾은 index에 대한 element를 새로운 값으로 대체(replace)해야 함
       - element를 교체하는 이유는 해당 element의 위치가 바뀌지 않길 바라기 때문
       1. 교체할 element의 앞 부분을 새로운 배열로 생성하기
          - '.slice(시작인덱스, 끝인덱스)' 메서드를 사용해 새로운 배열 생성
       2. 교체할 element의 뒷 부분을 새로운 배열로 생성하기
          - '.slice()' 메서드의 끝인덱스를 지정하지 않을 시 끝까지 잘라서 반환함
       3. 교체 후 새로운 배열로 생성하기
          - 배열의 스프레드 연산자(...)를 이용하여, 앞부분과 뒷부분 사이에 새 원소를 넣음
- **23-09-05 : #6.16 ~ #7.1 / Recoil Selector + Recoil-Persist**
  - Recoil - Selector
    - atom의 output을 변형시키는 도구 (atom의 state 자체를 바꾸는 것이 아니라, 그의 output을 바꾸는 것)
    - 선언법
      const 셀렉터명 = selector({
      &nbsp;&nbsp;key: 키값,
      &nbsp;&nbsp;get: ({ get }) => {
      &nbsp;&nbsp;&nbsp;&nbsp;const 변수명 = get(아톰명); // atom을 가져오는 문 (필수x)
      &nbsp;&nbsp;&nbsp;&nbsp;......
      &nbsp;&nbsp;&nbsp;&nbsp;return 값;
      &nbsp;&nbsp;},
      });
      - get
        - 인자로 받는 옵션 중의 'get'함수를 이용해 atom을 받아올 수 있으며, 여러 번 사용해 여러 개의 atom을 가져올 수 있음
        - return하는 값은 해당 selector의 value가 됨
    - 사용법 : const 변수명 = useRecoilValue(셀렉터명);
    - atom이 변하면, selector도 변함
  - Recoil - Selector의 'set' 속성
    - selector의 'set' 속성을 사용하여, selector에서 atom의 state를 수정할 수 있음
    - 기본형
      &nbsp;&nbsp;set: ({ set }, 새로운값) => {
      &nbsp;&nbsp;......
      &nbsp;&nbsp;set(아톰명, 수정할값); // 새로운 값과 수정할 값은 같을 필요 x
      }
      - 여러 개의 atom에 대해 'set()'함수를 사용할 수 있음
    - 'useRecoilState()'로 selector를 불러와서 사용할 수 있음
      - 첫 번째 요소 : get 프로퍼티로부터 return한 값
      - 두 번째 요소 : set 프로퍼티로를 실행시키는 함수
      - 'useRecoilState()'를 atom과 selector 둘다에서 사용 가능
  - enum
    - 열거형(enumeration)으로 정의하는 데 사용하는 데이터 형식
    - 기본형: enum 변수명 { 값1, 값2, 값3, ... }
      - 변수명은 대문자로 시작
      - 컴퓨터는 열거 상수로 사용함
        - 열거 상수는 0부터 시작하여 순서대로 1씩 증가한 값을 가지며, 순서를 따로 지정하지 않는 한 자동으로 할당됨 (수동 할당 가능, 숫자나 문자열 가능)
        - 직접 같은 값으로 주어서 사용할 수 있음
          (ex. enum Categories { "TO_DO" = "TO_DO" })
    - 사용 시 프로퍼티 방식으로 사용
      (ex. Categories.TO_DO)
  - Recoil-Persist 패키지
    - Recoil 상태 관리 라이브러리와 Local Storage를 통합하여, Recoil 상태를 영구적으로 저장하고 복원하는 데 도움을 주는 패키지
      - 브라우저의 Local Storage를 활용하여, Recoil 상태를 지속적으로 유지할 수 있음
    - 설치법 : 'npm i recoil-persist'
    - 설정법
      1. atom 파일에서 'recoilPersist' 객체 생성하기
         - const { persistAtom } = recoilPersist();
           - 'recoilPersist()'의 옵션
             - key : Local Storage에 데이터 저장 시 사용되는 key명
               - 기본값 : "recoil-persist"
             - storage : 데이터를 저장할 저장소 설정
               - 기본값 : localStorage
             - converter : 저장소에서 값을 직렬화/역직렬화하는 방법을 구성
               - 기본값 : JSON
      2. Local Storage를 사용하고자 하는 atom에 'effect_UNSTABLE' 속성 할당하기
         - 'effect_UNSTABLE: [persistAtom]' 속성만 추가하면 됨
    - 설정만 해놓으면 Local Storage에 저장(set)과 불러오기(get)를 자동으로 실행함
- **23-09-06 : #7.2 ~ #7.4 / React-Beautiful-Dnd(1)**
  - react-beautiful-dnd 패키지 (@hello-pangea/dnd)
    - 화면에서 drag&drop을 할 수 있게 해주는 패키지
    - 설치법 : 'npm i @hello-pangea/dnd'
      - 'react-beautiful-dnd'는 종속성 문제때문에 React 18버전에서 제대로 동작하지 않고, 해당 패키지가 더 이상 없뎃이므로 비추천
    - 웹 페이지에서 작동이 되지 않을 시 'React.StrictMode'를 제거할 것
  - &lt;DragDropContext /&gt;
    - drag&drop을 가능하게 하고 싶은 앱의 한 부분(영역)
      - 앱 전체가 아닌 사용자가 drag&drop을 할 특정 영역에만 생성하도록 함
    - 기본형 : &lt;DragDropContext onDragEnd={콜백함수}&gt; ... &lt;/DragDropContext&gt;
      - onDragEnd : [필수] 사용자가 drag를 끝낸 시점에 실행하는 콜백함수
        - 콜백함수에 내용이 없다면, drag&drop이 끝날 시 원래대로 돌아옴
      - [필수] 태그 사이에는 children(하위 태그)이 있어야 함
  - &lt;Droppable /&gt;
    - 어떤 것을 드롭할 수 있는 영역(list)
    - 기본형 : &lt;Droppable droppableId="이름"&gt; ... &lt;/Droppable&gt;
      - droppableId : [필수] drop할 수 있는 영역이 여러 개일 수 있기 때문
      - [필수] 태그 사이에는 children(콜백함수 JSX)이 있어야 함
        - 콜백함수의 첫 번째 인자로 'provided'를 받음 (위치만 중요하지, 이름은 아무거나 가능)
        - 콜백함수에서 사용되는 JSX에 'provided.droppableProps'의 모든 프로퍼티와 'ref'속성으로 'provided.innerRef'를 주어야 함
        - ex. {(provided) => &lt;ul ref={provided.innerRef} {...provided.droppableProps}&gt; ... &lt;/ul&gt;}
    - 'provided.placeholder' : &lt;/Droppable&gt;이 끝날 때 두어, drag&drop 시 &lt;Droppable&gt;의 사이즈가 이상하게 변하는 것을 막음
      - &lt;Droppable&gt;의 하위 콜백함수에서 사용된 JSX의 닫힌 태그 바로 앞에서 사용
  - &lt;Draggable /&gt;
    - 사용자가 drag할 수 있는 영역(list에 있는 item)
    - 기본형 : &lt;Draggable draggableId="이름" index={인덱스}&gt; ...... &lt;/Draggable&gt;
      - draggableId : [필수] drop할 수 있는 영역이 여러 개일 수 있기 때문
        - 'key'속성 사용 시 'draggableId'의 속성값과 같아야 함 (drag&drop 할 수 있기 때문)
      - index : [필수] sorting을 위한 프로퍼티
      - [필수] 태그 사이에는 children(콜백함수 JSX)이 있어야 함
        - 콜백함수의 첫 번째 인자로 'provided'를 받음 (위치만 중요하지, 이름은 아무거나 가능)
        - provided.draggableProps : 해당 element의 drag 기능
        - provided.dragHandleProps : drag하기 위해 잡을 수 있는 영역
          - 해당 프로퍼티를 준 element를 drag 해야함
        - 콜백함수에서 사용되는 JSX에 'provided.draggableProps'의 모든 프로퍼티와 'provided.dragHandleProps'의 모든 프로퍼티와 'ref'속성으로 'provided.innerRef'를 주어야 함
        - ex. {(provided) =>
          &lt;li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}&gt; ...... &lt;/li&gt;}
- **23-09-07 : #7.5 ~ #7.11 / React-Beautiful-Dnd(2)**

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
