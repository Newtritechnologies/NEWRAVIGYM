import { useEffect, useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { GYM_OFFERS, GYM_TRAINERS } from '../data/gymData';

export type BookingIntent = 'trial' | 'offer' | 'trainer' | 'tour';

interface BookingModalProps {
  isOpen: boolean;
  initialIntent?: BookingIntent;
  initialSelectionLabel?: string;
  onClose: () => void;
}

const TIME_SLOTS = ['06:30', '09:00', '12:30', '17:30', '19:30'];

function getDefaultDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function BookingModal({
  isOpen,
  initialIntent = 'trial',
  initialSelectionLabel,
  onClose,
}: BookingModalProps) {
  const [intent, setIntent] = useState<BookingIntent>(initialIntent);
  const [selectedOption, setSelectedOption] = useState(
    initialSelectionLabel || '3-Day All-Access Free Trial'
  );
  const [date, setDate] = useState(getDefaultDate);
  const [timeSlot, setTimeSlot] = useState('09:00');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goalNote, setGoalNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmationId, setConfirmationId] = useState<string | null>(null);

  useEffect(() => {
    setIntent(initialIntent);
    if (initialSelectionLabel) {
      setSelectedOption(initialSelectionLabel);
    } else if (initialIntent === 'trial') {
      setSelectedOption('3-Day All-Access Free Trial');
    } else if (initialIntent === 'offer') {
      setSelectedOption(GYM_OFFERS[0].title);
    } else if (initialIntent === 'trainer') {
      setSelectedOption(GYM_TRAINERS[0].name);
    } else {
      setSelectedOption('Full Gym & Recovery Tour');
    }
    setConfirmationId(null);
    setErrorMsg('');
  }, [initialIntent, initialSelectionLabel, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    setErrorMsg('');
    const code = `RAVIGYM-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationId(code);
  };

  const handleDownloadIcs = () => {
    if (!confirmationId) return;
    const [year, month, day] = date.split('-');
    const [hour, minute] = timeSlot.split(':');
    const startUtc = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String((Number(hour) + 1) % 24).padStart(2, '0');
    const endUtc = `${year}${month}${day}T${endHour}${minute}00`;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//RAVI GYM//Pass//EN',
      'BEGIN:VEVENT',
      `UID:${confirmationId}@ravigym.in`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:RAVI GYM — ${selectedOption}`,
      `LOCATION:RAVI GYM, Khan Market, New Delhi`,
      `DESCRIPTION:Pass ${confirmationId} · ${selectedOption}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ravi-gym-${confirmationId}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#11181C]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-[#E2E5DD] rounded-2xl shadow-2xl p-7 md:p-10 max-h-[90vh] overflow-y-auto text-[#11181C]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-[#D4D9CE] text-[#11181C] hover:border-[#1D4ED8] hover:text-[#1D4ED8] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {confirmationId ? (
          <div className="space-y-6 py-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#1D4ED8] uppercase">
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>Pass Confirmed</span>
            </div>

            <div className="space-y-2">
              <h2
                id="booking-modal-title"
                className="font-display text-4xl font-bold uppercase text-[#11181C]"
              >
                You’re locked in, {fullName}.
              </h2>
              <p className="text-sm text-[#59646A]">
                Pass details sent to{' '}
                <span className="font-medium text-[#11181C]">{email}</span>.
                Reference code{' '}
                <span className="font-mono font-semibold text-[#1D4ED8]">
                  {confirmationId}
                </span>
                .
              </p>
            </div>

            <div className="border border-[#E2E5DD] rounded-xl bg-[#F6F7F4] p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-xs text-[#59646A]">Selected Pass / Session</p>
                <p className="text-[#11181C] font-semibold mt-1">
                  {selectedOption}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#59646A]">First Visit</p>
                <p className="font-mono tabular-nums text-[#11181C] font-semibold mt-1">
                  {date} · {timeSlot}
                </p>
              </div>
              {goalNote && (
                <div className="sm:col-span-2 pt-3 border-t border-[#E2E5DD]">
                  <p className="text-xs text-[#59646A]">Training Goal Note</p>
                  <p className="text-[#374147] mt-1">{goalNote}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Add to calendar</span>
              </button>
              <button
                type="button"
                onClick={() => setConfirmationId(null)}
                className="px-5 py-2.5 rounded-md border border-[#CBD2C6] text-xs font-semibold text-[#374147] hover:border-[#11181C] transition-colors cursor-pointer"
              >
                Edit details
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-[#59646A] hover:text-[#11181C] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 pr-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D4ED8]">
                RAVI GYM · Khan Market
              </p>
              <h2
                id="booking-modal-title"
                className="font-display text-4xl font-bold uppercase text-[#11181C] tracking-tight"
              >
                Book your visit.
              </h2>
              <p className="text-sm text-[#59646A]">
                Open daily 05:30 — 22:30. Bring flat training shoes; lockers
                and towels are provided.
              </p>
            </div>

            {/* Intent Tabs */}
            <div className="inline-flex flex-wrap gap-1 p-1 bg-[#ECEFE8] rounded-lg">
              {(
                [
                  { id: 'trial', label: '3-Day Free Trial' },
                  { id: 'offer', label: 'Claim Offer' },
                  { id: 'trainer', label: '1-on-1 Coaching' },
                  { id: 'tour', label: 'Facility Tour' },
                ] as { id: BookingIntent; label: string }[]
              ).map((tab) => {
                const isActive = intent === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setIntent(tab.id);
                      if (tab.id === 'trial') {
                        setSelectedOption('3-Day All-Access Free Trial');
                      } else if (tab.id === 'offer') {
                        setSelectedOption(GYM_OFFERS[0].title);
                      } else if (tab.id === 'trainer') {
                        setSelectedOption(GYM_TRAINERS[0].name);
                      } else {
                        setSelectedOption('Full Gym & Recovery Tour');
                      }
                    }}
                    className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#11181C] shadow-sm'
                        : 'text-[#59646A] hover:text-[#11181C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Selection & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#374147]">
                  {intent === 'trainer'
                    ? 'Select Coach'
                    : intent === 'offer'
                      ? 'Select Membership Offer'
                      : 'Selected Pass / Visit'}
                </span>
                {intent === 'offer' ? (
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] focus:outline-none focus:border-[#1D4ED8]"
                  >
                    {GYM_OFFERS.map((offer) => (
                      <option key={offer.id} value={offer.title}>
                        {offer.title} (₹{offer.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                ) : intent === 'trainer' ? (
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] focus:outline-none focus:border-[#1D4ED8]"
                  >
                    {GYM_TRAINERS.map((trainer) => (
                      <option key={trainer.id} value={trainer.name}>
                        {trainer.name} — {trainer.specialty}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] focus:outline-none focus:border-[#1D4ED8]"
                  />
                )}
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#374147]">
                  Start / Visit Date
                </span>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] font-mono focus:outline-none focus:border-[#1D4ED8]"
                />
              </label>
            </div>

            {/* Preferred Time Slot */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#374147]">
                Preferred Arrival Window
              </span>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isActive = timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`px-4 py-2 font-mono tabular-nums text-xs rounded-md transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#1D4ED8] text-white font-semibold'
                          : 'border border-[#D4D9CE] bg-white text-[#374147] hover:border-[#11181C]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#374147]">
                  Full Name
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rohan Sharma"
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] placeholder:text-[#869197] focus:outline-none focus:border-[#1D4ED8]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#374147]">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rohan@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] placeholder:text-[#869197] focus:outline-none focus:border-[#1D4ED8]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-[#374147]">
                  Phone
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98100 54321"
                  className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] placeholder:text-[#869197] focus:outline-none focus:border-[#1D4ED8]"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-[#374147]">
                Training goals or injury history (optional)
              </span>
              <input
                type="text"
                value={goalNote}
                onChange={(e) => setGoalNote(e.target.value)}
                placeholder="Strength foundation, conditioning, shoulder mobility..."
                className="w-full px-3.5 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] placeholder:text-[#869197] focus:outline-none focus:border-[#1D4ED8]"
              />
            </label>

            {errorMsg && (
              <p
                role="alert"
                className="text-xs font-medium text-[#B91C1C] bg-[#FEF2F2] border border-[#FECACA] rounded-md px-3.5 py-2.5"
              >
                {errorMsg}
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-medium text-[#59646A] hover:text-[#11181C] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors cursor-pointer"
              >
                Confirm pass
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
