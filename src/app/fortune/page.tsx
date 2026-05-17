import { ArrowLeft, Heart, Coins, Briefcase } from "lucide-react";
import Link from "next/link";

export default function FortunePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link href="/">
          <ArrowLeft size={24} className="text-[#191f28]" />
        </Link>
        <h1 className="text-2xl font-bold">오늘의 운세</h1>
      </div>

      <div className="card bg-gradient-to-br from-[#3182f6] to-[#1b64da] text-white shadow-lg border-0">
        <div className="text-4xl mb-4 text-center">☀️</div>
        <h2 className="text-xl font-bold text-center mb-2">총운 95점</h2>
        <p className="text-sm opacity-90 text-center leading-relaxed">
          말하는 대로 이루어지는 마법 같은 하루입니다. 평소 미뤄왔던 고백이나 제안이 있다면 오늘이 적기입니다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card shadow-none border border-[#f2f4f6] p-5">
          <p className="text-xs text-[#8b95a1] mb-1 font-semibold uppercase tracking-wider">행운의 색</p>
          <p className="font-bold text-[#191f28]">스카이 블루</p>
        </div>
        <div className="card shadow-none border border-[#f2f4f6] p-5">
          <p className="text-xs text-[#8b95a1] mb-1 font-semibold uppercase tracking-wider">행운의 숫자</p>
          <p className="font-bold text-[#191f28]">7, 24</p>
        </div>
      </div>

      <div className="pt-4">
        <h2 className="text-lg font-bold mb-5">분야별 조언</h2>
        <div className="space-y-6">
          {[
            { icon: Heart, label: "연애운", text: "연인과의 대화가 물 흐르듯 풀립니다.", color: "text-red-500 bg-red-50" },
            { icon: Coins, label: "금전운", text: "작은 횡재수가 있으니 주변을 잘 살펴보세요.", color: "text-amber-500 bg-amber-50" },
            { icon: Briefcase, label: "성공운", text: "집중력이 최고조에 달해 능률이 오릅니다.", color: "text-green-500 bg-green-50" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className={`p-3 rounded-2xl ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1 border-b border-[#f2f4f6] pb-4">
                <h3 className="font-bold text-sm text-[#333d4b] mb-1">{item.label}</h3>
                <p className="text-[13px] text-[#8b95a1] leading-snug">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
