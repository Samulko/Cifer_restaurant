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
    <div className="fixed top-12 right-24 flex items-center space-x-4 z-[9999]">
      <button
        onClick={onLanguageChange}
        className="w-12 h-12 border-2 border-white rounded-md
                flex items-center justify-center
                bg-black/50
                transition-colors duration-300 ease-in-out
                hover:bg-white hover:border-black/50
                hover:text-black text-white"
      >
        {currentLanguage === 'en' ? 'SK' : 'EN'}
      </button>
      <button
        onClick={handleReservationClick}
        className="w-28 h-12 border-2 border-white rounded-md
                flex items-center justify-center
                bg-black/50
                transition-colors duration-300 ease-in-out
                hover:bg-white hover:border-black/50
                hover:text-black text-white"
      >
        Reservation
      </button>
    </div>
  );
};

export default ReservationButton;
