import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, CheckCircle2, MessageCircle, X } from 'lucide-react';
import { BlogPost, Species } from '../types';
import { BLOG_POSTS } from '../data/blogs';
import { CONTACT_CONFIG } from '../data/contactConfig';

interface BlogPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | 'all'>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedSpecies === 'all') return true;
    return post.species === selectedSpecies || post.species === 'all';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
          <BookOpen className="w-4 h-4 text-red-600 shrink-0" />
          <span>Veterinary Extension & Field Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-950">
          Veterinary Practice & Management Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Clear, farmer-tested clinical protocols written by Dr. Zain Rauf (DVM) to help you prevent diseases, cut mortality, and maximize feed conversion.
        </p>
      </div>

      {/* Species Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedSpecies('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            selectedSpecies === 'all'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-red-900 border border-red-200 hover:bg-red-50'
          }`}
        >
          All Guides ({BLOG_POSTS.length})
        </button>
        <button
          onClick={() => setSelectedSpecies('poultry')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            selectedSpecies === 'poultry'
              ? 'bg-amber-500 text-red-950 shadow-xs'
              : 'bg-white text-red-900 border border-red-200 hover:bg-amber-50'
          }`}
        >
          Poultry & Flock Management
        </button>
        <button
          onClick={() => setSelectedSpecies('dairy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            selectedSpecies === 'dairy'
              ? 'bg-red-700 text-white shadow-xs'
              : 'bg-white text-red-900 border border-red-200 hover:bg-red-50'
          }`}
        >
          Dairy Cattle & Buffalo Care
        </button>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="group bg-white rounded-3xl border border-red-100 hover:border-red-400 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 gap-2 flex-wrap">
                <span className="font-bold uppercase tracking-wider text-red-800 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                  {post.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    {post.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-red-950 group-hover:text-red-700 transition-colors leading-snug">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Key takeaway preview bullets */}
              <div className="p-3 bg-red-50/70 rounded-xl border border-red-100 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-red-900 block text-[11px] uppercase tracking-wider">
                  Key Field Action:
                </span>
                <p className="line-clamp-2 italic text-red-950 font-medium">
                  "{post.keyTips[0]}"
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-red-100 flex items-center justify-between text-xs font-bold text-red-700">
              <span>Read Complete Clinical Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal / Reader */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-red-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-red-100 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-red-100 flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                {activeArticle.category} · {activeArticle.readTime}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-900 hover:bg-red-50 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-red-950 leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <span className="font-semibold text-red-800">{activeArticle.author}</span>
                  <span>({activeArticle.authorRole})</span>
                  <span>·</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              {/* Key Tips Box */}
              <div className="bg-red-50 rounded-2xl p-5 border border-red-200 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-950">
                  Critical Farm Action Checklist:
                </h3>
                <ul className="space-y-1.5 text-xs text-red-900 font-medium">
                  {activeArticle.keyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Article Body Paragraphs */}
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Action Strip */}
              <div className="pt-6 border-t border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('shop');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Browse Supplies Related to This Guide
                </button>

                <a
                  href={`https://wa.me/${CONTACT_CONFIG.whatsAppNumber}?text=${encodeURIComponent(
                    `Hello Doctor Zain, I just read your guide "${activeArticle.title}" and have a question regarding my farm.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-900 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-red-600" />
                  <span>Discuss Protocol on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
