import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      <div className="pt-4 mb-8">
        <h1 className="text-2xl font-bold">안녕하세요, 명훈님</h1>
        <p className="text-[#8b95a1] text-sm mt-1">오늘도 소중한 하루를 기록해 보세요.</p>
      </div>

      {/* Fortune Card */}
      <Link href="/fortune" className="card block">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-semibold text-[#3182f6]">오늘의 운세</span>
          <ChevronRight size={16} className="text-[#adb5bd]" />
        </div>
        <p className="text-lg font-bold leading-tight">"기다리던 소식이 들려오고 활력이 넘치는 하루입니다."</p>
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-xl">🎨</span>
          <span className="text-sm text-[#4e5968]">행운의 색: <span className="font-semibold text-[#1b64da]">에메랄드 그린</span></span>
        </div>
      </Link>

      {/* AI Prompt Card */}
      <Link href="/prompts" className="card block bg-[#f9fafb] border border-[#e5e8eb] shadow-none">
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-1.5 bg-[#e8f3ff] rounded-lg">
            <Sparkles size={14} className="text-[#3182f6]" />
          </div>
          <span className="text-sm font-bold text-[#4e5968]">AI 글감 추천</span>
        </div>
        <p className="text-[15px] font-semibold text-[#333d4b]">지난 주말의 설렘을 기록해 보는 건 어떨까요?</p>
        <div className="mt-4 text-sm font-bold text-[#3182f6] flex items-center">
          일기 쓰러 가기 <ChevronRight size={14} className="ml-0.5" />
        </div>
      </Link>

      {/* Recent Diary List */}
      <div className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">최근 기록</h2>
          <button className="text-sm text-[#8b95a1] font-medium">모두 보기</button>
        </div>
        <div className="space-y-3">
          {[
            { date: "5월 17일", title: "한강 산책", emotion: "행복", color: "text-green-500 bg-green-50" },
            { date: "5월 16일", title: "바쁜 업무 속 여유", emotion: "평온", color: "text-blue-500 bg-blue-50" },
          ].map((item, idx) => (
            <div key={idx} className="card p-4 flex items-center shadow-none border border-[#f2f4f6]">
              <div className="w-12 h-12 bg-[#f9fafb] rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl text-gray-400">📝</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[15px]">{item.date}의 기록</h3>
                <p className="text-xs text-[#8b95a1] mt-0.5">{item.title}</p>
              </div>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-lg ${item.color}`}>
                {item.emotion}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
