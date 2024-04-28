import { agent } from './veramo/setup.js'

async function main() {
  // 뭘 기준으로, 뭘 보고 verify하는지 잘 모르겠다. ㅋㅋ. 원래는 true가 뜨더니 언젠가부터 false가...

  const result = await agent.verifyCredential({
    credential: {
      "credentialSubject": {
        "type": "degree proof",
        "degree": "mook jji bba graduate",
        "id": "did:web:example.com"
      },
      "issuer": {
        "id": "did:ethr:goerli:0x02d38c5d2c089bbd770e1d8d4baf50e5c72f660397ecf88ea637ab1d5f443294ac"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2024-04-19T01:41:02.000Z",
      "proof": {
        "type": "JwtProof2020",
        "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InR5cGUiOiJkZWdyZWUgcHJvb2YiLCJkZWdyZWUiOiJtb29rIGpqaSBiYmEgZ3JhZHVhdGUifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MTM0OTA4NjIsImlzcyI6ImRpZDpldGhyOmdvZXJsaToweDAyZDM4YzVkMmMwODliYmQ3NzBlMWQ4ZDRiYWY1MGU1YzcyZjY2MDM5N2VjZjg4ZWE2MzdhYjFkNWY0NDMyOTRhYyJ9.V7xYCyu-aUygaXcMLFLaqQTmxlkB6ZCJM50LQ-uBwGR6XZT-fMnHFDwH0ExBhsketu49M-WfKN7ijdG2DXm16Q"
      }
    }
  })
  console.log(`Credential verified`, result.verified)
}

main().catch(console.log)