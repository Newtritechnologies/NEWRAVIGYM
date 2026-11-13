import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  GYM_TRAINERS,
  TRAINER_SPECIALTIES,
  type GymTrainer,
  type TrainerSpecialty,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface TrainersViewProps {
  onSelectTrainer: (trainer: GymTrainer) => void;
  onBookTrainer: (trainer: GymTrainer) => void;
}

export function TrainersView({
  onSelectTrainer,
  onBookTrainer,
}: TrainersViewProps) {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<TrainerSpecialty>('All');

  const visibleTrainers = useMemo(() => {
    if (selectedSpecialty === 'All') return GYM_TRAINERS;
    return GYM_TRAINERS.filter((t) => t.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

  return (
    <div className="bg-[#F6F7F4] min-h-screen text-[#11181C]">
      {/* Header */}
      <section className="bg-white border-b border-[#E2E5DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Coaching Roster
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-none text-balance">
              Technique first. Numbers second.
            </h1>
            <p className="text-base text-[#59646A] leading-relaxed">
              Book 1-on-1 strength, conditioning, boxing, or Olympic lifting
              sessions with our full-time coaching staff.
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#ECEFE8] rounded-lg self-start">
            {TRAINER_SPECIALTIES.map((specialty) => {
              const isActive = selectedSpecialty === specialty;
              return (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#11181C] shadow-sm'
                      : 'text-[#59646A] hover:text-[#11181C]'
                  }`}
                >
                  {specialty}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Horizontal Split Coach Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {visibleTrainers.map((trainer) => (
            <article
              key={trainer.id}
              onClick={() => onSelectTrainer(trainer)}
              className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer grid grid-cols-1 sm:grid-cols-12 items-stretch"
            >
              <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto bg-[#ECEFE8] overflow-hidden">
                <ResilientImage
                  src={trainer.image}
                  alt={`${trainer.name} — ${trainer.role}`}
                  className="w-full h-full sm:h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold text-white bg-[#11181C]/80 px-2.5 py-1 rounded">
                  {trainer.index}
                </span>
              </div>

              <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      {trainer.role}
                    </span>
                    <span className="font-mono text-[#59646A] tabular-nums">
                      {trainer.experienceYears} yrs exp
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl font-bold uppercase text-[#11181C]">
                      {trainer.name}
                    </h2>
                    <p className="text-xs text-[#59646A] mt-0.5">
                      {trainer.certifications.join(' · ')}
                    </p>
                  </div>

                  <p className="text-sm text-[#4B555B] leading-relaxed">
                    {trainer.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ECEFE8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTrainer(trainer);
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
                      onBookTrainer(trainer);
                    }}
                    className="px-4 py-2 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Book · ₹{trainer.sessionPrice}
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
