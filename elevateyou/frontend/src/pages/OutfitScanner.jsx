import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Upload, Send, Sparkles, CheckCircle2, XCircle, Info, RefreshCw, Search, Trophy, Lightbulb, Target, AlertCircle, StopCircle, Zap, Lock as LockIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api/config';

const OutfitScanner = () => {
  const { token } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState('Interview');
  const [mode, setMode] = useState('upload'); // 'upload', 'camera', or 'text'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [guestScans, setGuestScans] = useState(parseInt(localStorage.getItem('guest_scans_count') || '0'));
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Camera refs and state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const events = [
    'Interview', 'Viva', 'Presentation', 'Group Discussion', 'Meeting',
    'First Date', 'Networking Event', 'Salary Negotiation', 'Client Dinner',
    'Graduation Ceremony', 'Job Fair', 'Casual Friday', 'Wedding Guest'
  ];
  const visibleEvents = showAllEvents ? events : events.slice(0, 6);

  useEffect(() => {
    // Cleanup stream on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Handle attaching stream to video element when it appears
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, mode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const newStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setMode('camera');
      setImagePreview(null);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access denied. Please check permissions.');
      setMode('upload');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/jpeg');
    setImagePreview(dataUrl);
    stopCamera();
    setMode('upload'); // Switch back to upload mode to show preview
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // data URI (base64)
    };
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if ((mode === 'upload' || mode === 'camera') && !imagePreview) return;
    if (mode === 'text' && !description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    // Check limit for guests
    if (!token && guestScans >= 3) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    try {
      let response;
      if (mode === 'upload' || mode === 'camera') {
        response = await fetch(`${API_BASE_URL}/api/outfit/scan-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || 'demo-token'}`
          },
          body: JSON.stringify({ event: selectedEvent, imageBase64: imagePreview })
        });
      } else {
        response = await fetch(`${API_BASE_URL}/api/outfit/scan-text`,  {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || 'demo-token'}`
          },
          body: JSON.stringify({ event: selectedEvent, outfitDescription: description })
        });
      }

      if (!token) {
        const newCount = guestScans + 1;
        setGuestScans(newCount);
        localStorage.setItem('guest_scans_count', newCount.toString());
      }

      const data = await response.json();
      
      if (response.status === 401) {
        // Retry with demo token
        const retryUrl = (mode === 'upload' || mode === 'camera') 
          ? `${API_BASE_URL}/api/outfit/scan-image` 
          : `${API_BASE_URL}/api/outfit/scan-text`;
        
        const retryBody = (mode === 'upload' || mode === 'camera')
          ? { event: selectedEvent, imageBase64: imagePreview }
          : { event: selectedEvent, outfitDescription: description };

        const retryRes = await fetch(retryUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer demo-token'
          },
          body: JSON.stringify(retryBody)
        });
        
        if (!retryRes.ok) throw new Error('Authentication failed even with Guest Mode.');
        response = retryRes;
        const retryData = await response.json();
        const ai = retryData.aiResponse || retryData;
        setResult({
          score: ai.score ?? 7,
          summary: ai.summary || 'Analysis complete.',
          strengths: ai.strengths || ai.appropriate || [],
          improvements: ai.improvements || [],
          risks: ai.risks || ai.notSuitable || [],
          groomingTips: ai.groomingTips || [],
          isFallback: ai.isFallback || retryData.isFallback
        });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Analysis failed. Please try again.');
      }

      // Support both new field structure (aiResponse) and direct fields
      const ai = data.aiResponse || data;
      setResult({
        score: ai.score ?? 7,
        summary: ai.summary || 'Analysis complete.',
        strengths: ai.strengths || ai.appropriate || [],
        improvements: ai.improvements || [],
        risks: ai.risks || ai.notSuitable || [],
        groomingTips: ai.groomingTips || [],
        isFallback: ai.isFallback || data.isFallback
      });
    } catch (err) {
      console.error('Scan error:', err);
      setError(err.message);
      // Fallback is handled in backend, but we can show offline fallback here if needed
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setResult(null);
    setError(null);
    setImageFile(null);
    setImagePreview(null);
    setDescription('');
    stopCamera();
    setMode('upload');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest">
            <Search size={14} /> <span>Visual Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic">Outfit <span className="text-indigo-600 dark:text-cyan-400">Scanner</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">AI-driven style analysis to ensure you look your best for every occasion.</p>
        </motion.div>

        <div className="flex p-2 glass rounded-[2.5rem] shadow-2xl border-indigo-500/10">
          <button 
            onClick={() => { setMode('upload'); stopCamera(); }} 
            className={`px-8 py-3 rounded-[2rem] text-xs font-black transition-all flex items-center ${mode === 'upload' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            <Upload size={16} className="mr-2" /> Upload
          </button>
          <button 
            onClick={startCamera} 
            className={`px-8 py-3 rounded-[2rem] text-xs font-black transition-all flex items-center ${mode === 'camera' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            <Camera size={16} className="mr-2" /> Live Cam
          </button>
          <button 
            onClick={() => { setMode('text'); stopCamera(); }} 
            className={`px-8 py-3 rounded-[2rem] text-xs font-black transition-all flex items-center ${mode === 'text' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            <Send size={16} className="mr-2" /> Text
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div key="input-form" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Event Selection */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass rounded-[3.5rem] p-10 border-indigo-500/5 shadow-2xl space-y-8">
                <h3 className="font-black text-2xl italic flex items-center">
                  <Target size={24} className="mr-3 text-indigo-600" /> Target Event
                </h3>
                <div className="grid grid-cols-1 gap-3 text-slate-900 dark:text-white">
                  {visibleEvents.map(event => (
                    <button key={event} onClick={() => setSelectedEvent(event)}
                      className={`p-5 rounded-[2rem] text-left font-black transition-all flex items-center justify-between border-2 ${selectedEvent === event ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200'}`}>
                      <span className="text-sm tracking-tight">{event}</span>
                      {selectedEvent === event && (
                        <motion.div layoutId="check" className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-indigo-600">
                          <CheckCircle2 size={16} />
                        </motion.div>
                      )}
                    </button>
                  ))}
                  {events.length > 6 && (
                    <button onClick={() => setShowAllEvents(!showAllEvents)}
                      className="mt-2 w-full py-4 rounded-[2rem] bg-indigo-600/5 text-indigo-600 font-black text-sm hover:bg-indigo-600/10 transition-colors active:scale-95">
                      {showAllEvents ? 'Show Less' : `+ ${events.length - 6} More Options`}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Upload / Camera / Text Area */}
            <div className="lg:col-span-8">
              <div className="glass rounded-[3.5rem] p-10 md:p-16 border-indigo-500/5 shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {mode === 'upload' ? (
                  <div className="w-full text-center space-y-10">
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                    {!imagePreview ? (
                      <div onClick={() => fileInputRef.current.click()}
                        className="border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[4rem] p-20 cursor-pointer hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group/box">
                        <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto mb-8 group-hover/box:scale-110 transition-transform">
                          <Upload size={40} />
                        </div>
                        <h4 className="text-xl font-black mb-2 text-slate-900 dark:text-white">Upload Outfit Photo</h4>
                        <p className="text-sm text-slate-400 font-medium">JPEG, PNG or WebP up to 10MB</p>
                      </div>
                    ) : (
                      <div className="relative inline-block">
                        <img src={imagePreview} alt="Preview" className="max-h-[400px] rounded-[3.5rem] shadow-2xl border-4 border-white dark:border-slate-800" />
                        <button onClick={() => { setImageFile(null); setImagePreview(null); }}
                          className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all">
                          <XCircle size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : mode === 'camera' ? (
                  <div className="w-full text-center space-y-8">
                    {!imagePreview ? (
                      <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-black aspect-video max-h-[450px] mx-auto">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
                          <button 
                            onClick={capturePhoto}
                            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all group/shutter"
                          >
                            <div className="w-12 h-12 rounded-full border-4 border-slate-900 group-hover:scale-90 transition-all" />
                          </button>
                          <button 
                            onClick={stopCamera}
                            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
                          >
                            <StopCircle size={32} />
                          </button>
                        </div>
                        {cameraError && (
                          <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-10 text-center">
                            <XCircle size={48} className="text-red-500 mb-4" />
                            <p className="text-white font-black">{cameraError}</p>
                            <button onClick={() => setMode('upload')} className="mt-6 px-10 py-3 bg-indigo-600 text-white rounded-full font-black text-xs">Switch to Upload</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative inline-block">
                        <img src={imagePreview} alt="Captured" className="max-h-[400px] rounded-[3.5rem] shadow-2xl border-4 border-white dark:border-slate-800" />
                        <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-4">
                           <button onClick={() => { setImagePreview(null); startCamera(); }}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-xl font-black text-xs flex items-center gap-2 hover:scale-105 transition-all">
                            <RefreshCw size={16} /> Retake
                          </button>
                        </div>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                ) : (
                  <div className="w-full space-y-8">
                    <div className="text-center space-y-4 mb-8">
                      <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mx-auto">
                        <Sparkles size={40} />
                      </div>
                      <h4 className="text-2xl font-black italic text-slate-900 dark:text-white">Describe Your Outfit</h4>
                      <p className="text-slate-500 font-medium">Tell us what you're planning to wear.</p>
                    </div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                      placeholder="Example: I'm wearing a navy blue slim-fit blazer with a white crisp shirt, dark grey chinos, and brown leather oxfords."
                      className="w-full h-48 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 text-sm outline-none focus:border-indigo-500 transition-all shadow-inner font-medium leading-relaxed text-slate-900 dark:text-white" />
                  </div>
                )}

                {/* Error display */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-6 w-full flex items-center gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-bold">
                      <AlertCircle size={20} className="shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button onClick={handleScan}
                  disabled={loading || (mode !== 'text' ? !imagePreview : !description.trim())}
                  className="mt-12 w-full max-w-sm py-6 bg-indigo-600 text-white rounded-[2.5rem] font-black tracking-[0.2em] text-sm shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center disabled:opacity-50 relative overflow-hidden group/btn">
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  {loading ? (
                    <div className="flex items-center space-x-3">
                      <RefreshCw size={20} className="animate-spin" />
                      <span>ANALYZING STYLE...</span>
                    </div>
                  ) : (
                    <span>RUN AI ANALYSIS</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="analysis-result" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Score Header */}
            <div className="glass rounded-[4rem] p-12 md:p-20 border-indigo-500/5 shadow-2xl overflow-hidden relative">
              <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-3 text-center space-y-4">
                  <div className="relative inline-block">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle cx="96" cy="96" r="80" className="stroke-slate-100 dark:stroke-slate-800 fill-none" strokeWidth="12" />
                      <motion.circle cx="96" cy="96" r="80" className="stroke-indigo-600 fill-none" strokeWidth="12"
                        strokeDasharray="502.4" initial={{ strokeDashoffset: 502.4 }}
                        animate={{ strokeDashoffset: 502.4 - (502.4 * ((result.score ?? 7) / 10)) }}
                        transition={{ duration: 2, ease: 'easeOut' }} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-black text-indigo-600 tracking-tighter">
                        {result.score}<span className="text-xl text-slate-300">/10</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[.3em] text-indigo-500">Style Rating</p>
                </div>

                <div className="lg:col-span-9 space-y-6">
                  <div className="flex items-center space-x-3 text-indigo-600">
                    <Sparkles size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">AI Professional Feedback</span>
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter italic leading-tight">Your <span className="text-indigo-600 dark:text-cyan-400">{selectedEvent}</span> Look</h2>
                  <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic max-w-3xl">"{result.summary}"</p>
                  
                  {result.isFallback && (
                    <div className="text-xs text-amber-500 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-2 flex items-center gap-2 mt-2 w-max">
                      <span>⚡</span> 
                      Showing smart default analysis. Connect to AI for personalized results.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Strengths — green */}
              <div className="rounded-[3rem] p-10 space-y-8 shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xl flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle2 size={24} className="mr-3" /> Key Strengths
                </h4>
                <ul className="space-y-4">
                  {(result.strengths || []).map((item, i) => (
                    <li key={i} className="flex items-start text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-3 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Improvements — fixed for light mode */}
              <div className="rounded-[3rem] p-10 space-y-8 shadow-xl bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-black text-xl flex items-center text-indigo-700 dark:text-indigo-300">
                  <Lightbulb size={24} className="mr-3 text-yellow-500" /> Pro Improvements
                </h4>
                <ul className="space-y-4">
                  {(result.improvements || []).map((item, i) => (
                    <li key={i} className="flex items-start text-sm font-bold text-indigo-800 dark:text-indigo-200 leading-snug">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 mr-3 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks — red */}
              <div className="rounded-[3rem] p-10 space-y-8 shadow-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h4 className="font-black text-xl flex items-center text-red-600 dark:text-red-400">
                  <XCircle size={24} className="mr-3" /> Potential Risks
                </h4>
                <ul className="space-y-4">
                  {(result.risks || []).map((item, i) => (
                    <li key={i} className="flex items-start text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-3 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Grooming Tips */}
            {result.groomingTips && result.groomingTips.length > 0 && (
              <div className="glass rounded-[3.5rem] p-12 border-indigo-500/5 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="md:w-1/3">
                    <h4 className="text-3xl font-black tracking-tighter mb-4 italic">Grooming <br /><span className="text-indigo-600">Checklist</span></h4>
                    <p className="text-sm text-slate-500 font-medium">The secret to a great look is in the final details.</p>
                  </div>
                  <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.groomingTips.map((tip, i) => (
                      <div key={i} className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-600/10 flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">{i + 1}</div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center pt-10">
              <button onClick={resetScanner}
                className="px-12 py-5 glass border-slate-200 dark:border-slate-800 rounded-[2.5rem] font-black tracking-[0.2em] text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center space-x-3">
                <RefreshCw size={20} />
                <span>RESCAN ANOTHER OUTFIT</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal for Guest Limit */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass max-w-md w-full p-10 rounded-[3rem] border-indigo-500/20 shadow-2xl text-center space-y-8"
            >
              <div className="w-20 h-20 bg-indigo-600/10 rounded-[2rem] flex items-center justify-center text-indigo-600 mx-auto">
                <LockIcon size={40} />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black italic tracking-tighter">Limit Reached</h3>
                <p className="text-slate-500 font-medium">You've used your 3 free guest scans. Log in to get unlimited AI style analysis and save your history!</p>
              </div>
              <div className="flex flex-col gap-4">
                <Link to="/login" className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm tracking-widest shadow-xl hover:bg-indigo-700 transition-all">
                  LOGIN NOW
                </Link>
                <button onClick={() => setShowLoginModal(false)} className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">
                  MAYBE LATER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutfitScanner;
