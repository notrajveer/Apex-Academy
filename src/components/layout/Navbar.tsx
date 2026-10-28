'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore, TEAM_THEMES, TeamAccent } from '@/store/useAppStore';
import { Gauge, Cpu, Trophy, ShieldAlert, Sparkles, Zap } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    persona,
    togglePersona,
    regulationEra,
    setRegulationEra,
    teamAccent,
    setTeamAccent,
    xp,
  } = useAppStore();

  // Prevents Next.js Hydration Mismatch: Server renders default state first,
  // then client loads saved preferences from localStorage once mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const theme = TEAM_THEMES[teamAccent];
    document.documentElement.style.setProperty('--accent-hex', theme.hex);
    document.documentElement.style.setProperty('--accent-rgb', theme.rgb);
  }, [teamAccent, mounted]);

  const activeTheme = mounted ? TEAM_THEMES[teamAccent] : TEAM_THEMES.FERRARI;

  const navLinks = [
    { href: '/', label: 'Command Center', icon: Sparkles },
    { href: '/garage', label: '3D Aero Garage', icon: Cpu },
    { href: '/telemetry', label: 'Driver Telemetry', icon: Gauge },
    { href: '/paddock', label: 'Pit Wall & Reflex', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1E1E24] bg-[#0A0A0C]/90 backdrop-blur-md">
      {/* Top 2px Dynamic Team Neon Accent Strip */}
      <div
        className="h-[2px] w-full transition-colors duration-500"
        style={{ backgroundColor: activeTheme.hex }}
      />

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E1E24] bg-[#121216] font-mono text-sm font-bold tracking-tighter transition-transform group-hover:scale-105"
            style={{
              color: activeTheme.hex,
              boxShadow: `0 0 15px rgba(${activeTheme.rgb}, 0.18)`,
            }}
          >
            F1
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white">
              APEX <span className="font-light text-zinc-400">ACADEMY</span>
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Engineering & Telemetry Lab
            </span>
          </div>
        </Link>

        {/* Primary Module Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-lg border border-[#1E1E24] bg-[#121216] p-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-800/90 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon
                  className="h-3.5 w-3.5"
                  style={{ color: isActive ? activeTheme.hex : undefined }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Era Toggle, Persona Switch, Team Palette & XP */}
        <div className="flex items-center gap-3">
          {/* 2025 vs 2026 Regulation Switch */}
          <button
            onClick={() =>
              setRegulationEra(
                regulationEra === '2026_ACTIVE_AERO'
                  ? '2025_GROUND_EFFECT'
                  : '2026_ACTIVE_AERO'
              )
            }
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#1E1E24] bg-[#121216] px-2.5 py-1.5 font-mono text-[11px] text-zinc-300 hover:border-zinc-700 transition"
            title="Switch FIA Technical Regulation Era"
          >
            <span className="text-zinc-500">ERA:</span>
            <span className="font-semibold text-white">
              {mounted && regulationEra === '2026_ACTIVE_AERO' ? '2026 ACTIVE AERO' : '2025 DRS / VENTURI'}
            </span>
          </button>

          {/* Dual Track Persona Toggle: ROOKIE vs VETERAN */}
          <button
            onClick={togglePersona}
            className="relative flex items-center gap-2 rounded-lg border border-[#1E1E24] bg-[#121216] px-3 py-1.5 text-xs font-semibold transition-all hover:border-zinc-700"
            style={{
              borderColor:
                mounted && persona === 'VETERAN' ? activeTheme.hex : '#1E1E24',
            }}
          >
            {mounted && persona === 'VETERAN' ? (
              <>
                <ShieldAlert
                  className="h-3.5 w-3.5"
                  style={{ color: activeTheme.hex }}
                />
                <span className="font-mono tracking-wider text-white">
                  VETERAN MODE
                </span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-mono tracking-wider text-zinc-200">
                  ROOKIE MODE
                </span>
              </>
            )}
          </button>

          {/* Team Neon Color Swatches */}
          <div className="flex items-center gap-1.5 rounded-lg border border-[#1E1E24] bg-[#121216] px-2 py-1.5">
            {(Object.keys(TEAM_THEMES) as TeamAccent[]).map((key) => {
              const theme = TEAM_THEMES[key];
              const isSelected = mounted && teamAccent === key;
              return (
                <button
                  key={key}
                  onClick={() => setTeamAccent(key)}
                  aria-label={theme.name}
                  title={theme.name}
                  className={`h-3.5 w-3.5 rounded-full transition-transform ${
                    isSelected ? 'scale-125 ring-2 ring-white/80' : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: theme.hex }}
                />
              );
            })}
          </div>

          {/* XP Counter */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-[#1E1E24] bg-[#121216] px-2.5 py-1.5 font-mono text-xs">
            <span className="text-zinc-500">XP</span>
            <span className="font-bold" style={{ color: activeTheme.hex }}>
              {mounted ? xp : 120}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}