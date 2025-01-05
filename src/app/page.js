'use client'

import React, { useEffect, useRef, useState } from 'react';
import { Search, MapPin, AlertCircle, Radio, Cigarette, Sparkles } from 'lucide-react';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=285369944f68aeeb0fb8767b177cef7b&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      try {
        var container = mapRef.current;
        var options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };

        var map = new kakao.maps.Map(container, options);
      } catch (error) {
        console.error("Map script load error:", error);
      }
    }

    script.onerror = (error) => {
      console.error("Map script load error:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-orange-50">
      {/* 네비게이션 바 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Cigarette className="h-5 w-5 text-orange-600" />
            <h1 className="text-xl font-bold text-slate-800">
              길빵맵
            </h1>
          </div>
          <button className="group px-4 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-500 transition-all duration-200 shadow-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            제보하기
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto">
        {/* 알림 배너 */}
        <div className="mx-6 mt-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
            <div className="text-orange-600 font-bold">📢</div>
            <div>
              <p className="text-orange-800 font-medium">앗! 야생의 길빵몬(이)가 나타났다! 🚬</p>
              <p className="text-orange-600/80 text-sm mt-0.5">간접 흡연 데미지 받는 중... 도망가거나 모두에게 알려주세요!</p>
            </div>
          </div>
        </div>

        {/* 검색 바 */}
        <div className="px-6 py-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="근처 길빵존 찾아보기"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-11 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-200 outline-none"
            />
            <Search className="absolute right-4 top-3.5 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* 지도 영역 */}
        <div className="px-6 pb-6">
          <div className="w-full h-[calc(100vh-270px)] rounded-xl bg-white relative overflow-hidden shadow-md border border-slate-200">
            {/* 지도 플레이스홀더 */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50" id='map'>
              <div className="flex flex-col items-center space-y-3 animate-pulse">
                <Cigarette className="h-8 w-8 text-slate-400 animate-bounce" />
                <p className="text-slate-600 font-medium">지도 불러오는 중... 😎</p>
              </div>
            </div>

            {/* 필터 버튼 그룹 */}
            <div className="absolute top-4 right-4">
              <div className="flex flex-col space-y-2">
                <button className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                  <AlertCircle className="h-5 w-5 text-slate-600 group-hover:text-orange-600" />
                </button>
                <button className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group">
                  <MapPin className="h-5 w-5 text-slate-600 group-hover:text-orange-600" />
                </button>
              </div>
            </div>

            {/* 범례 */}
            <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <p className="text-slate-700 text-sm font-medium">길빵몬 출현구역 🚨</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  <p className="text-slate-700 text-sm font-medium">현재 위치📍</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <div className="flex space-x-1">
                  <div className="w-1 h-2.5 bg-red-400 rounded-full opacity-30" />
                  <div className="w-1 h-2.5 bg-red-400 rounded-full opacity-60" />
                  <div className="w-1 h-2.5 bg-red-400 rounded-full" />
                </div>
                <p className="text-slate-700 text-sm font-medium">출현 등급 ⬆️</p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
