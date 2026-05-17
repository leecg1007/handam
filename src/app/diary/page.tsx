"use client";

import { useState } from "react";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DiaryPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "result">("idle");

  const simulateOCR = () => {
    setStatus("loading");
    setTimeout(() => setStatus("result"), 2500);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-8">오늘의 기록</h1>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={simulateOCR}
            className="card bg-[#f9fafb] border-2 border-dashed border-[#e5e8eb] flex flex-col items-center justify-center py-16 cursor-pointer shadow-none"
          >
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <Camera className="text-[#3182f6]" size={28} />
            </div>
            <p className="font-bold text-[#4e5968]">일기 촬영하기</p>
            <p className="text-sm text-[#8b95a1] mt-2">손글씨를 분석해 텍스트로 변환합니다</p>
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Loader2 className="text-[#3182f6] animate-spin mb-4" size={40} />
            <p className="font-bold text-[#191f28]">AI가 글씨를 읽고 있어요</p>
            <div className="mt-8 space-y-2 w-full max-w-[200px]">
              <div className="h-2 bg-[#f2f4f6] rounded-full animate-pulse"></div>
              <div className="h-2 bg-[#f2f4f6] rounded-full animate-pulse w-3/4 mx-auto"></div>
            </div>
          </motion.div>
        )}

        {status === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2 text-[#2da65e]">
              <CheckCircle2 size={20} />
              <span className="font-bold">인식 완료</span>
            </div>
            
            <div className="card border border-[#f2f4f6] shadow-none italic text-[#4e5968] leading-relaxed">
              "오늘은 정말 날씨가 좋았다. 공원에 나가서 책을 읽었는데, 바람이 살랑살랑 불어서 기분이 상쾌했다. 새로운 프로젝트 아이디어도 떠올라서 뿌듯한 하루였다."
            </div>

            <div className="space-y-3">
              <button className="btn-primary" onClick={() => alert("저장되었습니다")}>
                기록 저장하기
              </button>
              <button className="btn-secondary" onClick={() => setStatus("idle")}>
                다시 촬영하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
