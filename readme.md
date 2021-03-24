# Wysa - Dokumentacja API

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
  "username": "a2648dd6-7f1c-4bbc-8776-1bb6b1f45a61",
  "password": "TLCMHz6VyiuzrQi2jr6wmjfzVws9Xui2hRhIAeS1bS"
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
{ "token": "4d550820aa3337db8544021b11a2710b19d43408" }
```

## POST /create-session/

`token -> id`

Tworzy nową rozmowę. Zwraca identyfikator tej rozmowy.

### Zapytanie (tylko nagłówek http)

```http
Authorization: Bearer 4d550820aa3337db8544021b11a2710b19d43408
```

### Odpowiedź

```json
{
  "id": 4
}
```

## GET /view-session/

`token, id -> messages[]`

Zwraca obiekt zawierający całą listę wiadomości wewnątrz sesji.

### Zapytanie

```http
GET /view-session/?id=4
Authorization: Bearer 4d550820aa3337db8544021b11a2710b19d43408
```

### Odpowiedź

```json
[
  {
    "id": 1,
    "source_id": null,
    "content": "Witaj",
    "timestamp": "2020-09-25T14:26:13.800005Z"
  },
  {
    "id": 3,
    "source_id": 1,
    "content": "Cześć!",
    "timestamp": "2020-09-25T14:29:18.144600Z"
  },
  {
    "id": 4,
    "source_id": null,
    "content": "Jak się czujesz dzisiaj?",
    "timestamp": "2020-09-25T14:29:18.184560Z"
  }
]
```

## GET /messages/

`token, id, [after] -> messages[]`

Zwraca listę wiadomości wewnątrz sesji. Parametr `after` pozwala na wyświetlenie jedynie wiadomości następujących po innej wiadomości.

### Zapytanie

```http
GET /messages/?id=4&after=2

Authorization: Bearer 4d550820aa3337db8544021b11a2710b19d43408
```

Zwraca false gdy nie ma wgl wiadomości

### Odpowiedź

```json
[
  {
    "isCobe": false, /// true to wiedomość cobe a false to wiadomość użytkownika
    "content": "Cześć!",
    "timestamp": "2020-09-25T14:29:18.144600Z"
  },
  {
    "isCobe": true,
    "content": "Jak się czujesz dzisiaj?",
    "timestamp": "2020-09-25T14:29:18.184560Z"
  }
]
```

## POST /send-message/

`token, id, message -> answers[]`

Wysyła wiadomość i zwraca listę kolejnych odpowiedzi jeżeli wszystko się powiodło.

### Zapytanie

```http
GET /send-message/

Authorization: Bearer 4d550820aa3337db8544021b11a2710b19d43408
```

```json
{
    "id":0
    "message": "Cześć!"
}
```

### Odpowiedź

```json
{
  "message": ["Miło mi cię poznać.", "Jak się dzisiaj miewasz? "], /// jak jest tablica to znaczy że cobe wysyła kilka odpowiedzi bez przerwy na odpowiedź użytkownika
  "answers": "open" /// open to odpowiedź otwarta,dowolna czasami jest tablica z odpowiedziami defaultowymi
}
```
