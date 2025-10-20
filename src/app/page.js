'use client';

import { useState } from 'react';
import HalloweenBackground from '../components/HalloweenBackground';
import SpookyButton from '../components/SpookyButton';
import HalloweenPartyApp from '../components/HalloweenPartyApp';

export default function Home() {
  const [showPartyApp, setShowPartyApp] = useState(false);

  if (showPartyApp) {
    return (
      <div className="relative">
        {/* Background Image */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/cover.JPG)' }}
        />
        {/* Overlay for better text readability */}
        <div className="fixed inset-0 bg-black/40" />
        
        <HalloweenBackground />
        <HalloweenPartyApp />
        {/* Back to main button */}
        <div className="fixed top-4 left-4 z-50">
          <button 
            onClick={() => setShowPartyApp(false)}
            className="bg-black/80 text-orange-500 px-4 py-2 rounded-lg border border-orange-500/50 hover:border-orange-500 transition-colors"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/cover.JPG)' }}
      />
      {/* Overlay for better text readability */}
      <div className="fixed inset-0 bg-black/40" />
      
      <HalloweenBackground />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10">
        {/* Halloween Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-orange-500 spooky-text">
            🎃 HALLOWEEN 🎃
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Prêts pour la nuit la plus terrifiante de l'année ?
          </p>
          
          {/* Clear Call to Action */}
          <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-white font-semibold mb-2">
              🍽️ Aidez-nous à préparer les snacks d'Halloween !
            </p>
            <p className="text-md text-orange-200 mb-4">
              Choisissez les plats que vous souhaitez préparer pour notre festin terrifiant
            </p>
            <button 
              onClick={() => setShowPartyApp(true)}
              className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50"
            >
              🎃 Choisir mes plats maintenant !
            </button>
          </div>
          
          <p className="text-lg md:text-xl text-orange-300 mb-8 font-semibold">
            ⏰ Atelier dès 9h00 du matin !
          </p>
        </div>


        {/* Spooky Animation Area */}
        <div className="flex space-x-8 text-4xl mb-12 animate-bounce">
          <span className="hover:scale-125 transition-transform cursor-pointer animate-float">👻</span>
          <span className="hover:scale-125 transition-transform cursor-pointer animate-float" style={{ animationDelay: '0.5s' }}>🦇</span>
          <span className="hover:scale-125 transition-transform cursor-pointer animate-float" style={{ animationDelay: '1s' }}>🕷️</span>
          <span className="hover:scale-125 transition-transform cursor-pointer animate-float" style={{ animationDelay: '1.5s' }}>💀</span>
          <span className="hover:scale-125 transition-transform cursor-pointer animate-float" style={{ animationDelay: '2s' }}>🕸️</span>
        </div>

       
        {/* Halloween Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div 
            className="bg-black/50 p-6 rounded-lg border border-red-500/30 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer"
            onClick={() => setShowPartyApp(true)}
          >
            <div className="text-3xl mb-4 animate-float" style={{ animationDelay: '1s' }}>🍽️ </div>
            <h3 className="text-xl font-bold mb-2 text-red-400">Buffet Terrifiant</h3>
            <p className="text-gray-300">Organisez le festin d'Halloween le plus effrayant</p>
            <p className="text-sm text-red-300 mt-7">👨‍🍳 Cliquez pour participer</p>
          </div>
          <div 
            className="bg-black/50 p-6 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer"
            onClick={() => alert('🎨 Atelier créatif : Sculpture de citrouilles, décoration de biscuits, création de masques terrifiants ! Rejoignez-nous dès 9h !')}
          >
            <div className="text-3xl mb-4 animate-float">🎨</div>
            <h3 className="text-xl font-bold mb-2 text-orange-400">Atelier Créatif</h3>
            <p className="text-gray-300">Sculpture de citrouilles & création de biscuits</p>
            <p className="text-sm text-orange-300 mt-7">📅 Dès 9h du matin</p>
          </div>
          
          <div 
            className="bg-black/50 p-6 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer"
            onClick={() => alert('🔍 Escape Game Halloween : "La Malédiction de la Maison Hantée" - Résolvez les énigmes pour vous échapper avant minuit ! Aidez-nous à collecter les indices !')}
          >
            <div className="text-3xl mb-4 animate-float" style={{ animationDelay: '0.5s' }}>🔍</div>
            <h3 className="text-xl font-bold mb-2 text-purple-400">Escape Game Mystère</h3>
            <p className="text-gray-300">Aidez à résoudre "La Malédiction de la Maison Hantée"</p>
            <p className="text-sm text-purple-300 mt-2">🕛 Avant minuit...</p>
          </div> 
        </div>
         
        {/* Participants Section */}
        <div className="mb-12 max-w-6xl mx-auto mt-20">
          {/* Hosts Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-orange-400 text-center mb-6">
              🎭 Nos Hôtes (3)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { name: "Ludovic", image: "/Ludovic.jpg" },
                { name: "Chloe", image: "/Chloe.jpg" },
                { name: "Estelle", image: "/Estelle.jpg" }
              ].map((host, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-orange-500/50 hover:border-orange-500 transition-colors">
                    <img 
                      src={host.image} 
                      alt={host.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-orange-500/20 hidden items-center justify-center text-2xl">
                      🎭
                    </div>
                  </div>
                  <p className="text-orange-300 font-semibold">{host.name}</p>
                  <p className="text-xs text-orange-400">Hôte</p>
                </div>
              ))}
            </div>
          </div>

          {/* Invites Section */}
          <div>
            <h3 className="text-2xl font-bold text-purple-400 text-center mb-6">
              👥 Nos Invités (14)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {[
                { name: "Julie", image: "/julie.jpg" },
                { name: "Pierre", image: "/pierre.jpg" },
                { name: "Jessica", image: "/jessica.jpg" },
                { name: "Mia", image: "/mia.jpg" },
                { name: "Thibault", image: "/thibault.jpg" },
                { name: "Roza", image: "/roza.jpg" },
                { name: "Benjamin", image: "/benjamin.jpg" },
                { name: "Lilia", image: "/lilia.jpg" },
                { name: "Diliana", image: "/diliana.jpg" },
                { name: "Michael", image: "/michael.jpeg" },
                { name: "Aurelien", image: "/Aurelien.JPG" },
                { name: "Valentine", image: "/valentine.jpg" },
                { name: "Maxime", image: "/maxime.jpg" },
                { name: "Simon", image: "/simon.jpg" }
              ].map((invite, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-purple-500/50 hover:border-purple-500 transition-colors">
                    <img 
                      src={invite.image} 
                      alt={invite.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-purple-500/20 hidden items-center justify-center text-lg">
                      🎃
                    </div>
                  </div>
                  <p className="text-purple-300 text-sm font-medium">{invite.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 py-8 text-center border-t border-orange-500/30 relative z-10">
        <p className="text-gray-400">
          © 2025 Site Halloween by Chloé - Joyeux Halloween ! 🎃
        </p>
      </footer>
    </div>
  );
}
