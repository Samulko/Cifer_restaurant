import React from 'react';
import { translations as enTranslations } from '../../public/locales/en';
import { translations as skTranslations } from '../../public/locales/sk';

interface ReservationFormProps {
  currentLanguage: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ currentLanguage }) => {
  const translations = currentLanguage === 'en' ? enTranslations : skTranslations;
  const t = translations.reservationForm;

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.name} {t.required}
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.email} {t.required}
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.date} {t.required}
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.time} {t.required}
          </label>
          <select
            name="time"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          >
            <option value="">{t.selectTime}</option>
            {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.guests} {t.required}
          </label>
          <input
            type="number"
            name="guests"
            min="1"
            max="8"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {t.specialRequests}
        </label>
        <textarea
          name="comments"
          rows={3}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition-colors"
      >
        {t.confirmReservation}
      </button>
    </form>
  );
};

export default ReservationForm;