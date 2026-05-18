
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        tenantId: '3047abac-9724-4fca-818d-b0c7d1271e63',
        tenantName: 'Factorial Systems',
        apiKey: 'ZVFfniWfLFG1Oj37TCVxdcX0ZJE4boxjsGBMkuzKKuHqhRPDoSHj3Y1E6HyUG58X',
        backendUrl: 'https://api.chatcraft.cc',
        chatServiceUrl: 'https://api.chatcraft.cc',
        gatewayUrl: 'https://api.chatcraft.cc',
        widgetId: 'factorial-chat-3047abac-9724-4fca-818d-b0c7d1271e63',
        colors: {
            primary: '#204ABB',
            secondary: '#69C1A9',
            accent: '#CDF547',
            white: '#FFFFFF',
            gray: '#F5F5F5',
            darkGray: '#333333',
            lightGray: '#E0E0E0'
        },
        // Logo configuration
        logo: {
            type: 'url',
            source: 'https://api.chatcraft.cc/api/v1/settings-logo/3047abac-9724-4fca-818d-b0c7d1271e63',
            initials: null,
            isCustom: true
        },
        // Customizable text
        hoverText: 'Chat with US!',
        welcomeMessage: 'Hello! How can I help you today?',
        chatWindowTitle: 'Welcome to Factorial!',
        // End-user authentication (OAuth2 PKCE)
        auth: {
            enabled: false,
            authorizationEndpoint: '',
            clientId: '',
            scopes: 'openid profile email'
        }
    };
    
    // Chat Widget Class
    class FactorialChatWidget {
        constructor() {
            console.log('FactorialChatWidget: Constructor called');

            // Prevent multiple instances
            if (window.__factorialChatWidgetInstance) {
                console.error('FactorialChatWidget: Instance already exists! Returning existing instance.');
                return window.__factorialChatWidgetInstance;
            }

            try {
                this.isOpen = false;
                this.socket = null;
                this.messages = [];
                this.isConnected = false;
                this.chatContainer = null;
                this.messagesContainer = null;
                this.inputField = null;
                // Read session_id from localStorage with 24h expiry check
                const storedSessionId = localStorage.getItem('factorial_session_id');
                const storedSessionTs = localStorage.getItem('factorial_session_ts');
                const SESSION_TTL = 24 * 60 * 60 * 1000; // 24 hours
                if (storedSessionId && storedSessionTs && (Date.now() - parseInt(storedSessionTs)) < SESSION_TTL) {
                    this.sessionId = storedSessionId;
                } else {
                    this.sessionId = null;
                    localStorage.removeItem('factorial_session_id');
                    localStorage.removeItem('factorial_session_ts');
                }
                this.feedbackSubmitted = new Set();
                this.isAuthenticated = false;
                this.authUser = null;
                this._refreshTimer = null;

                this.init();

                // Store instance globally
                window.__factorialChatWidgetInstance = this;
                console.log('FactorialChatWidget: Initialization complete');
            } catch (error) {
                console.error('FactorialChatWidget: Initialization failed:', error);
                throw error;
            }
        }
        
        init() {
            console.log('FactorialChatWidget: Init started');
            try {
                this.injectCSS();
                console.log('FactorialChatWidget: CSS injected');

                this.createWidget();
                console.log('FactorialChatWidget: Widget created');

                this.attachEventListeners();
                console.log('FactorialChatWidget: Event listeners attached');
            } catch (error) {
                console.error('FactorialChatWidget: Init failed:', error);
                throw error;
            }
        }
        
        // ---- PKCE Auth Helpers ----
        generateCodeVerifier() {
            const array = new Uint8Array(32);
            crypto.getRandomValues(array);
            return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
        }

        async generateCodeChallenge(verifier) {
            const encoder = new TextEncoder();
            const data = encoder.encode(verifier);
            const digest = await crypto.subtle.digest('SHA-256', data);
            return btoa(String.fromCharCode(...new Uint8Array(digest)))
                .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }

        generateState() {
            return Array.from(crypto.getRandomValues(new Uint8Array(16)),
                b => b.toString(16).padStart(2, '0')).join('');
        }

        async login() {
            // Clean up any stale listener from a previous login attempt
            if (this._authHandler) {
                window.removeEventListener('message', this._authHandler);
                this._authHandler = null;
            }

            const codeVerifier = this.generateCodeVerifier();
            const codeChallenge = await this.generateCodeChallenge(codeVerifier);
            const state = this.generateState();

            // Store PKCE params for the callback
            sessionStorage.setItem('factorial_pkce_verifier', codeVerifier);
            sessionStorage.setItem('factorial_pkce_state', state);

            const callbackUrl = CONFIG.gatewayUrl + '/api/v1/auth/callback';

            const params = new URLSearchParams({
                response_type: 'code',
                client_id: CONFIG.auth.clientId,
                redirect_uri: callbackUrl,
                scope: CONFIG.auth.scopes,
                state: state,
                code_challenge: codeChallenge,
                code_challenge_method: 'S256'
            });

            const authUrl = CONFIG.auth.authorizationEndpoint + '?' + params.toString();

            // Open popup
            const popup = window.open(authUrl, 'factorial_auth',
                'width=500,height=600,scrollbars=yes');

            // Listen for the callback message from the popup
            this._authHandler = async (event) => {
                if (!event.data || event.data.type !== 'factorial_auth_callback') return;
                window.removeEventListener('message', this._authHandler);
                this._authHandler = null;

                const { code, state: returnedState } = event.data;

                // Verify state
                const savedState = sessionStorage.getItem('factorial_pkce_state');
                if (returnedState !== savedState) {
                    console.error('PKCE state mismatch');
                    sessionStorage.removeItem('factorial_pkce_verifier');
                    sessionStorage.removeItem('factorial_pkce_state');
                    this.addMessage('bot', 'Authentication failed: security check failed. Please try again.');
                    return;
                }

                // Exchange code for token via chat service BFF
                await this.exchangeCode(code, codeVerifier, callbackUrl);
            };
            window.addEventListener('message', this._authHandler);
        }

        async exchangeCode(code, codeVerifier, redirectUri) {
            try {
                const response = await fetch(CONFIG.gatewayUrl + '/api/v1/auth/pkce/exchange', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        api_key: CONFIG.apiKey,
                        authorization_code: code,
                        code_verifier: codeVerifier,
                        redirect_uri: redirectUri
                    })
                });

                if (!response.ok) {
                    throw new Error('Token exchange failed');
                }

                const data = await response.json();
                this.sessionId = data.session_id;
                this.isAuthenticated = true;
                this.authUser = data.user;

                // Clear PKCE artifacts — no longer needed
                sessionStorage.removeItem('factorial_pkce_verifier');
                sessionStorage.removeItem('factorial_pkce_state');

                // Persist session across page navigations and tab close
                localStorage.setItem('factorial_session_id', data.session_id);
                localStorage.setItem('factorial_session_ts', Date.now().toString());
                sessionStorage.setItem('factorial_auth_user', JSON.stringify(data.user));

                // Update UI to show authenticated state
                this.showAuthenticatedHeader();

                // Schedule proactive token refresh
                if (data.expires_in) {
                    this.scheduleTokenRefresh(data.expires_in);
                }

                // Hide auth prompt and connect WebSocket with authenticated session
                this.hideAuthPrompt();
                this.connectWebSocket();

            } catch (error) {
                console.error('Token exchange error:', error);
                // Clear PKCE artifacts on failure too
                sessionStorage.removeItem('factorial_pkce_verifier');
                sessionStorage.removeItem('factorial_pkce_state');
                this.addMessage('bot', 'Authentication failed. Please try again or continue as a guest.');
            }
        }

        showAuthenticatedHeader() {
            const header = this.chatContainer.querySelector('.factorial-chat-title');
            if (header && this.authUser && this.authUser.name) {
                header.textContent = CONFIG.chatWindowTitle + ' — ' + this.authUser.name;
            }
        }

        showAuthPrompt() {
            // Create auth prompt overlay in the messages area
            const promptDiv = document.createElement('div');
            promptDiv.id = 'factorial-auth-prompt';
            promptDiv.style.cssText = 'padding:20px;text-align:center;';
            promptDiv.innerHTML = `
                <p style="margin-bottom:16px;color:${CONFIG.colors.darkGray};font-size:14px;">
                    Log in to access personalized services, or continue as a guest.
                </p>
                <button id="factorial-auth-login-btn" style="
                    padding:10px 24px;background:${CONFIG.colors.primary};color:#fff;
                    border:none;border-radius:6px;cursor:pointer;font-size:14px;
                    font-weight:600;margin:4px;">
                    Log In
                </button>
                <button id="factorial-auth-guest-btn" style="
                    padding:10px 24px;background:transparent;color:${CONFIG.colors.primary};
                    border:2px solid ${CONFIG.colors.primary};border-radius:6px;cursor:pointer;
                    font-size:14px;font-weight:600;margin:4px;">
                    Continue as Guest
                </button>
            `;
            this.messagesContainer.appendChild(promptDiv);

            document.getElementById('factorial-auth-login-btn').addEventListener('click', () => {
                this.login();
            });
            document.getElementById('factorial-auth-guest-btn').addEventListener('click', () => {
                this.hideAuthPrompt();
                this.connectWebSocket();
            });
        }

        hideAuthPrompt() {
            const prompt = document.getElementById('factorial-auth-prompt');
            if (prompt) prompt.remove();
        }

        scheduleTokenRefresh(expiresIn) {
            if (this._refreshTimer) {
                clearTimeout(this._refreshTimer);
                this._refreshTimer = null;
            }
            // Refresh at 80% of expiry, minimum 30 seconds
            const refreshMs = Math.max(expiresIn * 0.8 * 1000, 30000);
            console.log('Scheduling token refresh in', Math.round(refreshMs / 1000), 'seconds');
            this._refreshTimer = setTimeout(() => {
                this.refreshToken();
            }, refreshMs);
        }

        async refreshToken() {
            if (!this.sessionId) return;
            try {
                const response = await fetch(CONFIG.gatewayUrl + '/api/v1/auth/pkce/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        session_id: this.sessionId,
                        api_key: CONFIG.apiKey
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Token refreshed, next refresh in', data.expires_in, 'seconds');
                    this.scheduleTokenRefresh(data.expires_in);
                } else if (response.status === 401) {
                    console.warn('Token refresh failed (401), session expired');
                    this.handleAuthExpired('Your session has expired. Please log in again.');
                } else {
                    // Non-auth error — retry once after 10 seconds
                    console.warn('Token refresh failed (' + response.status + '), retrying in 10s');
                    this._refreshTimer = setTimeout(() => {
                        this.refreshToken();
                    }, 10000);
                }
            } catch (error) {
                console.error('Token refresh network error:', error);
                // Retry once after 10 seconds on network error
                this._refreshTimer = setTimeout(() => {
                    this.refreshToken();
                }, 10000);
            }
        }

        handleAuthExpired(message) {
            // Clear refresh timer
            if (this._refreshTimer) {
                clearTimeout(this._refreshTimer);
                this._refreshTimer = null;
            }

            // Clear persisted session
            localStorage.removeItem('factorial_session_id');
            localStorage.removeItem('factorial_session_ts');
            sessionStorage.removeItem('factorial_auth_user');

            // Reset auth state
            this.isAuthenticated = false;
            this.authUser = null;
            this.sessionId = null;

            // Close WebSocket
            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }
            this.isConnected = false;

            // Reset header title
            const header = this.chatContainer.querySelector('.factorial-chat-title');
            if (header) {
                header.textContent = CONFIG.chatWindowTitle;
            }

            // Show expiry message
            this.addMessage('bot', message || 'Your session has expired. Please log in again.');

            // Show auth prompt if auth is enabled
            if (CONFIG.auth.enabled) {
                this.showAuthPrompt();
            }
        }
        // ---- End PKCE Auth Helpers ----

        injectCSS() {
            if (document.getElementById('factorial-chat-css')) return;
            
            const style = document.createElement('style');
            style.id = 'factorial-chat-css';
            style.textContent = this.getCSS();
            document.head.appendChild(style);
        }
        
        getCSS() {
            return `
                .factorial-chat-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                
                .factorial-chat-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, ${CONFIG.colors.primary}, ${CONFIG.colors.secondary});
                    border: none;
                    cursor: pointer !important;
                    pointer-events: auto !important;
                    box-shadow: 0 4px 12px rgba(93, 62, 193, 0.3);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                .factorial-chat-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(93, 62, 193, 0.4);
                }
                
                .factorial-chat-button-icon {
                    width: 24px;
                    height: 24px;
                    fill: ${CONFIG.colors.white};
                }
                
                .factorial-chat-button-logo {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    object-fit: cover;
                    object-position: center;
                }

                .factorial-chat-button-initials {
                    width: 54px;
                    height: 54px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, ${CONFIG.colors.primary}, ${CONFIG.colors.secondary});
                    color: ${CONFIG.colors.white};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    transition: transform 0.3s ease;
                }
                
                .factorial-chat-button:hover .factorial-chat-button-initials {
                    transform: scale(1.1);
                }
                
                .factorial-chat-window {
                    position: fixed;
                    bottom: 100px;
                    right: 20px;
                    width: 380px;
                    height: 500px;
                    background: ${CONFIG.colors.white};
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    z-index: 999998;
                }
                
                .factorial-chat-window.open {
                    display: flex;
                    animation: slideUp 0.3s ease;
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .factorial-chat-header {
                    background: linear-gradient(135deg, ${CONFIG.colors.primary}, ${CONFIG.colors.secondary});
                    color: ${CONFIG.colors.white};
                    padding: 20px;
                    text-align: center;
                    position: relative;
                }
                
                .factorial-chat-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: ${CONFIG.colors.white};
                    font-size: 20px;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                
                .factorial-chat-close:hover {
                    opacity: 1;
                }
                
                .factorial-chat-title {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 0;
                }
                
                
                .factorial-chat-messages {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: ${CONFIG.colors.gray};
                }
                
                .factorial-chat-message {
                    margin-bottom: 15px;
                    display: flex;
                    align-items: flex-start;
                }
                
                .factorial-chat-message.user {
                    justify-content: flex-end;
                }
                
                .factorial-chat-message-content {
                    max-width: 70%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .factorial-chat-message.user .factorial-chat-message-content {
                    background: ${CONFIG.colors.primary};
                    color: ${CONFIG.colors.white};
                    border-bottom-right-radius: 4px;
                }
                
                .factorial-chat-message.bot .factorial-chat-message-content {
                    background: ${CONFIG.colors.white};
                    color: ${CONFIG.colors.darkGray};
                    border: 1px solid ${CONFIG.colors.lightGray};
                    border-bottom-left-radius: 4px;
                }
                
                .factorial-chat-input-container {
                    padding: 20px;
                    border-top: 1px solid ${CONFIG.colors.lightGray};
                    display: flex;
                    gap: 10px;
                }
                
                .factorial-chat-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid ${CONFIG.colors.lightGray};
                    border-radius: 25px;
                    outline: none;
                    font-size: 14px;
                    transition: border-color 0.2s;
                }
                
                .factorial-chat-input:focus {
                    border-color: ${CONFIG.colors.primary};
                }
                
                .factorial-chat-send {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: ${CONFIG.colors.accent};
                    border: none;
                    color: ${CONFIG.colors.white};
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.2s;
                }
                
                .factorial-chat-send:hover {
                    background: #2ea049;
                }
                
                .factorial-chat-send:disabled {
                    background: ${CONFIG.colors.lightGray};
                    cursor: not-allowed;
                }

                .factorial-chat-choices {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 10px;
                    margin: 5px 0;
                }

                .factorial-chat-choice-button {
                    padding: 12px 20px;
                    background: ${CONFIG.colors.white};
                    border: 2px solid ${CONFIG.colors.primary};
                    color: ${CONFIG.colors.primary};
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                    text-align: left;
                }

                .factorial-chat-choice-button:hover {
                    background: ${CONFIG.colors.primary};
                    color: ${CONFIG.colors.white};
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .factorial-chat-footer {
                    padding: 12px 20px;
                    background: ${CONFIG.colors.white};
                    border-top: 1px solid ${CONFIG.colors.lightGray};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 12px;
                    color: ${CONFIG.colors.darkGray};
                }
                
                .factorial-chat-logo {
                    height: 20px;
                    width: auto;
                    transition: transform 0.2s ease;
                }

                .factorial-chat-logo-link {
                    display: inline-flex;
                    align-items: center;
                    text-decoration: none;
                    cursor: pointer;
                    transition: opacity 0.2s ease;
                }

                .factorial-chat-logo-link:hover {
                    opacity: 0.7;
                }

                .factorial-chat-logo-link:hover .factorial-chat-logo {
                    transform: scale(1.05);
                }

                .factorial-chat-logo-text {
                    font-weight: bold;
                    color: ${CONFIG.colors.primary};
                    margin-left: 4px;
                }
                
                .factorial-status-indicator {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: ${CONFIG.colors.accent};
                    border: 2px solid ${CONFIG.colors.white};
                }
                
                .factorial-status-indicator.disconnected {
                    background: #ff4444;
                }
                
                .factorial-typing-indicator {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 12px 16px;
                    color: ${CONFIG.colors.darkGray};
                    font-style: italic;
                    font-size: 13px;
                }
                
                .factorial-typing-dots {
                    display: flex;
                    gap: 2px;
                }
                
                .factorial-typing-dots span {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: ${CONFIG.colors.primary};
                    animation: typing 1.4s infinite;
                }
                
                .factorial-typing-dots span:nth-child(2) {
                    animation-delay: 0.2s;
                }
                
                .factorial-typing-dots span:nth-child(3) {
                    animation-delay: 0.4s;
                }
                
                @keyframes typing {
                    0%, 60%, 100% { opacity: 0.3; }
                    30% { opacity: 1; }
                }

                .factorial-feedback-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 8px;
                    padding-top: 8px;
                    border-top: 1px solid ${CONFIG.colors.lightGray};
                }

                .factorial-feedback-label {
                    font-size: 12px;
                    color: ${CONFIG.colors.darkGray};
                    opacity: 0.7;
                }

                .factorial-feedback-btn {
                    background: none;
                    border: 1px solid ${CONFIG.colors.lightGray};
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    padding: 0;
                }

                .factorial-feedback-btn:hover:not(:disabled) {
                    background: ${CONFIG.colors.gray};
                    transform: scale(1.1);
                }

                .factorial-feedback-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .factorial-feedback-btn.helpful.active {
                    background: #dcfce7;
                    border-color: #16a34a;
                }

                .factorial-feedback-btn.not-helpful.active {
                    background: #fee2e2;
                    border-color: #dc2626;
                }

                .factorial-feedback-icon {
                    width: 14px;
                    height: 14px;
                    fill: ${CONFIG.colors.darkGray};
                }

                .factorial-feedback-btn.helpful.active .factorial-feedback-icon {
                    fill: #16a34a;
                }

                .factorial-feedback-btn.not-helpful.active .factorial-feedback-icon {
                    fill: #dc2626;
                }

                .factorial-feedback-thanks {
                    font-size: 11px;
                    color: #16a34a;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                @media (max-width: 480px) {
                    .factorial-chat-window {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 140px);
                        bottom: 100px;
                        right: 20px;
                        left: 20px;
                    }
                }
            `;
        }
        
        createWidget() {
            // Check if widget already exists in DOM
            const existingWidget = document.getElementById(CONFIG.widgetId);
            if (existingWidget) {
                console.error('FactorialChatWidget: Widget already exists in DOM, removing duplicate');
                existingWidget.remove();
            }

            const widgetContainer = document.createElement('div');
            widgetContainer.className = 'factorial-chat-widget';
            widgetContainer.id = CONFIG.widgetId;

            widgetContainer.innerHTML = `
                <button class="factorial-chat-button" id="factorial-chat-toggle" title="${CONFIG.hoverText}">
                    
                    <img src="https://api.chatcraft.cc/api/v1/settings-logo/3047abac-9724-4fca-818d-b0c7d1271e63" alt="Chat" class="factorial-chat-button-logo">
                    
                    <div class="factorial-status-indicator" id="factorial-status"></div>
                </button>
                
                <div class="factorial-chat-window" id="factorial-chat-window">
                    <div class="factorial-chat-header">
                        <button class="factorial-chat-close" id="factorial-chat-close">&times;</button>
                        <h3 class="factorial-chat-title">${CONFIG.chatWindowTitle}</h3>
                    </div>
                    
                    <div class="factorial-chat-messages" id="factorial-chat-messages">
                        <div class="factorial-chat-message bot">
                            <div class="factorial-chat-message-content">
                                ${CONFIG.welcomeMessage}
                            </div>
                        </div>
                    </div>
                    
                    <div class="factorial-chat-input-container">
                        <input type="text" class="factorial-chat-input" id="factorial-chat-input" placeholder="Type your message..." maxlength="1000">
                        <button class="factorial-chat-send" id="factorial-chat-send" disabled>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="factorial-chat-footer">
                        <span>Powered by</span>
                        <a href="https://www.chatcraft.cc" target="_blank" rel="noopener noreferrer" class="factorial-chat-logo-link">
                            <img src="https://api.chatcraft.cc/api/v1/widget/static/chatcraft-logo2.png" alt="ChatCraft" class="factorial-chat-logo">
                        </a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(widgetContainer);
            
            this.chatContainer = document.getElementById('factorial-chat-window');
            this.messagesContainer = document.getElementById('factorial-chat-messages');
            this.inputField = document.getElementById('factorial-chat-input');
        }
        
        attachEventListeners() {
            const toggleButton = document.getElementById('factorial-chat-toggle');
            const closeButton = document.getElementById('factorial-chat-close');
            const sendButton = document.getElementById('factorial-chat-send');
            const inputField = this.inputField;

            // Validate all required elements exist
            if (!toggleButton) {
                console.error('FactorialChatWidget: Toggle button not found!');
                return;
            }
            if (!closeButton) {
                console.error('FactorialChatWidget: Close button not found!');
                return;
            }
            if (!sendButton) {
                console.error('FactorialChatWidget: Send button not found!');
                return;
            }
            if (!inputField) {
                console.error('FactorialChatWidget: Input field not found!');
                return;
            }

            console.log('FactorialChatWidget: All elements found, attaching listeners...');

            // Attach click handler for toggle button
            toggleButton.addEventListener('click', (e) => {
                console.log('FactorialChatWidget: Toggle button clicked');
                e.stopPropagation();
                e.preventDefault();
                this.toggleChat();
            }, false);

            closeButton.addEventListener('click', (e) => {
                console.log('FactorialChatWidget: Close button clicked');
                e.stopPropagation();
                e.preventDefault();
                this.closeChat();
            });

            sendButton.addEventListener('click', (e) => {
                console.log('FactorialChatWidget: Send button clicked');
                e.stopPropagation();
                e.preventDefault();
                this.sendMessage();
            });

            inputField.addEventListener('input', (e) => {
                sendButton.disabled = !e.target.value.trim();
            });

            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey && e.target.value.trim()) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            console.log('FactorialChatWidget: All event listeners attached successfully');
        }
        
        toggleChat() {
            console.log('FactorialChatWidget: toggleChat() called, current state:', this.isOpen ? 'open' : 'closed');
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        openChat() {
            console.log('FactorialChatWidget: openChat() called');
            this.isOpen = true;
            this.chatContainer.classList.add('open');
            this.inputField.focus();

            if (!this.isConnected || !this.socket || this.socket.readyState !== WebSocket.OPEN) {
                // Check if auth is enabled and user hasn't chosen yet
                if (CONFIG.auth.enabled && !this.isAuthenticated && !this.sessionId) {
                    // Check for persisted authenticated session from sessionStorage
                    const savedUser = sessionStorage.getItem('factorial_auth_user');
                    if (savedUser) {
                        this.isAuthenticated = true;
                        this.authUser = JSON.parse(savedUser);
                        this.showAuthenticatedHeader();
                        this.connectWebSocket();
                        // Proactively validate/refresh the token on session restore
                        this.refreshToken();
                    } else {
                        this.showAuthPrompt();
                    }
                } else {
                    console.log('FactorialChatWidget: Not connected, initializing WebSocket...');
                    if (this.isAuthenticated) {
                        this.showAuthenticatedHeader();
                    }
                    this.connectWebSocket();
                }
            }
            console.log('FactorialChatWidget: Chat window opened');
        }

        closeChat() {
            console.log('FactorialChatWidget: closeChat() called');
            this.isOpen = false;
            this.chatContainer.classList.remove('open');
            if (this.socket) {
                this.socket.close();
                this.socket = null;
            }
            this.isConnected = false;
            this.updateConnectionStatus(false);
            console.log('FactorialChatWidget: Chat window closed');
        }
        
        connectWebSocket() {
            // Convert HTTP/HTTPS URLs to WebSocket URLs
            let wsUrl = CONFIG.chatServiceUrl.replace('http://', 'ws://').replace('https://', 'wss://');

            // For production domains, ensure we use the direct /ws/chat path
            // since nginx proxies /ws/chat directly to the chat service
            let wsEndpoint = `${wsUrl}/ws/chat?api_key=${CONFIG.apiKey}`;

            // If we have an authenticated session, include the session_id
            if (this.sessionId) {
                wsEndpoint += `&session_id=${encodeURIComponent(this.sessionId)}`;
            }
            
            // Clean up any stale socket before creating a new one
            if (this.socket) {
                try { this.socket.close(); } catch(e) {}
                this.socket = null;
            }

            try {
                this.socket = new WebSocket(wsEndpoint);
                
                this.socket.onopen = () => {
                    this.isConnected = true;
                    this.updateConnectionStatus(true);
                    if (this.pendingAuthMessage) {
                        const msg = this.pendingAuthMessage;
                        this.pendingAuthMessage = null;
                        setTimeout(() => {
                            this.showTypingIndicator();
                            this.socket.send(JSON.stringify({
                                type: 'message',
                                message: msg
                            }));
                        }, 500);
                    }
                };
                
                this.socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'message' && data.role === 'assistant') {
                        // Store session_id if provided
                        if (data.session_id && !this.sessionId) {
                            this.sessionId = data.session_id;
                        }

                        // Add message with messageId for feedback
                        this.addMessage('bot', data.content, data.message_id);

                        // Handle choices if present (for workflow choice steps)
                        if (data.choices && data.choices.length > 0) {
                            this.addChoices(data.choices);
                        }

                        this.hideTypingIndicator();
                        this.enableSendButton();
                    } else if (data.type === 'connection') {
                        console.log('Connected to chat service:', data.message);
                        // Extract session_id from connection message
                        if (data.session_id) {
                            this.sessionId = data.session_id;
                            localStorage.setItem('factorial_session_id', data.session_id);
                            localStorage.setItem('factorial_session_ts', Date.now().toString());
                        }
                        // Show authenticated user info if returned from server
                        if (data.authenticated && data.user) {
                            this.isAuthenticated = true;
                            this.authUser = data.user;
                            sessionStorage.setItem('factorial_auth_user', JSON.stringify(data.user));
                            this.showAuthenticatedHeader();
                        }
                    } else if (data.type === 'history') {
                        // Restore previous messages on session resumption (page navigation)
                        if (data.messages && data.messages.length > 0) {
                            data.messages.forEach(msg => {
                                const role = msg.role === 'user' ? 'user' : 'bot';
                                this.addMessage(role, msg.content, msg.message_id);
                            });
                        }
                    } else if (data.type === 'auth_expired') {
                        this.handleAuthExpired(data.message);
                    } else if (data.type === 'auth_required') {
                        this.hideTypingIndicator();
                        this.enableSendButton();
                        this.addMessage('bot', data.message || 'This feature requires you to log in.');
                        this.pendingAuthMessage = this.lastUserMessage;
                        if (CONFIG.auth.enabled) {
                            this.showAuthPrompt();
                        }
                    } else if (data.type === 'auth_confirmed') {
                        console.log('Authentication confirmed:', data.message);
                    } else if (data.type === 'error') {
                        console.error('Chat service error:', data.message);
                        this.addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
                        this.hideTypingIndicator();
                        this.enableSendButton();
                    }
                };
                
                this.socket.onclose = () => {
                    this.isConnected = false;
                    this.socket = null;
                    this.updateConnectionStatus(false);
                    this.hideTypingIndicator();
                };
                
                this.socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    this.isConnected = false;
                    this.updateConnectionStatus(false);
                    this.addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
                };
                
            } catch (error) {
                console.error('Failed to connect to chat service:', error);
                this.addMessage('bot', 'Unable to connect to chat service. Please check your internet connection.');
            }
        }
        
        updateConnectionStatus(connected) {
            const statusIndicator = document.getElementById('factorial-status');
            if (connected) {
                statusIndicator.classList.remove('disconnected');
            } else {
                statusIndicator.classList.add('disconnected');
            }
        }
        
        sendMessage() {
            const message = this.inputField.value.trim();
            if (!message || !this.isConnected) return;

            this.lastUserMessage = message;
            this.addMessage('user', message);
            this.inputField.value = '';
            document.getElementById('factorial-chat-send').disabled = true;
            
            this.showTypingIndicator();
            
            // Send message via WebSocket
            this.socket.send(JSON.stringify({
                type: 'message',
                message: message
            }));
        }
        
        addMessage(sender, content, messageId = null) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `factorial-chat-message ${sender}`;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'factorial-chat-message-content';
            contentDiv.textContent = content;

            messageDiv.appendChild(contentDiv);

            // Add feedback buttons for bot messages with messageId
            if (sender === 'bot' && messageId && this.sessionId) {
                const feedbackContainer = document.createElement('div');
                feedbackContainer.className = 'factorial-feedback-container';
                feedbackContainer.id = `feedback-${messageId}`;

                // Check if feedback already submitted
                const alreadySubmitted = this.feedbackSubmitted.has(messageId);

                feedbackContainer.innerHTML = `
                    <span class="factorial-feedback-label">Was this helpful?</span>
                    <button class="factorial-feedback-btn helpful"
                            data-message-id="${messageId}"
                            data-feedback="helpful"
                            ${alreadySubmitted ? 'disabled' : ''}>
                        <svg class="factorial-feedback-icon" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                        </svg>
                    </button>
                    <button class="factorial-feedback-btn not-helpful"
                            data-message-id="${messageId}"
                            data-feedback="not_helpful"
                            ${alreadySubmitted ? 'disabled' : ''}>
                        <svg class="factorial-feedback-icon" viewBox="0 0 24 24">
                            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                        </svg>
                    </button>
                `;

                // Add click handlers
                const helpfulBtn = feedbackContainer.querySelector('.helpful');
                const notHelpfulBtn = feedbackContainer.querySelector('.not-helpful');

                helpfulBtn.addEventListener('click', (e) => {
                    this.submitFeedback(messageId, 'helpful', feedbackContainer);
                });

                notHelpfulBtn.addEventListener('click', (e) => {
                    this.submitFeedback(messageId, 'not_helpful', feedbackContainer);
                });

                contentDiv.appendChild(feedbackContainer);
            }

            this.messagesContainer.appendChild(messageDiv);

            // Auto-scroll to bottom
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }

        addChoices(choices) {
            const choicesDiv = document.createElement('div');
            choicesDiv.className = 'factorial-chat-choices';

            choices.forEach(choice => {
                const button = document.createElement('button');
                button.className = 'factorial-chat-choice-button';
                button.textContent = choice;
                button.onclick = () => {
                    // Remove all choice buttons after selection
                    document.querySelectorAll('.factorial-chat-choices').forEach(el => el.remove());

                    // Send the selected choice as a message
                    this.addMessage('user', choice);
                    document.getElementById('factorial-chat-send').disabled = true;
                    this.showTypingIndicator();

                    this.socket.send(JSON.stringify({
                        type: 'message',
                        message: choice
                    }));
                };
                choicesDiv.appendChild(button);
            });

            this.messagesContainer.appendChild(choicesDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
        
        showTypingIndicator() {
            const existingIndicator = document.getElementById('factorial-typing-indicator');
            if (existingIndicator) return;
            
            const indicatorDiv = document.createElement('div');
            indicatorDiv.className = 'factorial-chat-message bot';
            indicatorDiv.id = 'factorial-typing-indicator';
            
            indicatorDiv.innerHTML = `
                <div class="factorial-typing-indicator">
                    <span>AI is typing</span>
                    <div class="factorial-typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            
            this.messagesContainer.appendChild(indicatorDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
        
        hideTypingIndicator() {
            const indicator = document.getElementById('factorial-typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }
        
        enableSendButton() {
            const sendButton = document.getElementById('factorial-chat-send');
            if (sendButton) {
                sendButton.disabled = false;
            }
        }

        submitFeedback(messageId, feedbackType, feedbackContainer) {
            // Prevent duplicate submissions
            if (!this.sessionId || !messageId || this.feedbackSubmitted.has(messageId)) {
                return;
            }

            // Mark as submitted
            this.feedbackSubmitted.add(messageId);

            // Disable both buttons immediately
            const buttons = feedbackContainer.querySelectorAll('.factorial-feedback-btn');
            buttons.forEach(btn => btn.disabled = true);

            // Determine which button was clicked for visual feedback
            const clickedButton = feedbackContainer.querySelector(`.${feedbackType}`);
            if (clickedButton) {
                clickedButton.classList.add('active');
            }

            // Submit feedback to API (widget-specific endpoint)
            fetch(`${CONFIG.gatewayUrl}/api/v1/feedback/widget/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': CONFIG.apiKey
                },
                body: JSON.stringify({
                    message_id: messageId,
                    session_id: this.sessionId,
                    feedback_type: feedbackType
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Feedback submitted successfully:', data);

                // Replace buttons with thank you message
                feedbackContainer.innerHTML = `
                    <span class="factorial-feedback-thanks">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#16a34a">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Thank you for your feedback!
                    </span>
                `;
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);

                // Re-enable buttons on error
                this.feedbackSubmitted.delete(messageId);
                buttons.forEach(btn => btn.disabled = false);
                if (clickedButton) {
                    clickedButton.classList.remove('active');
                }

                // Show error message
                const label = feedbackContainer.querySelector('.factorial-feedback-label');
                if (label) {
                    const originalText = label.textContent;
                    label.textContent = 'Failed to submit. Please try again.';
                    label.style.color = '#dc2626';
                    setTimeout(() => {
                        label.textContent = originalText;
                        label.style.color = '';
                    }, 3000);
                }
            });
        }
    }

    // Initialize widget when DOM is ready (Singleton pattern)
    if (window.__factorialChatWidgetInitialized) {
        console.warn('FactorialChatWidget: Already initialized, skipping duplicate initialization');
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.__factorialChatWidgetInitialized) {
                console.warn('FactorialChatWidget: Already initialized, skipping duplicate initialization');
                return;
            }
            window.__factorialChatWidgetInitialized = true;
            new FactorialChatWidget();
        });
    } else {
        window.__factorialChatWidgetInitialized = true;
        new FactorialChatWidget();
    }
})();