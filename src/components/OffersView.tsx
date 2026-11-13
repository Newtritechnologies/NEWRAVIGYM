import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  GYM_OFFERS,
  OFFER_CATEGORIES,
  type GymOffer,
  type OfferCategory,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface OffersViewProps {
  onSelectOffer: (offer: GymOffer) => void;
  onClaimOffer: (offer: GymOffer) => void;
}

export function OffersView({ onSelectOffer, onClaimOffer }: OffersViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<OfferCategory>('All');

  const filteredOffers = useMemo(() => {
    if (selectedCategory === 'All') return GYM_OFFERS;
    return GYM_OFFERS.filter((offer) => offer.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-[#F6F7F4] min-h-screen text-[#11181C]">
      {/* Header */}
      <section className="bg-white border-b border-[#E2E5DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Membership & Seasonal Offers
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-none text-balance">
              Transparent plans. Zero joining fees.
            </h1>
            <p className="text-base text-[#59646A] leading-relaxed">
              Every membership includes a coach-led onboarding screen and full
              locker & shower service.
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#ECEFE8] rounded-lg self-start">
            {OFFER_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#11181C] shadow-sm'
                      : 'text-[#59646A] hover:text-[#11181C]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Column Membership Tier Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredOffers.map((offer) => (
            <article
              key={offer.id}
              onClick={() => onSelectOffer(offer)}
              className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-[#ECEFE8] overflow-hidden">
                <ResilientImage
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold text-white bg-[#11181C]/80 px-2.5 py-1 rounded">
                  {offer.index}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      {offer.category}
                    </span>
                    <span className="text-[#59646A]">{offer.billingLabel}</span>
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-bold uppercase text-[#11181C]">
                      {offer.title}
                    </h2>
                    <div className="flex items-baseline gap-2.5 mt-2">
                      <span className="font-mono text-3xl font-bold text-[#11181C] tabular-nums">
                        ₹{offer.price.toLocaleString('en-IN')}
                      </span>
                      {offer.originalPrice && (
                        <span className="font-mono text-sm text-[#869197] line-through tabular-nums">
                          ₹{offer.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#59646A] leading-relaxed">
                    {offer.summary}
                  </p>

                  <ul className="pt-3 border-t border-[#ECEFE8] space-y-2">
                    {offer.inclusions.slice(0, 3).map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-2 text-xs text-[#374147]"
                      >
                        <Check
                          className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#ECEFE8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOffer(offer);
                    }}
                    className="text-xs font-semibold text-[#374147] hover:text-[#1D4ED8] inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <span>View details</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClaimOffer(offer);
                    }}
                    className="px-4 py-2 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Claim offer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
