# Web 2.0 인센티브 기반 토론 시스템을 갖춘 커뮤니티 사이트

![main](https://blockchain-crypto313.s3.ap-northeast-2.amazonaws.com/blog-image/labPicture/lab2Main.png)


- 프로젝트 기간: 12.21.21 ~ 01.03.22
- 프로젝트: 인센티브 기반 토론 시스템을 갖춘 커뮤니티 사이트 개발
- 프로젝트 목표: ERC-20 토큰을 인센트브로 주고 ERC-721도 구현

## 개발 환경

- React (클라이언트)
- Ganache(블록체인 서버)
- Node js (서버)
- AWS (DB 저장)
- MySQL (DB)
- Web3.js(블록체인 서버, 클라이언트)

## 기능

- 사용자가 글작성을 할 시 ERC-20 토큰을 보상한다
- 사용자는 토큰으로 NFT (ERC721) 을 생성할 수 있다.
- 사용자 토큰으로 NFT 를 판매/구매할 수 있다.
- 발행한 NFT의 메타데이터와 IPFS를 확인 할 수 있다.
- 사용자가 회원가입하면 니모닉월렛을 발행하여 사이트를 이용 가능하게 한다.

## 프로젝트 시작

![main](https://blockchain-crypto313.s3.ap-northeast-2.amazonaws.com/blog-image/labPicture/lab2First.png)

사이트에 접속후 로그인하면 상단에 사용자가 가진 토큰 수량을 확인할 수 있다. 한번 게시글 작성을 해보겠다.

---

![write](https://blockchain-crypto313.s3.ap-northeast-2.amazonaws.com/blog-image/labPicture/lab2Write.gif)

사용자가 게시글을 작성 하면 토큰을 지급 받는 걸 확인 할 수 있다.

---

![main](https://blockchain-crypto313.s3.ap-northeast-2.amazonaws.com/blog-image/labPicture/lab2NFT.gif)

사용자가 NFT를 발행 할 수 있다.

---

![main](https://blockchain-crypto313.s3.ap-northeast-2.amazonaws.com/blog-image/labPicture/lab2Mypage.gif)

사용자가 발행한 NFT를 확인 할 수 있다.

---

![main](https://blockchain-crypto313.s3.ap-northeast-2.amazonaws.com/blog-image/labPicture/lab2IPFS.gif)

사용자가 발행한 NFT 파일의 메타데이터와 IPFS에 저장된 URI를 확인 할 수 있다.

---
