# Dokumentacja API

## Jak wystartować projekt?

Musisz mieć pobranego Node.js (). Jeżeli masz to wpisujesz w terminalu:

```terminal
node index
```

serwer uruchamia się domyślnie na porcie 5000, można zmienić wpisując do pliku .env:(2323 dowolny numer portu)

```dotenv
PORT=2323
```

## Baza danych

Postawiona jest baza danych w MongoDB. Można postawić własną, wystarczy tylko zmienić ATLAS_URI w pliku .env

## POST /register/

`secret -> username, password`

Zakłada nowe konto. Generuje nazwę użytkownika (UUID4), oraz hasło (alfanumeryczne, 42 znaki). Użytkownik od razu jest aktywowany i gotowy do użycia.

Zwraca 403 Forbidden gdy nie przekaże się parametru "secret". Sekret istnieje jedynie w celu zablokowania botów i skanerów przed zakładaniem kont.

Sekret jest przechowywany w pliku `.env`, w momencie pisania jego wartość to `5b956e10a2161664c27e53becddb00ab10430b6a`

### Zapytanie

```json
{ "secret": "5b956e10a2161664c27e53becddb00ab10430b6a" }
```

### Odpowiedź

```json
{
  "username": "76a7da48-cb45-4301-9cc2-5367343cbbcd",
  "password": "FR9OIQd3e0pz9uRv4EOjQd1koZCs9E52lK30GARTp0",
  "id": "605b91319c307424745da5ea"
}
```

## POST /api-token-auth/

`username, password -> token`

Standardowa autoryzacja Bearer Tokenem. Po otrzymaniu tokena należy go przechowywać i przekazywać endpointom wymagającym autoryzacji jako HTTP Header `Authorization: Bearer <wartość>`.

### Zapytanie

```json
{
  "username": "a2648dd6-7f1c-4bbc-8776-1bb6b1f45a61",
  "password": "TLCMHz6VyiuzrQi2jr6wmjfzVws9Xui2hRhIAeS1bS"
}
```

### Odpowiedź

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijc2YTdkYTQ4LWNiNDUtNDMwMS05Y2MyLTUzNjczNDNjYmJjZCIsInBhc3N3b3JkIjoiRlI5T0lRZDNlMHB6OXVSdjRFT2pRZDFrb1pDczlFNTJsSzMwR0FSVHAwIiwiaWF0IjoxNjE2NjEzNjk3LCJleHAiOjE2MTY2MTQ4OTd9.lKwiFpkWfdrdo5VL4zXql2h1YwmfDx423LSgl0_skcc"
}
```

## POST /create-session/

`token -> id`

Tworzy nową rozmowę. Zwraca identyfikator tej rozmowy.

### Zapytanie (tylko nagłówek http)

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijc2YTdkYTQ4LWNiNDUtNDMwMS05Y2MyLTUzNjczNDNjYmJjZCIsInBhc3N3b3JkIjoiRlI5T0lRZDNlMHB6OXVSdjRFT2pRZDFrb1pDczlFNTJsSzMwR0FSVHAwIiwiaWF0IjoxNjE2NjEzNjk3LCJleHAiOjE2MTY2MTQ4OTd9.lKwiFpkWfdrdo5VL4zXql2h1YwmfDx423LSgl0_skcc
```

### Odpowiedź

```json
{
  "id": "605b91319c307424745da5ea"
}
```

## GET /view-session/

`token, id -> session{}`

Zwraca obiekt zawierający całą listę wiadomości wewnątrz sesji.

### Zapytanie

```http
GET /view-session/?id=605b91319c307424745da5ea
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijc2YTdkYTQ4LWNiNDUtNDMwMS05Y2MyLTUzNjczNDNjYmJjZCIsInBhc3N3b3JkIjoiRlI5T0lRZDNlMHB6OXVSdjRFT2pRZDFrb1pDczlFNTJsSzMwR0FSVHAwIiwiaWF0IjoxNjE2NjEzNjk3LCJleHAiOjE2MTY2MTQ4OTd9.lKwiFpkWfdrdo5VL4zXql2h1YwmfDx423LSgl0_skcc
```

### Odpowiedź

```json
{
  "messages": [],
  "_id": "605b91549c307424745da5eb",
  "userId": "605b91319c307424745da5ea",
  "progress": 0,
  "createdAt": "2021-03-24T19:21:56.789Z",
  "updatedAt": "2021-03-24T19:21:56.789Z",
  "__v": 0
}
```

## GET /messages/

`token, id, [after] -> messages[]`

Zwraca listę wiadomości wewnątrz sesji. Parametr `after` pozwala na wyświetlenie jedynie wiadomości następujących po innej wiadomości.

### Zapytanie

```http
GET /messages/?id=605b91319c307424745da5ea&after=2

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijc2YTdkYTQ4LWNiNDUtNDMwMS05Y2MyLTUzNjczNDNjYmJjZCIsInBhc3N3b3JkIjoiRlI5T0lRZDNlMHB6OXVSdjRFT2pRZDFrb1pDczlFNTJsSzMwR0FSVHAwIiwiaWF0IjoxNjE2NjEzNjk3LCJleHAiOjE2MTY2MTQ4OTd9.lKwiFpkWfdrdo5VL4zXql2h1YwmfDx423LSgl0_skcc
```

Zwraca false gdy nie ma wgl wiadomości

### Odpowiedź

```json
[
  {
    "isCobe": true,
    "content": [
      "Cześć",
      "Nazywam się Cobe. Jestem tu po to abyś odzyskał wewnętrzną równowagę. Powiedz mi jak masz na imię."
    ],
    "timestap": "2021-03-24T19:23:08.984Z"
  },
  {
    "isCobe": false,
    "content": "ehh",
    "timestap": "2021-03-24T19:28:08.813Z"
  },
  {
    "isCobe": true,
    "content": ["Miło mi cię poznać.", "Jak się dzisiaj miewasz? "],
    "timestap": "2021-03-24T19:28:08.813Z"
  }
]
```

## POST /send-message/

`token, id, message -> message,answers[]`

Wysyła wiadomość i zwraca listę kolejnych odpowiedzi jeżeli wszystko się powiodło.
Na początek rozmowy wysłać zapytanie z dowolną wiadomością, żeby uzyskać pierwsze wiadomości bota (["Miło mi cię poznać.","Jak się dzisiaj miewasz? "]),bo rozmowa powinna się zacząć od niego

### Zapytanie

```http
GET /send-message/

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijc2YTdkYTQ4LWNiNDUtNDMwMS05Y2MyLTUzNjczNDNjYmJjZCIsInBhc3N3b3JkIjoiRlI5T0lRZDNlMHB6OXVSdjRFT2pRZDFrb1pDczlFNTJsSzMwR0FSVHAwIiwiaWF0IjoxNjE2NjEzNjk3LCJleHAiOjE2MTY2MTQ4OTd9.lKwiFpkWfdrdo5VL4zXql2h1YwmfDx423LSgl0_skcc
```

```json
{
  "id": "605b91319c307424745da5ea",
  "message": "siemson"
}
```

### Odpowiedź

W message: jak jest tablica to znaczy że cobe wysyła kilka odpowiedzi bez przerwy na odpowiedź użytkownika

W answers: open to odpowiedź otwarta,dowolna czasami jest tablica z możliwymi odpowiedziami

```json
{
  "message": ["Miło mi cię poznać.", "Jak się dzisiaj miewasz? "],
  "answers": "open"
}
```
