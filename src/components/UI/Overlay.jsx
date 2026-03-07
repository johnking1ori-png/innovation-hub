import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';

export default function Overlay() {
    const [locked, setLocked] = useState(false);
    const { isPerspective, toggleProjection } = useStore();

    useEffect(() => {
        const handleLock = () => {
            setLocked(!!document.pointerLockElement);
        };
        document.addEventListener('pointerlockchange', handleLock);
        return () => document.removeEventListener('pointerlockchange', handleLock);
    }, []);

    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 10, display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', padding: '30px',
            background: locked ? 'transparent' : 'radial-gradient(circle at center, rgba(15,23,42,0.4) 0%, rgba(2,6,23,0.9) 100%)',
            transition: 'background 0.5s ease'
        }}>

            {/* Top Left Branding */}
            <div style={{
                background: 'rgba(15, 23, 42, 0.4)', padding: '24px 32px', borderRadius: '16px',
                width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
            }}>
                <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 900, letterSpacing: '-1px' }} className="text-gradient">
                    Zuntenium <span style={{ fontSize: '16px', color: '#94a3b8' }}>&reg;</span>
                </h1>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#e2e8f0', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Quantum Innovation Hub
                </h2>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, #60a5fa 0%, transparent 100%)', margin: '16px 0' }}></div>
                <p style={{ margin: 0, fontSize: '14px', maxWidth: '350px', lineHeight: '1.6', color: '#cbd5e1' }}>
                    Preparing the World for the Quantum Era. <br />
                    Explore the cutting-edge facilities where quantum talent is trained, deployed, funded, and scaled into world-changing technologies.
                </p>
            </div>

            {/* Bottom Right HUD info when locked */}
            {locked && (
                <div style={{ alignSelf: 'flex-end', background: 'rgba(0,0,0,0.5)', padding: '12px 20px', borderRadius: '100px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: '#94a3b8', display: 'flex', gap: '20px' }}>
                    <span><strong style={{ color: '#fff' }}>WASD</strong> Move</span>
                    <span><strong style={{ color: '#fff' }}>MOUSE</strong> Look</span>
                    <span><strong style={{ color: '#fff' }}>CLICK</strong> Interact</span>
                    <span><strong style={{ color: '#fff' }}>ESC</strong> Release Cursor</span>

                    <button
                        onClick={(e) => { e.stopPropagation(); toggleProjection(); }}
                        style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', color: '#60a5fa', padding: '2px 10px', borderRadius: '4px', cursor: 'pointer', pointerEvents: 'auto' }}
                    >
                        Toggle {isPerspective ? 'Orthographic' : 'Perspective'} (Currently: {isPerspective ? 'Perspective' : 'Orthographic'})
                    </button>
                </div>
            )}

            {/* Center Enter Prompt */}
            {!locked && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'rgba(255,255,255,0.03)', color: '#fff', padding: '40px 60px', borderRadius: '24px',
                    textAlign: 'center', pointerEvents: 'auto', cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                >
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #9333ea)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 700 }}>Enter the Forge</h3>
                    <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>Click anywhere to begin exploration</p>
                </div>
            )}

            {/* Crosshair */}
            {locked && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.8, pointerEvents: 'none' }}>
                    <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px rgba(59, 130, 246, 1)' }}></div>
                </div>
            )}
        </div>
    );
}
