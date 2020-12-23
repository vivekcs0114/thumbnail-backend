## Quickstart

```sh
  git clone https://github.com/vivekcs0114/thumbnail-backend.git
  cd thumbnail-backend
  npm install
  npm run start
```
### `Docker Run`

## Build docker image -

docker build -t thumbnail-backend .

## Run docker image -

docker run --name thumbnail-backend -p 8000:8000 -d thumbnail-backend

Open [http://localhost:8000/api/healthz](http://localhost:8000/api/healthz) to view it in the browser.

