# Rest API를 NodeJs와 Express로 빌드하기 | CRUD API Tutorial

## 1. 서버 생성하기
```js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) =>  res.send('Hello from HomePage'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
```

1. `npm init -y`
2. node -v 14.xx 이상
3. package.json
  - `"type": "module"` 설정
  - scripts 부분 "start": `"nodemon index.js"` 설정
4. npm start 실행!

<img width="331" alt="스크린샷 2021-01-10 오후 4 54 29" src="https://user-images.githubusercontent.com/70752848/104117425-8483d780-5364-11eb-885d-105efe55f997.png">

> 로컬호스트 8000번 포트로 서버 생성!

<img width="593" alt="스크린샷 2021-01-10 오후 4 49 42" src="https://user-images.githubusercontent.com/70752848/104117339-e6900d00-5363-11eb-9c05-c416c98b5c17.png">
