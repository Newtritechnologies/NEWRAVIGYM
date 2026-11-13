import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { GymPageRoute } from '../data/gymData';

interface NavbarProps {
  activePage: GymPageRoute;
  onNavigate: (page: GymPageRoute) => void;
  onOpenBooking: () => void;
}

const NAV_ITEMS: { id: GymPageRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'offers', label: 'Offers' },
  { id: 'equipments', label: 'Equipments' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'facilities', label: 'Facilities' },
];

export function Navbar({ activePage, onNavigate, onOpenBooking }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (page: GymPageRoute) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F7F4]/92 backdrop-blur-md border-b border-[#E2E5DD]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="font-display text-2xl font-extrabold tracking-tight uppercase text-[#11181C] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
        >
          RAVI GYM
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] ${
                  isActive
                    ? 'text-[#1D4ED8] font-semibold'
                    : 'text-[#4B555B] hover:text-[#11181C]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1D4ED8]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold tracking-wide hover:bg-[#1E40AF] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Book free trial
          </button>

          <button
            type="button"
            aria-label={
              mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#11181C] hover:text-[#1D4ED8] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#FFFFFF] border-t border-[#E2E5DD] px-6 py-4 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left py-3 text-base font-medium border-b border-[#E2E5DD] last:border-b-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#1D4ED8] font-semibold' : 'text-[#374147] hover:text-[#11181C]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
