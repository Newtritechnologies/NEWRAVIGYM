import { ArrowRight, Check } from 'lucide-react';
import { GYM_FACILITIES, type GymFacility } from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface FacilitiesViewProps {
  onSelectFacility: (facility: GymFacility) => void;
  onBookTour: (facilityName: string) => void;
}

export function FacilitiesView({
  onSelectFacility,
  onBookTour,
}: FacilitiesViewProps) {
  return (
    <div className="bg-[#F6F7F4] min-h-screen text-[#11181C]">
      {/* Header */}
      <section className="bg-white border-b border-[#E2E5DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16 space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D4ED8]">
            Facilities & Recovery
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-none text-balance max-w-3xl">
            Four sunlit floors built for training and recovery.
          </h1>
          <p className="text-base text-[#59646A] max-w-2xl leading-relaxed">
            Explore our strength platforms, 40-meter turf arena, combat studio,
            and Finnish sauna & cold plunge suite.
          </p>
        </div>
      </section>

      {/* 2-Column Bento Facility Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GYM_FACILITIES.map((facility) => (
            <article
              key={facility.id}
              onClick={() => onSelectFacility(facility)}
              className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-[#ECEFE8] overflow-hidden">
                <ResilientImage
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold text-white bg-[#11181C]/80 px-2.5 py-1 rounded">
                  {facility.index}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      {facility.areaOrCapacity}
                    </span>
                    <span className="font-mono text-[#59646A] tabular-nums">
                      {facility.hours}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl font-bold uppercase text-[#11181C]">
                      {facility.name}
                    </h2>
                    <p className="text-sm font-medium text-[#59646A] mt-0.5">
                      {facility.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-[#4B555B] leading-relaxed">
                    {facility.summary}
                  </p>

                  <ul className="pt-3 border-t border-[#ECEFE8] space-y-2">
                    {facility.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-[#374147]"
                      >
                        <Check
                          className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#ECEFE8] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFacility(facility);
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
                      onBookTour(facility.name);
                    }}
                    className="px-4 py-2 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Book a tour
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
