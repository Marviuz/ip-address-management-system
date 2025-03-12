FROM node:22.14 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

WORKDIR /app 
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo prune @ip-address-management-system/api --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY pnpm-lock.yaml . 
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm build

FROM base AS runner
WORKDIR /app

COPY --from=installer /app .
WORKDIR /app/apps/api

EXPOSE 8000

ARG DATABASE_URL
ARG AUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CALLBACK_URL
ARG FRONTEND_URL

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
  chmod +x /usr/local/bin/wait-for-it.sh

CMD ["sh", "-c", "wait-for-it.sh db:5432 -- pnpm db:migrate && pnpm start"]

