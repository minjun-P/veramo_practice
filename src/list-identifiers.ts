import { agent } from './veramo/setup.js'

async function main() {
  // 모든 매니저 불러오기
  // identifier는 사용자!에 가까운 듯.
  // identifier 테이블에서 걍 Row들을 가져오는 거임. 별 기능 아님.
  // DB에서 따로 row하나 지우니, 여기서도 하나 없는 채로 나옴. 딱히 뭐 블록체인 네트워크랑 무관한 듯 함.
  const identifiers = await agent.didManagerFind()
  // tutorial에 있는거 뽑아서 가져와봤는데 되네
  // const resolved = await agent.resolveDid({didUrl:"did:ethr:0xc530503a148babcaca68565cfa576d6f43427a2d"});

  console.log(`There are ${identifiers.length} identifiers`)

  if (identifiers.length > 0) {
    identifiers.map((id) => {
      console.log(id)
      console.log('..................')
    })
  }
}

main().catch(console.log)