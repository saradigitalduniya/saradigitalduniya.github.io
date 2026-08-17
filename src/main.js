
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc, query, orderBy, onSnapshot, getDocs, getDoc, updateDoc, serverTimestamp , where } from "firebase/firestore";
import configJson from "../firebase-applet-config.json";

export const app = initializeApp(configJson);
export const auth = getAuth(app);
export const db = getFirestore(app, configJson.firestoreDatabaseId);

    
      // ==========================================
      // PRODUCT CATALOG MATRIX DATA
      // ==========================================
      const PRODUCTS = [
        {
          id: 'png-1',
          title: 'Sara Restaurant POS Logo Asset',
          category: 'pngs',
          badge: 'PNG Asset',
          price: 1,
          originalPrice: 99,
          rating: 5.0,
          reviews: 320,
          image: 'SaraRestaurant_pos.ico',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Official High-Definition transparent logo vector asset for Sara Restaurant POS software. Includes transparent PNG and Windows ICO icon file.'
        },
        {
          id: 'soft-2',
          title: 'Adobe Illustrator 2020 v24.2.3.521 (x64) Multilingual',
          category: 'software',
          badge: 'Software EXE',
          price: 599,
          originalPrice: 899,
          rating: 4.9,
          reviews: 142,
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Full pre-activated version of Adobe Illustrator 2020. Precision vector graphics design tool for logos, icons, drawings, and typography.'
        },
        {
          id: 'soft-3',
          title: 'Adobe InDesign 2022 v17.4.0.51',
          category: 'software',
          badge: 'Software EXE',
          price: 499,
          originalPrice: 799,
          rating: 4.8,
          reviews: 98,
          image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Industry leading page design and layout software for print and digital media. Design books, magazines, and interactive PDFs.'
        },
        {
          id: 'soft-4',
          title: 'Adobe PageMaker 7.0',
          category: 'software',
          badge: 'Classic Software',
          price: 399,
          originalPrice: 699,
          rating: 4.7,
          reviews: 210,
          image: 'https://drive.google.com/thumbnail?id=19t_1jDhEFZz7c_8icPXgByR2dic48PEr',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1PrVMIGvCPcjWqw76x8_PdDXAplOEtnwW',
          description: 'Classic page layout tool for printing presses, book publishing, and newspaper typesetting with full regional font support.'
        },
        {
          id: 'soft-5',
          title: 'CorelDraw 12',
          category: 'software',
          badge: 'Classic Software',
          price: 599,
          originalPrice: 899,
          rating: 4.9,
          reviews: 350,
          image: 'https://drive.google.com/thumbnail?id=1itobLgeRpoMBPFduzoGM0eZtMU5J9ldh',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1eChc21TSQovpS2F_dw0LtveG20B2nrDe',
          description: 'Ultra-fast vector graphics software trusted by flex printers, stamp makers, and signboards worldwide with serial key.'
        },
        {
          id: 'soft-6',
          title: 'Microsoft Office 2007 With Key',
          category: 'software',
          badge: 'Office Suite',
          price: 999,
          originalPrice: 1899,
          rating: 4.9,
          reviews: 180,
          image: 'https://drive.google.com/thumbnail?id=1KDVUK9lb86lADM6-KEEG5b0FJaomJq9r',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=19HgGhGntZ3YEty9_ktQasls2fZKwNv9I',
          description: 'Includes Word, Excel, PowerPoint, Access, and Publisher with full permanent product serial key.'
        },
        {
          id: 'soft-7',
          title: 'Microsoft Office 2010 Pro Plus v14.0.7268.5000 April 2021 x64',
          category: 'software',
          badge: 'Office Suite',
          price: 1599,
          originalPrice: 2699,
          rating: 5.0,
          reviews: 240,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Updated Professional Plus edition permanently activated for lifetime office productivity.'
        },
        {
          id: 'soft-8',
          title: 'Photoshop 7.0',
          category: 'software',
          badge: 'Classic Software',
          price: 399,
          originalPrice: 699,
          rating: 5.0,
          reviews: 580,
          image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Ultra-lightweight photo editor that opens instantly on any PC. Trusted by photo studios and online kiosks.'
        },
        {
          id: 'soft-9',
          title: 'Adobe Photoshop 2022 x64',
          category: 'software',
          badge: 'Software EXE',
          price: 499,
          originalPrice: 799,
          rating: 4.8,
          reviews: 115,
          image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Pre-activated Adobe Photoshop 2022 with object selection, neural filters, and smooth gradients.'
        },
        {
          id: 'soft-10',
          title: 'Adobe Photoshop 2023 v24.2.0.315',
          category: 'software',
          badge: 'Software EXE',
          price: 599,
          originalPrice: 899,
          rating: 4.9,
          reviews: 195,
          image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Includes One-click Delete and Fill, Contextual Task Bar, gradient previews, and camera raw.'
        },
        {
          id: 'soft-11',
          title: 'Adobe Photoshop 2025 x64',
          category: 'software',
          badge: 'Latest Release',
          price: 699,
          originalPrice: 999,
          rating: 5.0,
          reviews: 310,
          image: 'https://images.unsplash.com/photo-1542744094-3a3172720177?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Latest 2025 release with high-DPI GPU acceleration, smart removal tools, and dynamic adjustment presets.'
        },
        {
          id: 'soft-12',
          title: 'Windows Activation (Permanent)',
          category: 'software',
          badge: 'OS Activation',
          price: 799,
          originalPrice: 1199,
          rating: 4.9,
          reviews: 420,
          image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Permanent hardware digital license activation for Windows 10 & 11. Removes watermarks and unlocks features.'
        },
        {
          id: 'soft-13',
          title: 'Restaurant POS Software',
          category: 'software',
          badge: 'Business POS',
          price: 3999,
          originalPrice: 5999,
          rating: 5.0,
          reviews: 88,
          image: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC',
          description: 'Complete restaurant management system. KOT printing, table billing, inventory, and GST invoices.'
        },
        {
          id: 'serv-14',
          title: 'Independence Day Flex 1',
          category: 'services',
          badge: 'Design Asset',
          price: 50,
          originalPrice: 150,
          rating: 4.9,
          reviews: 175,
          isService: true,
          image: 'https://drive.google.com/thumbnail?id=1-TB22buWdnXbt7eLj36sFg5VC1MbZKQ6&sz=w1000',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1y3VjDyS07zaKiY2G5YgK2wCoYRlVqoEF',
          description: 'Independence Day Best design, Access high-resolution graphic design files, layered PSDs.'
        },
        {
          id: 'serv-15',
          title: 'Independence Day Flex 2',
          category: 'services',
          badge: 'Design Asset',
          price: 50,
          originalPrice: 150,
          rating: 4.5,
          reviews: 135,
          isService: true,
          image: 'https://drive.google.com/thumbnail?id=15a11_ObIGmWF4d_JlSHQQzOl-4n0N0Cp',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1XFncVMRCPcgcCFhKB5Dj2xI5wZmIiXcE',
          description: 'Independence Day Best design, Access high-resolution graphic design files, layered PSDs.'
        },
        {
          id: 'serv-16',
          title: 'Independence Day Flex 9 design in One (1) File ',
          category: 'services',
          badge: 'Design Asset',
          price: 150,
          originalPrice: 350,
          rating: 5,
          reviews: 297,
          isService: true,
          image: 'https://drive.google.com/thumbnail?id=1u8HA4HGKcCi7308qN7hhCkwWwyTd_bH-',
          downloadUrl: 'https://drive.google.com/uc?export=download&id=1ug8eq03DbD4PbTjd6jyJNrlXubXeEZgD',
          description: 'Independence Day Best design, 9 Design in One File, Access high-resolution graphic design files, layered PSDs.'
        },
        {
          id: 'serv-18',
          title: 'Full Book Writing with Multicolor Design',
          category: 'services',
          badge: 'Custom Service',
          price: 30,
          originalPrice: 50,
          rating: 5.0,
          reviews: 64,
          isService: true,
          image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://wa.me/919394195533?text=I%20want%20Book%20Writing%20Service',
          description: 'Professional book layout, typing, cover design, and formatting. B&W or Multicolor design page.'
        },
        {
          id: 'serv-19',
          title: 'Magazine Design',
          category: 'services',
          badge: 'Custom Service',
          price: 55,
          originalPrice: 85,
          rating: 4.9,
          reviews: 42,
          isService: true,
          image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://wa.me/919394195533?text=I%20want%20Magazine%20Design%20Service',
          description: 'High-end glossy magazine page layout, image color correction, and ready-to-print press files.'
        },
        {
          id: 'serv-20',
          title: 'Professional Logo Design',
          category: 'services',
          badge: 'Branding Service',
          price: 399,
          originalPrice: 799,
          rating: 5.0,
          reviews: 210,
          isService: true,
          image: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://wa.me/919394195533?text=I%20want%20Custom%20Logo%20Design',
          description: 'Custom vector logo creation tailored to your brand identity. Includes vector source files and high-res transparent PNGs.'
        },
        {
          id: 'serv-17',
          title: 'Premium Design Materials (PSD, TIFF, Ai)',
          category: 'services',
          badge: 'Design Asset',
          price: 100,
          originalPrice: 250,
          rating: 4.9,
          reviews: 175,
          isService: true,
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://wa.me/919394195533?text=I%20want%20Premium%20Design%20Materials',
          description: 'Access high-resolution graphic design files, layered PSDs, uncompressed TIFF backgrounds, and vector illustrations.'
        },
        {
          id: 'serv-web-dev',
          title: 'Custom Website Development Service',
          category: 'services',
          badge: 'Web Dev',
          price: 5999,
          originalPrice: 10999,
          rating: 5.0,
          reviews: 128,
          isService: true,
          image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://wa.me/919394195533?text=I%20want%20Custom%20Website%20Development%20Service',
          description: 'Custom, responsive, fast, and SEO-optimized web development tailored to client needs. Includes clean code, mobile adaptability, fast page loading, and custom domain setup.'
        },
        {
          id: 'serv-app-design',
          title: 'Android Mobile App UI/UX Design (Material Design)',
          category: 'services',
          badge: 'Android UI/UX',
          price: 7999,
          originalPrice: 1599,
          rating: 5.0,
          reviews: 94,
          isService: true,
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
          downloadUrl: 'https://wa.me/919394195533?text=I%20want%20Android%20Mobile%20App%20Design%20Service',
          description: 'Intuitive, modern UI/UX design specifically crafted for Android applications (Material Design focused). Includes Figma design source files, interactive prototype, component library, and asset exports.'
        }
      ];

      // ==========================================
      // STATE ENGINE
let cart = JSON.parse(localStorage.getItem('sara_cart')) || [];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'recommended';
let couponApplied = false;

// FIREBASE STATE
let currentUser = null;
let userPurchases = [];
let customProducts = [];
let activeAdmin = false;


      document.addEventListener('DOMContentLoaded', () => {
        if (window.emailjs) {
          try {
            emailjs.init("9FC25s8MYxG9Wn0zR");
          } catch (e) {}
        }
        loadAdminCustomProducts();
        renderHeaderUserMenu();
        renderVerificationBanner();
        
        // Check for URL search parameters (e.g. ?search=photoshop or ?s=photoshop)
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearch = urlParams.get('search') || urlParams.get('s') || urlParams.get('q');
        if (urlSearch) {
          handleSearch(decodeURIComponent(urlSearch));
        } else {
          renderProducts();
        }

        updateCartBadge();
        checkResetPasswordUrl();
        if (window.lucide) lucide.createIcons();
      });

      // ==========================================
      // EMAIL VERIFICATION SIMULATION
      // ==========================================
      function renderVerificationBanner() {
        const banner = document.getElementById('email-verification-banner');
        if (!banner) return;
        if (currentUser && currentUser.emailVerified === false) {
          const target = document.getElementById('verification-email-target');
          if (target) target.textContent = currentUser.email;
          banner.classList.remove('hidden');
        } else {
          banner.classList.add('hidden');
        }
      }

      
async function simulateEmailVerification() {
  if (!currentUser) return;
  try {
    await updateDoc(doc(db, "users", currentUser.uid), { emailVerified: true });
    currentUser.emailVerified = true;
    renderVerificationBanner();
    renderHeaderUserMenu();
    showToast('🎉 Email verified successfully!', 'success');
  } catch(e) {}
}


      // ==========================================
      // HEADER USER MENU & AUTH STATE MANAGEMENT
      // ==========================================
      function renderHeaderUserMenu() {
        const container = document.getElementById('header-user-menu-container');
        const mobileHeader = document.getElementById('mobile-menu-user-header');
        const mobileAuthAction = document.getElementById('mobile-menu-auth-action');

        if (currentUser) {
          const isVerified = currentUser.emailVerified !== false;

          // LOGGED IN DESKTOP DROPDOWN
          container.innerHTML = `
            <div class="relative group">
              <button class="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-brand-deep font-extrabold text-xs flex items-center gap-2 hover:bg-blue-100 transition-colors shadow-xs">
                <div class="w-6 h-6 rounded-full bg-brand-deep text-white text-[10px] font-black flex items-center justify-center">
                  ${currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>Hi, ${currentUser.name ? currentUser.name.split(' ')[0] : 'User'}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-brand-deep"></i>
              </button>

              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
                <div class="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div class="overflow-hidden">
                    <p class="font-extrabold text-slate-900 text-xs truncate">${currentUser.name}</p>
                    <p class="text-[10px] text-slate-500 truncate">${currentUser.email}</p>
                  </div>
                  ${isVerified 
                    ? `<span class="bg-emerald-100 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded ml-2 shrink-0">Verified</span>`
                    : `<span class="bg-amber-100 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded ml-2 shrink-0">Unverified</span>`
                  }
                </div>
                
                <button onclick="openAccountModal('dashboard')" class="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <i data-lucide="layout-dashboard" class="w-4 h-4 text-brand-deep"></i> Dashboard
                </button>
                <button onclick="openAccountModal('orders')" class="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <i data-lucide="package" class="w-4 h-4 text-emerald-600"></i> My Orders
                </button>
                <button onclick="openAccountModal('downloads')" class="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <i data-lucide="download" class="w-4 h-4 text-brand-orange"></i> My Downloads
                </button>
                <button onclick="openAccountModal('address')" class="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <i data-lucide="map-pin" class="w-4 h-4 text-slate-400"></i> Address Settings
                </button>
                <button onclick="openAccountModal('details')" class="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100">
                  <i data-lucide="user-check" class="w-4 h-4 text-slate-400"></i> Edit Profile
                </button>

                <div class="pt-1 border-t border-slate-100">
                  <button onclick="logoutUser()" class="w-full text-left px-4 py-2 text-xs font-extrabold text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                    <i data-lucide="log-out" class="w-4 h-4"></i> Logout Account
                  </button>
                </div>
              </div>
            </div>
          `;

          // LOGGED IN MOBILE MENU
          mobileHeader.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-brand-deep text-white font-black text-xs flex items-center justify-center">
                ${currentUser.name.charAt(0)}
              </div>
              <div class="overflow-hidden">
                <p class="font-black text-slate-900 text-xs truncate">Hi, ${currentUser.name}</p>
                <p class="text-[10px] text-slate-500 truncate">${currentUser.email}</p>
              </div>
            </div>
          `;

          mobileAuthAction.innerHTML = `
            <button onclick="logoutUser(); toggleMobileMenu();" class="w-full py-2.5 bg-rose-50 text-rose-600 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border border-rose-200">
              <i data-lucide="log-out" class="w-4 h-4"></i> Logout
            </button>
          `;

        } else {
          // LOGGED OUT DESKTOP BUTTON
          container.innerHTML = `
            <button onclick="openAuthModal('login')" class="px-3.5 py-2.5 rounded-xl bg-brand-deep hover:bg-blue-900 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all">
              <i data-lucide="user" class="w-4 h-4"></i>
              <span>My Account / Login</span>
            </button>
          `;

          // LOGGED OUT MOBILE MENU
          mobileHeader.innerHTML = `
            <div class="flex items-center gap-2 text-xs font-bold text-slate-700">
              <i data-lucide="user-x" class="w-4 h-4 text-slate-400"></i>
              <span>Guest User (Not Logged In)</span>
            </div>
          `;

          mobileAuthAction.innerHTML = `
            <button onclick="openAuthModal('login'); toggleMobileMenu();" class="w-full py-2.5 bg-brand-deep text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm">
              <i data-lucide="log-in" class="w-4 h-4"></i> Login or Register
            </button>
          `;
        }

        if (window.lucide) lucide.createIcons();
      }

      function handleAccountAction(defaultTab = 'dashboard') {
        if (!currentUser) {
          showToast('Please log in to access your account dashboard.', 'info');
          openAuthModal('login');
        } else {
          openAccountModal(defaultTab);
        }
      }

      function handleMobileAccountClick(tab = 'dashboard') {
        toggleMobileMenu();
        if (!currentUser) {
          showToast('Please log in to access your account dashboard.', 'info');
          openAuthModal('login');
        } else {
          openAccountModal(tab);
        }
      }

      // ==========================================
      // AUTH MODAL & FORM HANDLERS
      // ==========================================
      function openAuthModal(tab = 'login') {
        clearAuthErrors();
        switchAuthTab(tab);
        document.getElementById('auth-modal').classList.remove('hidden');
      }

      function closeAuthModal() {
        clearAuthErrors();
        document.getElementById('auth-modal').classList.add('hidden');
      }

      // ==========================================
      // EMAILJS & FORGOT PASSWORD CONFIGURATION
      // ==========================================
      const EMAILJS_SERVICE_ID = "service_x9lv0cs";
      const EMAILJS_TEMPLATE_ID = "template_fhrmvg4";
      const EMAILJS_PUBLIC_KEY = "9FC25s8MYxG9Wn0zR";

      (function(){
        if (window.emailjs) {
          emailjs.init("9FC25s8MYxG9Wn0zR");
        }
      })();

      let activeResetEmail = null;
      let activeResetToken = null;

      function clearAuthErrors() {
        const loginErr = document.getElementById('login-error-msg');
        const regErr = document.getElementById('register-error-msg');
        const forgotErr = document.getElementById('forgot-error-msg');
        if (loginErr) loginErr.classList.add('hidden');
        if (regErr) regErr.classList.add('hidden');
        if (forgotErr) forgotErr.classList.add('hidden');
      }

      function switchAuthTab(tab) {
        clearAuthErrors();
        const loginBtn = document.getElementById('auth-tab-login');
        const regBtn = document.getElementById('auth-tab-register');
        const loginForm = document.getElementById('auth-login-form');
        const regForm = document.getElementById('auth-register-form');
        const forgotForm = document.getElementById('auth-forgot-form');
        const tabsContainer = document.getElementById('auth-tabs-switcher');

        if (tab === 'login') {
          if (tabsContainer) tabsContainer.classList.remove('hidden');
          loginBtn.className = 'flex-1 py-2 text-xs font-extrabold rounded-lg transition-all bg-white text-brand-deep shadow-xs';
          regBtn.className = 'flex-1 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-all';
          loginForm.classList.remove('hidden');
          regForm.classList.add('hidden');
          if (forgotForm) forgotForm.classList.add('hidden');
        } else if (tab === 'register') {
          if (tabsContainer) tabsContainer.classList.remove('hidden');
          regBtn.className = 'flex-1 py-2 text-xs font-extrabold rounded-lg transition-all bg-white text-brand-deep shadow-xs';
          loginBtn.className = 'flex-1 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-all';
          regForm.classList.remove('hidden');
          loginForm.classList.add('hidden');
          if (forgotForm) forgotForm.classList.add('hidden');
        } else if (tab === 'forgot') {
          if (tabsContainer) tabsContainer.classList.add('hidden');
          loginForm.classList.add('hidden');
          regForm.classList.add('hidden');
          if (forgotForm) {
            forgotForm.classList.remove('hidden');
            const loginEmailVal = document.getElementById('login-email')?.value.trim();
            const forgotEmailInput = document.getElementById('forgot-email');
            if (loginEmailVal && forgotEmailInput && !forgotEmailInput.value) {
              forgotEmailInput.value = loginEmailVal;
            }
          }
        }
        if (window.lucide) lucide.createIcons();
      }

      
function handleForgotPasswordSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('forgot-email').value.trim().toLowerCase();
  if (!email) return;
  import("firebase/auth").then(({ sendPasswordResetEmail }) => {
    sendPasswordResetEmail(auth, email).then(() => {
      showToast("Password reset email sent!", "success"); closeAuthModal();
    }).catch((error) => showToast(error.message, "error"));
  });
}


      function showForgotError(msg) {
        const errContainer = document.getElementById('forgot-error-msg');
        const errText = document.getElementById('forgot-error-text');
        if (errContainer && errText) {
          errText.textContent = msg;
          errContainer.classList.remove('hidden');
        } else {
          showToast(msg, 'error');
        }
      }

      function checkResetPasswordUrl() {}

      function openResetPasswordModal(email) {
        const targetDisplay = document.getElementById('reset-target-email-display');
        if (targetDisplay) targetDisplay.textContent = email;
        const errorMsg = document.getElementById('reset-password-error-msg');
        if (errorMsg) errorMsg.classList.add('hidden');
        const form = document.getElementById('reset-password-form');
        if (form) form.reset();

        document.getElementById('reset-password-modal').classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }

      function closeResetPasswordModal() {}

      function handleResetPasswordSubmit(e) { e.preventDefault(); openAuthModal('login'); }

      function showLoginError(msg) {
        const errContainer = document.getElementById('login-error-msg');
        const errText = document.getElementById('login-error-text');
        if (errContainer && errText) {
          errText.textContent = msg;
          errContainer.classList.remove('hidden');
        } else {
          showToast(msg, 'error');
        }
      }

      function showRegisterError(msg) {
        const errContainer = document.getElementById('register-error-msg');
        const errText = document.getElementById('register-error-text');
        if (errContainer && errText) {
          errText.textContent = msg;
          errContainer.classList.remove('hidden');
        } else {
          showToast(msg, 'error');
        }
      }

      
function handleLoginSubmit(e) {
  e.preventDefault();
  clearAuthErrors();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    if (userDoc.exists()) currentUser = { uid: userCredential.user.uid, ...userDoc.data() };
    document.getElementById('auth-login-form').reset();
    closeAuthModal();
    showToast('Login successful!', 'success');
    if (sessionStorage.getItem('sara_redirect_to_checkout') === 'true') {
      sessionStorage.removeItem('sara_redirect_to_checkout');
      openCheckoutModal();
    }
  }).catch((error) => showLoginError(error.message));
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  clearAuthErrors();
  const fullname = document.getElementById('reg-fullname').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirm-password').value;
  if (password !== confirmPassword) { showRegisterError('Passwords do not match.'); return; }

  createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
    const newUser = {
      name: fullname, phone: phone, email: email, role: 'CUSTOMER', isActive: true,
      address: '', city: '', pincode: '', createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    };
    await setDoc(doc(db, "users", userCredential.user.uid), newUser);
    currentUser = { uid: userCredential.user.uid, ...newUser };
    document.getElementById('auth-register-form').reset();
    closeAuthModal();
    showToast('Account registered successfully!', 'success');
    openAccountModal('dashboard');
  }).catch((error) => showRegisterError(error.message));
}

async function logoutUser() {
  await signOut(auth);
  currentUser = null; userPurchases = [];
  renderHeaderUserMenu(); renderVerificationBanner(); closeAccountModal();
  showToast('Logged out of account.', 'info');
}

function renderProducts() {
        const grid = document.getElementById('product-grid');
        const emptyState = document.getElementById('no-products');

        let filtered = PRODUCTS.filter(p => {
          const matchesCat = (currentCategory === 'all') || (p.category === currentCategory);
          const q = (searchQuery || '').trim().toLowerCase();
          const matchesSearch = !q || 
                                p.title.toLowerCase().includes(q) || 
                                p.category.toLowerCase().includes(q) ||
                                (p.badge && p.badge.toLowerCase().includes(q)) ||
                                p.description.toLowerCase().includes(q);
          return matchesCat && matchesSearch;
        });

        if (currentSort === 'price-low') filtered.sort((a, b) => a.price - b.price);
        if (currentSort === 'price-high') filtered.sort((a, b) => b.price - a.price);

        if (filtered.length === 0) {
          grid.classList.add('hidden');
          emptyState.classList.remove('hidden');
          return;
        }

        grid.classList.remove('hidden');
        emptyState.classList.add('hidden');

        grid.innerHTML = filtered.map(p => `
          <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
            
            <div class="p-5 flex-1">
              <div class="flex items-center justify-between mb-3">
                <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  p.category === 'pngs' ? 'bg-orange-100 text-brand-orange' :
                  p.category === 'software' ? 'bg-blue-100 text-brand-deep' : 'bg-emerald-100 text-emerald-700'
                }">
                  ${p.badge}
                </span>
                <span class="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${p.rating}
                </span>
              </div>

              <!-- 3D Software Box / Digital Asset Preview Banner -->
              ${renderSoftwareBoxPreviewHTML(p)}

              <h3 onclick="openProductModal('${p.id}')" class="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-deep cursor-pointer transition-colors">
                ${p.title}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                ${p.description}
              </p>
            </div>

            <div class="p-5 pt-0 border-t border-slate-100 mt-auto bg-slate-50/50">
              <div class="flex items-baseline justify-between my-3">
                <div>
                  <span class="text-lg font-black text-slate-900">₹${p.price}</span>
                  ${p.isService ? '<span class="text-[10px] text-slate-500 font-bold"> starting</span>' : ''}
                  <span class="text-xs text-slate-400 line-through ml-1.5">₹${p.originalPrice}</span>
                </div>
                <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  ${Math.round((1 - p.price / p.originalPrice) * 100)}% OFF
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button onclick="addToCart('${p.id}')" class="py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1">
                  <i data-lucide="shopping-cart" class="w-3.5 h-3.5 text-brand-deep"></i> Cart
                </button>
                <button onclick="buyNowDirect('${p.id}')" class="py-2 px-3 bg-brand-orange hover:bg-orange-600 text-white font-black text-xs rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1">
                  <i data-lucide="zap" class="w-3.5 h-3.5"></i> Buy Now
                </button>
              </div>
            </div>

          </div>
        `).join('');

        if (window.lucide) lucide.createIcons();
      }

      // ==========================================
      // 3D SOFTWARE BOX & PREVIEW MOCKUP RENDERER
      // ==========================================
      function renderSoftwareBoxPreviewHTML(p) {
        if (p.category === 'pngs' || p.id === 'png-1') {
          return `
            <div onclick="openProductModal('${p.id}')" class="w-full h-40 rounded-xl bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] bg-slate-100 border border-slate-200/80 flex items-center justify-center mb-3 relative overflow-hidden group/img cursor-pointer">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10 opacity-70 group-hover/img:opacity-50 transition-opacity"></div>
              <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="w-24 h-24 object-contain filter drop-shadow-xl z-20 group-hover/img:scale-110 transition-transform duration-300" onerror="this.onerror=null; this.src='logo.png';" />
              <span class="absolute top-2 left-2 z-20 bg-orange-600/90 backdrop-blur-md text-white font-black text-[9px] uppercase px-2 py-0.5 rounded shadow-xs tracking-wider flex items-center gap-1">
                <i data-lucide="sparkles" class="w-2.5 h-2.5"></i> PNG Vector Asset
              </span>
              <span class="absolute bottom-2 right-2 z-20 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                <i data-lucide="eye" class="w-3 h-3 text-orange-400"></i> Click Preview
              </span>
            </div>
          `;
        }

        if (p.category === 'software') {
          let brandCode = 'EXE';
          let brandBg = 'from-blue-950 via-slate-900 to-slate-950';
          let brandBorder = 'border-blue-500';
          let brandText = 'text-blue-400 bg-blue-500/20';

          if (p.title.includes('Illustrator')) { brandCode = 'Ai'; brandBg = 'from-amber-950 via-slate-900 to-slate-950'; brandBorder = 'border-amber-500'; brandText = 'text-amber-400 bg-amber-500/20'; }
          else if (p.title.includes('InDesign')) { brandCode = 'Id'; brandBg = 'from-pink-950 via-slate-900 to-slate-950'; brandBorder = 'border-pink-500'; brandText = 'text-pink-400 bg-pink-500/20'; }
          else if (p.title.includes('PageMaker')) { brandCode = 'Pm'; brandBg = 'from-teal-950 via-slate-900 to-slate-950'; brandBorder = 'border-teal-500'; brandText = 'text-teal-400 bg-teal-500/20'; }
          else if (p.title.includes('CorelDraw')) { brandCode = 'CD'; brandBg = 'from-emerald-950 via-slate-900 to-slate-950'; brandBorder = 'border-emerald-500'; brandText = 'text-emerald-400 bg-emerald-500/20'; }
          else if (p.title.includes('Office 2007')) { brandCode = 'Office 07'; brandBg = 'from-red-950 via-slate-900 to-slate-950'; brandBorder = 'border-red-500'; brandText = 'text-red-400 bg-red-500/20'; }
          else if (p.title.includes('Office 2010')) { brandCode = 'Office 10'; brandBg = 'from-orange-950 via-slate-900 to-slate-950'; brandBorder = 'border-orange-500'; brandText = 'text-orange-400 bg-orange-500/20'; }
          else if (p.title.includes('Photoshop 7.0')) { brandCode = 'Ps 7.0'; brandBg = 'from-blue-950 via-slate-900 to-slate-950'; brandBorder = 'border-sky-400'; brandText = 'text-sky-300 bg-sky-500/20'; }
          else if (p.title.includes('Photoshop 2022')) { brandCode = 'Ps 2022'; brandBg = 'from-sky-950 via-slate-900 to-slate-950'; brandBorder = 'border-sky-500'; brandText = 'text-sky-400 bg-sky-500/20'; }
          else if (p.title.includes('Photoshop 2023')) { brandCode = 'Ps 2023'; brandBg = 'from-cyan-950 via-slate-900 to-slate-950'; brandBorder = 'border-cyan-400'; brandText = 'text-cyan-300 bg-cyan-500/20'; }
          else if (p.title.includes('Photoshop 2025')) { brandCode = 'Ps 2025'; brandBg = 'from-blue-900 via-cyan-950 to-slate-950'; brandBorder = 'border-cyan-300'; brandText = 'text-cyan-200 bg-cyan-400/20'; }
          else if (p.title.includes('Windows')) { brandCode = 'Win 11'; brandBg = 'from-blue-950 via-slate-900 to-slate-950'; brandBorder = 'border-blue-400'; brandText = 'text-blue-300 bg-blue-500/20'; }
          else if (p.title.includes('Restaurant POS')) { brandCode = 'Sara POS'; brandBg = 'from-slate-900 via-orange-950 to-slate-950'; brandBorder = 'border-orange-500'; brandText = 'text-orange-400 bg-orange-500/20'; }

          return `
            <div onclick="openProductModal('${p.id}')" class="w-full h-44 rounded-xl bg-gradient-to-br ${brandBg} border border-slate-700/60 flex items-center justify-between p-3 mb-3 relative overflow-hidden group/box cursor-pointer shadow-md">
              <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover/box:opacity-45 group-hover/box:scale-105 transition-all duration-500 filter blur-[0.5px]" onerror="this.onerror=null; this.style.display='none';" />
              
              <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent z-10"></div>
              
              <div class="relative z-20 flex items-center gap-3 w-full">
                <!-- 3D Box Front Spine -->
                <div class="w-20 h-28 rounded-lg bg-gradient-to-tr ${brandBg} border-2 ${brandBorder} shadow-2xl flex flex-col justify-between p-2 transform group-hover/box:rotate-[-3deg] group-hover/box:scale-105 transition-all duration-300 shrink-0">
                  <div class="flex items-center justify-between">
                    <span class="text-[7px] font-black uppercase text-slate-300 tracking-widest">SARA</span>
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div class="text-center my-auto">
                    <div class="inline-block px-1.5 py-0.5 rounded border ${brandBorder} ${brandText} text-xs font-black tracking-tighter shadow-sm">
                      ${brandCode}
                    </div>
                  </div>
                  <div class="text-[7px] font-bold text-slate-300 text-center uppercase tracking-tighter">
                    Pre-Activated
                  </div>
                </div>

                <!-- Info Badges -->
                <div class="flex-1 z-20 pr-1">
                  <div class="flex items-center gap-1 mb-1.5 flex-wrap">
                    <span class="bg-blue-500/30 border border-blue-400/40 text-blue-200 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Full Version
                    </span>
                    <span class="bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                      x64 EXE
                    </span>
                  </div>
                  <h4 class="text-white font-extrabold text-xs leading-snug line-clamp-2 drop-shadow-sm">
                    ${p.title}
                  </h4>
                  <div class="mt-2 flex items-center gap-1 text-[10px] font-bold text-amber-300">
                    <i data-lucide="eye" class="w-3 h-3 text-orange-400"></i> Real Software Preview
                  </div>
                </div>
              </div>

              <span class="absolute top-2 right-2 z-20 bg-slate-900/90 border border-slate-700 text-slate-300 font-extrabold text-[8px] px-2 py-0.5 rounded shadow-sm">
                Drive Access
              </span>
            </div>
          `;
        }

        return `
          <div onclick="openProductModal('${p.id}')" class="w-full h-40 rounded-xl bg-slate-900 border border-slate-200/60 flex items-center justify-center mb-3 relative overflow-hidden group/serv cursor-pointer">
            <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover filter brightness-90 group-hover/serv:scale-105 group-hover/serv:brightness-100 transition-all duration-300" onerror="this.onerror=null; this.src='logo.png';" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10"></div>
            <span class="absolute top-2 left-2 z-20 bg-emerald-600 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded shadow-xs tracking-wider flex items-center gap-1">
              <i data-lucide="briefcase" class="w-2.5 h-2.5"></i> Custom Service
            </span>
            <span class="absolute bottom-2 right-2 z-20 bg-slate-900/80 backdrop-blur-md text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <i data-lucide="eye" class="w-3 h-3 text-emerald-400"></i> View Portfolio
            </span>
          </div>
        `;
      }

      // ==========================================
      // PRODUCT PREVIEW MODAL LOGIC
      // ==========================================
      function openProductModal(productId) {
        const p = PRODUCTS.find(item => item.id === productId);
        if (!p) return;

        const content = document.getElementById('product-preview-modal-content');
        
        if (p.isService || p.category === 'services') {
          content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              <div class="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] border border-slate-700/80 shadow-xl">
                <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[1px]" onerror="this.onerror=null; this.style.display='none';" />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                <div class="relative z-10 flex flex-col items-center text-center">
                  <div class="w-32 h-32 rounded-2xl bg-slate-900/90 border-2 border-brand-orange shadow-2xl flex items-center justify-center p-2 mb-4 transform hover:scale-105 transition-transform overflow-hidden">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover rounded-xl" />
                  </div>

                  <span class="bg-brand-orange/20 text-amber-300 border border-brand-orange/40 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                    ${p.badge || 'Professional Service'}
                  </span>
                  <p class="text-[11px] text-slate-300 font-semibold">Custom Tailored Service & Direct WhatsApp Consultation</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      ${p.badge}
                    </span>
                    <span class="text-xs font-bold text-amber-500 flex items-center gap-1">
                      <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${p.rating} (${p.reviews} verified reviews)
                    </span>
                  </div>
                  <h2 class="text-xl font-black text-slate-900 leading-tight">${p.title}</h2>
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">${p.description}</p>
                </div>

                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div class="flex items-center gap-2 text-slate-700">
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 shrink-0"></i>
                    <span><strong>Client Tailored:</strong> Customized to your exact business requirements.</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-700">
                    <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
                    <span><strong>High Standards:</strong> Clean code, responsive design, and Material Design guidelines.</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-700">
                    <i data-lucide="zap" class="w-4 h-4 text-amber-500 shrink-0"></i>
                    <span><strong>Direct Contact:</strong> Instant response & developer support via WhatsApp.</span>
                  </div>
                </div>

                <div class="flex items-baseline justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span class="text-2xl font-black text-slate-900">₹${p.price}</span>
                    <span class="text-xs text-slate-500 font-bold">starting</span>
                    <span class="text-sm text-slate-400 line-through ml-2">₹${p.originalPrice}</span>
                  </div>
                  <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Save ${Math.round((1 - p.price / p.originalPrice) * 100)}% Today
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button onclick="addToCart('${p.id}'); closeProductModal();" class="py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-900 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
                    <i data-lucide="shopping-cart" class="w-4 h-4 text-brand-deep"></i> Add to Cart
                  </button>
                  <a href="${p.downloadUrl}" target="_blank" onclick="closeProductModal();" class="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl transition-colors shadow-md flex items-center justify-center gap-2">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> Inquire / Order
                  </a>
                </div>
              </div>
            </div>
          `;
          if (window.lucide) lucide.createIcons();
          document.getElementById('product-preview-modal').classList.remove('hidden');
          return;
        }

        let brandCode = p.category === 'software' ? 'EXE' : (p.category === 'pngs' ? 'PNG' : 'SERVICE');
        let brandBg = 'from-blue-950 via-slate-900 to-slate-950';
        let brandBorder = 'border-blue-500';
        let brandText = 'text-blue-400';

        if (p.title.includes('Illustrator')) { brandCode = 'Ai'; brandBg = 'from-amber-950 via-slate-900 to-slate-950'; brandBorder = 'border-amber-500'; brandText = 'text-amber-400'; }
        else if (p.title.includes('InDesign')) { brandCode = 'Id'; brandBg = 'from-pink-950 via-slate-900 to-slate-950'; brandBorder = 'border-pink-500'; brandText = 'text-pink-400'; }
        else if (p.title.includes('PageMaker')) { brandCode = 'Pm'; brandBg = 'from-teal-950 via-slate-900 to-slate-950'; brandBorder = 'border-teal-500'; brandText = 'text-teal-400'; }
        else if (p.title.includes('CorelDraw')) { brandCode = 'CD'; brandBg = 'from-emerald-950 via-slate-900 to-slate-950'; brandBorder = 'border-emerald-500'; brandText = 'text-emerald-400'; }
        else if (p.title.includes('Office 2007')) { brandCode = 'Office 07'; brandBg = 'from-red-950 via-slate-900 to-slate-950'; brandBorder = 'border-red-500'; brandText = 'text-red-400'; }
        else if (p.title.includes('Office 2010')) { brandCode = 'Office 10'; brandBg = 'from-orange-950 via-slate-900 to-slate-950'; brandBorder = 'border-orange-500'; brandText = 'text-orange-400'; }
        else if (p.title.includes('Photoshop 7.0')) { brandCode = 'Ps 7.0'; brandBg = 'from-blue-950 via-slate-900 to-slate-950'; brandBorder = 'border-sky-400'; brandText = 'text-sky-300'; }
        else if (p.title.includes('Photoshop 2022')) { brandCode = 'Ps 2022'; brandBg = 'from-sky-950 via-slate-900 to-slate-950'; brandBorder = 'border-sky-500'; brandText = 'text-sky-400'; }
        else if (p.title.includes('Photoshop 2023')) { brandCode = 'Ps 2023'; brandBg = 'from-cyan-950 via-slate-900 to-slate-950'; brandBorder = 'border-cyan-400'; brandText = 'text-cyan-300'; }
        else if (p.title.includes('Photoshop 2025')) { brandCode = 'Ps 2025'; brandBg = 'from-blue-900 via-cyan-950 to-slate-950'; brandBorder = 'border-cyan-300'; brandText = 'text-cyan-200'; }
        else if (p.title.includes('Windows')) { brandCode = 'Win 11'; brandBg = 'from-blue-950 via-slate-900 to-slate-950'; brandBorder = 'border-blue-400'; brandText = 'text-blue-300'; }
        else if (p.title.includes('Restaurant POS')) { brandCode = 'Sara POS'; brandBg = 'from-slate-900 via-orange-950 to-slate-950'; brandBorder = 'border-orange-500'; brandText = 'text-orange-400'; }

        content.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div class="rounded-2xl bg-gradient-to-br ${brandBg} p-6 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] border border-slate-700/80 shadow-xl">
              <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-[1px]" onerror="this.onerror=null; this.style.display='none';" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-32 h-44 rounded-xl bg-gradient-to-tr ${brandBg} border-2 ${brandBorder} shadow-2xl flex flex-col justify-between p-3 transform rotate-[-4deg] transition-all duration-300 mb-4 cursor-pointer">
                  <div class="flex items-center justify-between">
                    <span class="text-[9px] font-black uppercase text-amber-400 tracking-widest">SARA DIGITAL</span>
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <div class="my-auto">
                    <span class="inline-block px-2.5 py-1 rounded-md border ${brandBorder} ${brandText} text-sm font-black tracking-tighter shadow-md">
                      ${brandCode}
                    </span>
                  </div>
                  <div class="text-[8px] font-black text-slate-300 uppercase tracking-wider">
                    100% Pre-Activated
                  </div>
                </div>

                <span class="bg-amber-400/20 text-amber-300 border border-amber-400/40 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Real Software Digital Package
                </span>
                <p class="text-[11px] text-slate-300 font-semibold">Instant Google Drive Download Mirror</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-100 text-brand-deep">
                    ${p.badge}
                  </span>
                  <span class="text-xs font-bold text-amber-500 flex items-center gap-1">
                    <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${p.rating} (${p.reviews} verified reviews)
                  </span>
                </div>
                <h2 class="text-xl font-black text-slate-900 leading-tight">${p.title}</h2>
                <p class="text-xs text-slate-600 mt-2 leading-relaxed">${p.description}</p>
              </div>

              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div class="flex items-center gap-2 text-slate-700">
                  <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 shrink-0"></i>
                  <span><strong>Full Lifetime License:</strong> No monthly subscription required.</span>
                </div>
                <div class="flex items-center gap-2 text-slate-700">
                  <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
                  <span><strong>Safe & Tested:</strong> 100% Virus-Free & Pre-Activated Installer.</span>
                </div>
                <div class="flex items-center gap-2 text-slate-700">
                  <i data-lucide="zap" class="w-4 h-4 text-amber-500 shrink-0"></i>
                  <span><strong>Instant Delivery:</strong> Access download link in My Account immediately upon payment.</span>
                </div>
              </div>

              <div class="flex items-baseline justify-between pt-2 border-t border-slate-100">
                <div>
                  <span class="text-2xl font-black text-slate-900">₹${p.price}</span>
                  <span class="text-sm text-slate-400 line-through ml-2">₹${p.originalPrice}</span>
                </div>
                <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Save ${Math.round((1 - p.price / p.originalPrice) * 100)}% Today
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2">
                <button onclick="addToCart('${p.id}'); closeProductModal();" class="py-3 px-4 bg-slate-200 hover:bg-slate-300 text-slate-900 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
                  <i data-lucide="shopping-cart" class="w-4 h-4 text-brand-deep"></i> Add to Cart
                </button>
                <button onclick="closeProductModal(); buyNowDirect('${p.id}');" class="py-3 px-4 bg-brand-orange hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  <i data-lucide="zap" class="w-4 h-4"></i> Buy Now (UPI)
                </button>
              </div>
            </div>

          </div>
        `;

        document.getElementById('product-preview-modal').classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }

      function closeProductModal() {
        document.getElementById('product-preview-modal').classList.add('hidden');
      }

      function filterByCategory(cat) {
        currentCategory = cat;
        document.querySelectorAll('.category-tab').forEach(btn => {
          btn.classList.remove('bg-brand-deep', 'text-white', 'active-tab');
          btn.classList.add('bg-white', 'text-slate-600');
        });
        const activeBtn = document.getElementById(`tab-${cat}`);
        if (activeBtn) {
          activeBtn.classList.remove('bg-white', 'text-slate-600');
          activeBtn.classList.add('bg-brand-deep', 'text-white', 'active-tab');
        }
        renderProducts();
      }

      function handleSearch(val) {
        searchQuery = val || '';
        
        const mainInput = document.getElementById('search-input-main');
        const desktopInput = document.getElementById('search-input-desktop');
        const mobileInput = document.getElementById('search-input-mobile');
        const clearBtn = document.getElementById('clear-search-btn');
        const statusDiv = document.getElementById('search-query-status');
        const displaySpan = document.getElementById('search-term-display');

        if (mainInput && mainInput.value !== searchQuery) mainInput.value = searchQuery;
        if (desktopInput && desktopInput.value !== searchQuery) desktopInput.value = searchQuery;
        if (mobileInput && mobileInput.value !== searchQuery) mobileInput.value = searchQuery;

        if (searchQuery.trim() !== '') {
          if (clearBtn) clearBtn.classList.remove('hidden');
          if (statusDiv && displaySpan) {
            displaySpan.textContent = searchQuery;
            statusDiv.classList.remove('hidden');
          }
        } else {
          if (clearBtn) clearBtn.classList.add('hidden');
          if (statusDiv) statusDiv.classList.add('hidden');
        }

        renderProducts();
      }

      function clearSearchInput() {
        searchQuery = '';
        handleSearch('');
      }

      function handleSort(val) {
        currentSort = val;
        renderProducts();
      }

      function resetFilters() {
        currentCategory = 'all';
        searchQuery = '';
        currentSort = 'recommended';
        handleSearch('');
        filterByCategory('all');
      }

      function scrollCatalog() {
        document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
      }

      function scrollServices() {
        const el = document.getElementById('services-features-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }

      function showShopView() {
        closeAccountModal();
        closeCheckoutModal();
        closeAuthModal();
        scrollCatalog();
      }

      // ==========================================
      // SHOPPING CART LOGIC
      // ==========================================
      function addToCart(productId) {
        const item = PRODUCTS.find(p => p.id === productId);
        if (!item) return;

        const existing = cart.find(c => c.id === productId);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ ...item, qty: 1 });
        }

        saveCart();
        showToast(`Added "${item.title}" to cart!`);
      }

      function buyNowDirect(productId) {
        addToCart(productId);
        toggleCartDrawer(true);
      }

      function removeFromCart(productId) {
        cart = cart.filter(c => c.id !== productId);
        saveCart();
      }

      function updateQty(productId, delta) {
        const item = cart.find(c => c.id === productId);
        if (item) {
          item.qty += delta;
          if (item.qty <= 0) removeFromCart(productId);
          else saveCart();
        }
      }

      function saveCart() {
        localStorage.setItem('sara_cart', JSON.stringify(cart));
        updateCartBadge();
        renderCartDrawer();
      }

      function updateCartBadge() {
        const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
        document.getElementById('cart-counter').textContent = totalItems;
        document.getElementById('cart-items-count-badge').textContent = `${totalItems} items`;
      }

      function toggleCartDrawer(forceOpen = false) {
        const drawer = document.getElementById('cart-drawer');
        if (forceOpen || drawer.classList.contains('hidden')) {
          drawer.classList.remove('hidden');
          renderCartDrawer();
        } else {
          drawer.classList.add('hidden');
        }
      }

      function renderCartDrawer() {
        const body = document.getElementById('cart-drawer-body');
        if (cart.length === 0) {
          body.innerHTML = `
            <div class="text-center py-12 text-slate-400">
              <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-2 text-slate-300"></i>
              <p class="font-bold text-sm text-slate-600">Your cart is empty</p>
              <p class="text-xs text-slate-400 mt-1">Explore software & PNG assets catalog.</p>
            </div>
          `;
          updateCartTotals(0);
          if (window.lucide) lucide.createIcons();
          return;
        }

        body.innerHTML = cart.map(item => `
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-0.5 shrink-0">
                ${item.image ? `<img src="${item.image}" alt="${item.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover rounded-md" />` : `<i data-lucide="file-code" class="w-5 h-5 text-brand-deep"></i>`}
              </div>
              <div>
                <h4 class="font-bold text-xs text-slate-900 line-clamp-1 max-w-[160px]">${item.title}</h4>
                <p class="text-xs font-black text-brand-orange">₹${item.price} × ${item.qty}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                <button onclick="updateQty('${item.id}', -1)" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-bold">-</button>
                <span class="px-2 font-bold">${item.qty}</span>
                <button onclick="updateQty('${item.id}', 1)" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 font-bold">+</button>
              </div>
              <button onclick="removeFromCart('${item.id}')" class="text-slate-400 hover:text-rose-600 p-1">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        `).join('');

        const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        updateCartTotals(subtotal);
        if (window.lucide) lucide.createIcons();
      }

      function applyCoupon() {
        const val = document.getElementById('coupon-input').value.trim().toUpperCase();
        const msg = document.getElementById('coupon-message');
        if (val === 'SARA50') {
          couponApplied = true;
          msg.textContent = '🎉 Coupon SARA50 applied! 50% discount active.';
          msg.className = 'text-[11px] font-bold text-emerald-600 block mt-1';
        } else {
          couponApplied = false;
          msg.textContent = 'Invalid Coupon Code. Try SARA50.';
          msg.className = 'text-[11px] font-bold text-rose-600 block mt-1';
        }
        renderCartDrawer();
      }

      function copyCoupon(code) {
        navigator.clipboard.writeText(code);
        showToast(`Promo code "${code}" copied to clipboard!`);
      }

      function updateCartTotals(subtotal) {
        document.getElementById('cart-subtotal').textContent = `₹${subtotal}`;
        let discount = couponApplied ? Math.round(subtotal * 0.5) : 0;
        let total = subtotal - discount;

        const discountRow = document.getElementById('discount-row');
        if (couponApplied && subtotal > 0) {
          discountRow.classList.remove('hidden');
          document.getElementById('cart-discount').textContent = `-₹${discount}`;
        } else {
          discountRow.classList.add('hidden');
        }

        document.getElementById('cart-grand-total').textContent = `₹${total}`;
      }

      // ==========================================
      // CHECKOUT & NAVI UPI QR MODAL
      // ==========================================
      let checkoutStep = 1;
      let timerInterval;

      function openCheckoutModal() {
        if (cart.length === 0) {
          showToast('Please add items to cart before checkout!', 'error');
          return;
        }
        toggleCartDrawer(false);
        checkoutStep = 1;
        renderCheckoutModal();
        document.getElementById('checkout-modal').classList.remove('hidden');
      }

      function closeCheckoutModal() {
        document.getElementById('checkout-modal').classList.add('hidden');
        if (timerInterval) clearInterval(timerInterval);
      }

      function renderCheckoutModal() {
        const container = document.getElementById('checkout-modal-content');
        const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        const discount = couponApplied ? Math.round(subtotal * 0.5) : 0;
        const total = subtotal - discount;

        // Auto-fill customer profile
        const userFn = currentUser ? currentUser.name.split(' ')[0] : '';
        const userLn = currentUser && currentUser.name.split(' ')[1] ? currentUser.name.split(' ').slice(1).join(' ') : '';
        const userPhone = currentUser ? currentUser.phone : '';
        const userEmail = currentUser ? currentUser.email : '';

        if (checkoutStep === 1) {
          container.innerHTML = `
            <div class="space-y-4">
              <div class="flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="credit-card" class="w-5 h-5 text-brand-deep"></i>
                <h3 class="font-black text-slate-900 text-lg">Billing Details & Order Summary</h3>
              </div>

              <!-- Billing Form -->
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">First Name *</label>
                  <input type="text" id="bill-fn" value="${userFn}" placeholder="First Name" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-deep focus:outline-none" />
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Last Name *</label>
                  <input type="text" id="bill-ln" value="${userLn}" placeholder="Last Name" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-deep focus:outline-none" />
                </div>
                <div class="col-span-2">
                  <label class="font-bold text-slate-700 block mb-1">WhatsApp Phone Number (For Drive Access) *</label>
                  <input type="text" id="bill-phone" value="${userPhone}" placeholder="+91 98765 43210" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-deep focus:outline-none" />
                </div>
                <div class="col-span-2">
                  <label class="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input type="email" id="bill-email" value="${userEmail}" placeholder="user@domain.com" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-deep focus:outline-none" />
                </div>
              </div>

              <!-- Order Summary Block -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div class="flex justify-between font-bold text-slate-800">
                  <span>Items (${cart.length}):</span>
                  <span>₹${subtotal}</span>
                </div>
                ${couponApplied ? `<div class="flex justify-between text-emerald-600 font-bold"><span>Discount (50%):</span><span>-₹${discount}</span></div>` : ''}
                <div class="flex justify-between text-sm font-black text-brand-orange pt-1 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span>₹${total}</span>
                </div>
              </div>

              <button onclick="goToUpiStep(${total})" class="w-full py-3.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm">
                <span>Proceed to Navi UPI Payment QR</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>
          `;
        } else if (checkoutStep === 2) {
          // NAVI UPI QR STEP
          container.innerHTML = `
            <div class="text-center space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-slate-100">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="font-black text-slate-900 text-sm">Navi UPI Payment Gateway</span>
                </div>
                <span id="qr-timer" class="px-2.5 py-1 bg-rose-100 text-rose-700 font-extrabold text-xs rounded-full">
                  Expires in 15:00
                </span>
              </div>

              <!-- UPI QR Display -->
              <div class="bg-gradient-to-b from-blue-900 to-slate-900 p-4 rounded-2xl text-white shadow-xl max-w-sm mx-auto space-y-3">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-blue-200">Sara Digital Duniya</span>
                  <span class="bg-emerald-500 text-white font-black px-2 py-0.5 rounded text-[9px]">Verified Merchant</span>
                </div>

                <div class="bg-white p-3 rounded-xl inline-block border-4 border-amber-400 shadow-md">
                  <img src="https://drive.google.com/thumbnail?id=1sLycvIwamAUt_CgQGNyC1gKFrzKebHw2&sz=w1000" alt="Navi UPI QR Code" class="w-64 h-64 object-contain mx-auto rounded-lg shadow-md">
                </div>

                <div class="text-xs space-y-1">
                  <p class="font-extrabold text-amber-300">Payee: RAKIBUL ALI</p>
                  <p class="font-mono text-[11px] text-blue-200 bg-blue-950/80 py-1 px-2 rounded border border-blue-800 inline-block">
                    UPI ID: 939419533-1@naviaxis
                  </p>
                  <p class="text-[11px] text-slate-300">Amount: <strong class="text-emerald-400 text-base font-black">₹${total}</strong></p>
                </div>

                <div class="pt-2 border-t border-blue-800/80 flex justify-center items-center gap-2 text-[10px] text-blue-200">
                  <span>Pay via:</span>
                  <span class="bg-blue-800/60 px-1.5 py-0.5 rounded">GPay</span>
                  <span class="bg-blue-800/60 px-1.5 py-0.5 rounded">PhonePe</span>
                  <span class="bg-blue-800/60 px-1.5 py-0.5 rounded">Paytm</span>
                  <span class="bg-blue-800/60 px-1.5 py-0.5 rounded">Navi</span>
                </div>
              </div>

              <!-- UTR Verification Input -->
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
                <label class="font-bold text-xs text-slate-800 block">
                  Enter 12-Digit UPI UTR / Transaction Ref No. after paying:
                </label>
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    id="utr-input" 
                    placeholder="e.g. 939419533103" 
                    class="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-deep"
                  />
                  <button onclick="submitUtrPayment(${total})" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg shadow-sm">
                    Submit UTR
                  </button>
                </div>
                <p class="text-[10px] text-slate-500">Instant verification unlocks immediate Google Drive download access in My Account.</p>
              </div>

            </div>
          `;

          startTimer(15 * 60);
        } else if (checkoutStep === 3) {
          // PAYMENT SUCCESS RECEIPT
          container.innerHTML = `
            <div class="text-center space-y-4">
              <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <i data-lucide="check-circle-2" class="w-8 h-8"></i>
              </div>

              <h3 class="font-black text-slate-900 text-xl">Payment Verified & Order Confirmed!</h3>
              <p class="text-xs text-slate-600">Your Google Drive download links have been added to <strong>My Account -> Downloads</strong>.</p>

              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
                <p class="font-bold text-slate-800">Purchased Items:</p>
                <ul class="list-disc pl-4 space-y-1 text-slate-600">
                  ${cart.map(i => `
                    <li>
                      <strong>${i.title}</strong> — 
                      <a href="${i.downloadUrl}" target="_blank" class="text-brand-deep font-extrabold underline">Download File Link</a>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="flex gap-3">
                <button onclick="closeCheckoutModal(); openAccountModal('downloads');" class="flex-1 py-3 bg-brand-deep text-white font-extrabold rounded-xl text-xs">
                  Go to My Downloads Panel
                </button>
                <a href="https://wa.me/919394195533?text=Hello%20I%20completed%20Order" target="_blank" class="px-4 py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1">
                  <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp Support
                </a>
              </div>
            </div>
          `;
          
          cart = [];
          saveCart();
        }

        if (window.lucide) lucide.createIcons();
      }

      function goToUpiStep(total) {
        if (!currentUser) {
          showToast('Please log in or register an account before proceeding to payment.', 'info');
          closeCheckoutModal();
          openAuthModal('login');
          return;
        }

        const fn = document.getElementById('bill-fn')?.value.trim();
        const email = document.getElementById('bill-email')?.value.trim();
        if (!fn || !email) {
          showToast('Please complete your first name and email address.', 'error');
          return;
        }

        checkoutStep = 2;
        renderCheckoutModal();
      }

      function startTimer(durationSeconds) {
        let timer = durationSeconds;
        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(() => {
          let minutes = parseInt(timer / 60, 10);
          let seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          const display = document.getElementById('qr-timer');
          if (display) display.textContent = `Expires in ${minutes}:${seconds}`;

          if (--timer < 0) {
            clearInterval(timerInterval);
            if (display) display.textContent = "QR Expired! Please refresh.";
          }
        }, 1000);
      }

      
async function submitUtrPayment(amount) {
  const utr = document.getElementById('utr-input')?.value.trim();
  if (!utr || utr.length < 8) return showToast('Please enter a valid 12-digit UTR!', 'error');
  if (!currentUser) { showToast('Please log in first.', 'error'); closeCheckoutModal(); openAuthModal('login'); return; }
  showToast('Verifying payment...', 'info');
  try {
    const orderId = 'SDD-' + Math.floor(10000 + Math.random() * 90000);
    await addDoc(collection(db, "payments"), { orderId, userId: currentUser.uid, amount, method: "UPI", utr, status: "Completed", createdAt: serverTimestamp() });
    for (const item of cart || []) {
      await addDoc(collection(db, "orders"), { userId: currentUser.uid, orderId, date: new Date().toISOString().split('T')[0], itemTitle: item.title, price: item.price * item.qty, downloadUrl: item.downloadUrl || 'https://drive.google.com/uc?export=download&id=1fiU6N3kEnXqAHaQW8cFsAQKWs8juKhfC', status: 'Completed', utr, createdAt: serverTimestamp() });
    }
    setTimeout(() => { checkoutStep = 3; renderCheckoutModal(); showToast('Payment verified successfully!', 'success'); }, 1200);
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}


      // ==========================================
      // STARDESIGN-STYLE "MY ACCOUNT" PANEL LOGIC
      // ==========================================
      let activeAccTab = 'dashboard';

      function openAccountModal(tab = 'dashboard') {
        if (!currentUser) {
          showToast('Please log in to access your account dashboard.', 'info');
          openAuthModal('login');
          return;
        }

        activeAccTab = tab;
        document.getElementById('acc-user-name-title').textContent = `Hello ${currentUser.name}`;
        document.getElementById('acc-user-avatar').textContent = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
        switchAccountTab(tab);
        document.getElementById('account-modal').classList.remove('hidden');
      }

      function closeAccountModal() {
        document.getElementById('account-modal').classList.add('hidden');
      }

      function switchAccountTab(tabName) {
        activeAccTab = tabName;
        document.querySelectorAll('.acc-tab').forEach(btn => {
          btn.classList.remove('bg-brand-deep', 'text-white');
          btn.classList.add('text-slate-600', 'hover:bg-slate-100');
        });

        const activeBtn = document.getElementById(`acc-tab-${tabName}`);
        if (activeBtn) {
          activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
          activeBtn.classList.add('bg-brand-deep', 'text-white');
        }

        const container = document.getElementById('account-tab-content');

        if (tabName === 'dashboard') {
          const isVerified = currentUser.emailVerified !== false;

          container.innerHTML = `
            <div class="space-y-6">
              <!-- STARDESIGN STYLE GREETING BANNER -->
              <div class="p-4 bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl text-white shadow-md">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-slate-200">
                      Hello <strong class="text-amber-300 font-extrabold">${currentUser.name}</strong> (not <strong class="text-slate-300 font-semibold">${currentUser.name}</strong>? 
                      <a href="#" onclick="logoutUser(); return false;" class="text-rose-300 underline font-bold hover:text-rose-200 ml-1">Log out</a>)
                    </p>
                    <p class="text-xs text-blue-200 mt-1">From your account dashboard you can view your recent orders, manage shipping/billing addresses, and edit password and account details.</p>
                  </div>
                  ${isVerified 
                    ? `<span class="bg-emerald-500 text-white font-black px-3 py-1 rounded-full text-[11px] shrink-0 hidden sm:inline-block">Email Verified</span>`
                    : `<button onclick="simulateEmailVerification()" class="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3 py-1 rounded-full text-[11px] shrink-0 hidden sm:inline-block transition-colors">Verify Email Now</button>`
                  }
                </div>
              </div>

              <!-- 4 QUICK-ACCESS GRID CARDS -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div onclick="switchAccountTab('orders')" class="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 cursor-pointer transition-all hover:scale-102 group">
                  <div class="flex items-center justify-between text-brand-deep mb-2">
                    <i data-lucide="package" class="w-6 h-6"></i>
                    <span class="text-xs font-black bg-blue-100 text-brand-deep px-2 py-0.5 rounded-full">${userPurchases.length}</span>
                  </div>
                  <h4 class="font-extrabold text-slate-900 text-sm group-hover:text-brand-deep">My Orders</h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">View purchased item receipts & invoices</p>
                </div>

                <div onclick="switchAccountTab('downloads')" class="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 cursor-pointer transition-all hover:scale-102 group">
                  <div class="flex items-center justify-between text-brand-orange mb-2">
                    <i data-lucide="download" class="w-6 h-6"></i>
                    <span class="text-xs font-black bg-orange-100 text-brand-orange px-2 py-0.5 rounded-full">${userPurchases.length}</span>
                  </div>
                  <h4 class="font-extrabold text-slate-900 text-sm group-hover:text-brand-orange">Downloads</h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">Google Drive links for software & assets</p>
                </div>

                <div onclick="switchAccountTab('address')" class="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 cursor-pointer transition-all hover:scale-102 group">
                  <div class="flex items-center justify-between text-emerald-600 mb-2">
                    <i data-lucide="map-pin" class="w-6 h-6"></i>
                    <span class="text-xs font-bold text-slate-400">Edit</span>
                  </div>
                  <h4 class="font-extrabold text-slate-900 text-sm group-hover:text-emerald-600">Billing Address</h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">${currentUser.city || 'Manage address'}</p>
                </div>

                <div onclick="switchAccountTab('details')" class="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/80 cursor-pointer transition-all hover:scale-102 group">
                  <div class="flex items-center justify-between text-purple-600 mb-2">
                    <i data-lucide="user-check" class="w-6 h-6"></i>
                    <span class="text-xs font-bold text-slate-400">Edit</span>
                  </div>
                  <h4 class="font-extrabold text-slate-900 text-sm group-hover:text-purple-600">Account Details</h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">Profile name & password</p>
                </div>
              </div>

              <!-- VENDOR PANEL BANNER -->
              <div class="p-5 bg-gradient-to-r from-amber-500 to-brand-orange text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span class="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Vendor Marketplace</span>
                  <h4 class="font-extrabold text-base mt-1">Become a Vendor — Vendors can sell products and manage a store with a vendor dashboard.</h4>
                  <p class="text-xs text-amber-100 mt-0.5">Start uploading your software EXE, CDR templates & PSD designs to earn income.</p>
                </div>
                <button onclick="showToast('Vendor registration form submitted! Admin will contact you on WhatsApp.');" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shrink-0 transition-colors shadow-sm">
                  Apply as Vendor
                </button>
              </div>
            </div>
          `;
        } else if (tabName === 'orders') {
          if (userPurchases.length === 0) {
            container.innerHTML = `
              <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
                <div class="w-12 h-12 bg-blue-100 text-brand-deep rounded-full flex items-center justify-center mx-auto">
                  <i data-lucide="package-open" class="w-6 h-6"></i>
                </div>
                <h4 class="font-extrabold text-slate-800 text-base">No orders placed yet</h4>
                <p class="text-xs text-slate-500 max-w-sm mx-auto">Explore our store catalog to purchase genuine software licenses, design assets, and custom services.</p>
                <button onclick="closeAccountModal(); scrollCatalog();" class="px-5 py-2.5 bg-brand-deep hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
                  Browse Shop Catalog
                </button>
              </div>
            `;
          } else {
            container.innerHTML = `
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="font-black text-slate-900 text-base">Order History & Receipts</h4>
                  <span class="text-xs text-slate-500">${userPurchases.length} total orders</span>
                </div>
                
                <div class="overflow-x-auto border border-slate-200 rounded-xl">
                  <table class="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr class="border-b border-slate-200 bg-slate-50 text-slate-700 font-extrabold">
                        <th class="p-3">Order ID</th>
                        <th class="p-3">Date</th>
                        <th class="p-3">Item Title</th>
                        <th class="p-3">Total</th>
                        <th class="p-3">Status</th>
                        <th class="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${userPurchases.map((p, idx) => `
                        <tr class="border-b border-slate-100 hover:bg-slate-50/80">
                          <td class="p-3 font-mono font-extrabold text-brand-deep">${p.orderId}</td>
                          <td class="p-3 text-slate-500">${p.date}</td>
                          <td class="p-3 font-bold text-slate-900">${p.itemTitle}</td>
                          <td class="p-3 font-black text-slate-900">₹${p.price}</td>
                          <td class="p-3"><span class="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[10px]">${p.status}</span></td>
                          <td class="p-3 text-right">
                            <button onclick="viewOrderReceipt(${idx})" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-lg">
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `;
          }
        } else if (tabName === 'downloads') {
          if (userPurchases.length === 0) {
            container.innerHTML = `
              <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
                <div class="w-12 h-12 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center mx-auto">
                  <i data-lucide="download-cloud" class="w-6 h-6"></i>
                </div>
                <h4 class="font-extrabold text-slate-800 text-base">No digital downloads available yet</h4>
                <p class="text-xs text-slate-500 max-w-sm mx-auto">Purchased software packages and PNG assets will provide instant high-speed Google Drive download access here.</p>
                <button onclick="closeAccountModal(); scrollCatalog();" class="px-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors">
                  Explore Digital Assets
                </button>
              </div>
            `;
          } else {
            container.innerHTML = `
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="font-black text-slate-900 text-base">Your Purchased Digital Downloads & Links</h4>
                  <span class="text-xs text-slate-500">Direct Google Drive High-Speed Delivery</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-1">
                  ${userPurchases.map(p => `
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                      <div>
                        <div class="flex justify-between items-center mb-1">
                          <span class="text-[10px] font-mono font-extrabold text-brand-deep bg-blue-50 px-2 py-0.5 rounded border border-blue-100">${p.orderId}</span>
                          <span class="text-[10px] text-emerald-600 font-bold">Verified UTR: ${p.utr}</span>
                        </div>
                        <h5 class="font-extrabold text-slate-900 text-sm">${p.itemTitle}</h5>
                        <p class="text-[11px] text-slate-500 mt-0.5">Instant access pre-activated files / HD assets.</p>
                      </div>

                      <a href="${p.downloadUrl}" target="_blank" class="w-full py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all">
                        <i data-lucide="download" class="w-4 h-4"></i> Download File (Google Drive)
                      </a>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }
        } else if (tabName === 'address') {
          container.innerHTML = `
            <div class="space-y-4 text-xs">
              <h4 class="font-black text-slate-900 text-base">Billing & Shipping Address</h4>
              <p class="text-slate-500">The following address will be used on the checkout page by default.</p>

              <div class="grid grid-cols-2 gap-3">
                <div class="col-span-2 sm:col-span-1">
                  <label class="font-bold text-slate-700 block mb-1">Street Address *</label>
                  <input type="text" id="acc-addr" value="${currentUser.address || ''}" placeholder="Street / House No." class="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="font-bold text-slate-700 block mb-1">City / State *</label>
                  <input type="text" id="acc-city" value="${currentUser.city || ''}" placeholder="Guwahati, Assam" class="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="font-bold text-slate-700 block mb-1">PIN Code *</label>
                  <input type="text" id="acc-pin" value="${currentUser.pincode || ''}" placeholder="781001" class="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="font-bold text-slate-700 block mb-1">WhatsApp Phone *</label>
                  <input type="text" id="acc-phone" value="${currentUser.phone || ''}" placeholder="+91 98765 43210" class="w-full px-3 py-2 border rounded-xl" />
                </div>
              </div>

              <button onclick="saveAddressInfo()" class="px-5 py-2.5 bg-brand-deep text-white font-extrabold rounded-xl text-xs hover:bg-blue-900 shadow-sm">
                Save Billing Address
              </button>
            </div>
          `;
        } else if (tabName === 'details') {
          container.innerHTML = `
            <div class="space-y-4 text-xs">
              <h4 class="font-black text-slate-900 text-base">Account Details & Password Settings</h4>
              
              <div class="grid grid-cols-2 gap-3">
                <div class="col-span-2 sm:col-span-1">
                  <label class="font-bold text-slate-700 block mb-1">Full Display Name *</label>
                  <input type="text" id="acc-fn" value="${currentUser.name || ''}" class="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label class="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input type="email" id="acc-email" value="${currentUser.email || ''}" readonly class="w-full px-3 py-2 border rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 space-y-3">
                <h5 class="font-extrabold text-slate-900 text-xs uppercase">Change Password</h5>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Current Password</label>
                  <input type="password" id="acc-curr-pass" placeholder="••••••••" class="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">New Password (Min. 6 chars)</label>
                  <input type="password" id="acc-new-pass" placeholder="New password" class="w-full px-3 py-2 border rounded-xl" />
                </div>
              </div>

              <button onclick="saveProfileInfo()" class="px-5 py-2.5 bg-brand-deep text-white font-extrabold rounded-xl text-xs hover:bg-blue-900 shadow-sm">
                Save Account Changes
              </button>
            </div>
          `;
        }

        if (window.lucide) lucide.createIcons();
      }

      function viewOrderReceipt(index) {
        const p = userPurchases[index];
        if (!p) return;

        const modalContent = document.getElementById('receipt-modal-content');
        modalContent.innerHTML = `
          <div class="space-y-4 text-xs">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span class="text-[10px] font-black text-brand-orange uppercase">Order Invoice</span>
                <h3 class="font-black text-slate-900 text-lg">${p.orderId}</h3>
              </div>
              <span class="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full text-[10px]">${p.status}</span>
            </div>

            <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <p class="font-bold text-slate-800">Customer Details:</p>
              <p class="text-slate-600">${currentUser ? currentUser.name : 'Customer'} (${currentUser ? currentUser.email : ''})</p>
              <p class="text-slate-500 text-[11px]">Payment Reference / UTR: <strong class="text-slate-800 font-mono">${p.utr}</strong></p>
              <p class="text-slate-500 text-[11px]">Purchase Date: ${p.date}</p>
            </div>

            <div class="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
              <div class="flex justify-between font-bold text-slate-900">
                <span>${p.itemTitle}</span>
                <span>₹${p.price}</span>
              </div>
              <div class="pt-2 border-t border-slate-100 flex justify-between font-black text-sm text-brand-deep">
                <span>Total Paid:</span>
                <span>₹${p.price}</span>
              </div>
            </div>

            <a href="${p.downloadUrl}" target="_blank" class="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white font-extrabold rounded-xl text-xs shadow-md flex items-center justify-center gap-2">
              <i data-lucide="download" class="w-4 h-4"></i> Download Purchased File
            </a>
          </div>
        `;

        document.getElementById('receipt-modal').classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }

      function closeReceiptModal() {
        document.getElementById('receipt-modal').classList.add('hidden');
      }

      
async function saveAddressInfo() {
  if (!currentUser) return;
  const address = document.getElementById('acc-addr').value;
  const city = document.getElementById('acc-city').value;
  const pincode = document.getElementById('acc-pin').value;
  const phone = document.getElementById('acc-phone').value;
  try {
    await updateDoc(doc(db, "users", currentUser.uid), { address, city, pincode, phone, updatedAt: serverTimestamp() });
    currentUser.address = address; currentUser.city = city; currentUser.pincode = pincode; currentUser.phone = phone;
    showToast('Billing address updated!', 'success');
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}

async function saveProfileInfo() {
  if (!currentUser) return;
  const newName = document.getElementById('acc-fn').value.trim();
  if (!newName) { showToast('Display name cannot be empty.', 'error'); return; }
  try {
    await updateDoc(doc(db, "users", currentUser.uid), { name: newName, updatedAt: serverTimestamp() });
    currentUser.name = newName; renderHeaderUserMenu();
    document.getElementById('acc-user-name-title').textContent = `Hello ${newName}`;
    showToast('Account details updated!', 'success');
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}


      // ==========================================
      // HELP VIDEOS MODAL
      // ==========================================
      function openHelpVideosModal() {
        document.getElementById('help-videos-modal').classList.remove('hidden');
      }

      function closeHelpVideosModal() {
        document.getElementById('help-videos-modal').classList.add('hidden');
      }

      // ==========================================
      // UTILITY & TOAST NOTIFICATIONS
      // ==========================================
      function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
      }

      function showToast(msg, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `p-3 rounded-xl shadow-lg text-xs font-bold text-white flex items-center gap-2 transition-all transform pointer-events-auto ${
          type === 'error' ? 'bg-rose-600' : type === 'info' ? 'bg-brand-deep' : 'bg-emerald-600'
        }`;
        toast.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" class="w-4 h-4"></i> <span>${msg}</span>`;

        container.appendChild(toast);
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
          toast.remove();
        }, 3000);
      }

      // ==========================================
      // ADMIN CONTROL CENTER LOGIC
      // ==========================================
      
function loadAdminCustomProducts() {
  onSnapshot(query(collection(db, "products"), orderBy("createdAt", "desc")), (snapshot) => {
    const products = []; snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
    customProducts = products;
    products.forEach(p => { if (!PRODUCTS.some(existing => existing.id === p.id)) PRODUCTS.unshift(p); });
    if (document.getElementById('products-grid')) renderProducts();
    const tbody = document.getElementById('admin-product-tbody');
    if (tbody) {
      tbody.innerHTML = '';
      products.forEach(prod => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="py-3 px-2 font-bold">${prod.title}</td><td class="py-3 px-2">${prod.categoryId || '-'}</td><td class="py-3 px-2">₹${prod.price}</td><td class="py-3 px-2"><span class="px-2 py-1 text-[10px] rounded-md font-bold ${prod.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}">${prod.isPublished ? 'Published' : 'Draft'}</span></td>`;
        tbody.appendChild(tr);
      });
    }
  });
}


      function openAdminModal() {
        const modal = document.getElementById('admin-modal');
        if (!modal) return;
        modal.classList.remove('hidden');

        const authView = document.getElementById('admin-auth-view');
        const dashView = document.getElementById('admin-dashboard-view');
        const errContainer = document.getElementById('admin-auth-error-msg');

        if (errContainer) errContainer.classList.add('hidden');

        const isAdmin = currentUser && ['OWNER', 'ADMIN', 'MANAGER'].includes(currentUser.role) && currentUser.isActive === true;

        if (isAdmin) {
          if (authView) authView.classList.add('hidden');
          if (dashView) dashView.classList.remove('hidden');
          switchAdminTab('users');
        } else {
          if (authView) authView.classList.remove('hidden');
          if (dashView) dashView.classList.add('hidden');
        }
      }

      function closeAdminModal() {
        const modal = document.getElementById('admin-modal');
        if (modal) modal.classList.add('hidden');
      }

      
async function authenticateAdmin(e) {
  if (e) e.preventDefault();
  const password = document.getElementById('admin-key-input')?.value.trim();
  const errContainer = document.getElementById('admin-auth-error-msg');
  const errText = document.getElementById('admin-auth-error-text');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "admin@saradigitalduniya.com", password);
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    if (!userDoc.exists() || !['OWNER', 'ADMIN', 'MANAGER'].includes(userDoc.data().role)) {
       await signOut(auth); throw new Error("Account does not have administrator privileges.");
    }
    if (errContainer) errContainer.classList.add('hidden');
    activeAdmin = true;
    document.getElementById('admin-auth-view').classList.add('hidden');
    document.getElementById('admin-dashboard-view').classList.remove('hidden');
    switchAdminTab('users'); showToast('Admin Portal unlocked successfully!', 'success');
  } catch (error) {
    if (errContainer) { errContainer.classList.remove('hidden'); errText.textContent = error.message; }
    else alert(error.message);
  }
}
async function logoutAdmin() {
  await signOut(auth); activeAdmin = false;
  document.getElementById('admin-auth-view').classList.remove('hidden');
  document.getElementById('admin-dashboard-view').classList.add('hidden');
  showToast('Admin Portal locked.', 'info');
}


      function switchAdminTab(tab) {
        const tabUsersBtn = document.getElementById('admin-tab-users');
        const tabProductBtn = document.getElementById('admin-tab-product');
        const contentUsers = document.getElementById('admin-content-users');
        const contentProduct = document.getElementById('admin-content-product');

        if (tab === 'users') {
          if (tabUsersBtn) tabUsersBtn.className = 'flex-1 py-2 text-xs font-extrabold rounded-lg transition-all bg-white text-slate-900 shadow-xs flex items-center justify-center gap-2';
          if (tabProductBtn) tabProductBtn.className = 'flex-1 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-all flex items-center justify-center gap-2';
          if (contentUsers) contentUsers.classList.remove('hidden');
          if (contentProduct) contentProduct.classList.add('hidden');
          refreshAdminUsersTable();
        } else if (tab === 'product') {
          if (tabProductBtn) tabProductBtn.className = 'flex-1 py-2 text-xs font-extrabold rounded-lg transition-all bg-white text-slate-900 shadow-xs flex items-center justify-center gap-2';
          if (tabUsersBtn) tabUsersBtn.className = 'flex-1 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-all flex items-center justify-center gap-2';
          if (contentProduct) contentProduct.classList.remove('hidden');
          if (contentUsers) contentUsers.classList.add('hidden');
        }

        if (window.lucide) lucide.createIcons();
      }

      
async function refreshAdminUsersTable() {
  try {
    const snapshot = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
    const users = []; snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
    const tbody = document.getElementById('admin-users-tbody');
    const countSpan = document.getElementById('admin-user-count');
    if (countSpan) countSpan.textContent = users.length;
    if (tbody) {
      if (users.length === 0) { tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-slate-400">No users found.</td></tr>`; return; }
      tbody.innerHTML = '';
      for (const u of users) {
        const pSnapshot = await getDocs(query(collection(db, "orders")));
        let purchaseCount = 0; pSnapshot.forEach(d => { if (d.data().userId === u.id) purchaseCount++; });
        const date = u.createdAt ? new Date(u.createdAt.toMillis()).toLocaleDateString() : 'Unknown';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="py-3 px-2"><div class="font-bold text-slate-900">${u.name}</div><div class="text-[10px] text-slate-500">${u.email}</div></td><td class="py-3 px-2">${u.phone || '-'}</td><td class="py-3 px-2 text-center"><span class="px-2 py-1 bg-slate-100 text-slate-600 font-black rounded text-[10px]">${purchaseCount}</span></td><td class="py-3 px-2 text-right text-[10px] text-slate-400">${date}</td>`;
        tbody.appendChild(tr);
      }
    }
  } catch (e) { console.error(e); }
}


      
async function addNewProductFromAdmin(e) {
  if (e) e.preventDefault();
  try {
    const price = parseFloat(document.getElementById('admin-prod-price')?.value);
    const newProd = {
      title: document.getElementById('admin-prod-title')?.value.trim(),
      categoryId: document.getElementById('admin-prod-category')?.value || 'software',
      price: price,
      originalPrice: document.getElementById('admin-prod-original-price')?.value ? parseFloat(document.getElementById('admin-prod-original-price').value) : null,
      downloadUrl: document.getElementById('admin-prod-drive-url')?.value.trim(),
      badge: document.getElementById('admin-prod-badge')?.value.trim(),
      image: document.getElementById('admin-prod-image')?.value.trim(),
      description: document.getElementById('admin-prod-description')?.value.trim(),
      isPublished: true, createdAt: serverTimestamp()
    };
    if (!newProd.title || isNaN(price)) return alert("Title and Price are required.");
    await addDoc(collection(db, "products"), newProd);
    showToast('Product added successfully!', 'success');
    document.getElementById('admin-add-product-form')?.reset();
    switchAdminTab('users');
  } catch(error) { alert("Error: " + error.message); }
}

    


    


    
  


  


// Expose functions to window
window.renderVerificationBanner = renderVerificationBanner;
window.simulateEmailVerification = simulateEmailVerification;
window.renderHeaderUserMenu = renderHeaderUserMenu;
window.handleAccountAction = handleAccountAction;
window.handleMobileAccountClick = handleMobileAccountClick;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.clearAuthErrors = clearAuthErrors;
window.switchAuthTab = switchAuthTab;
window.handleForgotPasswordSubmit = handleForgotPasswordSubmit;
window.showForgotError = showForgotError;
window.checkResetPasswordUrl = checkResetPasswordUrl;
window.openResetPasswordModal = openResetPasswordModal;
window.closeResetPasswordModal = closeResetPasswordModal;
window.handleResetPasswordSubmit = handleResetPasswordSubmit;
window.showLoginError = showLoginError;
window.showRegisterError = showRegisterError;
window.handleLoginSubmit = handleLoginSubmit;
window.handleRegisterSubmit = handleRegisterSubmit;
window.logoutUser = logoutUser;
window.renderProducts = renderProducts;
window.renderSoftwareBoxPreviewHTML = renderSoftwareBoxPreviewHTML;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.filterByCategory = filterByCategory;
window.handleSearch = handleSearch;
window.clearSearchInput = clearSearchInput;
window.handleSort = handleSort;
window.resetFilters = resetFilters;
window.scrollCatalog = scrollCatalog;
window.scrollServices = scrollServices;
window.showShopView = showShopView;
window.addToCart = addToCart;
window.buyNowDirect = buyNowDirect;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.saveCart = saveCart;
window.updateCartBadge = updateCartBadge;
window.toggleCartDrawer = toggleCartDrawer;
window.renderCartDrawer = renderCartDrawer;
window.applyCoupon = applyCoupon;
window.copyCoupon = copyCoupon;
window.updateCartTotals = updateCartTotals;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.renderCheckoutModal = renderCheckoutModal;
window.goToUpiStep = goToUpiStep;
window.startTimer = startTimer;
window.submitUtrPayment = submitUtrPayment;
window.openAccountModal = openAccountModal;
window.closeAccountModal = closeAccountModal;
window.switchAccountTab = switchAccountTab;
window.viewOrderReceipt = viewOrderReceipt;
window.closeReceiptModal = closeReceiptModal;
window.saveAddressInfo = saveAddressInfo;
window.saveProfileInfo = saveProfileInfo;
window.openHelpVideosModal = openHelpVideosModal;
window.closeHelpVideosModal = closeHelpVideosModal;
window.toggleMobileMenu = toggleMobileMenu;
window.showToast = showToast;
window.loadAdminCustomProducts = loadAdminCustomProducts;
window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;
window.authenticateAdmin = authenticateAdmin;
window.logoutAdmin = logoutAdmin;
window.switchAdminTab = switchAdminTab;
window.refreshAdminUsersTable = refreshAdminUsersTable;
window.addNewProductFromAdmin = addNewProductFromAdmin;


// Setup Auth Listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      currentUser = { uid: user.uid, ...userDoc.data() };
      
      if (['OWNER', 'ADMIN', 'MANAGER'].includes(currentUser.role) && currentUser.isActive) {
         activeAdmin = true;
      } else {
         activeAdmin = false;
      }
      
      onSnapshot(query(collection(db, "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc")), (snapshot) => {
        const orders = [];
        snapshot.forEach((d) => { orders.push({ id: d.id, ...d.data() }); });
        userPurchases = orders;
        renderHeaderUserMenu();
      });
    }
  } else {
    currentUser = null;
    userPurchases = [];
    activeAdmin = false;
    renderHeaderUserMenu();
  }
});
