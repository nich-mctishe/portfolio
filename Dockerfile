FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /work

RUN npm install -g pnpm@10.29.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./

RUN pnpm build

ENV CI=true

CMD ["pnpm", "test:vrt:update"]
