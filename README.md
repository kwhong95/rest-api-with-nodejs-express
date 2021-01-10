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
  },
]

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(users);
});
```
<img width="403" alt="스크린샷 2021-01-10 오후 5 17 59" src="https://user-images.githubusercontent.com/70752848/104117843-cc582e00-5367-11eb-97f8-461f2d87f6e5.png">

> 크롬의 확장 프로그램인 jsonFormatter를 사용하면  
이렇게 실용적인 Json 포맷을 볼 수 있다.

## 3. POST 

### 3.1 Postman 활용하기
1. Postman 을 설치하고 서버의 데이터 출력을 확인해본다.

<img width="855" alt="스크린샷 2021-01-10 오후 5 32 17" src="https://user-images.githubusercontent.com/70752848/104118115-d67b2c00-5369-11eb-97f1-99a9ac5110b1.png">

> 이런식으로, 여러 메소드가 잘 나오는지 Postman을 활용해서 확인할 수 있음

2. Post 구현
```js
router.post('/', (req, res) => {
  console.log('POST ROUTE REACHED');

  res.send('POST ROUTE REACHED');
});
```

3. Postman에서 Post 실행하기
<img width="855" alt="스크린샷 2021-01-10 오후 5 40 28" src="https://user-images.githubusercontent.com/70752848/104118256-f19a6b80-536a-11eb-8665-c8a22a822f78.png">

> GET을 POST 메소드로 바꾸고 Send 버튼을 누르면  
위 라우터에서 구현한 res가 잘 실행되고 있는것을 확인할 수 있다.

### 3.2 배열에 데이터를 넣는 방법

```js
router.post('/', (req, res) => {
  const user = req.body;

  users.push(user);

  res.send(`User with the name ${user.firstName} added to database!`);
});
```

1. user라는 변수에 추가하는 user의 모든 정보를 담는다

2. users라는 배열에 user 데이터를 push 한다.

3. Postman에서 아래 그림과 같이 설정한 뒤 Send!

<img width="855" alt="스크린샷 2021-01-10 오후 5 47 45" src="https://user-images.githubusercontent.com/70752848/104118378-f6135400-536b-11eb-9a19-676a06541121.png">

4. 데이터가 잘 보내졌는지 로컬에서 확인해보면
<img width="855" alt="스크린샷 2021-01-10 오후 5 50 57" src="https://user-images.githubusercontent.com/70752848/104118433-6621da00-536c-11eb-829d-f617c891de8e.png">

> 잘 들어간 것을 확인 할 수 있다.  
하지만, DB를 연동시키지 않았으므로 저장되어 영구적으로 되지 않는다  
지금은 Node & Express에 집중하고 추후에 DB와 연동시키도록 하자.

## 4. 특정 유저의 정보를 구별하여 가져오기
### 4.1 고유한 ID 설정하기
> 우리가 설정한 유저의 정보는 고유한 ID를 가지기 어렵다  
성이나 이름은 다른 유저들과 겹치는 경우가 있기 때문이다.  
그래서 유저별로 고유한 아이디를 얻기 위해서 uuid를 활용해보자.

1. uuid 설치하기
```
npm i uuid
```

2. uuid와 함께 데이터 전송 
```js
import v4 as uuidv4 from 'uuid';

router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });
  // ...
});
```

> 이렇게 Spread 연산자로 유저의 나머지 정보를 가져오고  
uuid version4 를 넣어서 데이터를 전송해준다.


3. 결과 확인하기

> 먼저, 기존에 있는 데이터를 빈 배열로 바꾸어준다.

<img width="855" alt="스크린샷 2021-01-10 오후 6 08 50" src="https://user-images.githubusercontent.com/70752848/104118791-ea755c80-536e-11eb-8b0f-800fc57c4893.png">

> 이전과 같이 데이터를 보내주면?

<img width="855" alt="스크린샷 2021-01-10 오후 6 09 57" src="https://user-images.githubusercontent.com/70752848/104118809-0e38a280-536f-11eb-9236-0214e28d1666.png">

> uuid의 고유한 id 정보와 함께 데이터가 전송된 것을 확인할 수 있다.

### 4.2 사용자의 Id로 구분하여 데이터 가져오기

```js
// /users/2 ==> req.params { id: 2 }
router.get('/:id', (req, res) => {
  console.log(req.params);

  res.send(req.params);
});
```

> 위처럼 params를 활용해서 구분하는 방법이 있다.

<img width="454" alt="스크린샷 2021-01-10 오후 6 16 53" src="https://user-images.githubusercontent.com/70752848/104118986-06c5c900-5370-11eb-9ed3-8b2ccb23bb91.png">

> 이렇게 params에 고유한 id를 넣어주면 그 아이디에 따른 값을  
반환할 것이라고 예상할 수 있다.

<img width="454" alt="스크린샷 2021-01-10 오후 6 23 04" src="https://user-images.githubusercontent.com/70752848/104119129-e4807b00-5370-11eb-9462-8123df20f79e.png">

> 위의 데이터에서 고유한 id를 param으로 넣어 유저정보를 가져오도록 해보자.

<img width="594" alt="스크린샷 2021-01-10 오후 6 24 50" src="https://user-images.githubusercontent.com/70752848/104119172-23163580-5371-11eb-9d98-b3838bfb00df.png">

> 위처럼 params에 고유한 id 번호를 입력해주면  
특정 사용자의 정보만 빼올 수 있다.