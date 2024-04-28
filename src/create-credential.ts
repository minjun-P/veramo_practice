import { agent } from './veramo/setup.js'

async function main() {
  // alias를 가지고 매니저 계정을 찾아오기
  const identifier = await agent.didManagerGetByAlias({ alias: 'siyeon' })
  // VC를 만든다. 내부 데이터 페이로드에 주목해보자. 
  // 근데 이게 만들어져서 도대체 어디에 뭐가 생성되는건지를 잘 모르겠다.
  
  // 일단 Did라는 놈이 이렇게 따로 identifier마다 존재하긴 하는 듯
  console.log("Did : ",identifier.did);

  // 일단 이 함수가 핵심으로 보임. 한번 톺아보자x
  // 첫번째 파라미터 : credential 
  // 자유형태이나, 1) credenttial metadata, claim, proof 이렇게 3개가 담기는게 권장 형식
  const verifiableCredential = await agent.createVerifiableCredential({
    credential : {
      // issuer : "이따구로 써도 괜찮구",
      // 아래가 공식문서의 정석
      issuer : {id : identifier.did},
      credentialSubject : {
        // optional로 id 값이 들어간 것이고, did uri 형태를 따른 id임.
        id: 'did:web:example.com',
        // 여기서부터는 아무 내용이나 넣으면 됨.
        type : "degree proof",
        degree : "mook jji bba graduate",
      }
    },
    proofFormat: "jwt"
  })
  // 근데 이상한거는 verifiable credential 이 db에 저장이 안되는 것 같다...
  console.log(`New credential created`)               
  console.log(JSON.stringify(verifiableCredential, null, 2))
}

main().catch(console.log)