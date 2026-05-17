import requests
import os
from datetime import datetime
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

class FortuneService:
    def __init__(self):
        self.api_key = os.getenv("UN7_API_KEY")
        self.base_url = "https://api.un7.kr/api/v1/day"

    def get_daily_fortune(self, birth_year, birth_month, birth_day, birth_hour=0, is_lunar=False):
        """
        un7.kr API를 사용하여 일간 운세를 가져옵니다.
        """
        now = datetime.now()
        
        params = {
            "api-key": self.api_key,
            "targetYear": now.year,
            "targetMonth": now.month,
            "targetDay": now.day,
            "birthYear": birth_year,
            "birthMonth": birth_month,
            "birthDay": birth_day,
            "birthHour": birth_hour,
            "isLunar": "true" if is_lunar else "false"
        }

        try:
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if data.get("code") == "0000":
                return self._process_fortune_data(data.get("data", {}))
            else:
                print(f"API Error: {data.get('message')}")
                return None
        except Exception as e:
            print(f"Request failed: {e}")
            return None

    def _process_fortune_data(self, data):
        """
        API 응답 데이터를 UI에 맞게 가공합니다.
        점수가 없으므로 요약 텍스트를 반환하거나 필요 시 LLM으로 점수화할 수 있습니다.
        """
        return {
            "summary": data.get("day06", {}).get("description", "운세 정보를 가져올 수 없습니다."),
            "current_luck": data.get("day01", {}).get("description", ""),
            "lucky_color": data.get("day03", {}).get("description", ""),
            "love_luck": data.get("day08", {}).get("description", ""),
            "money_luck": data.get("day07", {}).get("description", ""), # 사업거래운을 금전운으로 활용
            "health_luck": data.get("day09", {}).get("description", ""),
            "raw_data": data # 전체 데이터 보관
        }

# 테스트용 코드
if __name__ == "__main__":
    # .env에 실제 API 키가 있어야 작동합니다.
    service = FortuneService()
    # 예시: 1990년 1월 1일생
    result = service.get_daily_fortune(1990, 1, 1)
    if result:
        print(f"오늘의 운세 요약: {result['summary']}")
        print(f"행운의 색상: {result['lucky_color']}")
