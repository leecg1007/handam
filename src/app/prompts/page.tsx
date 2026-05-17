import { Sparkles, ChevronRight } from "lucide-react";

export default function PromptsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">글감 추천</h1>
        <p className="text-sm text-[#8b95a1] leading-relaxed">
          명훈님의 지난 일기 12개를 분석했어요.<br />
          오늘은 이런 이야기를 써보는 건 어럴까요?
        </p>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "가장 행복했던 식사",
            desc: "최근 일기에 '음식' 키워드가 자주 등장하네요. 가장 기억에 남는 맛은 무엇이었나요?",
            match: "98%",
            color: "border-[#3182f6]",
            tagColor: "text-[#3182f6] bg-[#e8f3ff]"
          },
          {
            title: "나를 성장시킨 실수",
            desc: "지난주 프로젝트 고민을 기록하셨죠. 그 과정을 통해 배운 점을 정리해볼까요?",
            match: "85%",
            color: "border-[#505967]",
            tagColor: "text-[#4e5968] bg-[#f2f4f6]"
          },
          {
            title: "1년 뒤의 나에게",
            desc: "현재의 목표들을 1년 뒤의 내가 읽는다면 어떤 기분일까요?",
            match: "72%",
            color: "border-[#6b66fb]",
            tagColor: "text-[#6b66fb] bg-[#f0efff]"
          }
        ].map((prompt, idx) => (
          <div key={idx} className={`card border-l-4 ${prompt.color} shadow-sm active:bg-[#f9fafb]`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-[#191f28]">{prompt.title}</h3>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${prompt.tagColor}`}>
                추천도 {prompt.match}
              </span>
            </div>
            <p className="text-[14px] text-[#4e5968] leading-relaxed mb-4">
              {prompt.desc}
            </p>
            <div className="flex justify-end items-center text-sm font-bold text-[#3182f6]">
              기록하기 <ChevronRight size={14} className="ml-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
