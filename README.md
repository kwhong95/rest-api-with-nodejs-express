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