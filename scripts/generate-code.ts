import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// 터미널 인자값 받기 (예: npm run gen:code "로그인 페이지")
const userRequest = process.argv[2];


if (!userRequest) {
  console.error("❌ 생성할 내용을 입력해주세요! 예: npm run gen:code '구독 결제 페이지'");
  process.exit(1);
}
// const GOOGLE_API_KEY="AIzaSyA7nz4rwgN5KtPbWCwPH8RNY4Lh7WsjPLk"
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function generateCode() {
  console.log(`👨‍💻 AI가 다음 내용을 개발 중입니다: "${userRequest}"...`);

  const prompt = `
    리액트(Vite + Tailwind CSS) 전문가로서 다음 요구사항을 개발해줘.

    [요구사항]
    "${userRequest}"

    [제약사항]
    1. 코드는 TypeScript(tsx)로 작성해줘.
    2. 설명이나 마크다운 기호 없이 오직 소스 코드만 출력해.
    3. Tailwind CSS를 사용하여 모바일 친화적인 디자인을 적용해줘.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let code = response.text();

    // 마크다운 ``` 제거
    code = code.replace(/```tsx|```typescript|```/g, "").trim();

    // 저장 경로 설정 (src/components/generated)
    const outputDir = path.join(process.cwd(), "src", "components", "generated");
    const timestamp = new Date().getTime();
    const outputPath = path.join(outputDir, `GeneratedComponent_${timestamp}.tsx`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, code, "utf-8");
    console.log(`✅ 생성 완료! 저장 경로: ${outputPath}`);
  } catch (error) {
    console.error("❌ 에러 발생:", error);
  }
}

generateCode();