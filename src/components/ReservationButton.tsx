'use client';

interface ReservationButtonProps {
  currentLanguage: string;
  onLanguageChange: () => void;
}

const ReservationButton = ({ currentLanguage, onLanguageChange }: ReservationButtonProps) => {
  const handleReservationClick = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#reservation', {
        duration: 1.5
      });
    }
  };

  return (
    <div className="fixed top-12 right-8 md:right-24 flex items-center space-x-2 md:space-x-4 z-[9999]">
      <button
        onClick={onLanguageChange}
        className="w-10 h-10 md:w-12 md:h-12 border-2 border-white rounded-md
                flex items-center justify-center
                bg-black/50 text-sm md:text-base
                transition-colors duration-300 ease-in-out
                hover:bg-white hover:border-black/50
                hover:text-black text-white"
      >
        {currentLanguage === 'en' ? 'SK' : 'EN'}
      </button>
      <button
        onClick={handleReservationClick}
        className="w-20 h-10 md:w-28 md:h-12 border-2 border-white rounded-md
                flex items-center justify-center
                bg-black/50 text-xs md:text-base
                transition-colors duration-300 ease-in-out
                hover:bg-white hover:border-black/50
                hover:text-black text-white"
      >
        <span className="hidden sm:inline">Reservation</span>
        <span className="sm:hidden">Book</span>
      </button>
    </div>
  );
};

export default ReservationButton;
