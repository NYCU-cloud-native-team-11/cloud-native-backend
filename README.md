# Cloud Native Backend

## Requirement

- Node.js >= 12.8

## How to started

1. Create .env file

```
cp .env.example .env
```

2. Set DB_URL in .env

```
DB_URL = mongodb+srv:/<Cluster>:<Pass>@cloud-native-test.hsd8s.mongodb.net/<Database>?retryWrites=true&w=majority
```

3. Install library

```
npm install
```

4. Run server

```
npm start
```

5. Run test

```
npm test
```

## API

### 回傳所有資料

```
GET /
```

- Output

```
[
    {
        "_id": "6292eee74085cb9f1ee247ef",
        "company": "tsmc",
        "count": 100,
        "date": "2022-05-20T12:04:40.000Z",
        "__v": 0
    },
    {
        "_id": "629338e98ee1320d95a5bcbb",
        "company": "tsmc",
        "count": 100,
        "date": "2022-05-20T12:04:40.000Z",
        "__v": 0
    }
]
```

### query 特定公司資料

```
GET /keywords/<company name>
```

- Output

```
[
  {
    "_id": "6294cce770388d52e491142b",
    "company": "Intel",
    "count": 5,
    "date": "2022-05-02T00:00:00.000Z",
    "__v": 0
  },
  {
    "_id": "6294cd0c70388d52e491142f",
    "company": "Intel",
    "count": 25,
    "date": "2022-05-02T00:00:00.000Z",
    "__v": 0
  }
]
```

### query 特定公司過去 24 小時的趨勢

```
GET /keywords/<company name>/last_24_hours
```

- Output

```
[
    {
        "_id": "62988a602baa8e7ed48a66e6",
        "company": "TSMC",
        "count": 1428,
        "date": "2022-06-02T18:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62989875f99373b12034bc8e",
        "company": "TSMC",
        "count": 1094,
        "date": "2022-06-02T19:00:00.000Z",
        "__v": 0
    }
]
```

### query 特定公司過去 7 天的趨勢

```
GET /keywords/<company name>/last_7_days
```

- Output

```
[
    {
        "_id": "62988a602baa8e7ed48a66e6",
        "company": "TSMC",
        "count": 1428,
        "date": "2022-06-02T18:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62989875f99373b12034bc8e",
        "company": "TSMC",
        "count": 1094,
        "date": "2022-06-02T19:00:00.000Z",
        "__v": 0
    }
]
```

### query 特定公司過去 30 天的趨勢

```
GET /keywords/<company name>/last_30_days
```

- Output

```
[
    {
        "_id": "62988a602baa8e7ed48a66e6",
        "company": "TSMC",
        "count": 1428,
        "date": "2022-06-02T18:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62989875f99373b12034bc8e",
        "company": "TSMC",
        "count": 1094,
        "date": "2022-06-02T19:00:00.000Z",
        "__v": 0
    }
]
```

### query 特定公司特定日期間的趨勢

```
GET /keywords/<company name>/20220602-20220603
```

- Output

```
[
    {
        "_id": "62988a602baa8e7ed48a66e4",
        "company": "ASML",
        "count": 1125,
        "date": "2022-06-02T18:00:00.000Z",
        "__v": 0
    },
    {
        "_id": "62989875f99373b12034bc8c",
        "company": "ASML",
        "count": 513,
        "date": "2022-06-02T19:00:00.000Z",
        "__v": 0
    }
]
```

### 塞入一筆資料

- Input

```
{
	"company": "TSMC",
	"count": 20,
	"date": "2022-05-21 19:00:00"
}
```

- Output

```
HTTP Status 200
```

### 塞入多筆資料

- Input

```
[
    {
      "company": "TSMC",
      "count": 15,
      "date": "2022-05-26 19:00:00"
    },
    {
      "company": "Intel",
      "count": 25,
      "date": "2022-05-02 19:00:00"
    }
]
```

- Output

```
HTTP Status 200
```

## How to develop API

1. 到 routes/trends 增加 API 路徑
2. 到 controllers/trend 實作邏輯
