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
            background: locked ? 'transparent' : 'radial-gradient(circle at center, rgba(10,20,12,0.35) 0%, rgba(2,10,4,0.92) 100%)',
            transition: 'background 0.5s ease'
        }}>

            {/* Top Left Branding */}
            <div style={{
                background: 'rgba(10, 22, 12, 0.45)', padding: '24px 32px', borderRadius: '16px',
                width: 'fit-content', border: '1px solid rgba(16, 185, 129, 0.15)',
                backdropFilter: 'blur(20px)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
            }}>
                <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 900, letterSpacing: '-1px' }} className="text-gradient">
                    NexusPoint <span style={{ fontSize: '16px', color: '#6ee7b7' }}>&#8482;</span>
                </h1>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#d1fae5', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Innovation &amp; Learning Hub
                </h2>
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, #10b981 0%, transparent 100%)', margin: '16px 0' }}></div>
                <p style={{ margin: 0, fontSize: '14px', maxWidth: '350px', lineHeight: '1.6', color: '#a7f3d0' }}>
                    Transforming the future of collaborative learning. <br />
                    Explore state-of-the-art facilities where innovators are trained, empowered, and scaled into world-changing leaders.
                </p>
            </div>

            {/* Bottom Right HUD info when locked */}
            {locked && (
                <div style={{ alignSelf: 'flex-end', background: 'rgba(0,0,0,0.5)', padding: '12px 20px', borderRadius: '100px', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '12px', color: '#6ee7b7', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span><strong style={{ color: '#fff' }}>WASD</strong> Move</span>
                    <span><strong style={{ color: '#fff' }}>MOUSE</strong> Look</span>
                    <span><strong style={{ color: '#fff' }}>CLICK</strong> Interact</span>
                    <span><strong style={{ color: '#fff' }}>ESC</strong> Release Cursor</span>

                    <button
                        onClick={(e) => { e.stopPropagation(); toggleProjection(); }}
                        style={{
                            background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981',
                            color: '#6ee7b7', padding: '2px 12px', borderRadius: '4px',
                            cursor: 'pointer', pointerEvents: 'auto', fontFamily: 'inherit'
                        }}
                    >
                        Toggle {isPerspective ? 'Orthographic' : 'Perspective'} &nbsp;|&nbsp; {isPerspective ? 'Perspective' : 'Orthographic'}
                    </button>
                </div>
            )}

            {/* Center Enter Prompt */}
            {!locked && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'rgba(255,255,255,0.02)', color: '#fff', padding: '40px 60px', borderRadius: '24px',
                    textAlign: 'center', pointerEvents: 'auto', cursor: 'pointer',
                    border: '1px solid rgba(16, 185, 129, 0.15)', backdropFilter: 'blur(24px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(16,185,129,0.05)',
                    transition: 'transform 0.2s ease, background 0.2s ease'
                }}
                    onClick={() => {
                        const canvas = document.querySelector('canvas');
                        if (canvas && canvas.requestPointerLock) {
                            try {
                                const promise = canvas.requestPointerLock();
                                if (promise) {
                                    promise.catch(err => {
                                        console.error('Pointer lock failed:', err);
                                        setLocked(true); // Fallback so user isn't stuck
                                    });
                                }
                            } catch (err) {
                                console.error('Pointer lock error:', err);
                                setLocked(true);
                            }
                        } else {
                            console.warn('Canvas not ready or pointer lock not supported');
                            setLocked(true);
                        }
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16,185,129,0.07)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #f59e0b)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 700 }}>Enter the Hub</h3>
                    <p style={{ margin: 0, fontSize: '15px', color: '#a7f3d0' }}>Click anywhere to begin your walkthrough</p>
                </div>
            )}

            {/* Crosshair */}
            {locked && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.8, pointerEvents: 'none' }}>
                    <div style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%', boxShadow: '0 0 10px rgba(16, 185, 129, 1)' }}></div>
                </div>
            )}
        </div>
    );
}
