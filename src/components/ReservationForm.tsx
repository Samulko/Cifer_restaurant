import React from 'react';

const ReservationForm: React.FC = () => {
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" />
      </label>
      <label>
        Date:
        <input type="date" name="date" />
      </label>
      <label>
        Time:
        <input type="time" name="time" />
      </label>
      <label>
        Guests:
        <input type="number" name="guests" />
      </label>
      <label>
        Comments:
        <textarea name="comments" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReservationForm;