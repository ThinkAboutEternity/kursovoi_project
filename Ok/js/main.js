// ===== MAIN JAVASCRIPT FILE =====
import { Navigation } from './navigation.js';
import { Modals } from './modals.js';
import { Interactions } from './interactions.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    const navigation = new Navigation();
    
    // Initialize modals
    const modals = new Modals();
    
    // Initialize interactions
    const interactions = new Interactions();

    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Console message
    console.log(`
╔═══════════════════════════════════════╗
║   🚀 SHINAMI NFT Marketplace Loaded   ║
║   ✨ BEM Methodology Applied          ║
║   💎 All Interactive Features Active  ║
╚═══════════════════════════════════════╝
    `);
});



