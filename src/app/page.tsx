'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppStore, TEAM_THEMES } from '@/store/useAppStore';
import { Cpu, Gauge, Trophy, ArrowUpRight, Layers, Activity } from 'lucide-react';

export default function HomePage() {
  const { persona, regulationEra, teamAccent } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? TEAM_THEMES[teamAccent] : TEAM_THEMES.FERRARI;
  const isVeteran = mounted && persona === 'VETERAN';
  const is2026 = !mounted || regulationEra === '2026_ACTIVE_AERO';

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#1E1E24] bg-[#121216] p-8 md:p-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-15 transition-colors duration-700"
          style={{ backgroundColor: activeTheme.hex }}
        />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E1E24] bg-[#0A0A0C] px-3.5 py-1 font-mono text-xs">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeTheme.hex }}
            />
            <span className="text-zinc-400">ACTIVE TRACK:</span>
            <span className="font-bold text-white">
              {isVeteran ? 'VETERAN (RACE ENGINEER)' : 'ROOKIE (FUNDAMENTALS)'}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {isVeteran
              ? 'Aerodynamic Surfaces, Venturi Throats & Pit Wall Deltas.'
              : 'Master Formula 1 From the Ground Up.'}
          </h1>

          <p className="text-base text-zinc-400 leading-relaxed">
            {isVeteran
              ? 'Inspect floor suction coefficients, MGU-K 350kW deployment schedules, and historical teammate qualifying gaps across regulation eras.'
              : 'No engineering degree required. Flip the Persona toggle in the top bar anytime to switch between visual plain-English guides and raw race-engineer telemetry.'}
          </p>
        </div>
      </section>

      {/* Live Dual-Persona Proof Card: Shows how the site adapts dynamically */}
      <section className="rounded-2xl border border-[#1E1E24] bg-[#121216] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E1E24] pb-5">
          <div className="flex items-center gap-2.5">
            <Layers className="h-5 w-5" style={{ color: activeTheme.hex }} />
            <h2 className="text-lg font-bold text-white">
              Live Concept Preview: Straight-Line Overtaking System
            </h2>
          </div>
          <span className="rounded-md border border-[#1E1E24] bg-[#0A0A0C] px-3 py-1 font-mono text-xs text-zinc-400">
            {is2026 ? 'REGULATION: 2026 ACTIVE AERO' : 'REGULATION: 2022–2025 DRS'}
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              {isVeteran ? 'Technical Specification' : 'How It Works (Plain English)'}
            </span>
            <h3 className="text-2xl font-bold text-white">
              {is2026
                ? isVeteran
                  ? 'X-Mode / Z-Mode Coupled Active Aero & 350kW Override'
                  : '2026 Active Aerodynamics & Manual Boost Button'
                : isVeteran
                ? 'Drag Reduction System (DRS) Flap Actuator (85mm Slot Gap)'
                : 'DRS: The Rear Wing Flap That Opens to Pass Cars'}
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {is2026
                ? isVeteran
                  ? 'To prevent front-axle aero balance migration when shedding drag for the 350kW MGU-K deployment regime, both front and rear wing elements articulate simultaneously. Drivers transition from high-downforce Z-Mode in cornering complexes to low-drag X-Mode on designated straights, while cars within 1.0s receive Manual Override Mode (MOM) sustaining 350kW electrical deployment up to 337 km/h.'
                  : 'Starting in 2026, traditional rear-wing-only DRS is gone. Instead, every driver can flatten BOTH their front and rear wings on straights ("X-Mode") to slice through the air faster, and snap them back up ("Z-Mode") for grip in the corners. If you are within 1 second of the car ahead, you unlock an extra battery power boost to help you overtake.'
                : isVeteran
                ? 'When trailing within 1.000s at the detection loop, hydraulic actuators raise the upper rear wing element by up to 85mm in designated activation zones. This sheds ~22–28% of total aerodynamic drag and shifts center-of-pressure forward, yielding a +12 to +16 km/h terminal velocity delta before braking.'
                : 'When you are less than 1 second behind another car at the detection line, you can press a button on the steering wheel that pops open the top flap of the rear wing. This lets air pass right through instead of pushing down on the car, giving you a 15 km/h speed boost to pass them on the straight.'}
            </p>
          </div>

          {/* Telemetry Readout Box */}
          <div className="rounded-xl border border-[#1E1E24] bg-[#0A0A0C] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500">TELEMETRY DELTA</span>
              <Activity className="h-4 w-4" style={{ color: activeTheme.hex }} />
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#1E1E24] pb-2">
                <span className="text-zinc-400">Drag Reduction</span>
                <span className="font-bold text-white">
                  {is2026 ? '-30% (Front + Rear)' : '-24% (Rear Flap)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#1E1E24] pb-2">
                <span className="text-zinc-400">MGU-K Electrical Power</span>
                <span className="font-bold text-white">
                  {is2026 ? '350 kW (~470 HP)' : '120 kW (~160 HP)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Overtake Mechanism</span>
                <span className="font-bold" style={{ color: activeTheme.hex }}>
                  {is2026 ? 'Manual Override (MOM)' : '1.0s DRS Zone'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Platform Modules (What we build next) */}
      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Interactive 3D Garage',
            badge: 'MILESTONE 2',
            href: '/garage',
            icon: Cpu,
            desc: 'Exploded 3D F1 car with clickable raycasted hotspots for the Front Wing, Venturi Underfloor, Suspension, and Hybrid Power Unit.',
          },
          {
            title: 'Driver Career & Telemetry Hub',
            badge: 'MILESTONE 3',
            href: '/telemetry',
            icon: Gauge,
            desc: 'Historical team progression timelines (McLaren -> Mercedes -> Ferrari) and teammate qualifying/race head-to-head metrics.',
          },
          {
            title: 'Reflex Gantry & Pit Wall Lab',
            badge: 'MILESTONE 4 & 5',
            href: '/paddock',
            icon: Trophy,
            desc: '5-Red-Lights millisecond reflex test with jump-start detection, server-graded quizzes, and safety car pit strategy simulations.',
          },
        ].map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.title}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#1E1E24] bg-[#121216] p-6 transition-all hover:border-zinc-700"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E1E24] bg-[#0A0A0C]"
                    style={{ color: activeTheme.hex }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-500">
                    {mod.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{mod.desc}</p>
              </div>

              <div className="mt-6 flex items-center gap-1 font-mono text-xs font-semibold text-zinc-300 group-hover:text-white">
                <span>Module Blueprint Ready</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}