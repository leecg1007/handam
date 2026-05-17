"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직이 구현될 자리
    console.log("Login with:", email, password);
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 justify-center">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">한담에 오신 것을<br />환영합니다</h1>
        <p className="text-[#8b95a1]">오늘의 기록을 시작해 보세요.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-[#8b95a1]" size={20} />
          <input
            type="email"
            placeholder="이메일"
            className="w-full bg-[#f2f4f6] rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#3182f6] transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 text-[#8b95a1]" size={20} />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full bg-[#f2f4f6] rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#3182f6] transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="btn-primary">로그인</button>
        </div>
      </form>

      <div className="mt-8 flex justify-center space-x-4 text-sm text-[#8b95a1]">
        <button>아이디 찾기</button>
        <span className="text-[#e5e8eb]">|</span>
        <button>비밀번호 찾기</button>
        <span className="text-[#e5e8eb]">|</span>
        <button className="text-[#191f28] font-bold">회원가입</button>
      </div>

      <div className="mt-auto pt-12">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 h-[1px] bg-[#e5e8eb]"></div>
          <span className="text-xs text-[#8b95a1]">간편 로그인</span>
          <div className="flex-1 h-[1px] bg-[#e5e8eb]"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center py-3 border border-[#e5e8eb] rounded-xl font-semibold text-sm">
            카카오
          </button>
          <button className="flex items-center justify-center py-3 border border-[#e5e8eb] rounded-xl font-semibold text-sm">
            구글
          </button>
        </div>
      </div>
    </div>
  );
}
