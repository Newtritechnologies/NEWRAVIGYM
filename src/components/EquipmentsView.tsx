import { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import {
  EQUIPMENT_CATEGORIES,
  GYM_EQUIPMENTS,
  type EquipmentCategory,
  type GymEquipment,
} from '../data/gymData';
import { ResilientImage } from './ResilientImage';

interface EquipmentsViewProps {
  onSelectEquipment: (equipment: GymEquipment) => void;
}

export function EquipmentsView({ onSelectEquipment }: EquipmentsViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<EquipmentCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEquipments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return GYM_EQUIPMENTS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (query) {
        const hay = `${item.name} ${item.summary} ${item.targetMuscles} ${item.category}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F6F7F4] min-h-screen text-[#11181C]">
      {/* Header */}
      <section className="bg-white border-b border-[#E2E5DD]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-16 space-y-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1D4ED8]">
              Floor Equipment Directory
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-none text-balance">
              Calibrated steel, turf, and machines.
            </h1>
            <p className="text-base text-[#59646A] leading-relaxed">
              Inspect specifications, target muscle groups, and station counts
              across every training bay.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#ECEFE8] rounded-lg self-start">
              {EQUIPMENT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

            <div className="relative w-full lg:w-72">
              <Search
                className="w-4 h-4 text-[#7E8C95] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search racks, dumbbells, sleds..."
                aria-label="Search gym equipment"
                className="w-full pl-10 pr-9 py-2.5 bg-[#F6F7F4] border border-[#D4D9CE] rounded-md text-sm text-[#11181C] placeholder:text-[#7E8C95] focus:outline-none focus:border-[#1D4ED8]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7E8C95] hover:text-[#11181C] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Equipment Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12 pb-24">
        {filteredEquipments.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#E2E5DD] rounded-xl space-y-4">
            <p className="font-display text-2xl font-bold uppercase text-[#11181C]">
              No matching equipment found.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredEquipments.map((item) => (
              <article
                key={item.id}
                onClick={() => onSelectEquipment(item)}
                className="group bg-white rounded-xl border border-[#E2E5DD] hover:border-[#1D4ED8] transition-colors overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#ECEFE8] overflow-hidden">
                  <ResilientImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3 font-mono text-[11px] font-semibold text-white bg-[#11181C]/80 px-2.5 py-1 rounded">
                    {item.index}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                        {item.category}
                      </span>
                      <span className="font-mono tabular-nums text-[#59646A]">
                        {item.unitsCount} units
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-bold uppercase text-[#11181C]">
                      {item.name}
                    </h2>

                    <p className="text-sm text-[#59646A] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ECEFE8] flex items-center justify-between gap-3 text-xs">
                    <span className="text-[#59646A] truncate">
                      {item.brandSpec}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEquipment(item);
                      }}
                      className="font-semibold text-[#1D4ED8] inline-flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
