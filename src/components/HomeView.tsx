import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  GYM_ASSETS,
  GYM_EQUIPMENTS,
  GYM_OFFERS,
  GYM_TRAINERS,
  type GymEquipment,
  type GymOffer,
  type GymPageRoute,
  type GymTrainer,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onNavigate: (page: GymPageRoute) => void;
  onOpenBooking: () => void;
  onInspectOffer: (offer: GymOffer) => void;
  onInspectEquipment: (eq: GymEquipment) => void;
  onInspectTrainer: (trainer: GymTrainer) => void;
}

type HomeShowcaseTab = 'offers' | 'equipments' | 'trainers';

const HERO_METRICS = [
  { value: '12,000', unit: 'sq ft floor', label: 'Khan Market, New Delhi' },
  { value: '08', unit: 'platforms', label: 'Olympic Competition Racks' },
  { value: '40 m', unit: 'turf track', label: 'Indoor Sprint & Sleds' },
  { value: '05:30', unit: '— 22:30', label: 'Open Daily, 7 Days' },
];

const TRAINING_PILLARS = [
  {
    num: '01.',
    title: 'Calibrated Iron & Turf',
    desc: 'Competition barbells, machined dumbbells up to 60 kg, and a 40m sled lane kept spotless and ready.',
  },
  {
    num: '02.',
    title: 'Coach-Led Mechanics',
    desc: 'Certified strength, conditioning, and boxing coaches watching bar path and posture every day.',
  },
  {
    num: '03.',
    title: 'Thermal Recovery Suite',
    desc: '85°C Finnish cedarwood sauna and 4°C cold plunge pool built to restore your nervous system.',
  },
];

export function HomeView({
  onNavigate,
  onOpenBooking,
  onInspectOffer,
  onInspectEquipment,
  onInspectTrainer,
}: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<HomeShowcaseTab>('offers');

  const scrollToPillars = () => {
    const el = document.getElementById('club-specs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F6F7F4] text-[#11181C]">
      {/* 1. Full-Bleed Bright Sunlit Gym Floor Hero */}
      <section
        data-testid="page-hero"
        className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#11181C]"
      >
        <div className="absolute inset-0">
          <ResilientImage
            src={GYM_ASSETS.heroFloor}
            alt="Sunlit Olympic lifting platforms, sprint turf, and power racks at RAVI GYM"
            loading="eager"
            className="w-full h-full object-cover object-center brightness-105 contrast-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#11181C]/82 via-[#11181C]/42 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#11181C]/50 via-transparent to-[#11181C]/20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#93C5FD] drop-shadow-sm">
              Strength & Conditioning · Est. 2012
            </p>

            <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight leading-[0.94] text-white text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)]">
              <span className="block">Train hard.</span>
              <span className="block text-[#60A5FA]">Leave stronger.</span>
            </h1>

            <p className="text-base md:text-lg text-[#F1F5F9] max-w-lg leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)]">
              Olympic lifting platforms, 40-meter conditioning turf, certified
              coaches, and thermal recovery—built for measurable daily progress.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-md bg-[#1D4ED8] text-white text-sm font-semibold shadow-lg hover:bg-[#2563EB] transition-colors cursor-pointer whitespace-nowrap"
              >
                Start 3-Day Free Trial
              </button>
              <button
                type="button"
                onClick={() => onNavigate('offers')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-white/95 text-[#11181C] text-sm font-semibold shadow-lg hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>View offers</span>
                <ArrowRight className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToPillars}
          className="absolute bottom-6 right-6 md:right-10 z-10 px-4 py-2 rounded-md bg-[#11181C]/70 backdrop-blur-sm border border-white/20 text-[11px] font-semibold tracking-[0.18em] uppercase text-white hover:bg-[#11181C] transition-colors cursor-pointer"
        >
          Scroll to explore ↓
        </button>
      </section>

      {/* 4-Column Club Specs Strip Below Full-Bleed Hero */}
      <section
        id="club-specs"
        className="bg-white border-b border-[#E2E5DD]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-[#11181C] tabular-nums">
                  {metric.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
                  {metric.unit}
                </span>
              </div>
              <p className="text-xs text-[#59646A]">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Deep Graphite Training Pillars Band */}
      <section className="bg-[#11181C] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[16/11] rounded-xl overflow-hidden border border-white/10 bg-[#1B2429]">
              <ResilientImage
                src={GYM_ASSETS.philosophyKettlebells}
                alt="Cast-iron kettlebells, Olympic barbell, and chalk station on sunlit turf"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#60A5FA]">
                The RAVI Standard
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight leading-none text-balance">
                A floor built for serious progress.
              </h2>
            </div>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {TRAINING_PILLARS.map((pillar) => (
                <div
                  key={pillar.num}
                  className="py-5 grid grid-cols-12 gap-4 items-start"
                >
                  <span className="col-span-2 font-mono text-sm font-semibold text-[#60A5FA] tabular-nums">
                    {pillar.num}
                  </span>
                  <div className="col-span-10 space-y-1">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#A9B4BC] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('trainers')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#60A5FA] transition-colors cursor-pointer"
              >
                <span>Meet our coaching team</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Club Explorer (Offers / Equipments / Trainers) */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Inside RAVI GYM
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#11181C]">
              Everything in one place.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Explore gym highlights"
            className="inline-flex items-center gap-1 p-1 bg-[#ECEFE8] rounded-lg self-start md:self-auto"
          >
            {(
              [
                { id: 'offers', label: 'Top Offers' },
                { id: 'equipments', label: 'Equipments' },
                { id: 'trainers', label: 'Trainers' },
              ] as { id: HomeShowcaseTab; label: string }[]
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
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
        </div>

        {activeTab === 'offers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {GYM_OFFERS.slice(0, 3).map((offer) => (
              <article
                key={offer.id}
                onClick={() => onInspectOffer(offer)}
                className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#ECEFE8] overflow-hidden">
                  <ResilientImage
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                        {offer.category}
                      </span>
                      <span className="font-mono font-semibold text-[#11181C] tabular-nums">
                        ₹{offer.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-[#11181C]">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-[#59646A] leading-relaxed">
                      {offer.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#ECEFE8] flex items-center justify-between text-xs font-semibold text-[#1D4ED8]">
                    <span>{offer.billingLabel}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'equipments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {GYM_EQUIPMENTS.slice(0, 3).map((item) => (
              <article
                key={item.id}
                onClick={() => onInspectEquipment(item)}
                className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#ECEFE8] overflow-hidden">
                  <ResilientImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                        {item.category}
                      </span>
                      <span className="font-mono text-[#59646A] tabular-nums">
                        {item.unitsCount} units
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-[#11181C]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#59646A] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#ECEFE8] flex items-center justify-between text-xs font-semibold text-[#1D4ED8]">
                    <span>{item.brandSpec}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'trainers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {GYM_TRAINERS.slice(0, 3).map((trainer) => (
              <article
                key={trainer.id}
                onClick={() => onInspectTrainer(trainer)}
                className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] bg-[#ECEFE8] overflow-hidden">
                  <ResilientImage
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                        {trainer.specialty}
                      </span>
                      <span className="font-mono text-[#59646A] tabular-nums">
                        {trainer.experienceYears} yrs
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-[#11181C]">
                      {trainer.name}
                    </h3>
                    <p className="text-sm text-[#59646A] leading-relaxed">
                      {trainer.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#ECEFE8] flex items-center justify-between text-xs font-semibold text-[#1D4ED8]">
                    <span>{trainer.role}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. Split Cobalt Recovery & Trial Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-2xl overflow-hidden border border-[#E2E5DD]">
          <div className="lg:col-span-7 min-h-[300px] lg:min-h-[400px] bg-[#ECEFE8]">
            <ResilientImage
              src={GYM_ASSETS.recoveryLounge}
              alt="RAVI GYM Finnish cedar sauna and 4°C cold plunge recovery suite"
              className="w-full h-full lg:h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 bg-[#1D4ED8] text-white p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              Train & Recover
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight leading-none text-balance">
              Experience the floor for 3 days free.
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Test our Olympic racks, sprint turf, and recovery sauna with a
              complimentary movement screen before committing to any plan.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-[#11181C] text-sm font-semibold hover:bg-[#F6F7F4] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Claim 3-Day Free Pass</span>
                <ArrowRight className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
