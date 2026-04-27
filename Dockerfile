FROM node:24-bullseye

WORKDIR /work

RUN npm install -g pnpm@10.29.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
RUN pnpm exec playwright install --with-deps

COPY . ./

ENV CI=true

CMD ["pnpm", "test:vrt:update"]
