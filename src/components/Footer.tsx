import type { GymPageRoute } from '../data/gymData';

interface FooterProps {
  onNavigate: (page: GymPageRoute) => void;
  onOpenBooking: () => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#11181C] text-[#CBD5DC] border-t border-[#232D33]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Column 1: Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold tracking-tight uppercase text-white">
              RAVI GYM
            </span>
          </div>
          <p className="text-sm text-[#9CA9B2] max-w-sm leading-relaxed">
            Strength, conditioning, and thermal recovery in Khan Market, New
            Delhi. Built for disciplined daily training.
          </p>
        </div>

        {/* Column 2: Explore */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-col gap-2.5 text-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7E8C95] mb-1">
            Explore
          </p>
          <button
            type="button"
            onClick={() => onNavigate('offers')}
            className="text-left text-[#CBD5DC] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Membership Offers
          </button>
          <button
            type="button"
            onClick={() => onNavigate('equipments')}
            className="text-left text-[#CBD5DC] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Equipments
          </button>
          <button
            type="button"
            onClick={() => onNavigate('trainers')}
            className="text-left text-[#CBD5DC] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Coaching Team
          </button>
          <button
            type="button"
            onClick={() => onNavigate('facilities')}
            className="text-left text-[#CBD5DC] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Facilities & Recovery
          </button>
        </nav>

        {/* Column 3: Hours & Trial */}
        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7E8C95]">
            Hours & Location
          </p>
          <p className="text-white font-medium">Open daily</p>
          <p className="font-mono tabular-nums text-[#CBD5DC]">05:30 — 22:30</p>
          <p className="text-xs text-[#9CA9B2]">Khan Market · New Delhi</p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors cursor-pointer whitespace-nowrap"
            >
              Book 3-Day Free Trial
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7E8C95]">
          <span>© 2026 RAVI GYM. All rights reserved.</span>
          <span>Strength · Conditioning · Thermal Recovery</span>
        </div>
      </div>
    </footer>
  );
}
