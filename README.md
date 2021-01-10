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


## 2. GET 
> GET: /users/:ud -> Finds User Details

### 2.1 Routes
> 누구나 서버를 용도별로 10~20 이상의 서버를 만들고 싶지 않다.  
이 복잡한 용도를 라우트해서 사용하면 하나의 서버로 여러 용도로 활용할 수 있다.

1. routes 폴더 생성
  - users.js 라우트 생성 
```js
import express from 'express';

const router = express.Router();

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send('Hello');
});

export default router;
```
2. index.js 에 라우트 추가
```js
app.use('/users', usersRoutes);
```

3. localhost:8000/users 에 접근하면

<img width="403" alt="스크린샷 2021-01-10 오후 5 08 09" src="https://user-images.githubusercontent.com/70752848/104117671-6d45e980-5366-11eb-92c3-c2a7c3e32a06.png">

> 정상적으로 Hello 가 출력됨

### 2.2 User Data 출력하기

1. 먼저, user.json이라는 json파일을 생성해서 유저 정보를 담는다.
```json
{
  "FirstName": "Hong",
  "lastName": "Kyung Won",
  "age": 27
}
```

2. 일단 유저 모의 데이터를 넣어서 출력이 잘되는지 확인해보자.
```js
const users = [
  {
    FirstName: "Hong",
    lastName: "Kyung Won",
    age: 27
  }
]

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users);
});
```
<img width="403" alt="스크린샷 2021-01-10 오후 5 17 59" src="https://user-images.githubusercontent.com/70752848/104117843-cc582e00-5367-11eb-97f8-461f2d87f6e5.png">

> 크롬의 확장 프로그램인 jsonFormatter를 사용하면  
이렇게 실용적인 Json 포맷을 볼 수 있다.
