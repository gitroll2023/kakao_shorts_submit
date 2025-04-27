"use client";

import React, { useEffect, useRef, useState } from 'react';

interface VideoModalProps {
  videoSrc: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoSrc, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 모바일 기기 감지
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // 모달이 열릴 때 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 모달 외부 클릭 시 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // ESC 키 누를 시 닫기
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // 비디오 자동 재생
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('자동 재생 실패:', error);
        setIsPlaying(false);
      });
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거 및 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('resize', checkMobile);
    };
  }, [onClose]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log('재생 실패:', err);
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div 
        ref={modalRef}
        className={`relative ${isMobile ? 'w-full h-full' : 'max-w-sm w-[95%] mx-4'} animate-fade-in`}
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose}
          className={`absolute ${isMobile ? 'top-4 right-4' : '-top-12 right-0'} text-white hover:text-gray-300 z-10 transition-transform hover:scale-110 p-2`}
          aria-label="닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* 세로 형태의 비디오 플레이어 */}
        <div className={`${isMobile ? 'w-full h-full' : 'w-full aspect-[9/16]'} bg-black rounded-xl overflow-hidden shadow-2xl relative`}>
          <video
            ref={videoRef}
            className={`${isMobile ? 'h-full w-auto max-w-full mx-auto' : 'w-full h-full object-contain'}`}
            src={videoSrc}
            controls={isMobile}
            autoPlay
            playsInline
            loop
            onClick={!isMobile ? togglePlayPause : undefined}
          />
          
          {/* 비디오 컨트롤 오버레이 - 모바일에서는 네이티브 컨트롤 사용 */}
          {!isMobile && (
            <div 
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={togglePlayPause}
            >
              <div className="bg-black bg-opacity-50 rounded-full p-4">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* 비디오 설명 - 모바일에서는 표시하지 않음 */}
        {!isMobile && (
          <div className="mt-3 sm:mt-4 text-center text-white">
            <p className="text-xs sm:text-sm opacity-70">
              쇼츠 영상을 
              <br className="sm:hidden" />
              감상하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
