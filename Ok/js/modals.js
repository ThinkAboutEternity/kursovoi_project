// ===== MODALS MODULE =====
export class Modals {
    constructor() {
        this.init();
    }

    init() {
        this.setupWalletModal();
        this.setupBidModal();
        this.setupCloseHandlers();
    }

    // Create wallet connection modal
    setupWalletModal() {
        const connectBtn = document.querySelector('.header__actions .btn--primary');
        if (!connectBtn) return;

        connectBtn.addEventListener('click', () => {
            this.showWalletModal();
        });
    }

    showWalletModal() {
        const modal = this.createModal();
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: var(--color-bg-card);
            padding: 40px;
            border-radius: 20px;
            border: 2px solid var(--color-primary);
            max-width: 500px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <h2 style="font-size: 32px; margin-bottom: 30px; text-align: center; color: var(--color-text-primary);">Connect Wallet</h2>
            <div class="wallet-options" style="display: flex; flex-direction: column; gap: 15px;">
                <button class="wallet-option" data-wallet="MetaMask" style="padding: 20px; background: var(--color-bg-darker); border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-text-primary); font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #F6851B 0%, #E2761B 100%); border-radius: 8px;"></div>
                    <span>MetaMask</span>
                </button>
                <button class="wallet-option" data-wallet="Coinbase" style="padding: 20px; background: var(--color-bg-darker); border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-text-primary); font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #0052FF 0%, #0041CC 100%); border-radius: 8px;"></div>
                    <span>Coinbase Wallet</span>
                </button>
                <button class="wallet-option" data-wallet="Trust" style="padding: 20px; background: var(--color-bg-darker); border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-text-primary); font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3375BB 0%, #2863A6 100%); border-radius: 8px;"></div>
                    <span>Trust Wallet</span>
                </button>
                <button class="wallet-option" data-wallet="WalletConnect" style="padding: 20px; background: var(--color-bg-darker); border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-text-primary); font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 15px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3B99FC 0%, #2C7BCC 100%); border-radius: 8px;"></div>
                    <span>WalletConnect</span>
                </button>
            </div>
            <button class="modal-close-btn" style="margin-top: 30px; width: 100%; padding: 15px; background: transparent; border: 2px solid var(--color-border); border-radius: 100px; color: var(--color-text-secondary); font-size: 16px; font-weight: 600; cursor: pointer;">Cancel</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Wallet option handlers
        modalContent.querySelectorAll('.wallet-option').forEach(option => {
            option.addEventListener('mouseenter', function() {
                this.style.borderColor = 'var(--color-primary)';
                this.style.background = 'rgba(139, 92, 246, 0.1)';
            });
            
            option.addEventListener('mouseleave', function() {
                this.style.borderColor = 'var(--color-border)';
                this.style.background = 'var(--color-bg-darker)';
            });
            
            option.addEventListener('click', () => {
                const wallet = option.dataset.wallet;
                this.connectWallet(wallet, modal, modalContent);
            });
        });

        this.setupCloseModal(modal, modalContent);
    }

    connectWallet(wallet, modal, modalContent) {
        alert(`🔗 Connecting to ${wallet}...`);
        setTimeout(() => {
            alert(`✅ ${wallet} connected successfully!`);
            this.closeModal(modal, modalContent);
        }, 1000);
    }

    // Setup bid modal for NFT cards
    setupBidModal() {
        document.querySelectorAll('.nft-card__btn, .hero-nft-card__btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.nft-card, .hero-nft-card');
                if (card) {
                    this.showBidModal(card);
                }
            });
        });
    }

    showBidModal(card) {
        const modal = this.createModal();
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: var(--color-bg-card);
            padding: 40px;
            border-radius: 20px;
            border: 2px solid var(--color-primary);
            max-width: 500px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            text-align: center;
        `;

        const nftName = card.querySelector('.nft-card__user-name, .hero-nft-card__name')?.textContent || 'NFT';
        const price = card.querySelector('.nft-card__price, .hero-nft-card__price')?.textContent || '0 ETH';

        modalContent.innerHTML = `
            <h2 style="font-size: 32px; margin-bottom: 20px; color: var(--color-text-primary);">Place Your Bid</h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 30px;">NFT: ${nftName}</p>
            <p style="color: var(--color-primary-light); font-size: 24px; font-weight: 800; margin-bottom: 30px;">Current Bid: ${price}</p>
            <input type="number" placeholder="Enter your bid (ETH)" class="bid-input" style="width: 100%; padding: 15px; background: var(--color-bg-darker); border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-text-primary); font-size: 16px; margin-bottom: 20px;">
            <div style="display: flex; gap: 15px;">
                <button class="modal-close-btn" style="flex: 1; padding: 15px; background: transparent; border: 2px solid var(--color-border); border-radius: 100px; color: var(--color-text-secondary); font-size: 16px; font-weight: 600; cursor: pointer;">Cancel</button>
                <button class="modal-bid-btn" style="flex: 1; padding: 15px; background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); border: none; border-radius: 100px; color: white; font-size: 16px; font-weight: 600; cursor: pointer;">Place Bid</button>
            </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Bid button handler
        modalContent.querySelector('.modal-bid-btn').addEventListener('click', () => {
            const input = modalContent.querySelector('.bid-input');
            if (input.value) {
                alert(`✅ Bid of ${input.value} ETH placed successfully!`);
                this.closeModal(modal, modalContent);
            } else {
                input.style.borderColor = '#EF4444';
                setTimeout(() => {
                    input.style.borderColor = 'var(--color-border)';
                }, 1000);
            }
        });

        this.setupCloseModal(modal, modalContent);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        return modal;
    }

    setupCloseModal(modal, modalContent) {
        const closeBtn = modalContent.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal(modal, modalContent);
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal, modalContent);
            }
        });
    }

    closeModal(modal, modalContent) {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    }

    setupCloseHandlers() {
        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal-overlay');
                if (modal) {
                    const modalContent = modal.querySelector('.modal-content');
                    if (modalContent) {
                        this.closeModal(modal, modalContent);
                    }
                }
            }
        });
    }
}



