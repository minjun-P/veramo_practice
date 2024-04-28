import { agent } from './veramo/setup.js'

async function main() {

  // 'default'라는 alias로 매니저를 생성한다! 
  // 근데 이게 다 지금 db에 저장되고 있는건가...?
  const identifier = await agent.didManagerCreate({ 
    alias: 'minjun3',
    kms : "local",
  })
  console.log(`New identifier created`)
  console.log(JSON.stringify(identifier, null, 2))
  // 확인해보니 잘 저장된다. alias가 식별자 역할을 하고, did를 난수 값으로 알아서 생성해준다?
  // did:ethr:goerli:0x02950eecc199a98c7559a0a090adc4f820fedb081e65fde8157c27e18af83d64e2
  // 이런 형식이다.

  // controller key id -> 얘는 뭘까?
}

main().catch(console.log)