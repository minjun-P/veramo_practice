// Core interfaces
import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IDataStoreORM,
  IKeyManager,
  ICredentialPlugin,
} from '@veramo/core'
// Core identity manager plugin
// DID 매니저
import { DIDManager } from '@veramo/did-manager'

// Ethr did identity provider
// 이더리움 베이스로 DID를 관리할 수 있게 돕는 Provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr'

// Core key manager plugin
// 이건 아직 용도를 정확히 모르겠다.
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
// 로컬 저장소인 것 같은데 왜 노드 셋업할 때 이걸 하는지 잘 모르겠다
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// W3C Verifiable Credential plugin
// 그냥 DID 를 바탕으로 작동하는 표준에 대한 플러그인? w3c - credential이 뭔지는 알겠는데 
// 이 plugin의 용도는 잘 모르겠음.
import { CredentialPlugin } from '@veramo/credential-w3c'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm'

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

// You will need to get a project ID from infura https://www.infura.io
// 일단 프로젝트 id라고 할 것이 없었다. 그래서 API Key 값을 일단 넣었다. 누가 봐도 이게 프로젝트 id 역할을 하는 것처럼 보였기 때문
const INFURA_PROJECT_ID = 'c26ef5d93e794b979e15ce6717a8e13d'

// This will be the secret key for the KMS (replace this with your secret key)
// 아까 Npx로 생성했던 키 넣기
const KMS_SECRET_KEY = "abe2314f2d2f366ac751921212832a25a3d29bb3da458419c8836c7b77603bc1"
  // '< you can generate a key by running `npx @veramo/cli config create-secret-key` in a terminal>'

// TYPE ORM 이라는 기본적인 Orm을 통해 디비에 접근하되,
// veramo에서 제공하는 type orm 전용 플러그인 같은게 있는 듯 -> Entities, migrations를 넣어줌
const dbConnection = new DataSource({
  type: "sqlite",
  database : DATABASE_FILE,
  synchronize : false,
  migrations,
  migrationsRun : true,
  logging : ["error", "info", "warn"],
  entities : Entities,
}).initialize()

// --- 기초 셋 업 끝 -----------------------

// -- 핵심 Agent 생성 및 Export -> 핵심 로직 Entry point인 객체
export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
  plugins: [
    new KeyManager({
      // 결국 내가 발급한 did와 매칭되는 키들이 필요함.
      // 그 키를 관리하는 방식임.
      // 아래 코드는 키를 연결된 dbConnection에 넣겠다는 의미인 듯 함.
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
      },
    }),
    // did를 관리하는 방식을 정의하는 부분임.
    // 
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr',
      providers: {
        'did:ethr': new EthrDIDProvider({
          defaultKms: 'local',
          networks: [
            {
              name: "",
              rpcUrl: ""
            }
          ]
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
      }),
    }),
    new CredentialPlugin(),
  ],
})