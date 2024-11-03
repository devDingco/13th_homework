# 베이스 이미지
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# NestJS 빌드
RUN npm run build

# 애플리케이션 실행
CMD ["node", "dist/src/main.js"]


