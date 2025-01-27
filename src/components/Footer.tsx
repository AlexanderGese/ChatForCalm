import React from 'react';
import { Github, Coffee, Linkedin, Bitcoin, Wallet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white/80 backdrop-blur-lg border-t border-indigo-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://ko-fi.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <Coffee className="w-5 h-5" />
              <span>Ko-fi</span>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="w-full max-w-2xl">
            <h3 className="text-center text-lg font-semibold text-gray-700 mb-4">Support This Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Bitcoin className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-700">Bitcoin (BTC)</span>
                </div>
                <code className="block bg-white/50 p-2 rounded text-sm text-gray-600 break-all">
                  bc1qxyourbtcaddresshere
                </code>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-700">Ethereum (ETH)</span>
                </div>
                <code className="block bg-white/50 p-2 rounded text-sm text-gray-600 break-all">
                  0xYourEthereumAddressHere
                </code>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Made with ❤️ to support mental health
          </p>
        </div>
      </div>
    </footer>
  );
}