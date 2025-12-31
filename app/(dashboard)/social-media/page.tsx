"use client";

import { useState, useEffect } from "react";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Zap,
  Lock,
  CheckCircle2,
  MessageCircle,
  Heart,
  Share2,
  Crown,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock user plan - replace with actual auth
const USER_PLAN = "free"; // "free" | "professional" | "business" | "enterprise"
const POSTS_USED = 8; // Mock usage

const PLAN_LIMITS = {
  free: { posts: 14, platforms: ["facebook"], aiTraining: false },
  professional: { posts: 30, platforms: ["facebook", "instagram"], aiTraining: true },
  business: { posts: 120, platforms: ["facebook", "instagram", "linkedin"], aiTraining: true },
  enterprise: { posts: -1, platforms: ["facebook", "instagram", "linkedin"], aiTraining: true } // unlimited
};

export default function SocialMediaPage() {
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: false,
    instagram: false,
    linkedin: false
  });

  const [aiTrainingStatus, setAiTrainingStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [showContentGenerator, setShowContentGenerator] = useState(false);
  
  // Content generator state
  const [platform, setPlatform] = useState<'instagram' | 'facebook' | 'linkedin'>('instagram');
  const [tone, setTone] = useState<'casual' | 'luxury' | 'professional' | 'playful'>('casual');
  const [productName, setProductName] = useState('Lavender Dreams');
  const [productPrice, setProductPrice] = useState(25);
  const [scents, setScents] = useState('Lavender, Vanilla, Chamomile');
  const [vibe, setVibe] = useState('Relaxing');

  const currentLimit = PLAN_LIMITS[USER_PLAN as keyof typeof PLAN_LIMITS];
  const postsRemaining = currentLimit.posts === -1 ? "Unlimited" : currentLimit.posts - POSTS_USED;
  const isLocked = USER_PLAN === "free" && POSTS_USED >= currentLimit.posts;

  // Check for Facebook OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fbConnected = params.get('facebook');
    const pageName = params.get('page');
    const error = params.get('error');

    if (fbConnected === 'connected') {
      setConnectedAccounts(prev => ({ ...prev, facebook: true }));
      
      // Start AI training
      if (currentLimit.aiTraining) {
        setAiTrainingStatus("analyzing");
        // Fetch user's posts for AI training
        // TODO: Call fetch-posts API
        setTimeout(() => {
          setAiTrainingStatus("complete");
        }, 3000);
      }
      
      // Show success message
      alert(`Facebook connected successfully! ${pageName ? `Page: ${pageName}` : ''}`);
      
      // Clean URL
      window.history.replaceState({}, document.title, '/social-media');
    }

    if (error) {
      let errorMessage = 'Failed to connect Facebook';
      switch (error) {
        case 'access_denied':
          errorMessage = 'You denied access to Facebook';
          break;
        case 'no_pages':
          errorMessage = 'No Facebook Pages found. Please create a Facebook Page first.';
          break;
        case 'token_failed':
          errorMessage = 'Failed to get Facebook access token';
          break;
      }
      alert(errorMessage);
      
      // Clean URL
      window.history.replaceState({}, document.title, '/social-media');
    }
  }, [currentLimit.aiTraining]);

  const handleConnect = async (platform: string) => {
    if (platform === 'facebook') {
      // Redirect to Facebook OAuth
      // In production, get userId from auth session
      const userId = 'user123'; // TODO: Get from auth
      window.location.href = `/api/auth/facebook?userId=${userId}`;
      return;
    }
    
    // For Instagram and LinkedIn, simulate connection for now
    setConnectedAccounts(prev => ({ ...prev, [platform]: true }));
    
    // Start AI training
    if (currentLimit.aiTraining) {
      setAiTrainingStatus("analyzing");
      setTimeout(() => {
        setAiTrainingStatus("complete");
      }, 3000);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Social Media Automation</h1>
              <p className="text-slate-600">Auto-post to your pages in your unique voice</p>
            </div>
          </div>
          
          {/* Create Post Button */}
          <button
            onClick={() => setShowContentGenerator(true)}
            disabled={isLocked}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {/* Plan Badge & Usage */}
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            {USER_PLAN.charAt(0).toUpperCase() + USER_PLAN.slice(1)} Plan
          </Badge>
          {currentLimit.posts !== -1 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {POSTS_USED} / {currentLimit.posts} posts used
              </span>
              {isLocked && (
                <Badge variant="destructive" className="animate-pulse">
                  Limit Reached
                </Badge>
              )}
            </div>
          ) : (
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Unlimited Posts
            </Badge>
          )}
        </div>
      </div>

      {/* Locked State - Free Tier Exhausted */}
      {isLocked && (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                You've Used All 14 Free Posts 🎉
              </h3>
              <p className="text-slate-600 mb-4">
                Great job staying consistent! Upgrade to keep your social media running on autopilot.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>30 posts/month on Professional (\$29)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>120 posts/month on Business ($49)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>AI learns YOUR writing style</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Instagram + LinkedIn included</span>
                </div>
              </div>
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all">
                Upgrade Now →
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Connect Accounts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Connect Your Accounts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Facebook */}
          <div className={`p-4 border-2 rounded-xl transition-all ${
            connectedAccounts.facebook 
              ? "border-blue-500 bg-blue-50" 
              : "border-slate-200 hover:border-blue-300"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <Facebook className={`w-8 h-8 ${connectedAccounts.facebook ? "text-blue-600" : "text-slate-400"}`} />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Facebook</h3>
                {connectedAccounts.facebook ? (
                  <Badge className="bg-green-100 text-green-700 text-xs">Connected</Badge>
                ) : (
                  <span className="text-xs text-slate-500">Not connected</span>
                )}
              </div>
            </div>
            {!connectedAccounts.facebook ? (
              <button 
                onClick={() => handleConnect("facebook")}
                disabled={!currentLimit.platforms.includes("facebook")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {currentLimit.platforms.includes("facebook") ? "Connect Facebook" : "Upgrade to Unlock"}
              </button>
            ) : (
              <div className="text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>Auto-posting enabled</span>
                </div>
              </div>
            )}
          </div>

          {/* Instagram */}
          <div className={`p-4 border-2 rounded-xl transition-all ${
            connectedAccounts.instagram 
              ? "border-pink-500 bg-pink-50" 
              : currentLimit.platforms.includes("instagram")
                ? "border-slate-200 hover:border-pink-300"
                : "border-slate-200 opacity-60"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <Instagram className={`w-8 h-8 ${connectedAccounts.instagram ? "text-pink-600" : "text-slate-400"}`} />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">Instagram</h3>
                {connectedAccounts.instagram ? (
                  <Badge className="bg-green-100 text-green-700 text-xs">Connected</Badge>
                ) : !currentLimit.platforms.includes("instagram") ? (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="w-3 h-3 mr-1" />
                    Pro+
                  </Badge>
                ) : (
                  <span className="text-xs text-slate-500">Not connected</span>
                )}
              </div>
            </div>
            {!connectedAccounts.instagram ? (
              <button 
                onClick={() => handleConnect("instagram")}
                disabled={!currentLimit.platforms.includes("instagram")}
                className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {currentLimit.platforms.includes("instagram") ? "Connect Instagram" : "Upgrade to Unlock"}
              </button>
            ) : (
              <div className="text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>Auto-posting enabled</span>
                </div>
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div className={`p-4 border-2 rounded-xl transition-all ${
            connectedAccounts.linkedin 
              ? "border-blue-700 bg-blue-50" 
              : currentLimit.platforms.includes("linkedin")
                ? "border-slate-200 hover:border-blue-300"
                : "border-slate-200 opacity-60"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <Linkedin className={`w-8 h-8 ${connectedAccounts.linkedin ? "text-blue-700" : "text-slate-400"}`} />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">LinkedIn</h3>
                {connectedAccounts.linkedin ? (
                  <Badge className="bg-green-100 text-green-700 text-xs">Connected</Badge>
                ) : !currentLimit.platforms.includes("linkedin") ? (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="w-3 h-3 mr-1" />
                    Business+
                  </Badge>
                ) : (
                  <span className="text-xs text-slate-500">Not connected</span>
                )}
              </div>
            </div>
            {!connectedAccounts.linkedin ? (
              <button 
                onClick={() => handleConnect("linkedin")}
                disabled={!currentLimit.platforms.includes("linkedin")}
                className="w-full px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {currentLimit.platforms.includes("linkedin") ? "Connect LinkedIn" : "Upgrade to Unlock"}
              </button>
            ) : (
              <div className="text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span>Auto-posting enabled</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* AI Voice Training */}
      {(connectedAccounts.facebook || connectedAccounts.instagram || connectedAccounts.linkedin) && currentLimit.aiTraining && (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                AI Learning Your Voice...
              </h3>
              {aiTrainingStatus === "analyzing" && (
                <>
                  <p className="text-slate-600 mb-4">
                    Analyzing your last 100 posts to learn your unique style, tone, and personality.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full border-2 border-purple-600 border-t-transparent animate-spin"></div>
                      <span>Reading your existing posts...</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full border-2 border-purple-600 border-t-transparent animate-spin"></div>
                      <span>Analyzing your writing style...</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-5 h-5 rounded-full border-2 border-purple-600 border-t-transparent animate-spin"></div>
                      <span>Learning your vocabulary and tone...</span>
                    </div>
                  </div>
                </>
              )}
              {aiTrainingStatus === "complete" && (
                <>
                  <p className="text-slate-600 mb-4">
                    ✨ Perfect! Your AI voice profile is ready. All posts will now sound exactly like YOU.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-medium text-sm text-slate-900 mb-1">Tone Detected</div>
                      <div className="text-xs text-slate-600">Casual & Friendly</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-medium text-sm text-slate-900 mb-1">Emoji Usage</div>
                      <div className="text-xs text-slate-600">Moderate (2-3 per post)</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-medium text-sm text-slate-900 mb-1">Post Length</div>
                      <div className="text-xs text-slate-600">Short & Sweet (40-80 words)</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <div className="font-medium text-sm text-slate-900 mb-1">Your Vibe</div>
                      <div className="text-xs text-slate-600">Authentic & Relatable</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Feature Highlights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Sounds Like You</h3>
          <p className="text-sm text-slate-600">
            AI learns your writing style so every post sounds natural, not robotic. Your followers won't know it's automated.
          </p>
        </Card>

        <Card className="p-6">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Set & Forget</h3>
          <p className="text-sm text-slate-600">
            Schedule weeks of content in minutes. Posts go out automatically while you focus on making candles.
          </p>
        </Card>

        <Card className="p-6">
          <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-pink-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Grow Faster</h3>
          <p className="text-sm text-slate-600">
            Consistent posting = more reach = more sales. Businesses with regular posts see 3x more engagement.
          </p>
        </Card>
      </div>

      {/* Mock Stats - Recent Posts */}
      {POSTS_USED > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Posts</h2>
          <div className="space-y-3">
            {[
              {
                platform: "Facebook",
                icon: Facebook,
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                text: "Just restocked our best-seller! 🕯️ Lavender Dreams is back and smells AMAZING. Who else needs a calming vibe this week?",
                time: "2 days ago",
                engagement: { likes: 42, comments: 8, shares: 3 }
              },
              {
                platform: "Facebook",
                icon: Facebook,
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                text: "Behind the scenes: Pouring 100 candles today! 💜 There's something so satisfying about watching them set perfectly. Anyone else love a good time-lapse?",
                time: "5 days ago",
                engagement: { likes: 67, comments: 12, shares: 5 }
              },
              {
                platform: "Facebook",
                icon: Facebook,
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                text: "Did you know beeswax candles actually clean the air? 🐝 They release negative ions that bind to toxins. Science is cool! Who wants to try one?",
                time: "7 days ago",
                engagement: { likes: 89, comments: 15, shares: 8 }
              }
            ].slice(0, 3).map((post, i) => (
              <div key={i} className="p-4 border border-slate-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${post.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <post.icon className={`w-4 h-4 ${post.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-slate-900">{post.platform}</span>
                      <span className="text-xs text-slate-500">{post.time}</span>
                      <Badge variant="outline" className="text-xs ml-auto">Published</Badge>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{post.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 pl-11">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.engagement.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.engagement.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{post.engagement.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Call to Action for Free Users */}
      {USER_PLAN === "free" && POSTS_USED < currentLimit.posts && (
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                {postsRemaining} Free Posts Remaining
              </h3>
              <p className="text-sm text-slate-600">
                Upgrade anytime to unlock AI voice training, Instagram, LinkedIn, and 30-120 posts per month.
              </p>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all whitespace-nowrap">
              View Plans →
            </button>
          </div>
        </Card>
      )}

      {/* Content Generator Modal */}
      {showContentGenerator && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowContentGenerator(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl relative">
              <div className="flex items-center gap-3">
                <div className="text-3xl">📱</div>
                <div>
                  <h2 className="text-2xl font-bold">Create Social Media Post</h2>
                  <p className="text-blue-100">AI-powered content that sounds like YOU</p>
                </div>
              </div>
              <button
                onClick={() => setShowContentGenerator(false)}
                className="absolute top-4 right-4 bg-white text-blue-600 w-10 h-10 rounded-full font-bold text-xl hover:bg-gray-100 transition-all"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Configuration Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label className="text-gray-900 font-semibold mb-2 block">Platform</Label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as 'instagram' | 'facebook' | 'linkedin')}
                    className="w-full p-2 border-2 border-blue-200 rounded-lg bg-white text-gray-900 font-semibold"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <Label className="text-gray-900 font-semibold mb-2 block">Tone</Label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as 'casual' | 'luxury' | 'professional' | 'playful')}
                    className="w-full p-2 border-2 border-blue-200 rounded-lg bg-white text-gray-900 font-semibold"
                  >
                    <option value="casual">Casual</option>
                    <option value="luxury">Luxury</option>
                    <option value="professional">Professional</option>
                    <option value="playful">Playful</option>
                  </select>
                </div>

                <div>
                  <Label className="text-gray-900 font-semibold mb-2 block">Product Name</Label>
                  <Input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border-2 border-blue-200"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 font-semibold mb-2 block">Price</Label>
                  <Input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(parseInt(e.target.value) || 0)}
                    className="border-2 border-blue-200"
                    placeholder="$"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label className="text-gray-900 font-semibold mb-2 block">Scents/Ingredients</Label>
                  <Input
                    value={scents}
                    onChange={(e) => setScents(e.target.value)}
                    className="border-2 border-blue-200"
                    placeholder="e.g., Lavender, Vanilla, Chamomile"
                  />
                </div>

                <div>
                  <Label className="text-gray-900 font-semibold mb-2 block">Vibe/Profile</Label>
                  <Input
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="border-2 border-blue-200"
                    placeholder="e.g., Relaxing, Energizing, Cozy"
                  />
                </div>
              </div>

              {/* Post Preview */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                    📸 {platform === 'instagram' ? 'Instagram' : platform === 'facebook' ? 'Facebook' : 'LinkedIn'} Post
                  </h3>
                  <button
                    onClick={() => {
                      const postText = `🕯️ Must ${productName}! ✨\n\n✨Handcrafted with love using ${scents}\n🕯️ ${vibe} vibes\n💰 $${productPrice}\n\n✨ Unique & special\n\n🛍️ Shop now! Link in bio.`;
                      navigator.clipboard.writeText(postText);
                      alert('Post copied to clipboard!');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-line">
                    🕯️ Must <span className="font-bold">{productName}</span>! ✨{'\n'}
                    {'\n'}✨Handcrafted with love using {scents}{'\n'}
                    🕯️ {vibe} vibes{'\n'}
                    💰 ${productPrice}{'\n'}
                    {'\n'}✨ Unique & special{'\n'}
                    {'\n'}🛍️ Shop now! Link in bio.
                  </p>
                </div>
              </div>

              {/* Suggested Hashtags */}
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-purple-900">💜 Suggested Hashtags</h3>
                  <button
                    onClick={() => {
                      const hashtags = `#CandlePilots #HandmadeCandles #CandleLover #AromaFragrance #${vibe.replace(' ', '')}Candle #SoyCandles #CandleAddict #HomeBusiness #SmallBusiness #Natural #EcoFriendly #SupportLocal #CandleCommunity #HomeDecor`;
                      navigator.clipboard.writeText(hashtags);
                      alert('Hashtags copied!');
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2"
                  >
                    ⬇️ Copy All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['#CandlePilots', '#HandmadeCandles', '#CandleLover', '#AromaFragrance', `#${vibe.replace(' ', '')}Candle`, '#SoyCandles', '#CandleAddict', '#HomeBusiness', '#SmallBusiness', '#Natural', '#EcoFriendly', '#SupportLocal', '#CandleCommunity', '#HomeDecor', '#CandleMaking'].map((tag, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Marketing Tips */}
              <div className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200 mb-6">
                <h3 className="text-xl font-bold text-amber-900 mb-4">💡 Marketing Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">📸 Visual Content</h4>
                    <p className="text-sm text-gray-700">Post high-quality photos showing the candle lit and in a styled setting.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-800 mb-2">🔥 Best Posting Times</h4>
                    <p className="text-sm text-gray-700">Instagram/Facebook: 1-3pm, Wednesdays perform better.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-800 mb-2">💬 Engagement</h4>
                    <p className="text-sm text-gray-700">Ask questions, run polls, share behind-the-scenes. Respond to all comments within 1 hour.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-800 mb-2">🎁 Promotions</h4>
                    <p className="text-sm text-gray-700">Launch discounts (10-20% off), bundle deals, or limited editions to drive urgency.</p>
                  </div>
                </div>
              </div>

              {/* Target Customers */}
              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 mb-6">
                <h3 className="text-xl font-bold text-green-900 mb-4">👥 Target Customers for {productName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl mb-2">💆</div>
                    <h4 className="font-bold text-green-800 mb-2">Wellness Warrior</h4>
                    <p className="text-sm text-gray-700">Age 25-45 • Health conscious • Yoga/meditation • Natural products • Stress relief</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎨</div>
                    <h4 className="font-bold text-green-800 mb-2">Design Lover</h4>
                    <p className="text-sm text-gray-700">Age 28-50 • Interior design fan • Aesthetic-driven • Candles match home • Shares on social</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl mb-2">🎁</div>
                    <h4 className="font-bold text-green-800 mb-2">Experience Seeker</h4>
                    <p className="text-sm text-gray-700">Age 22-40 • Buys experiences • Ambiance creator • Event hosts • Values memories</p>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">📤 Schedule or Post Now</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      alert('Post scheduled! It will be published at the optimal time for maximum engagement.');
                      setShowContentGenerator(false);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    📷 Schedule for Instagram
                  </button>
                  <button
                    onClick={() => {
                      alert('Post scheduled! It will be published at the optimal time for maximum engagement.');
                      setShowContentGenerator(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    📘 Schedule for Facebook
                  </button>
                  <button
                    onClick={() => {
                      alert('Post scheduled! It will be published at the optimal time for maximum engagement.');
                      setShowContentGenerator(false);
                    }}
                    className="bg-[#0077b5] hover:bg-[#006699] text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    💼 Schedule for LinkedIn
                  </button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-3">
                  💡 Posts will be published automatically at optimal times based on your audience!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
