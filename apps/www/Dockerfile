FROM node:22.14 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app 
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo prune @ip-address-management-system/www --docker

FROM base AS installer

WORKDIR /app

ARG VITE_BACKEND_URL

COPY --from=builder /app/out/json/ .
COPY pnpm-lock.yaml . 
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN pnpm build

FROM base AS runner
WORKDIR /app

RUN pnpm install -g serve
COPY --from=installer /app .
WORKDIR /app/apps/www

EXPOSE 3000

CMD ["serve", "-s", "dist"]
