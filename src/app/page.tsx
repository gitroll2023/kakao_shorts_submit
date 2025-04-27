"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "@/app/components/Modal";
import VideoModal from "@/app/components/VideoModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoModalSrc, setVideoModalSrc] = useState<string | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 기기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openVideoModal = (videoSrc: string) => {
    setVideoModalSrc(videoSrc);
    // 비디오 미리보기 일시 중지
    if (video1Ref.current) {
      video1Ref.current.pause();
      video1Ref.current.currentTime = 0;
    }
    if (video2Ref.current) {
      video2Ref.current.pause();
      video2Ref.current.currentTime = 0;
    }
  };

  const closeVideoModal = () => {
    setVideoModalSrc(null);
  };

  // 비디오 미리보기 시작
  const startVideoPreview = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch(err => console.log('비디오 재생 실패:', err));
    }
  };

  // 비디오 미리보기 중지
  const stopVideoPreview = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (videoRef.current && !isMobile) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // 모바일에서 비디오 터치 시작
  const handleTouchStart = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (videoRef.current && isMobile) {
      videoRef.current.play().catch(err => console.log('비디오 재생 실패:', err));
    }
  };

  // 모바일에서 비디오 터치 종료
  const handleTouchEnd = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    if (videoRef.current && isMobile) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-pattern-light text-gray-800">
      <header className="py-3 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-faith-primary">
            <span className="inline-block animate-float">✝️</span> 신앙 사연 제보
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 container mx-auto">
        <div className="w-full max-w-md card-premium p-5 mb-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-faith-primary">
              사연을 
              <br className="sm:hidden" />
              들려주세요
            </h2>
            <p className="text-base sm:text-lg mb-5 text-gray-600 px-2">
              성도님들이 느끼셨던
              <br className="sm:hidden" />
              다양한 사연을 보내주세요!
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <div className="tag-premium animate-float" style={{animationDelay: '0s'}}>황당했던</div>
              <div className="tag-premium animate-float" style={{animationDelay: '0.5s'}}>재밌었던</div>
              <div className="tag-premium animate-float" style={{animationDelay: '1s'}}>웃픈</div>
              <div className="tag-premium animate-float" style={{animationDelay: '1.5s'}}>킹받는</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-pattern-dots rounded-xl p-4 sm:p-6">
              <p className="text-center mb-4 text-gray-700 font-medium text-sm sm:text-base">
                제보받은 사연은 다음과 같은
                <br className="sm:hidden" />
                형태로 제작됩니다:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4">
                <div 
                  className="video-container-premium w-40 sm:w-48 h-72 sm:h-80 cursor-pointer"
                  onClick={() => openVideoModal("/videos/1.mp4")}
                  onMouseOver={() => !isMobile && startVideoPreview(video1Ref)}
                  onMouseOut={() => !isMobile && stopVideoPreview(video1Ref)}
                  onTouchStart={() => isMobile && handleTouchStart(video1Ref)}
                  onTouchEnd={() => isMobile && handleTouchEnd(video1Ref)}
                >
                  <video 
                    ref={video1Ref}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/1.mp4"
                    muted
                    loop
                    playsInline
                  />
                  <div className="video-overlay"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg transform transition-transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-faith-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div 
                  className="video-container-premium w-40 sm:w-48 h-72 sm:h-80 cursor-pointer"
                  onClick={() => openVideoModal("/videos/2.mp4")}
                  onMouseOver={() => !isMobile && startVideoPreview(video2Ref)}
                  onMouseOut={() => !isMobile && stopVideoPreview(video2Ref)}
                  onTouchStart={() => isMobile && handleTouchStart(video2Ref)}
                  onTouchEnd={() => isMobile && handleTouchEnd(video2Ref)}
                >
                  <video 
                    ref={video2Ref}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/videos/2.mp4"
                    muted
                    loop
                    playsInline
                  />
                  <div className="video-overlay"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10">
                    <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg transform transition-transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-faith-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-5 text-xs sm:text-sm text-gray-500 italic">
                {isMobile ? (
                  <>
                    영상을 탭하면 미리보기,
                    <br className="sm:hidden" />
                    길게 누르면 전체화면으로 볼 수 있습니다
                  </>
                ) : (
                  <>
                    영상 위에 마우스를 올리면 미리보기,
                    <br className="sm:hidden" />
                    클릭하면 전체화면으로 볼 수 있습니다
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-5 p-4 bg-faith-secondary rounded-lg">
              <p className="text-gray-700 font-medium mb-3 text-sm sm:text-base">
                사연 취합은 아래의 버튼을
                <br className="sm:hidden" />
                눌러서 진행해주세요.
              </p>
              <div className="mt-4">
                <button 
                  onClick={openModal}
                  className="btn-premium w-full sm:w-auto flex items-center justify-center mx-auto"
                >
                  <span className="mr-2">📝</span>
                  사연 제보하기
                </button>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 mt-4 px-2">
              여러분의 사연으로
              <br className="sm:hidden" />
              더 풍성한 콘텐츠를 만들어갑니다
            </p>
          </div>
        </div>
      </main>
      
      <footer className="py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-600 bg-white shadow-inner">
        <div className="container mx-auto px-4">
          <p className="mb-1 sm:mb-2"> {new Date().getFullYear()} 카톡쇼츠 사연제보</p>
          <p className="text-xs text-gray-400">믿음의 이야기를 나누는 공간</p>
        </div>
      </footer>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="text-center p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-faith-primary">사연 제보 안내</h2>
            <div className="mb-5 sm:mb-6 text-left">
              <p className="mb-3 text-sm sm:text-base">
                사연은 대화형식으로 작성해 주세요:
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
                <p className="font-medium mb-1">예시:</p>                
                <p><span className="font-bold">상대:</span> 언니, 저 오늘 못가요</p>
                <p className="mb-2"><span className="font-bold">나:</span> 왜?</p>
                <p><span className="font-bold">상대:</span> 그게...</p>
                <p className="mb-2"><span className="font-bold">나:</span> 무슨일인데?</p>
              </div>
              <p className="text-xs text-gray-500">
                대화형식으로 작성해 주시면 더 생생한 
                <br className="sm:hidden" />
                콘텐츠를 만들 수 있습니다.
              </p>
            </div>
            <p className="mb-5 sm:mb-6 text-sm text-red-500">
              아직 링크가 추가되지
              <br className="sm:hidden" />
              않았습니다.
            </p>
            <button
              onClick={closeModal}
              className="btn-premium"
            >
              확인
            </button>
          </div>
        </Modal>
      )}

      {videoModalSrc && (
        <VideoModal 
          videoSrc={videoModalSrc} 
          onClose={closeVideoModal} 
        />
      )}
    </div>
  );
}
