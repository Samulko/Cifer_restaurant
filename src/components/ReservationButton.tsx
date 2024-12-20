'use client';

const ReservationButton = () => {
  return (
    <button 
      className="fixed top-12 right-24 w-28 h-12 border-2 border-white rounded-md
                flex items-center justify-center
                bg-black/50
                transition-colors duration-300 ease-in-out
                hover:bg-white hover:border-black/50
                hover:text-black text-white
                z-[9999]"
    >
      Reservation
    </button>
  );
};

export default ReservationButton;
